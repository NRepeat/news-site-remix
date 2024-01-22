import {redirect, type ActionFunctionArgs} from '@remix-run/node';
import {removeElement} from '~/service/element.server';
export async function action({request, params}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const slug = params.slug;
    if (!slug || !id) throw new Error('not found');
    await removeElement({id, slug});
    return redirect(`/admin/${slug}/constructor/`);
  } catch (error) {
    throw new Error('Bad request');
  }
}
