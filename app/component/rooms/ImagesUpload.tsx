import {
  Form,
  useActionData,
  useFetcher,
  useMatches,
  useNavigate,
} from '@remix-run/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaChevronRight, FaSearchLocation } from 'react-icons/fa';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import styles from '~/styles/imageUpload.css';
import { CLOUD_URL, MAPSKEY } from '~/api/config';
import axios from 'axios';
import { Logo } from '../utils/Logo';
import { showAlert } from '../utils/alert';

function ImagesUpload() {
  const [images, setImages] = useState<any>([]);
  const [address, setAddress] = useState('');
  const [debouncedAddress, setDebouncedAddress] = useState<any>();
  const [locationCoords, setLocationCoords] = useState<any>({
    lng: 0,
    lat: 0,
  });
  const [formState, setFormState] = useState({
    price: '',
    description: '',
    location: '',
  });
  const [resultsIsOpen, setResultsIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [locationResults, setLocationResults] = useState([]);
  const fetcher = useFetcher();
  const roomID = useActionData();
  const navigate = useNavigate();
  const userId = useMatches()[1].data;
  const divRef = useRef<HTMLDivElement>(null);

  const isSubmitting = fetcher.state !== 'idle';

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    debouncedAddress
  )}&key=${MAPSKEY}`;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      let imageExists = false;
      images?.forEach((el: any) => {
        if (el.name === acceptedFiles[0].name) {
          imageExists = true;
          alert('Image already added! Choose a different image.');
        }
      });

      if (acceptedFiles?.length && !imageExists) {
        setImages((previousFiles: any) => [
          ...previousFiles,
          ...acceptedFiles.map((file: any) => {
            return Object.assign(file, { preview: URL.createObjectURL(file) });
          }),
        ]);
      }
    },

    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      images.forEach((image: any) => URL.revokeObjectURL(image.preview));
  }, [images]);

  const removeFile = (name: any) => {
    setImages((images: any) =>
      images.filter((image: any) => image.name !== name)
    );
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedAddress(address);

      if (!address) setDebouncedAddress(formState.location);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [address, formState.location]);

  useEffect(() => {
    debouncedAddress &&
      axios(url).then((data) => {
        const location = data.data.results[0]?.geometry.location;

        setLocationCoords({ lat: location?.lat, lng: location?.lng });
      });
  }, [debouncedAddress, url]);

  const handleInputChange = (event: any) => {
    // Update the formData state with the new values from the input fields
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === 'location') {
      setSearchTerm(event.target.value);
      setResultsIsOpen(true);
    }
  };

  // const handleKeyStrokes = () => {};

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!images?.length) {
      return alert('Please upload images of your property!');
    }

    const formData = new FormData();
    const imageFormData = new FormData();

    let img = '';
    const imagesPromise = images.map(async (image: any, i: any) => {
      // img += image.name;

      imageFormData.append('file', image);
      imageFormData.append('cloud_name', 'drxwuqu3v');
      imageFormData.append('upload_preset', '233Rooms');

      // const URL: any = process.env.CLOUD_URL;
      try {
        const res = await axios.post(CLOUD_URL, imageFormData);

        img += res.data?.secure_url;

        if (i !== images.length - 1) img += ',';

        if (i === images.length - 1) formData.append('images', img);
      } catch (error: any) {
        console.log(error?.response?.data?.error?.message);
      }
    });

    Promise.all(imagesPromise).then(() => {
      formData.get('images');
      formData.append('roomId', roomID);
      formData.append('lng', locationCoords.lng);
      formData.append('lat', locationCoords.lat);
      formData.append('price', formState.price);
      formData.append('address', formState.location);
      formData.append('description', formState.description);
      formData.append('userId', userId);
      fetcher.submit(formData, { method: 'post', action: '/rent/next-step' });
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      showAlert('success', 'Your Room is now available on 233 Rooms!');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [fetcher.data, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (event.currentTarget.performance.navigation.type === 1) {
        navigate('/rent');
      }
    };

    window.addEventListener('load', handleBeforeUnload);

    return () => {
      window.removeEventListener('load', handleBeforeUnload);
    };
  }, [navigate]);

  useEffect(() => {
    if (!searchTerm) setResultsIsOpen(false);
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const googlePlaces = async () => {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${debouncedSearchTerm}&key=${MAPSKEY}`
      );

      setLocationResults(
        response.data.predictions.map((el: any) => {
          return (
            <p
              key={el.description}
              onClick={() => {
                setSearchTerm(el.description);
                setResultsIsOpen(false);
                setAddress(el.description);
              }}
            >
              <span>
                <FaSearchLocation />
              </span>
              {el.description}
            </p>
          );
        })
      );
    };
    googlePlaces();
  }, [debouncedSearchTerm]);

  function handleClickOutside(event: Event) {
    // If the user clicks outside the div, hide it
    if (
      divRef.current &&
      !divRef.current.contains(event.target as HTMLDivElement)
    ) {
      setResultsIsOpen(false);
    }
  }

  useEffect(() => {
    // Attach an event listener to the document that listens for clicks
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="upload-container">
      <div className="header">
        <Logo />
      </div>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit}>
          <h1>Upload Image(s)</h1>
          <div className="image-upload-container">
            <div
              {...getRootProps({
                className: 'image-upload',
              })}
            >
              <input {...getInputProps()} />
              <div className="upload-images">
                <ArrowUpTrayIcon className="tray-icon" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p className="file-select">
                    Drag & drop files here, or{' '}
                    <span style={{ color: '#228be6' }}>click</span> to select
                    files
                  </p>
                )}
              </div>
            </div>

            <div className="preview">
              <ul className="images-list">
                {images.map((file: any) => (
                  <li key={file.name} className="images-listing">
                    <img
                      src={file.preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                      className="uploaded-image"
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFile(file.name)}
                    >
                      <XMarkIcon className="remove-icon" />
                    </button>
                    <p className="file-name">{file.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="room-location">
            <input
              type="text"
              name="location"
              maxLength={200}
              placeholder="Location"
              onChange={handleInputChange}
              // onKeyUp={handleKeyStrokes}
              value={searchTerm}
              required
            />
            {resultsIsOpen && (
              <div className="location-results" ref={divRef}>
                {locationResults}
              </div>
            )}
          </div>

          <div className="description">
            <textarea
              // type="text"
              name="description"
              onChange={handleInputChange}
              maxLength={240}
              placeholder="Give a detailed description of your property"
              required
            />
          </div>

          <div className="price">
            <input
              type="number"
              name="price"
              placeholder="price"
              onChange={handleInputChange}
              required
            />
            <span>per month</span>
          </div>
          <div className="post">
            <button type="submit" disabled={isSubmitting}>
              Post Room <FaChevronRight />
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ImagesUpload;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
