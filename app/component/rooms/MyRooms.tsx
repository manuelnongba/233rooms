import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/myRooms.css';

import {
  FaBath,
  FaBed,
  FaEllipsisH,
  FaLocationArrow,
  FaWifi,
} from 'react-icons/fa/index';
import { useState } from 'react';
import MyRoomsMenu from './MyRoomsMenu';
import Header from '../navigation/Header';

interface MyRoomData {
  address: string;
  bathrooms: number;
  bedrooms: number;
  description: string;
  id: string;
  image: string;
  price: number;
  title: string;
}

interface MyRoomsTypes {
  myRoomsData: MyRoomData;
}

const MyRoomsDetails: React.FC<MyRoomsTypes> = ({ myRoomsData }) => {
  const [isMenu, setIsMenu] = useState(false);

  const showMenu = () => {
    setIsMenu(!isMenu);
  };

  let image;
  if (myRoomsData?.image?.includes(','))
    image = myRoomsData?.image.split(',')[0];
  else image = myRoomsData?.image;

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
          <div className="my-room-details-header-title">
            <p>{myRoomsData?.title}</p>
            <span>
              <FaLocationArrow /> &nbsp;
              {myRoomsData?.address}
            </span>
          </div>
          <div className="my-rooms-menu-btn">
            <FaEllipsisH onClick={showMenu} className="ellipsis" />
            <MyRoomsMenu
              isMyRoomsMenu={isMenu}
              setIsMyRoomsMenu={setIsMenu}
              roomId={myRoomsData?.id}
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
            <span>¢{myRoomsData?.price}</span>
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
  const data = useLoaderData<any>();

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
            {data.userRooms.length === 0 && (
              <div className="no-rooms">
                <h1>Sorry. You Have No Rooms Available!</h1>
                <br />
                <p>
                  Click <a href="/rent">here</a> to have your room on 233Rooms
                  now!
                </p>
              </div>
            )}
            {data.userRooms.map((el: MyRoomData) => (
              <MyRoomsDetails key={el.id} myRoomsData={el} />
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
