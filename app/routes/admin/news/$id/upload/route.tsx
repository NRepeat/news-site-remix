import {
  ActionFunctionArgs,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';

export async function action({request, params}: ActionFunctionArgs) {
  try {
    const uploadHandler = unstable_composeUploadHandlers(
      unstable_createFileUploadHandler({
        directory: 'public/uploads',
        maxPartSize: 50000000,
        file: ({filename}) => filename,
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
    console.log('🚀 ~ action ~ serializedFiles:', serializedFiles);
    const id = params.id;
    if (!id) throw new Error('Not found');
    // await updateElement({ content: serializedFiles, id, slug });
    return redirect('/admin/news/');
  } catch (error) {
    console.log('🚀 ~ action ~ error:', error);
    throw new Error('Bad request');
  }
}
