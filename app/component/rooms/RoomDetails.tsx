import { useLoaderData } from '@remix-run/react';
import { useState, type MouseEvent, useEffect } from 'react';
import { FaLocationArrow, FaMoneyCheck } from 'react-icons/fa';
import styles from '~/styles/roomDetails.css';

const RoomDetails = () => {
  const [roomDataObj, setRoomDataObj] = useState<any>({
    title: '',
    description: '',
    price: '',
    address: '',
    image: [],
  });
  const roomData = useLoaderData();
  const [mainImage, setMainImage] = useState<string>(roomData[0].image);

  // const data = useMatches();

  useEffect(() => {
    const imagesData = roomData.map((el: any) => el.image);
    roomData.forEach((el: any) => {
      setRoomDataObj({ ...el, image: [...imagesData] });
    });
  }, [roomData]);

  const onImageClick = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    const selectedImage: string = target.dataset.image?.replace('/', '')!;

    setMainImage(selectedImage);
  };

  const roomImages = roomDataObj.image?.map((el: any, i: any) => {
    return (
      <div key={i}>
        <div>
          <img
            data-image={`/${el}`}
            src={`/${el}`}
            alt="rooms details"
            onClick={onImageClick}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="details">
      <div className="room-title">
        <h1>{roomDataObj?.title}</h1>
      </div>

      <div className="room-details">
        <img src={`/${mainImage}`} alt="rooms details" />

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

          <div className="sub-photos">{roomImages}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
