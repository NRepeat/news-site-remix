import {Link} from '@remix-run/react';
import styles from './styles.module.css';
const PreviewPageButton = () => {
  return (
    <Link className={styles.link} to={'/constructor/preview'}>
      <span>Preview page</span>
    </Link>
  );
};

export default PreviewPageButton;
