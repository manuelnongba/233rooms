import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/roomDetails.css';

const RoomDetails = () => {
  const data = useLoaderData();

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
      <div className="sub-details">
        <div>
          <h1>{roomValues[0].title}</h1>
        </div>

        <div className="price-desc">
          <div>
            <p>
              <span>Price: </span>
              {roomValues[0].price}
            </p>
            <p>
              <span>Address: </span>
              {roomValues[0].address}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="main-photo">
          <img src={`/${roomValues[0].image}`} alt="rooms details" />
          <div>
            <p>{roomValues[0].description}</p>
          </div>
        </div>

        <div className="sub-photos">{roomDetails}</div>
      </div>
    </div>
  );
};

export default RoomDetails;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
