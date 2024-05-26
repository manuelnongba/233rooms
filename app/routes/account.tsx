import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import Account from '~/component/account/Account';
import { links as accountLinks } from '~/component/account/Account';
import { links as headerLinks } from '~/component/navigation/Header';
import { links as menuLinks } from '~/component/navigation/Menu';
import {
  destroyUserSession,
  getUserFromSession,
  requireUserSession,
} from '~/data/auth.server';
import { deleteUser, getUserInfo, updateUserInfo } from '~/data/user.server';
import { User } from '~/types/account.types';

const AccountPage = () => {
  return (
    <div>
      <Account />
    </div>
  );
};

export default AccountPage;

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserFromSession(request);
  await requireUserSession(request);

  const userInfo: User[] = await getUserInfo(userId);

  return { userInfo, userId };
};

export const action = async ({ request }: ActionFunctionArgs) => {
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
