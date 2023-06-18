import { links as loginLinks } from '~/component/LoginForm';
import LoginForm from '~/component/LoginForm';

function login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default login;

export function links() {
  return [...loginLinks()];
}
