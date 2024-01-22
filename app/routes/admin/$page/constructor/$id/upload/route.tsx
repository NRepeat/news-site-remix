import {
  ActionFunctionArgs,
  json,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { updateElement } from '~/service/element.server';

export async function action({ request, params }: ActionFunctionArgs) {
  try {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: 'public/uploads',
        maxPartSize: 50000000,
        file: ({ filename }) => filename,
      }),
      unstable_createMemoryUploadHandler()
    );
    const formData = await unstable_parseMultipartFormData(
      request,
      uploadHandler
    );
    const files: FormDataEntryValue[] = [];
    formData.forEach(value => files.push(value));

    const serializedFiles = JSON.stringify(files);
    const id = params.id
    const slug = params.page
    if (!id || !slug) throw new Error('Not found');
    await updateElement({ content: serializedFiles, id, slug });
    return json({ serializedFiles });


  } catch (error) {
    console.log("🚀 ~ action ~ error:", error)
    throw new Error("Bad request")
  }
}

