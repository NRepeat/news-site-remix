import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import PageWrapper from '~/components/PageWrapper/PageWrapper';
import {getPage} from '~/service/page.server';

export async function loader() {
  try {
    const page = await getPage({slug: 'main'});
    return json({page});
  } catch (error) {
    throw new Error('Not found');
  }
}

export default function Main() {
  const data = useLoaderData<typeof loader>();

  return <PageWrapper page={data.page} />;
}
