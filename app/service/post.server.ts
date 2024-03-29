import {Post, Tags} from '@prisma/client';
import {prisma} from '~/utils/prisma.server';

type createPostType = {
  data: {slug: string; title: string; content: string; page: string};
};
export type PostWithTags = Post & {tags: Tags[]};
export type GetAllPostsType = PostWithTags[];
type updatePostType = {
  title?: string;
  article?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
};
export const getAllPosts = async (): Promise<GetAllPostsType> => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        article: true,
        description: true,
        pageId: true,
        thumbnail: true,
        slug: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        tags: {
          select: {
            id: true,
            slug: true,
            name: true,
            postId: true,
          },
        },
      },
    });
    return posts;
  } catch (error) {
    throw new Error('Get post by ID error');
  }
};

export const getPostById = async (
  postId: number
): Promise<PostWithTags | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {id: postId},
      include: {tags: true},
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
  updatedData: updatePostType
) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {id: postId},
      data: updatedData,
    });
    return updatedPost;
  } catch (error) {
    console.log('🚀 ~ error:', error);
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
        article: data.content,
        page: {connect: {slug: 'main'}},
      },
    });

    return post;
  } catch (error) {
    console.log('🚀 ~ createPost ~ error:', error);
    throw new Error('Create post error');
  }
};
