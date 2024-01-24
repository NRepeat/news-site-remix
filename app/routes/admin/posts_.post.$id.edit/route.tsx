import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import MediaForm from "~/Posts/MediaForm/MediaForm";
import PostForm, { postValidator } from "~/Posts/PostForm/PostForm";
import { getPostById, updatePost } from "~/service/post.server";
import { createTag } from "~/service/tag.server";

export const zodNumberValidate = (data: string | number) => z.coerce.number().parse(data)


export async function action({ params, request }: ActionFunctionArgs) {
	if (!params.id) throw new Error("Not found")
	const id = zodNumberValidate(params.id)
	const formData = await request.formData()
	const validatedFormData = await postValidator.validate(formData)
	console.log("🚀 ~ action ~ validatedFormData:", validatedFormData)
	if (validatedFormData.error) {
		return validationError({
			fieldErrors: {
				article: "Something went wrong"
			}
		})
	}
	const { article, description, title, tags } = validatedFormData.data
	const updatedPost = await updatePost(id, { article: article, description, title })
	const tagArr: { name: string, slug: string }[] = tags.split(",").map((tag) => {
		return { name: tag, slug: tag }
	});
	console.log("🚀 ~ consttagArr:{name:string,slug:string}[]=tags.split ~ tagArr:", tagArr)
	await createTag(id, tagArr)
	return json({ updatedPost })
}

export async function loader({ params }: LoaderFunctionArgs) {
	try {
		if (!params.id) throw new Error("Not found")
		const id = zodNumberValidate(params.id)
		const post = await getPostById(id)
		if (!post) throw new Error("Not found")
		return json({ id, post })

	} catch (error) {
		throw new Error("Loader error")
	}
}

export default function PostEditRoute() {
	const { post } = useLoaderData<typeof loader>()
	return (
		<div>
			<MediaForm label="Post thumbnail" type="postThumbnail" action={`/admin/posts/post/${post.id}/edit/upload`} />
			<MediaForm label="Post image" type="postImage" action={`/admin/posts/post/${post.id}/edit/upload`} />
			<PostForm post={post} />
		</div>
	);
}