import {
  Form,
  NavLink,
  useActionData,
  useFetcher,
  useMatches,
  useNavigate,
} from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaChevronRight } from 'react-icons/fa';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import styles from '~/styles/imageUpload.css';
import { MAPSKEY } from '~/api/config';
import axios from 'axios';
import { Logo } from '../utils/Logo';

function ImagesUpload() {
  const [images, setImages] = useState<any>([]);
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
  const fetcher = useFetcher();
  const data = useActionData();
  const navigate = useNavigate();
  const userId = useMatches()[1].data;
  console.log(userId);

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      setImages((previousFiles: any) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

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
      setDebouncedAddress(formState.location);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [formState.location]);

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    debouncedAddress
  )}&key=${MAPSKEY}`;

  useEffect(() => {
    debouncedAddress &&
      axios(url).then((data) => {
        const location = data.data.results[0]?.geometry.location;

        setLocationCoords({ lat: location.lng, lng: location.lat });
      });
  }, [debouncedAddress, url]);

  const handleInputChange = (event: any) => {
    // Update the formData state with the new values from the input fields
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!images?.length) return;
    const formData = new FormData();
    let img: string = '';
    images.forEach((image: any, i: any) => {
      img += image.name;

      if (i !== images.length - 1) img += ',';
      formData.append('images', img);
    });

    formData.append('roomId', data);
    formData.append('lng', locationCoords.lng);
    formData.append('lat', locationCoords.lat);
    formData.append('price', formState.price);
    formData.append('address', formState.location);
    formData.append('description', formState.description);
    formData.append('userId', userId);
    fetcher.submit(formData, { method: 'post', action: '/rent/next-step' });

    // formData.append('upload_preset', 'friendsbook');
    // const URL: any = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    // const data = await fetch('/rents/next-step', {
    //   method: 'POST',
    //   body: formData,
    // }).then((res) => res.json());
    // console.log(data);

    setTimeout(() => {
      navigate(`/`);
    }, 500);
  };

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

          <div className="description">
            <textarea
              // type="text"
              name="description"
              onChange={handleInputChange}
              placeholder="Give a detailed description of your property"
            />
          </div>
          <div className="room-location">
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleInputChange}
            />
          </div>
          <div className="price">
            <input
              type="text"
              name="price"
              placeholder="price"
              onChange={handleInputChange}
            />
          </div>
          <div className="post">
            <button type="submit">
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
// const ImagesUpload = () => {
//   return (
//     <div>
//       <div className="image-upload">
//         <h2>Upload Images</h2>
//       </div>
//       <Form method="post">
//         <div>
//           <button>
//             Post Room <FaChevronRight />
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// };
// export default ImagesUpload;

// const [rejected, setRejected] = useState([]);

// if (rejectedFiles?.length) {
//   setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
// }

// const removeAll = () => {
//   setImages([]);
//   setRejected([]);
// };

// const removeRejected = (name: any) => {
//   setRejected((files) => files.filter(({ file }: any) => file.name !== name));
// };

/* <button type="button" onClick={removeAll} className="remove-all">
                Remove all files
              </button> */
/* <button type="submit" className="cloudinary">
                Upload to Cloudinary
              </button> */

/* <h3 className="rejected-images">Rejected Files</h3>
            <ul className="mt-6 flex flex-col">
              {rejected.map(({ file, errors }: any) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="mt-2 text-neutral-500 text-sm font-medium">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error: any) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="remove-rejected-btn"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul> */