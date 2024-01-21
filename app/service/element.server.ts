import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {getPage, updatePageContent} from './page.server';

export const getElement = async ({id, slug}: {id: string; slug: string}) => {
  try {
    const page = await getPage({slug});
    if (!page) throw new Error('Not found');

    const content: PageBlockInstance[] = JSON.parse(page.content);
    const element = content.find(el => el.id === id);
    if (!element) throw new Error('Not found');
    return element;
  } catch (error) {
    console.log('🚀 ~ getElement ~ error:', error);
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
