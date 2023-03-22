const express = require('express')
const router = express.Router()

const sendMail = require('../module/plugin/email')//发送邮箱

//发送邮箱
router.post('/sendMail', async (req, res) => {
    let info = {
        username: req.body.username,
        email: req.body.email,
        theme: req.body.theme,
        emailInfo: req.body.emailInfo,
    }
    // console.log('发送邮箱res---', res)
    sendMail(info, res)
})


module.exports = router