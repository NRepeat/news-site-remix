import {Link} from '@remix-run/react';
import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link className={styles.link} to={'/admin'}>
          My pages
        </Link>
        <Link className={styles.link} to={'/admin'}>
          Pages properties
        </Link>
        <Link className={styles.link} to={'/admin'}>
          My page content
        </Link>
      </div>
      <div className={styles.account}>
        <img src="" alt="" />
        <Link className={styles.link} to={'/admin'}>
          Account
        </Link>
      </div>
    </div>
  );
};

export default Header;
