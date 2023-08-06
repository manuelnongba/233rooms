import Account from '~/component/account/Account';
import { links as accountLinks } from '~/component/account/Account';
import { links as headerLinks } from '~/component/navigation/Header';
import { getUserFromSession } from '~/data/auth.server';
import { getUserInfo } from '~/data/user.server';

const AccountPage = () => {
  return (
    <div>
      <Account />
    </div>
  );
};

export default AccountPage;

export const loader = async ({ request }: any) => {
  const userId = await getUserFromSession(request);

  const userInfo = await getUserInfo(userId);

  return userInfo;
};

export const links = () => {
  return [...accountLinks(), ...headerLinks()];
};
