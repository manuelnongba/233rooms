import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from '@remix-run/react';

import styles from '~/styles/account.css';
import { useEffect, useRef, useState } from 'react';
import Header from '../navigation/Header';
import { hideAlert, showAlert } from '../utils/alert';
import { ActionFunction, LoaderFunction } from '@remix-run/node';

const Account = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
  });
  const [rowCount, setRowCount] = useState<number>();
  const fetcher = useFetcher();

  const emailRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  let { userInfo } = useLoaderData<LoaderFunction>();

  const data = useActionData<ActionFunction>();

  userInfo = userInfo[0];

  useEffect(() => {
    setRowCount(data);

    if (rowCount) {
      hideAlert();
      showAlert('success', 'User Details Successfully Updated.');
    }
  }, [data, rowCount]);

  useEffect(() => {
    setInputValue({
      ...inputValue,
      email: userInfo.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      phone: userInfo.phone,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e?.target?.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      if (rowCount) showAlert('success', 'User Details Successfully Updated.');
      else showAlert('update', 'updating...');
    } catch (error) {
      showAlert('error', 'error');
    }
  };

  function deleteRoomHandler(e: React.MouseEvent<HTMLButtonElement>) {
    const proceed = confirm('Click OK to delete this room!');
    if (!proceed) return;

    fetcher.submit(null, { method: 'delete', action: `/account` });
  }

  return (
    <div>
      <Header />
      <div className="info-container account-wrapper">
        <div>
          <div className="info-header">
            <h1>User Information</h1>
            <p>You can edit your personal information </p>
          </div>
          <Form method="post" onSubmit={handleSubmit}>
            <div className="user-email">
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                name="email"
                value={inputValue.email}
                onChange={(e) => handleChange(e)}
                ref={emailRef}
              />
            </div>
            <div className="user-fullname">
              <label htmlFor="">Fullname</label>
              <div className="user-fullname-input">
                <input
                  type="text"
                  name="firstname"
                  value={inputValue.firstname}
                  onChange={(e) => handleChange(e)}
                  ref={firstnameRef}
                />
                <input
                  type="text"
                  name="lastname"
                  value={inputValue.lastname}
                  onChange={(e) => handleChange(e)}
                  ref={lastnameRef}
                />
              </div>
            </div>
            <div className="user-phone">
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                value={inputValue.phone}
                onChange={(e) => handleChange(e)}
                ref={phoneRef}
              />
            </div>
            <div className="submit-button">
              <button type="submit">Update Info</button>
            </div>
          </Form>
        </div>
        <div className="cta">
          {/* <Form method="delete" onSubmit={deleteRoomHandler}> */}
          <button className="delete-action" onClick={deleteRoomHandler}>
            Delete Account
          </button>
          {/* </Form> */}
        </div>
      </div>
    </div>
  );
};

export default Account;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
