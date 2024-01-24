import { Tags } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import FormTextArea from '~/ui/RemixValidatedForm/FormTextArea/FormTextArea'


export const tagValidator = withZod(z.object({
	tags: zfd.text(z.string().min(3)),
}))

const TagForm = ({ tags, id }: { id: number, tags: SerializeFrom<Tags[]> }) => {
	const defaultValue = {
		tags: tags.map(tag => tag.slug).join(",")
	}
	return (
		<ValidatedForm defaultValues={defaultValue} action={`/admin/posts/post/${id}/edit/tags/edit`} validator={tagValidator} method='post'>
			<FormTextArea name='tags' label='Tags' placeholder='Separate tags with commas' />
		</ValidatedForm>
	)
}

export default TagForm