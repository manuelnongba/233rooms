import styles from '../styles/rooms.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slideshow from './Slider';

// interface RoomsProps {
//   rooms: object[];
// }

// React.FC<RoomsProps>

const Rooms = ({ rooms }: any) => {
  const [room, setRoom] = useState();

  useEffect(() => {
    setRoom(
      rooms.map((el: any) => {
        return (
          <div className="room-details" key={el.id}>
            <Slideshow />
            <div className="room-sub-details">
              <p>{el.address}</p>
              <div className="price">
                <p>{`¢${el.price}`}</p>
                <span> month</span>
              </div>
            </div>
          </div>
        );
      })
    );
  }, [rooms]);

  return <main className="rooms">{room}</main>;
};

const mapStateToProps = (state: any) => {
  return { rooms: state.rooms };
};

export default connect(mapStateToProps)(Rooms);

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
