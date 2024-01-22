import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Link} from '@remix-run/react';
import {CiEdit} from 'react-icons/ci';
import styles from './styles.module.css';
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33F5', '#33C3FF'];
export const PageCard = ({
  page,
  index,
}: {
  index: number;
  page: SerializeFrom<Page>;
}) => {
  const color = colors[index % colors.length];
  return (
    <div className={styles.container}>
      <div className={styles.color} style={{backgroundColor: color}} />
      <Link
        prefetch="intent"
        className={styles.cardLink}
        to={`/admin/${page.slug}/constructor`}
      >
        <span className={styles.name}> {page.name}</span>
      </Link>
      <Link
        prefetch="intent"
        className={styles.linkWrapper}
        to={`/admin/${page.slug}/constructor`}
      >
        <CiEdit className={styles.icon} />
        <span className={styles.link}> Edit page</span>{' '}
      </Link>
    </div>
  );
};
