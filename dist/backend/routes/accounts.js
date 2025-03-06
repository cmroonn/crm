import express from 'express';
import AccountsController from '../controllers/Accounts.js';
const router = new express.Router();
router.get('/getall/:employee_id([0-9]+)', AccountsController.getAll);
router.post('/save', AccountsController.saveData);
export default router;
