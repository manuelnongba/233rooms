import { Form, Link, useLoaderData } from '@remix-run/react';
import styles from '~/styles/menu.css';

const Menu = ({ isMenu }: any) => {
  const userId = useLoaderData();

  const style = {
    display: 'block',
  };

  return (
    <div className="menu" style={isMenu ? style : {}}>
      {userId && (
        <Link to="rent">
          <p className="action">Rent out your home</p>
        </Link>
      )}
      {userId && (
        <Form method="post" action="/logout">
          <button className="action">Logout</button>
        </Form>
      )}

      {!userId && (
        <Link to="login">
          <p className="action">Login </p>
        </Link>
      )}
      {!userId && (
        <Link to="login?mode=signup">
          <p className="action">Sign Up</p>
        </Link>
      )}
    </div>
  );
};

export default Menu;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
