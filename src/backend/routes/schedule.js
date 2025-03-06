import express from 'express'
import ScheduleController from '../controllers/Schedule.js';
const router = new express.Router()


router.post('/getall', ScheduleController.getAll)
router.post('/save', ScheduleController.saveData)
router.post('/update', ScheduleController.updateData)

export default router