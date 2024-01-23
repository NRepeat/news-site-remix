import {prisma} from '~/utils/prisma.server';

type createPostType = {
  data: {slug: string; title: string; content: string; page: string};
};

export const getPostById = async (postId: number) => {
  try {
    const post = await prisma.post.findUnique({
      where: {id: postId},
    });
    return post;
  } catch (error) {
    throw new Error('Get post by ID error');
  }
};

export const getPostBySlug = async (postSlug: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {slug: postSlug},
    });
    return post;
  } catch (error) {
    throw new Error('Get post by slug error');
  }
};

export const updatePost = async (
  postId: number,
  updatedData: {title?: string; content?: string}
) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {id: postId},
      data: updatedData,
    });
    return updatedPost;
  } catch (error) {
    throw new Error('Update post error');
  }
};

export const deletePost = async (postId: number) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {id: postId},
    });
    return deletedPost;
  } catch (error) {
    throw new Error('Delete post error');
  }
};

export const createPost = async ({data}: createPostType) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        page: {connect: {slug: 'main'}},
      },
    });

    return post;
  } catch (error) {
    console.log('🚀 ~ createPost ~ error:', error);
    throw new Error('Create post error');
  }
};
