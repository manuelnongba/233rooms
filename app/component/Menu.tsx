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
        <Form method="post" action="/logout" className="action">
          <button>Logout</button>
        </Form>
      )}
      {!userId && (
        <Link to="login">
          <p className="action">Login </p>
        </Link>
      )}
    </div>
  );
};

export default Menu;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
