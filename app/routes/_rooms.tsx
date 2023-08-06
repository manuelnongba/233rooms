import { Outlet } from '@remix-run/react';
import Header from '~/component/navigation/Header';
import { getUserFromSession } from '~/data/auth.server';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as roomsLinks } from '~/component/rooms/Rooms';
import { links as footerLinks } from '~/component/navigation/Footer';
import { links as sliderLinks } from '~/component/utils/Slider';
import { links as menuLinks } from '~/component/navigation/Menu';

export default function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export async function loader({ request }: any) {
  return await getUserFromSession(request);
}

export function links() {
  return [
    ...headerLinks(),
    ...roomsLinks(),
    ...footerLinks(),
    ...sliderLinks(),
    ...menuLinks(),
  ];
}
