import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import Dropzone from '../../ImageBlock/Dropzone/Dropzone';

export default function PropertiesComponent({
  elementInstance,
  page,
}: {
  page?: SerializeFrom<Page>;
  elementInstance: PageBlockInstance;
}) {
  return <Dropzone element={elementInstance} page={page} />;
}
