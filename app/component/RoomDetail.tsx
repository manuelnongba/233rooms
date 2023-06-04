import { useParams } from '@remix-run/react';
import { connect } from 'react-redux';

const RoomDetail = ({ rooms }: any) => {
  const params = useParams();

  const roomData = rooms.find((room: any) => {
    return room.id === Number(params.roomid);
  });

  const roomValues = roomData
    ? {
        image: roomData.image,
        address: roomData.address,
        price: roomData.price,
      }
    : {
        image: '',
        address: '',
        price: 0,
      };

  console.log(roomValues.image);

  return (
    <div>
      <img
        src="accra.png"
        alt="nn"
        style={{ height: '1000px', width: '1000px' }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { rooms: state.rooms };
};

export default connect(mapStateToProps)(RoomDetail);
