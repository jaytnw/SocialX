
import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { ApiResponse } from '../models/ApiResponse';

export class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.postService.getAllPosts();
            if (!posts) {
                const response = new ApiResponse('Failed to fetch posts', 'error');
                res.status(500).json(response);
            } else {
                const response = new ApiResponse('Get all posts success', 'ok');
                response.data = posts;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            const response = new ApiResponse('Failed to fetch posts', 'error');
            res.status(500).json(response);
        }
    }


    async getPostById(req: Request, res: Response): Promise<void> {
        try {
            const postId = req.params.id;
            const post = await this.postService.getPostById(postId);
            if (!post) {
                const response = new ApiResponse('Post not found', 'error');
                res.status(404).json(response);
            } else {
                const response = new ApiResponse('Get post success', 'ok');
                response.data[0] = post;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            const response = new ApiResponse('Failed to fetch posts', 'error');
            res.status(500).json(response);
        }
    }

    async getPostsByTag(req: Request, res: Response): Promise<void> {
        try {
            const tagName: string[] = req.query.tagName?.toString().split(',') || [];
            console.log(tagName);
            const post = await this.postService.getPostsByTags(tagName);
            if (!post) {
                const response = new ApiResponse('Tag not found', 'error');
                res.status(404).json(response);
            } else {
                const response = new ApiResponse('Get post by tag success', 'ok');
                response.data = post;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
            const response = new ApiResponse('Failed to fetch posts', 'error');
            res.status(500).json(response);
        }
    }

    async searchPosts(req: Request, res: Response): Promise<void> {
        try {
            const keyword: string = req.query.keyword?.toString() || '';
            const sort: string = req.query.sort?.toString() || 'desc';
            const posts = await this.postService.searchPosts(keyword, sort);

            if (!posts) {
                const response = new ApiResponse('Tag not found', 'error');
                res.status(404).json(response);
            } else {
                const response = new ApiResponse('Search posts sucess', 'ok');
                response.data = posts;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error search posts:', error);
            const response = new ApiResponse('Failed to search posts', 'error');
            res.status(500).json(response);
        }
    }

    async searchPostsByTags(req: Request, res: Response): Promise<void> {
        try {
            const keyword: string = req.query.keyword?.toString() || '';
            const tagName: string[] = req.query.tagName?.toString().split(',') || [];
            const posts = await this.postService.searchPostsByTags(keyword, tagName);

            if (!posts) {
                const response = new ApiResponse('Tag not found', 'error');
                res.status(404).json(response);
            } else {
                const response = new ApiResponse('Search posts sucess', 'ok');
                response.data = posts;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error search posts:', error);
            const response = new ApiResponse('Failed to search posts', 'error');
            res.status(500).json(response);
        }
    }
}
