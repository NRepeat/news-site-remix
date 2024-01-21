import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import React, {FC} from 'react';
import PageConstructor from '~/components/PageConstructor/PageConstructor';
import styles from './styles.module.css';

type ConstructorLayoutProps = {
  children: React.ReactNode;
  page: SerializeFrom<Page>;
};

const ConstructorLayout: FC<ConstructorLayoutProps> = ({children, page}) => {
  return (
    <main className={styles.container}>
      {' '}
      <PageConstructor page={page} />
      {children}{' '}
    </main>
  );
};

export default ConstructorLayout;
