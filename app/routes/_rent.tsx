import { links as headerLinks } from '~/component/navigation/Header';
import { links as rentLinks } from '~/component/rooms/Rent';
import { Outlet } from '@remix-run/react';
import { getUserFromSession, requireUserSession } from '~/data/auth.server';

const RentLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default RentLayout;

export async function loader({ request }: any) {
  await requireUserSession(request);

  return getUserFromSession(request);
}

export function links() {
  return [...headerLinks(), ...rentLinks()];
}
