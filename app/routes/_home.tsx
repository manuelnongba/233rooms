import { Outlet } from '@remix-run/react';
import Footer from '~/component/Footer';
import Header from '~/component/Header';
import { getUserFromSession } from '~/data/auth.server';
import { links as headerLinks } from '~/component/Header';
import { links as roomsLinks } from '~/component/Rooms';
import { links as footerLinks } from '~/component/Footer';
import { links as sliderLinks } from '~/component/Slider';
import { links as menuLinks } from '~/component/Menu';

export default function Home() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export function loader({ request }: any) {
  return getUserFromSession(request);
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
