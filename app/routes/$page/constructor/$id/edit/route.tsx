import type {LoaderFunctionArgs} from '@remix-run/node';
import {json, useLoaderData} from '@remix-run/react';
import Editor from '~/components/Editor/Editor';

export async function loader({params}: LoaderFunctionArgs) {
  try {
    const blockId = params.id;
    if (!blockId) throw new Error('Not found');
    return json({blockId});
  } catch (error) {
    throw new Error('Bad request');
  }
}
export default function Edit() {
  const data = useLoaderData<typeof loader>();

  return <Editor id={data.blockId} />;
}
