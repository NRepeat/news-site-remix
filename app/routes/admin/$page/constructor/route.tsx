import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {Outlet, json, useLoaderData} from '@remix-run/react';
import {getPage, removeElement, updatePageContent} from '~/service/page.server';
import ConstructorLayout from '~/Layout/ConstructorLayout/ConstructorLayout';
export async function action({request, params}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const pageSlug = params.page;
    if (!pageSlug) throw new Error('Not found');
    const newElement = formData.get('newElement') as string;
    const index = formData.get('index') as string;
    const id = formData.get('id') as string;
    const type = formData.get('type') as string;

    if (type === 'addElement') {
      if (!newElement) throw new Error('Bad request');

      await updatePageContent({
        index: parseInt(index),
        slug: pageSlug,
        content: newElement,
      });
      return json({success: true});
    }
    if (type === 'removeElement') {
      await removeElement({id, slug: 'main'});
      return json({success: true});
    }
    return json({success: true});
  } catch (error) {
    console.log('🚀 ~ action ~ error:', error);
    throw new Error('Bad request');
  }
}

export async function loader({params}: LoaderFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');
    return json({page});
  } catch (error) {
    throw new Error('Bad request');
  }
}

export default function Constructor() {
  const data = useLoaderData<typeof loader>();

  return (
    <ConstructorLayout page={data.page}>
      <Outlet />
    </ConstructorLayout>
  );
}
