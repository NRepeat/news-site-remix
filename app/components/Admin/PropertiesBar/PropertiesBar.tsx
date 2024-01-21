import {
  PageBlockInstance,
  PageBlocks,
} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import styles from './styles.module.css';
import clsx from 'clsx';
import {SerializeFrom} from '@remix-run/node';
import {Page} from '@prisma/client';
import {Link} from '@remix-run/react';

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
      <Link to={`/admin/${page.slug}/constructor`}>X</Link>
      <PropertiesBlock elementInstance={element} page={page} />
    </div>
  );
};

export default PropertiesBar;
