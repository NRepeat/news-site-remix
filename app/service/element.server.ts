import {PageBlockInstance} from '~/components/PageConstructorBlocks/PageConstructorBlocks';
import {getPage} from './page.server';

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
