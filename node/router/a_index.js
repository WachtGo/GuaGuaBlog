const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/about', require('./about'))
router.use('/link', require('./link'))
router.use('/message', require('./message'))
router.use('/modify', require('./modify'))

// 导出router 
module.exports = router