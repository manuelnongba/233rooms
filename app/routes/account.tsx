import Account from '~/component/account/Account';
import { links as accountLinks } from '~/component/account/Account';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import { destroyUserSession, getUserFromSession } from '~/data/auth.server';
import { deleteUser, getUserInfo, updateUserInfo } from '~/data/user.server';

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

  if (request.method === 'DELETE') {
    await deleteUser(userId);

    return await destroyUserSession(request);
  }

  const rowCount = await updateUserInfo(credentials, userId);

  return rowCount;
};

export const links = () => {
  return [...accountLinks(), ...headerLinks(), ...menuLinks()];
};
