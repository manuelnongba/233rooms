import { links as headerLinks } from '~/component/navigation/Header';
import { links as rentLinks } from '~/component/rooms/Rent';
import { Outlet } from '@remix-run/react';
import { getUserFromSession, requireUserSession } from '~/data/auth.server';
import { LoaderFunctionArgs } from '@remix-run/node';

const RentLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default RentLayout;

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserSession(request);

  return await getUserFromSession(request);
}

export function links() {
  return [...headerLinks(), ...rentLinks()];
}
