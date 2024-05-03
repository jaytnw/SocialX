
import { Request, Response } from 'express';
import { TagService } from '../services/TagService';
import { ApiResponse } from '../models/ApiResponse';

export class TagController {
    private tagService: TagService;

    constructor(tagService: TagService) {
        this.tagService = tagService;
    }

    

    async getAllTags(req: Request, res: Response): Promise<void> {
        try {
           
            const tags = await this.tagService.getAllTags();
            if (!tags) {
                const response = new ApiResponse('Failed to fetch tags', 'error');
                res.status(500).json(response);
            } else {
                const response = new ApiResponse('Get all tags success', 'ok');
                response.data = tags;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
            const response = new ApiResponse('Failed to fetch tags', 'error');
            res.status(500).json(response);
        }
    }

    
}
