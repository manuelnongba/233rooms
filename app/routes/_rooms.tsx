import { Outlet } from '@remix-run/react';

import { links as headerLinks } from '~/component/navigation/Header';
import { links as roomsLinks } from '~/component/rooms/Rooms';
import { links as footerLinks } from '~/component/navigation/Footer';
import { links as sliderLinks } from '~/component/utils/Slider';
import { links as menuLinks } from '~/component/navigation/Menu';

export default function Home() {
  return (
    <>
      <Outlet />
    </>
  );
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
