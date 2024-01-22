import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {getPage, getPageContent, updatePageContent} from './page.server';

export const getElement = async ({id, slug}: {id: string; slug: string}) => {
  try {
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');

    const content: PageBlockInstance[] = JSON.parse(page.content);
    const element = content.find(el => el.id === id);
    if (!element) throw new Error('Not found');
    return element;
  } catch (error) {
    throw new Error('Not found');
  }
};

export const updateElement = async ({
  id,
  content,
  slug,
}: {
  slug: string;
  id: string;
  content: string;
}) => {
  try {
    const element = await getElement({id, slug});
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');
    const pageContent: PageBlockInstance[] = JSON.parse(page.content);

    const elementIndex = pageContent.findIndex(el => el.id === id);
    pageContent;
    const newElement = {
      ...element,
      additionalProperties: {
        ...element.additionalProperties,
        content: content,
      },
    };

    await updatePageContent({content: newElement, index: elementIndex, slug});
  } catch (error) {
    console.error(error);
  }
};

export const removeElement = async ({id, slug}: {id: string; slug: string}) => {
  try {
    const content = await getPageContent({slug});
    if (!content) throw new Error('not found');

    let parsedContent = JSON.parse(content.content) as PageBlockInstance[];
    parsedContent = parsedContent.filter(el => el.id !== id);

    await prisma.page.update({
      where: {slug},
      data: {content: JSON.stringify(parsedContent)},
    });
  } catch (error) {
    console.log('🚀 ~ removeElement ~ error:', error);
    throw new Error('Not found');
  }
};
