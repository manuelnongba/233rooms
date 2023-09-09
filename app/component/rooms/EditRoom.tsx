import { useEffect, useRef, useState } from 'react';
import Header from '../navigation/Header';
import { Form, Link, useLoaderData } from '@remix-run/react';
import styles from '~/styles/editrooms.css';

const EditRoom = () => {
  const [inputValue, setInputValue] = useState({
    bedrooms: '',
    bathrooms: '',
    title: '',
    description: '',
    price: '',
    address: '',
  });
  const bedroomsRef: any = useRef();
  const bathroomsRef: any = useRef();
  const titleRef: any = useRef();
  const descriptionRef: any = useRef();
  const priceRef: any = useRef();
  const addressRef: any = useRef();

  const roomInfo = useLoaderData()[0];

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

  // function deleteRoomHandler() {
  //   const proceed = confirm('Are you sure? Do you want to delete this item?');
  //   if (!proceed) return;

  //   fetcher.submit(null, { method: 'delete', action: `/my-rooms/${roomid}` });
  // }

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
            <button className="edit-photos">
              <Link to="images">Edit Photos</Link>
            </button>

            <Form method="delete">
              <button className="delete-action">Delete Room</button>
            </Form>
          </div>
        </div>
        <Form method="post">
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
            <label htmlFor="">Address</label>
            <input
              type="text"
              name="address"
              ref={addressRef}
              value={inputValue.address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="submit-button">
            <button>Update Info</button>
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
