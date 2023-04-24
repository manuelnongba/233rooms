import styles from '../styles/rooms.css';

interface RoomsProps {
  rooms: string[];
}

const Rooms: React.FC<RoomsProps> = ({ rooms }) => {
  const room = rooms.map((el: any) => {
    return (
      <div key={el.id}>
        <img src={`${el.image}`} alt="" />
      </div>
    );
  });

  return <main className="rooms">{room}</main>;
};

export default Rooms;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
