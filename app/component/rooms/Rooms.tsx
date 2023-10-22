import styles from '~/styles/rooms.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slideshow from '../utils/Slider';
import { Link } from '@remix-run/react';

// interface RoomsProps {
//   rooms: object[];
// }

// React.FC<RoomsProps>

const Rooms = ({ rooms }: any) => {
  const [room, setRoom] = useState();

  useEffect(() => {
    let roomsObj: any = {};

    rooms?.rooms?.forEach((el: any) => {
      if (roomsObj[el.id] && el) roomsObj[el.id].image.push(el.image);
      else roomsObj[el.id] = { ...el, image: [el.image] };
    });

    const roomsArr: any = Object.values(roomsObj);
    setRoom(
      roomsArr.map((el: any) => {
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
      {!rooms.message && rooms.rooms.length === 0 && (
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {rooms.message === 'loaded' && rooms.rooms.length === 0 && (
        <div className="no-rooms">
          <h1>Sorry. No Rooms Available in this location!</h1>
        </div>
      )}
      <main className="rooms">{room}</main>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { rooms: state.rooms, location: { state } };
};

export default connect(mapStateToProps)(Rooms);

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
