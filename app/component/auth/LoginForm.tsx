import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';
import styles from '~/styles/loginForm.css';
import { showAlert } from '../utils/alert';
import { useEffect } from 'react';
import { ActionFunction } from '@remix-run/node';

const Login = () => {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const user = useActionData<ActionFunction>();

  useEffect(() => {
    if (user?.email) showAlert('error', user?.email);
    if (user?.password) showAlert('error', user?.password);
    if (user?.credentials) showAlert('error', user?.credentials);
  }, [user]);

  const authMode = searchParams.get('mode') || 'login';

  const submitBtnCaption = authMode === 'login' ? 'login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login'
      ? 'Do not have an account? Sign up.'
      : 'Login with existing account';

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" className="form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      {authMode === 'signup' ? (
        <div>
          <p>
            <label htmlFor="firstname">First Name</label>
            <input type="firstname" id="firstname" name="firstname" required />
          </p>
          <p>
            <label htmlFor="lastname">Last Name</label>
            <input type="lastname" id="lastname" name="lastname" required />
          </p>
          <p>
            <label htmlFor="phone">Phone</label>
            <input type="phone" id="phone" name="phone" />
          </p>
        </div>
      ) : (
        ''
      )}
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </p>
      {/* {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err) => (
            <li key={err}>{err} </li>
          ))}
        </ul>
      )} */}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
};

export default Login;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
