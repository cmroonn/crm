import express from 'express'

import source from './source.js'
import accounts from './accounts.js'
import schedule from './schedule.js'
import reports from './reports.js'

const router = new express.Router()

router.use('/source', source)
router.use('/accounts', accounts)
router.use('/schedule', schedule)
router.use('/reports', reports)

export default router