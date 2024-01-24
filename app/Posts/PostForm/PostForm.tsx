import { SerializeFrom } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { useState } from "react";
import { ValidatedForm } from "remix-validated-form";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { PostWithTags } from "~/service/post.server";
import FormInput from "~/ui/RemixValidatedForm/FormInput/FormInput";
import FormTextArea from "~/ui/RemixValidatedForm/FormTextArea/FormTextArea";
import { SubmitButton } from "~/ui/RemixValidatedForm/SubmitButton/SubmitButton";


export const postValidator = withZod(
	z.object({
		article: zfd.text(zfd.text(z.string().min(50, { message: "Must be 50 or more characters long " }).max(5000))),
		description: zfd.text(zfd.text(z.string().min(20, { message: "Must be 20 or more characters long " }).max(40))),
		title: zfd.text(zfd.text(z.string().min(3, { message: "Must be 3 or more characters long " }).max(20))),
		tags: zfd.text(z.string().min(3)),
	})
);


const PostForm = ({ post }: { post: SerializeFrom<PostWithTags> }) => {
	const [canSubmit, setCanSubmit] = useState<boolean>(post.tags ? true : false)

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("🚀 ~ handleOnChange ~ e.target.value:", e.target.value)

		e.target.value !== "" ? setCanSubmit(true) : setCanSubmit(false)
	}
	const defaultData = {
		title: post.title,
		description: post.description,
		article: post.article,
		tags: post.tags.map(tag => tag.slug).join(",")
	}
	return (
		<ValidatedForm validator={postValidator} defaultValues={defaultData} method="post" >
			<FormTextArea onChange={handleOnChange} name='tags' label='Tags' placeholder='Separate tags with commas' />
			<FormInput onChange={handleOnChange} label="Title" name="title" type="text" placeholder="Enter title hear" />
			<FormInput label="Description" name="description" type="text" placeholder="Enter description" />
			<FormTextArea label="Article" placeholder="Enter text hear" name="article" />
			<SubmitButton canSubmit={canSubmit} />
		</ValidatedForm>
	)
}

export default PostForm