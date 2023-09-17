/* eslint-disable */
import styles from '~/styles/myRooms.css';

export const hideAlert = () => {
  if (typeof window === 'object') {
    const el = document?.querySelector('.alert');
    if (el) el.parentElement?.removeChild(el);
  }
};

//type is 'success' or 'error'
export const showAlert = (type: string, msg: string) => {
  const markup = `<div class="alert alert--${type}">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/>
      </svg>
    </div>
    <p>${msg}</p>
</div>`;
  document.querySelector('body')!.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 3000);
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
