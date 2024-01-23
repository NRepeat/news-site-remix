import { defer, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node"
import { Await, ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react"
import { Suspense } from "react"
import NewsEditor from "~/components/Admin/News/NewsEditor/NewsEditor"
import { getPostById, updatePost } from "~/service/post.server"


export async function action({ params, request }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()

		const postData = formData.get("postContent") as string
		const serializedPostData = JSON.stringify(postData)
		const post = await updatePost(4, { content: serializedPostData })
		return { post }

	} catch (error) {
		console.log("🚀 ~ action ~ error:", error)
		throw new Error("Bad request")
	}
}


export async function loader({ params }: LoaderFunctionArgs) {
	try {
		const post = getPostById(4)

		return defer({ post })

	} catch (error) {
		throw new Error("Bad request")
	}
}

let cache;
export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
	if (cache) {
		return { post: cache }
	}
	const loaderData = await serverLoader()
	const post = await loaderData.post
	console.log("🚀 ~ clientLoader ~ post:", post)
	cache = post
	console.log("🚀 ~ clientLoader ~ cache:", cache)
	return { post }
}
clientLoader.hydrate = true
export default function Edit() {
	const data = useLoaderData<typeof loader>()

	return (
		<Suspense fallback={<div>Loading</div>}>
			<Await resolve={data.post}>
				{post => <NewsEditor post={post} />}
			</Await>
		</Suspense>
	);
}