import { links as loginLinks } from '~/component/auth/LoginForm';
import LoginForm from '~/component/auth/LoginForm';
import { signUp, login } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;

export const action = async ({ request }: any) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      //login logic

      return await login(credentials);
    } else {
      //sign up logic

      return await signUp(credentials);
    }
  } catch (error: any) {
    if (error.status === 422) return { credentials: error.message };
  }
};

export function links() {
  return [...loginLinks()];
}
