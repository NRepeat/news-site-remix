import {SerializeFrom} from '@remix-run/node';
import {PageCard} from '../PageCard/PageCard';
import {Page} from '@prisma/client';
import styles from './styles.module.css';

export const PageList = ({pages}: {pages: SerializeFrom<Page[]>}) => {
  return (
    <div className={styles.container}>
      {pages.map((page, index) => (
        <PageCard key={page.id} index={index} page={page} />
      ))}
    </div>
  );
};
