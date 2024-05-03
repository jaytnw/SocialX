import express from 'express';
import { TagController } from '../controllers/TagController';
import { TagService } from '../services/TagService';

const tagRouter = express.Router();


const tagService = new TagService();
const tagController = new TagController(tagService);


tagRouter.get('/', tagController.getAllTags.bind(tagController));





export default tagRouter;
