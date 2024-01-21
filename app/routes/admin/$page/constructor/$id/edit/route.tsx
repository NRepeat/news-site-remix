import type {LoaderFunctionArgs} from '@remix-run/node';
import {json, useLoaderData} from '@remix-run/react';
import PropertiesBar from '~/components/Admin/PropertiesBar/PropertiesBar';
import {getElement} from '~/service/element.server';

export async function loader({params}: LoaderFunctionArgs) {
  console.log('🚀 ~ loader ~ params :', params);
  try {
    const elementId = params.id;
    const slug = params.page;
    if (!elementId || !slug) throw new Error('Not found');

    const element = await getElement({slug, id: elementId});
    return json({element});
  } catch (error) {
    console.log('🚀 ~ loader ~ error:', error);
    throw new Error('Bad request');
  }
}
export default function Edit() {
  const data = useLoaderData<typeof loader>();

  return <PropertiesBar element={data.element} />;
}
