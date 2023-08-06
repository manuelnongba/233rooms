import Account from '~/component/account/Account';
import { links as accountLinks } from '~/component/account/Account';
import { links as headerLinks } from '~/component/navigation/Header';
import { getUserFromSession } from '~/data/auth.server';
import { getUserInfo, updateUserInfo } from '~/data/user.server';

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

export const action = async ({ request }: any) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  const userId = await getUserFromSession(request);

  updateUserInfo(credentials, userId);

  return 'Successfully updated!';
};

export const links = () => {
  return [...accountLinks(), ...headerLinks()];
};
