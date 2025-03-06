import express from 'express'
import ReportsController from '../controllers/Reports.js';
const router = new express.Router()


router.post('/getall', ReportsController.getAll)
router.post('/save', ReportsController.saveData)
router.post('/update', ReportsController.updateData)

export default router