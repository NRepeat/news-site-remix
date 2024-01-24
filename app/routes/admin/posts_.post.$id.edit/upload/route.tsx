import { ActionFunctionArgs, redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { MediaType } from "~/Posts/MediaForm/MediaForm";
import { updatePost } from "~/service/post.server";
import { zodNumberValidate } from "../route";




export async function action({ params, request }: ActionFunctionArgs) {
	console.log("🚀 ~ action ~ request:", request)
	if (!params.id) throw new Error("Not found")
	const uploadHandler = unstable_composeUploadHandlers(
		unstable_createFileUploadHandler({
			directory: 'public/uploads',
			maxPartSize: 50000000,
			file: ({ filename }) => filename,
		}),
		unstable_createMemoryUploadHandler()
	);
	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	);
	const { name } = formData.get("file") as File
	console.log("🚀 ~ action ~ name:", name)

	const formDataType = formData.get("type") as MediaType
	const id = zodNumberValidate(params.id)

	if (formDataType === "postThumbnail") {
		await updatePost(id, { thumbnail: name })
		return redirect(`/admin/posts/post/${id}/edit`)
	}
	if (formDataType === "postImage") {
		await updatePost(id, { image: name })
		return redirect(`/admin/posts/post/${id}/edit`)
	}
	return redirect(`/admin/posts/post/${id}/edit`)
}



