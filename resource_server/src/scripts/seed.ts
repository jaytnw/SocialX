import { PrismaClient } from '@prisma/client';
import jsonData from '../../posted.json';
import prisma from '../services/Database';

async function main() {
    for (const post of Object.values(jsonData)) {
        const { title, content, postedAt, postedBy, tags } = post;

        console.log("seed ===>>> ",title)
  
        await prisma.post.create({
            data: {
                title,
                content,
                postedAt: new Date(postedAt),
                postedBy,
                tags: {
                    create: tags.map((tag: string) => ({
                        tag: { 
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag }
                            }
                        }
                    })),
                },
            },
        });
    }
}
  
  main()
    .catch((e) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });