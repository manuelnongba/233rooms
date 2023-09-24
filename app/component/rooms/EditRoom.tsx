import { useEffect, useRef, useState } from 'react';
import Header from '../navigation/Header';
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import styles from '~/styles/editrooms.css';
import { hideAlert, showAlert } from '../utils/alert';
import axios from 'axios';
import { MAPSKEY } from '~/api/config';

const EditRoom = () => {
  const [inputValue, setInputValue] = useState({
    bedrooms: '',
    bathrooms: '',
    title: '',
    description: '',
    price: '',
    address: '',
  });
  const [rowCount, setRowCount] = useState();
  const [command, setCommand] = useState();
  const [debouncedAddress, setDebouncedAddress] = useState<any>();
  const [locationCoords, setLocationCoords] = useState<any>({
    lng: 0,
    lat: 0,
  });

  const bedroomsRef: any = useRef();
  const bathroomsRef: any = useRef();
  const titleRef: any = useRef();
  const descriptionRef: any = useRef();
  const priceRef: any = useRef();
  const addressRef: any = useRef();

  const roomInfo = useLoaderData()[0];
  const data = useActionData();

  const fetcher = useFetcher();

  const navigate = useNavigate();

  useEffect(() => {
    if (data === 1) setRowCount(data);

    if (rowCount) {
      hideAlert();
      showAlert('success', 'User Details Successfully Updated.');
    }
  }, [data, rowCount]);

  useEffect(() => {
    if (data === 'DELETE') setCommand(data);

    if (command) {
      try {
        showAlert('success', 'Room Successfully deleted.');
        setTimeout(() => {
          navigate('/my-rooms');
        }, 1000);
      } catch (error) {
        showAlert('error', 'error');
      }
    }
  }, [command, data, navigate]);

  useEffect(() => {
    setInputValue({
      ...inputValue,
      bedrooms: roomInfo?.bedrooms,
      bathrooms: roomInfo?.bathrooms,
      title: roomInfo?.title,
      description: roomInfo?.description,
      price: roomInfo?.price,
      address: roomInfo?.address,
    });
  }, []);

  const handleChange = (e: any) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  function deleteRoomHandler(e: any) {
    const proceed = confirm('Click OK to delete this room!');
    if (!proceed) return;
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedAddress(inputValue.address);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue.address]);

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

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('lng', locationCoords.lng);
    formData.append('lat', locationCoords.lat);

    fetcher.submit(formData, { method: 'post' });

    try {
      if (rowCount) showAlert('success', 'Room Details Successfully Updated.');
      else showAlert('success', 'updating...');
    } catch (error) {
      console.log(error);

      showAlert('error', 'error');
    }
  };

  return (
    <div>
      <Header />
      <div className="info-container">
        <div className="info-header edit-room">
          <div>
            <h1>Room Information</h1>
            <p>You can edit your room details</p>
          </div>
          <div className="cta">
            <Link to="images">
              <button className="edit-photos">Edit Photos</button>
            </Link>

            <Form method="delete" onSubmit={deleteRoomHandler}>
              <button className="delete-action">Delete Room</button>
            </Form>
          </div>
        </div>
        <Form method="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Bedrooms</label>
            <input
              type="text"
              name="bedrooms"
              ref={bedroomsRef}
              value={inputValue.bedrooms}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="">Bathrooms</label>
            <input
              type="text"
              name="bathrooms"
              ref={bathroomsRef}
              value={inputValue.bathrooms}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              ref={titleRef}
              value={inputValue.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              ref={descriptionRef}
              value={inputValue.description}
              onChange={(e) => handleChange(e)}
              maxLength={240}
              placeholder="Give a detailed description of your property"
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              type="text"
              name="price"
              ref={priceRef}
              value={inputValue.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="address"
              ref={addressRef}
              value={inputValue.address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="submit-button">
            <button type="submit">Update Info</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditRoom;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
