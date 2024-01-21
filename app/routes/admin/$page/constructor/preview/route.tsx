import {Page} from '@prisma/client';
import {Link, useOutletContext} from '@remix-run/react';
import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import PreviewPage from '~/components/PreviewPage/PreviewPage';

export default function Preview() {
  const data: Page = useOutletContext();
  const pageContent: PageBlockInstance[] = JSON.parse(data.content);

  return (
    <>
      <PreviewPage pageContent={pageContent} />
      {!pageContent && (
        <div>
          No Blocks on Page{' '}
          <Link to={`/${data.slug}/constructor`}>Back to constructor</Link>{' '}
        </div>
      )}
    </>
  );
}
