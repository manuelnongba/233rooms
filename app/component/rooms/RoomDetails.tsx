import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState, type MouseEvent, useEffect } from 'react';
import {
  FaEnvelope,
  FaLocationArrow,
  FaMoneyCheck,
  FaPhoneAlt,
} from 'react-icons/fa';
import styles from '~/styles/roomDetails.css';
import { Rooms } from '~/types/rooms.types';

const RoomDetails = () => {
  const [roomDataObj, setRoomDataObj] = useState<Rooms>({
    title: '',
    id: '',
    description: '',
    price: 0,
    address: '',
    image: [],
  });
  const { roomInfo, userInfo } = useLoaderData<LoaderFunction>();
  const [mainImage, setMainImage] = useState<string>(roomInfo[0].image);
  const userInfoData = userInfo[0];

  useEffect(() => {
    const imagesData = roomInfo?.map((el: Rooms) => el?.image);
    roomInfo?.forEach((el: Rooms) => {
      setRoomDataObj({ ...el, image: [...imagesData] });
    });
  }, [roomInfo]);

  const onImageClick = (e: MouseEvent) => {
    const target = e.target as HTMLImageElement;
    const selectedImage = target.dataset?.image as string;

    setMainImage(selectedImage);
  };

  const roomImages = roomDataObj?.image?.map((el: string, i: number) => {
    return (
      <div key={i}>
        <div>
          <img
            data-image={`${el}`}
            src={`${el}`}
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

      <div className="room-page-details">
        <img src={`${mainImage}`} alt="rooms details" />

        <div className="sub-details">
          <div className="room-desc">
            <div>
              <div>
                <h1>{roomDataObj?.description}</h1>
              </div>

              <div className="price-desc">
                <div>
                  <p>
                    <FaMoneyCheck />
                    <span>
                      <b>Price: </b>
                    </span>
                    ¢{roomDataObj?.price}
                  </p>
                </div>

                <div>
                  <p>
                    <FaLocationArrow />
                    <span>
                      <b>Address: </b>
                    </span>
                    {roomDataObj?.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="user-contact-main">
              <div className="user-name-image">
                {/* <img
                  src={`${userInfoData?.avatar}`}
                  alt={userInfoData?.avatar}
                /> */}
                <p>
                  {userInfoData?.firstname} {userInfoData?.lastname}
                </p>
              </div>
              <div className="user-contact">
                <div>
                  <FaPhoneAlt />
                  <span>{userInfoData?.phone}</span>
                </div>
                <div>
                  <FaEnvelope />
                  <span>{userInfoData?.email}</span>
                </div>
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
