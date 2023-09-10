import { Link } from '@remix-run/react';
import { useCallback, useEffect, useRef } from 'react';

const MyRoomsMenu = ({ isMyRoomsMenu, setIsMyRoomsMenu, roomId }: any) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      // If the user clicks outside the div, hide it

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsMyRoomsMenu(false);
      }
    },
    [setIsMyRoomsMenu]
  );

  useEffect(() => {
    // Attach an event listener to the document that listens for clicks
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    isMyRoomsMenu && (
      <div>
        <div ref={menuRef} className="my-rooms-menu">
          <Link to={`edit/${roomId}`}>
            <p className="action">Edit</p>
          </Link>
          <Link to={`/rooms/${roomId}`}>
            <p className="action">View Room </p>
          </Link>
        </div>
      </div>
    )
  );
};

export default MyRoomsMenu;
