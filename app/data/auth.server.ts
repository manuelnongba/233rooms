import { compare, hash } from 'bcrypt';
import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { pool } from './db.server';

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const SESSION_SECRET = process.env.SESSION_SECRET!;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true,
  },
});

async function createUserSession(userId: any, redirectPath: any) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);

  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export const destroyUserSession = async (request: any) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

export const signUp = async ({
  firstname,
  lastname,
  phone,
  email,
  password,
}: any) => {
  const sql = `SELECT email FROM users WHERE email = '${email}'`;

  const existingUser = await pool.query(sql);

  if (existingUser.rows.length > 0) {
    const error: any = new Error('A user with this email already exists.');

    error.status = 400;
    throw error;
  }

  const passwordHash = await hash(password, 12);

  const sql2 = `INSERT INTO users (firstname, lastname, phone, email, password) VALUES('${firstname}', '${lastname}', '${phone}', '${email}', '${passwordHash}')`;

  await pool.query(sql2);

  const sql3 = `SELECT id FROM users WHERE email = '${email}'`;

  const newUser = await pool.query(sql3);

  return createUserSession(newUser.rows[0].id, '/');
};

export const login = async ({ email, password }: any) => {
  const sql = `SELECT id, email, password FROM users WHERE email = '${email}'`;

  const existingUser = await pool.query(sql);

  if (existingUser.rows.length === 0) {
    const error: any = new Error(
      `Could not log you in, please check the provided credentials`
    );
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await compare(
    password,
    existingUser.rows[0].password
  );

  if (!passwordCorrect) {
    const error: any = new Error(
      `Could not log you in, please check the provided credentials`
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.rows[0].id, '/');
};
