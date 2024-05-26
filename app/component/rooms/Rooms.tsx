import styles from '~/styles/rooms.css';
import {
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { DispatchProp, Matching, connect } from 'react-redux';
import Slideshow from '../utils/Slider';
import { Link } from '@remix-run/react';
import { AnyAction } from 'redux';
// import type { Rooms } from '~/actions';

export interface Rooms {
  // {id: 1, title: 'Accra Room', image: 'accra.png', distance: 13270.3905742
  address?: string | null;
  bathrooms?: number;
  bedrooms?: number;
  description?: string;
  distance?: number | null;
  id: string;
  image: string[];
  price?: number;
  title?: string;
}

interface RoomsType {
  rooms: Rooms[];
  message: string;
}

const Rooms: React.ComponentType<
  Matching<{ rooms: RoomsType } & DispatchProp<AnyAction>, RoomsType>
> = ({ rooms }: { rooms: RoomsType }) => {
  const [room, setRoom] = useState<ReactElement[]>();

  useEffect(() => {
    let roomsObj: any = {};

    rooms?.rooms?.forEach((el: Rooms) => {
      if (roomsObj[el.id] && el) roomsObj[el.id].image.push(el.image);
      else roomsObj[el.id] = { ...el, image: [el.image] };
    });

    const roomsArr: Rooms[] = Object.values(roomsObj);
    setRoom(
      roomsArr?.map((el: Rooms) => {
        const { id } = el;

        return (
          <div className="room-details" key={id}>
            <Link to={`rooms/${id}`}>
              <Slideshow slideImages={el.image} />
              <div className="room-sub-details">
                <p>{el.address}</p>
                <div className="price">
                  <p>{`¢${el.price}`}</p>
                  <span> month</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })
    );
  }, [rooms]);

  return (
    <>
      {!rooms?.message && rooms?.rooms.length === 0 && (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {rooms?.message === 'loaded' && rooms?.rooms?.length === 0 && (
        <div className="no-rooms">
          <h1>Sorry. No Rooms Available in this location!</h1>
        </div>
      )}
      <main className="rooms">{room}</main>
    </>
  );
};

const mapStateToProps = (state: { rooms: RoomsType }) => {
  return { rooms: state.rooms };
};

export default connect(mapStateToProps)(Rooms);

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
