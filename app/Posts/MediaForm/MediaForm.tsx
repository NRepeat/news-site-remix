import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm } from 'remix-validated-form';
import { z } from "zod";
import { zfd } from "zod-form-data";
import FormInput from '~/ui/RemixValidatedForm/FormInput/FormInput';
import { SubmitButton } from "~/ui/RemixValidatedForm/SubmitButton/SubmitButton";


export type MediaType = "postThumbnail" | "postImage"
type MediaFormType = {
	action: string,
	type: MediaType
	label: string
}


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const mediaValidator = withZod(
	z.object({
		file: zfd.file().refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`).refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		),
		type: zfd.text()
	})
);

const MediaForm = ({ action, type, label }: MediaFormType) => {
	return (
		<ValidatedForm validator={mediaValidator} encType="multipart/form-data" action={action} method="post">
			<label htmlFor="file">{label}</label>
			<FormInput name='file' type='file' />
			<FormInput name="type" type="hidden" value={type} />
			<SubmitButton canSubmit />
		</ValidatedForm>
	)
}

export default MediaForm