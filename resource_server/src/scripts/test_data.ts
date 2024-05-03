import prisma from '../services/Database';

async function main() {
    const posts = await prisma.post.findMany({
        include: {
            tags: true,
        },
    });



    console.log(posts);


}
main() 
