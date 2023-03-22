const express = require('express')
const router = express.Router()
const { userDB } = require('../module/mongoDB/model')//操作数据库
const svgCaptcha = require('../module/plugin/svgCaptcha')//获取图片验证码
const { jsonwebtoken, bcrypt, SECRET, auth } = require('../module/plugin/token')
const { getUserInfo } = require('../module/method/user')

//获取验证码
router.get('/getCaptcha', async (req, res) => {
    // console.log('svgcaptrue----', svgCaptcha)
    res.send({
        data: svgCaptcha()
    });
})

//未登录时，网站显示的root账户
router.get('/root', async (req, res) => {
    let id = '6411871200aeb8f6dd21b78f'
    const userinfo = await getUserInfo(id)
    console.log('root--',userinfo)
    res.send({ status: true, msg: 'root', data: {
        ...userinfo._doc,messageCount:userinfo.messageCount
    } })
})

//登录
router.post('/login', async (req, res) => {
    // res.send('登录')
    // console.log(req.body)
    const user = await userDB.findOne({ username: req.body.username })
    // console.log(user)
    if (!user) {
        res.send({ msg: '用户名不存在' })
        return
    }
    //判断明文和密文是否一致
    const isPassword = bcrypt.compareSync(req.body.password, user.password)
    if (isPassword) {//密码一致
        const token = jsonwebtoken.sign({
            id: String(user._id),//只能用字符串类型
        }, SECRET)
        // TOKEN = token
        // console.log('token---', token)
        const userinfo = await getUserInfo(user._id)
        res.send({
            status: true,
            msg: '登录成功',
            data: {
                ...userinfo._doc,
                messageCount:userinfo.messageCount
            },
            token
        })
    } else {
        res.send({ status: false, msg: '密码错误' })
    }

})

//注册
router.post('/register', async (req, res) => {
    // console.log(req.body)
    const user = await userDB.findOne({ username: req.body.username })
    // console.log(user)
    if (user) {
        res.send({ msg: '用户名已存在' })
        return
    }
    let createuser = {
        nickname: req.body.nickname,
        username: req.body.username,
        password: req.body.password,
        signature: req.body.signature
    }
    const data = await userDB.create(createuser)
    if (data) {
        res.send({
            status: true,
            msg: '注册成功',
            username: data.username,
        })
    } else {
        res.send({ status: false, msg: '注册失败' })
    }
})



module.exports = router