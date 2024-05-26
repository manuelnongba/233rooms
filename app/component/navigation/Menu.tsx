import { LoaderFunction } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import styles from '~/styles/menu.css';

const Menu = ({
  isMenu,
  menuRef,
  setIsMenu,
}: {
  isMenu: boolean;
  menuRef: React.LegacyRef<HTMLDivElement>;
  setIsMenu: (state: boolean) => void;
}) => {
  const { userId } = useLoaderData<LoaderFunction>();

  function handleLinkClick() {
    setIsMenu(false);
  }

  return (
    isMenu && (
      <div className="menu" ref={menuRef}>
        {userId && (
          <Link to="/rent">
            <p className="action">Rent out your home</p>
          </Link>
        )}
        {userId && (
          <Link to="/account">
            <p className="action">Account</p>
          </Link>
        )}
        {userId && (
          <Link to="/my-rooms">
            <p className="action">My Rooms</p>
          </Link>
        )}
        {userId && (
          <Form method="post" action="/logout">
            <button className="action">Logout</button>
          </Form>
        )}

        {!userId && (
          <Link to="/auth">
            <p className="action" onClick={handleLinkClick}>
              Login{' '}
            </p>
          </Link>
        )}
        {!userId && (
          <Link to="/auth?mode=signup">
            <p className="action" onClick={handleLinkClick}>
              Sign Up
            </p>
          </Link>
        )}
      </div>
    )
  );
};

export default Menu;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
