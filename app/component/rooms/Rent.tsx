import { Form } from '@remix-run/react';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import styles from '~/styles/rent.css';
import { Logo } from '../utils/Logo';

const RentRoom = () => {
  const [formState, setFormState] = useState<any>({
    bedrooms: '',
    bathrooms: '',
    title: '',
  });

  const handleChange = (event: any) => {
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
            <select name="bedrooms" onChange={handleChange}>
              <option value="">No. Of Rooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8+">8+</option>
            </select>
          </div>
          <div>
            <select name="bathrooms" onChange={handleChange}>
              <option value="">No. Of Baths</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8+">8+</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="title"
              maxLength={30}
              placeholder="Give your property a title"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">
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
