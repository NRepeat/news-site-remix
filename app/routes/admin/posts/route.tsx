import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import Posts from "~/Posts/Posts";
import { getAllPosts } from "~/service/post.server";


export async function loader() {
	const posts = getAllPosts();

	return defer({ posts });
}

export default function PostsRoute() {
	const data = useLoaderData<typeof loader>();
	return (
		<Suspense fallback={<div>Loading</div>}>
			<Await resolve={data.posts}>
				{posts => {
					if (!posts) throw new Error('Post not found');
					return <Posts posts={posts} />;
				}}
			</Await>
		</Suspense>
	);
}