import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import PageWrapper from '~/components/PageWrapper/PageWrapper';
import {getPage} from '~/service/page.server';
import {getPostById} from '~/service/post.server';

export async function loader() {
  try {
    const page = await getPage({slug: 'main'});
    const post = await getPostById(4);
    console.log('🚀 ~ loader ~ post:', post);
    return json({page, post});
  } catch (error) {
    throw new Error('Not found');
  }
}

export default function Main() {
  const data = useLoaderData<typeof loader>();

  return <PageWrapper page={data.page} post={data.post} />;
}
