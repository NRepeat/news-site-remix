import React, {FC} from 'react';
import Header from '~/components/Admin/Header/Header';
import styles from './styles.module.css';

type AdminPageLayoutProps = {
  children: React.ReactNode;
};

const AdminPageLayout: FC<AdminPageLayoutProps> = ({children}) => {
  return (
    <section className={styles.container}>
      <Header /> {children}{' '}
    </section>
  );
};

export default AdminPageLayout;
