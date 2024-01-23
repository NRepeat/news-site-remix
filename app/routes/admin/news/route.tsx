import {Await, defer, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import NewsList from '~/components/Admin/News/NewsList/NewsList';
import {getAllPosts} from '~/service/post.server';

export async function loader() {
  const posts = getAllPosts();

  return defer({posts});
}

export default function News() {
  const data = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Await resolve={data.posts}>
        {posts => {
          if (!posts) throw new Error('Post not found');
          return <NewsList posts={posts} />;
        }}
      </Await>
    </Suspense>
  );
}
