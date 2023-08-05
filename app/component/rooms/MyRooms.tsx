import { Link, useLoaderData } from '@remix-run/react';
import styles from '~/styles/myRooms.css';
import { Logo } from '../utils/Logo';
import { FaBath, FaBed, FaLocationArrow, FaWifi } from 'react-icons/fa';

const MyRooms = () => {
  const data = useLoaderData();

  const userRooms = data.map((el: any) => {
    const image = el.image.split(',')[0];
    return (
      <Link
        to={`/rooms/${el.room_id}`}
        className="my-room-wrapper"
        key={el.image}
      >
        <div className="image-wrapper">
          <img src={image} alt={image} />
        </div>
        <div className="my-room-details">
          <div>
            <p>{el.title}</p>
            <span>
              <FaLocationArrow /> &nbsp;
              {el.address}
            </span>
          </div>
          <div className="my-room-icons">
            <FaBed />
            <FaBath />
            <FaWifi />
          </div>
          <div className="my-room-sub-details">
            <div>
              <span>{el.price}</span>
              <span>price</span>
            </div>
            <div>
              <span>{el.bedrooms}</span>
              <span>bedrooms</span>
            </div>
            <div>
              <span>{el.bathrooms}</span>
              <span>bathrooms</span>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <div className="my-rooms-main">
      <div className="header">
        <Logo />
      </div>
      <div className="my-rooms-wrapper">
        <div className="my-rooms">
          <div className="sub-header">
            <h1>Welcome, {data[0].firstname}!</h1>
            <h2>Your Rooms</h2>
          </div>
          {userRooms}
        </div>
      </div>
    </div>
  );
};

export default MyRooms;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
