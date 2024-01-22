import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {Link} from '@remix-run/react';
import clsx from 'clsx';
import {
  PageBlockInstance,
  PageBlocks,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';

const PropertiesBar = ({
  element,
  page,
}: {
  page: SerializeFrom<Page>;
  element: PageBlockInstance;
}) => {
  const PropertiesBlock = PageBlocks[element.type].propertiesComponent;

  return (
    <div className={clsx(styles.container)}>
      <Link className={styles.head} to={`/admin/${page.slug}/constructor`}>
        Close edit tab
      </Link>
      <div className={styles.wrapper}>
        <PropertiesBlock elementInstance={element} page={page} />
      </div>
    </div>
  );
};

export default PropertiesBar;
