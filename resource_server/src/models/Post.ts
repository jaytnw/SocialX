
export interface Post {
    id: number;
    userId: string | null; 
    title: string;
    content: string;
    postedAt: Date;
    postedBy: string;
    tags: string[];
}
