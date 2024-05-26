import { Form, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styles from '~/styles/rent.css';
import { Logo } from '../utils/Logo';

const RentRoom = () => {
  const [formState, setFormState] = useState({
    bedrooms: '',
    bathrooms: '',
    title: '',
  });
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== 'idle';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  return (
    <div className="rent-container">
      <div className="header">
        <Logo />
      </div>

      <div className="form-wrapper">
        <Form method="post" action="/rent/next-step">
          <div>
            <input
              type="number"
              name="bedrooms"
              onChange={handleChange}
              placeholder="No. Of Rooms"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="bathrooms"
              onChange={handleChange}
              placeholder="No. Of Baths"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              maxLength={50}
              placeholder="Give your property a title"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Add Images <FaChevronRight />
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default RentRoom;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
