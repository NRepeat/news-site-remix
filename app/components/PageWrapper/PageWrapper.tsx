import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';

const PageWrapper = ({page}: {page: SerializeFrom<Page> | null}) => {
  if (!page) throw new Error('Page not found');

  return <> asd</>;
};

export default PageWrapper;
