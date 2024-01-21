import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import {PageList} from '~/components/Admin/PageList/PageList';
import {getAllPages} from '~/service/page.server';

export async function loader() {
  try {
    const pages = await getAllPages();
    return json({pages});
  } catch (error) {
    throw new Error('Not found');
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return <PageList pages={data.pages} />;
}
