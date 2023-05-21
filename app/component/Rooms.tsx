import styles from '../styles/rooms.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
          <div key={el.id}>
            <img src={`${el.image}`} alt="" />
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
