import { Post } from '../models/Post';
import prisma from './Database';

export class TagService {

    
  async getAllTags(): Promise<string[]> {
    try {
        const tags = await prisma.tag.findMany({
            select: {
                name: true
            }
        });

        return tags.map(tag => tag.name);
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags');
    }
}
  
    

  

   
}
