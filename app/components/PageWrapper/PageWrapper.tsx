import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import parse from 'html-react-parser';
import {PostWithTags} from '~/service/post.server';
import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';
const PageWrapper = ({
  page,
  post,
}: {
  post: SerializeFrom<PostWithTags | null>;
  page: SerializeFrom<Page> | null;
}) => {
  const postP = JSON.parse(post!.content);

  if (!page) throw new Error('Page not found');
  const parsedContent = JSON.parse(page.content);
  const prevComp = parsedContent.map((el: PageBlockInstance) => {
    const PreviewComponent = PageBlocks[el.type].previewComponent;
    return <PreviewComponent key={el.id} elementInstance={el} />;
  });
  const content = parse(postP);
  return (
    <>
      {prevComp}
      {content}
    </>
  );
};

export default PageWrapper;
