import {prisma} from '~/utils/prisma.server';

export const getAllTags = async () => {
  try {
    const tags = await prisma.tags.findMany();
    return tags;
  } catch (error) {
    throw new Error('Tags not found');
  }
};

export const getTagById = async (id: number) => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {id},
    });
    if (!tag) {
      throw new Error('Tag not found');
    }
    return tag;
  } catch (error) {
    throw new Error('Error getting tag by ID');
  }
};

export const getTagBySlug = async (slug: string) => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {slug},
    });

    return tag;
  } catch (error) {
    throw new Error('Error getting tag by slug');
  }
};

export const updateTag = async (
  id: number,
  data: {name?: string; slug?: string}
) => {
  try {
    const updatedTag = await prisma.tags.update({
      where: {id},
      data,
    });
    return updatedTag;
  } catch (error) {
    throw new Error('Error updating tag');
  }
};

export const deleteTag = async (id: number) => {
  try {
    const deletedTag = await prisma.tags.delete({
      where: {id},
    });
    return deletedTag;
  } catch (error) {
    throw new Error('Error deleting tag');
  }
};

export const createTag = async (
  postId: number,
  data: {
    name: string;
    slug: string;
  }[]
) => {
  try {
    const tags = await Promise.all(
      data.map(async tag => {
        const existTag = await getTagBySlug(tag.slug);

        if (!existTag) {
          const newTag = await prisma.tags.create({
            data: {
              name: tag.name,
              slug: tag.slug,
              post: {connect: {id: postId}},
            },
          });
          return newTag;
        }
        return existTag;
      })
    );

    return tags;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    throw new Error('Error creating/updating/deleting tag');
  }
};

export const getAllPageTags = async (id: number) => {
  try {
    const tags = await prisma.tags.findMany({
      where: {postId: id},
    });
    return tags;
  } catch (error) {
    console.log('🚀 ~ getAllPageTags ~ error:', error);
    throw new Error('Error creating/updating/deleting tag');
  }
};
