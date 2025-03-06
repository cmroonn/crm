import express from 'express';
import SourceController from '../controllers/Source.js';
const router = new express.Router();
router.get('/getall', SourceController.getAll);
export default router;
