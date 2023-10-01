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
  let markup: string;

  if (type === 'success')
    markup = `<div class="alert alert--${type}">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/>
      </svg>
    </div>
    <p>${msg}</p>
  </div>`;
  else
    markup = `<div class="alert alert--${type}">
    <div class="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M85.57 446.25h340.86a32 32 0 0028.17-47.17L284.18 82.58c-12.09-22.44-44.27-22.44-56.36 0L57.4 399.08a32 32 0 0028.17 47.17z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M250.26 195.39l5.74 122 5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 5.95z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M256 397.25a20 20 0 1120-20 20 20 0 01-20 20z"/></svg>
    </div>
    <p>${msg}</p>
  </div>`;

  document.querySelector('body')!.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 3000);
};

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
