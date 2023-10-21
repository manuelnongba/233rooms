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

const Account = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
  });
  const [rowCount, setRowCount] = useState();
  const fetcher = useFetcher();

  const emailRef: any = useRef();
  const firstnameRef: any = useRef();
  const lastnameRef: any = useRef();
  const phoneRef: any = useRef();
  const addressRef: any = useRef();
  let { userInfo } = useLoaderData();
  const data = useActionData();

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
      address: userInfo.address || 'Not provided',
    });
  }, []);

  const handleChange = (e: any) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    try {
      if (rowCount) showAlert('success', 'User Details Successfully Updated.');
      else showAlert('update', 'updating...');
    } catch (error) {
      console.log(error);

      showAlert('error', 'error');
    }
  };

  function deleteRoomHandler(e: any) {
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
            <div className="user-address">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                value={inputValue.address}
                onChange={(e) => handleChange(e)}
                ref={addressRef}
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
