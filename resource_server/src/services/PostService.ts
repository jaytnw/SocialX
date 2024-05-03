import { Post } from '../models/Post';
import prisma from './Database';

export class PostService {

    private async mapPost(postData: any): Promise<Post> {
        const tags = await Promise.all(postData.tags.map(async (tag: any) => {
            const tagData = await prisma.tag.findUnique({
                where: { id: tag.tagId },
            });
            return tagData ? tagData.name : null;
        }));

        return {
            id: postData.id,
            userId: postData.userId,
            title: postData.title,
            content: postData.content,
            postedAt: postData.postedAt,
            postedBy: postData.postedBy,
            tags: tags.filter((tag: string | null) => tag !== null),
        };
    }

    async getAllPosts(): Promise<Post[]> {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    tags: true,
                },
            });
            
            return Promise.all(posts.map(this.mapPost));
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    }


    async getPostById(id: string): Promise<Post | null> {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: parseInt(id),
                },
                include: {
                    tags: true,
                },
            });
            return post ? this.mapPost(post) : null;
        } catch (error) {
            console.error(`Error fetching post with ID ${id}:`, error);
            throw new Error('Failed to fetch post');
        }
    }



    async getPostsByTags(tagNames: string[]): Promise<Post[]> {
        try {
          const posts = await prisma.post.findMany({
            where: {
              tags: {
                every: {
                  tag: {
                    name: {
                      in: tagNames,
                    },
                  },
                },
              },
            },
            include: {
              tags: true,
            },
          });
      
        //   console.log(posts);
          return Promise.all(posts.map(this.mapPost));
        } catch (error) {
          throw new Error('Failed to fetch posts by tags');
        }
      }

    async searchPosts(keyword: string, sort: string = "desc"): Promise<Post[]> {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    OR: [
                        { title: { contains: keyword } },
                        { content: { contains: keyword } },
                    ],
                },
                include: {
                    tags: true,
                },
                orderBy: {
                    postedAt: sort.toLowerCase() as 'asc' | 'desc' 
                }
            });
    
            return Promise.all(posts.map(this.mapPost));
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to search posts');
        }
    }

    async searchPostsByTags(keyword: string, tagName: string[]): Promise<Post[]> {
        try {
          const posts = await prisma.post.findMany({
            where: {
              OR: [
                { title: { contains: keyword } },
                { content: { contains: keyword } },
                {
                  tags: {
                    some: {
                      tag: {
                        name: {
                          in: tagName,
                        },
                      },
                    },
                  },
                },
              ],
            },
            include: {
              tags: true,
            },
          });
      
          return Promise.all(posts.map(this.mapPost));
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw new Error('Failed to search posts');
        }
      }
    

  

   
}
