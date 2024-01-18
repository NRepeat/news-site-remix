import {Page} from '@prisma/client';
import {SerializeFrom} from '@remix-run/node';
import {
  PageBlockInstance,
  PageBlocks,
} from '../PageConstructorBlocks/PageConstructorBlocks';

const PageWrapper = ({page}: {page: SerializeFrom<Page> | null}) => {
  if (!page) throw new Error('Page not found');
  const content = '<div>Not found</div>';
  if (page.content) {
    const parsedContent = JSON.parse(page.content);
    const prevComp = parsedContent.map((el: PageBlockInstance) => {
      const PreviewComponent = PageBlocks[el.type].previewComponent;
      return <PreviewComponent key={el.id} elementInstance={el} />;
    });
    return (
      <>
        <div dangerouslySetInnerHTML={{__html: content}} />
        {prevComp}
      </>
    );
  }
  return <div dangerouslySetInnerHTML={{__html: content}} />;
};

export default PageWrapper;
