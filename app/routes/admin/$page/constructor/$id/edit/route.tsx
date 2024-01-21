import type {ActionFunctionArgs, LoaderFunctionArgs} from '@remix-run/node';
import {Await, useLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import PropertiesBar from '~/components/Admin/PropertiesBar/PropertiesBar';
import {getElement, updateElement} from '~/service/element.server';
import {defer} from '@remix-run/node';
import PropertiesBarSkeleton from '~/components/Admin/PropertiesBar/PropertiesBarSkeleton/PropertiesBarSkeleton';
import {contentValidator} from '~/components/TextEditors/TextEditor';
import {z} from 'zod';
import {getPage} from '~/service/page.server';
export async function loader({params}: LoaderFunctionArgs) {
  try {
    const elementId = params.id;
    const slug = params.page;
    if (!elementId || !slug) throw new Error('Not found');
    const page = await getPage({slug});
    const element = getElement({slug, id: elementId});
    if (!page) throw new Error('Not found ');
    return defer({element, page});
  } catch (error) {
    console.log('🚀 ~ loader ~ error:', error);
    throw new Error('Bad request');
  }
}

export async function action({params, request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const slug = params.page;
    const id = z.string().parse(formData.get('id'));
    const type = formData.get('type');
    if (!slug || !id) throw new Error('Not found');
    if (type === 'textEditor') {
      const content = contentValidator.parse(formData.get('content'));
      await updateElement({content, id, slug});
      return {};
    }
    return {};
  } catch (error) {
    throw new Error('Not found');
  }
}

export default function Edit() {
  const data = useLoaderData<typeof loader>();

  return (
    <Suspense fallback={<PropertiesBarSkeleton />}>
      <Await resolve={data.element}>
        {element => <PropertiesBar element={element} page={data.page} />}
      </Await>
    </Suspense>
  );
}
