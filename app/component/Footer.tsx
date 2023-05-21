import styles from '~/styles/footer.css';

const Footer = () => {
  return (
    <footer>
      <div>&copy; 233Rooms</div>
    </footer>
  );
};

export default Footer;

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};
