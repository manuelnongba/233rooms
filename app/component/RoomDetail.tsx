import { useLoaderData } from '@remix-run/react';

const RoomDetail = () => {
  const data = useLoaderData();

  console.log(data);

  const roomValues = data ? data : [];

  const roomDetails = roomValues.map((el: any, i: any) => {
    return (
      <div key={i}>
        <img
          src={`/${el.image}`}
          alt="nn"
          style={{ height: '1000px', width: '1000px' }}
        />
      </div>
    );
  });

  return roomDetails;
};

export default RoomDetail;
