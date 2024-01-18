import PageConstructor from '~/components/PageConstructor/PageConstructor';

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {Outlet, json, useLoaderData} from '@remix-run/react';
import {getPage, updatePage} from '~/service/page.server';
export async function action({request}: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const stringifyElements = formData.get('stringifyElements');
    if (!stringifyElements) {
      throw new Error('Bad request');
    }
    const page = await updatePage({
      slug: 'main',
      jsonContent: stringifyElements.toString(),
    });

    return json({page});
  } catch (error) {
    throw new Error('Bad request');
  }
}

export async function loader({params}: LoaderFunctionArgs) {
  try {
    const slug = params.page;
    if (!slug) throw new Error('Not found');
    const page = await getPage({slug});
    return json({page});
  } catch (error) {
    throw new Error('Bad request');
  }
}

export default function Constructor() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <PageConstructor page={data.page} />
      <Outlet context={data.page} />
    </>
  );
}
