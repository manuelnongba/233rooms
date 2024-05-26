import { ActionFunctionArgs, json } from '@remix-run/node';
import { destroyUserSession } from '../data/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    throw json({ message: 'Invalid request method' }, { status: 400 });
  }

  return await destroyUserSession(request);
};
