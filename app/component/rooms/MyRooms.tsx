import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/myRooms.css';

const MyRooms = () => {
  const data = useLoaderData();

  const userRooms = data.map((el: any) => {
    return (
      <div key={el.image}>
        <div>
          <img src={el.image} alt={el.image} />
        </div>
        <div>
          <div>
            <p>{el.title}</p>
            <span>{el.address}</span>
          </div>
          <div>
            <span>{el.price}</span>
            <span>{el.bedrooms}</span>
            <span>{el.bathrooms}</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <h2>Welcome, Emmanuel!</h2>
      <h3>Your Rooms</h3>
      {userRooms}
    </div>
  );
};

export default MyRooms;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
