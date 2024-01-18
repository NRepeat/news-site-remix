import {
  unstable_createFileUploadHandler,
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
  redirect,
} from '@remix-run/node';
export async function action({request}: ActionFunctionArgs) {
  try {
    const handler = unstable_createFileUploadHandler({
      directory: `${process.cwd()}/public/uploads`,
      file: ({filename}) => filename,
      maxPartSize: 50000000000,
    });
    await unstable_parseMultipartFormData(request, handler);

    return redirect('/main/constructor');
  } catch (error) {
    throw new Error('Bad request');
  }
}
