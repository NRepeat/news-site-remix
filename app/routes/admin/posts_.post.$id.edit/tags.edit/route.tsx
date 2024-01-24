import { redirect, type ActionFunctionArgs } from "@remix-run/node"
import { validationError } from "remix-validated-form"
import { tagValidator } from "~/Tag/TagForm/TagForm"
import { zodNumberValidate } from "../route"

export async function action({ params, request }: ActionFunctionArgs) {
	try {
		const formData = await request.formData()
		const validatedFormData = await tagValidator.validate(formData)
		if (validatedFormData.error) {
			return validationError({
				fieldErrors: {
					tags: "Tags not valid"
				}
			})
		}
		if (!params.id) throw new Error("Not found")
		const id = zodNumberValidate(params.id)
		const { tags } = validatedFormData.data
		// const tagArr: string[] = tags.split(",").map((tag) => tag.trim());

		return redirect(`/admin/posts/post/${id}/edit`)
	} catch (error) {
		console.log("🚀 ~ action ~ error:", error)
		throw new Error("Tags action error")
	}

}