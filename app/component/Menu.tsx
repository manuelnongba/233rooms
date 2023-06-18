import { Link } from '@remix-run/react';
import styles from '~/styles/menu.css';

const Menu = ({ isMenu }: any) => {
  const style = {
    display: 'block',
  };

  return (
    <div className="menu" style={isMenu ? style : {}}>
      <Link to="login">
        <p>Login </p>
      </Link>
    </div>
  );
};

export default Menu;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
