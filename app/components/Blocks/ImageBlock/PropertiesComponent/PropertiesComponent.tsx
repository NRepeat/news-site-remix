import { Page } from '@prisma/client';
import { SerializeFrom } from '@remix-run/node';
import { PageBlockInstance } from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import Dropzone from '../Dropzone/Dropzone';

export default function PropertiesComponent({
  elementInstance,
  page,
}: {
  elementInstance: PageBlockInstance;
  page?: SerializeFrom<Page>;
}) {
  return (
    <Dropzone element={elementInstance} page={page} />
  );
}
