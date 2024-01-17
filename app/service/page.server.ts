import {prisma} from '~/utils/prisma.server';

export const createPage = async ({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) => {
  try {
    await prisma.page.create({data: {name, slug}});
  } catch (error) {
    throw new Error('Bad request');
  }
};

export const updatePage = async ({
  slug,
  jsonContent,
}: {
  slug: string;
  jsonContent: string;
}) => {
  console.log('🚀 ~ jsonContent:', jsonContent);
  try {
    return await prisma.page.update({
      where: {slug},
      data: {
        content: jsonContent,
      },
      select: {content: true, slug: true},
    });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    throw new Error('bad request');
  }
};

export const getPage = async ({slug}: {slug: string}) => {
  console.log('🚀 ~ getPage ~ slug:', slug);
  try {
    const page = await prisma.page.findUnique({
      where: {slug},
    });
    console.log('🚀 ~ getPage ~ page:', page);
    return page;
  } catch (error) {
    throw new Error('bad request');
  }
};
