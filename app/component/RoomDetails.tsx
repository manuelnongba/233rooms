import { useLoaderData } from '@remix-run/react';
import { FaLocationArrow, FaMoneyCheck } from 'react-icons/fa';
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
    <div className="details">
      <div className="room-title">
        <h1>{roomValues[0].title}</h1>
      </div>

      <div className="room-details">
        <img src={`/${roomValues[0].image}`} alt="rooms details" />

        <div className="sub-details">
          <div className="room-desc">
            <div>
              <h1>{roomValues[0].description}</h1>
            </div>

            <div className="price-desc">
              <div>
                <p>
                  <FaMoneyCheck />
                  <span>Price: </span>
                  {roomValues[0].price}
                </p>
              </div>

              <div>
                <p>
                  <FaLocationArrow />
                  <span>Address: </span>
                  {roomValues[0].address}
                </p>
              </div>
            </div>
          </div>

          <div className="sub-photos">{roomDetails}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
