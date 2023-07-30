import { useLoaderData } from '@remix-run/react';
import { FaLocationArrow, FaMoneyCheck } from 'react-icons/fa';
import styles from '~/styles/roomDetails.css';

const RoomDetails = () => {
  const roomData = useLoaderData();
  let roomDataObj: any = {
    image: [],
  };

  roomData.forEach((el: any) => {
    roomDataObj = { ...el, image: [...roomDataObj.image, el.image] };
  });

  const roomDetails = roomDataObj.image?.map((el: any, i: any) => {
    return (
      <div key={i}>
        <div>
          <img src={`/${el}`} alt="rooms details" />
        </div>
      </div>
    );
  });

  console.log(roomDetails);

  return (
    <div className="details">
      <div className="room-title">
        <h1>{roomDataObj?.title}</h1>
      </div>

      <div className="room-details">
        <img src={`/${roomDataObj?.image[0]}`} alt="rooms details" />

        <div className="sub-details">
          <div className="room-desc">
            <div>
              <h1>{roomDataObj?.description}</h1>
            </div>

            <div className="price-desc">
              <div>
                <p>
                  <FaMoneyCheck />
                  <span>Price: </span>
                  {roomDataObj?.price}
                </p>
              </div>

              <div>
                <p>
                  <FaLocationArrow />
                  <span>Address: </span>
                  {roomDataObj?.address}
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
