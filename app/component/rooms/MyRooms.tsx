import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/myRooms.css';

import {
  FaBath,
  FaBed,
  FaEllipsisH,
  FaLocationArrow,
  FaWifi,
} from 'react-icons/fa';
import { useState } from 'react';
import MyRoomsMenu from './MyRoomsMenu';
import Header from '../navigation/Header';

const MyRoomsDetails = ({ myRoomsData }: any) => {
  const [isMenu, setIsMenu] = useState(false);

  const showMenu = () => {
    setIsMenu(!isMenu);
  };

  const image = myRoomsData?.image.split(',')[0];

  return (
    <div
      className="my-room-wrapper"
      key={myRoomsData?.image + myRoomsData?.title}
    >
      <div className="image-wrapper">
        <img src={image} alt={image} />
      </div>
      <div className="my-room-details">
        <div className="my-room-details-header">
          <div>
            <p>{myRoomsData?.title}</p>
            <span>
              <FaLocationArrow /> &nbsp;
              {myRoomsData?.address}
            </span>
          </div>
          <div>
            <FaEllipsisH onClick={showMenu} className="ellipsis" />
            <MyRoomsMenu
              isMyRoomsMenu={isMenu}
              setIsMyRoomsMenu={setIsMenu}
              roomId={myRoomsData?.room_id}
            />
          </div>
        </div>
        <div className="my-room-icons">
          <FaBed />
          <FaBath />
          <FaWifi />
        </div>
        <div className="my-room-sub-details">
          <div>
            <span>{myRoomsData?.price}</span>
            <span>price</span>
          </div>
          <div>
            <span>{myRoomsData?.bedrooms}</span>
            <span>bedrooms</span>
          </div>
          <div>
            <span>{myRoomsData?.bathrooms}</span>
            <span>bathrooms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyRooms = () => {
  const data = useLoaderData();

  return (
    <div className="my-rooms-main">
      <div className="my-rooms-main">
        {/* <div className="header">
          <Logo />
        </div> */}
        <Header />
        <div className="my-rooms-wrapper">
          <div className="my-rooms">
            <div className="sub-header">
              <h1>Welcome, {data.userName[0].firstname}!</h1>
              <h2>Your Rooms</h2>
            </div>
            {data.userRooms.map((el: any) => (
              <MyRoomsDetails key={el.room_id} myRoomsData={el} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRooms;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
