import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import Dropzone from '../Dropzone/Dropzone';
import styles from './styles.module.css';

export default function PropertiesComponent({
  elementInstance,
  page,
}: {
  elementInstance: PageBlockInstance;
  page?: SerializeFrom<Page>;
}) {
  return (
    <div className={styles.propertiesContainer}>
      <Dropzone element={elementInstance} page={page} />
    </div>
  );
}
