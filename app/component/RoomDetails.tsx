import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/roomDetails.css';

const RoomDetails = () => {
  const data = useLoaderData();

  console.log(data);

  const roomValues = data ? data : [];

  const roomDetails = roomValues.map((el: any, i: any) => {
    return (
      <div key={i}>
        <div>
          <img src={`/${el.image}`} alt="rooms details" />
        </div>
      </div>
    );
  });

  return (
    <div className="room-details">
      <div className="main-photo">
        <img src={`/${roomValues[0].image}`} alt="rooms details" />
      </div>

      <div className="sub-photos">{roomDetails}</div>
    </div>
  );
};

export default RoomDetails;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
