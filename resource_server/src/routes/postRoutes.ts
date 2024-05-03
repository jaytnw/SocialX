import express from 'express';
import { PostController } from '../controllers/PostController';
import { PostService } from '../services/PostService';

const postRouter = express.Router();


const postService = new PostService();
const postController = new PostController(postService);


postRouter.get('/', postController.getAllPosts.bind(postController));
postRouter.get('/search', postController.searchPosts.bind(postController));
postRouter.get('/tags', postController.getPostsByTag.bind(postController)); 
postRouter.get('/searchByTag', postController.searchPostsByTag.bind(postController));
postRouter.get('/:id', postController.getPostById.bind(postController));




export default postRouter;
