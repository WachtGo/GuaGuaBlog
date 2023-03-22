const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const { userDB } = require('../module/mongoDB/model')//操作数据库
const upload = require('../module/plugin/multer')//接收文件和储存文件
const multer = require('multer')
const { auth } = require('../module/plugin/token')
const { response } = require('express')
const {getUserInfo} = require('../module/method/user')


// 修改资料
router.post('/modifyData', auth, async (req, res) => {
    if (!req.user) return res.send({ status: false, msg: "需要登录" })
    console.log('修改资料',req.body)
    userDB.findByIdAndUpdate({ _id: req.user.id }, req.body).then(async resp => {
        const userInfo =await getUserInfo(req.user.id)
        console.log('修改资料返回---',userInfo)
         res.send({ status: true, msg: '修改成功', data: {
            ...userInfo._doc,messageCount:userInfo.messageCount
         } })
    }).catch(erro => {
        res.send({ status: false, msg: '修改失败' })
    })
})

//用于前端上传头像的地址,这里会创建一个图片，需要点击确认修改
router.post('/uploadImage', upload, async (req, res) => {
    console.log('uploadImage1',req.file)
    upload(req, res, async function (err) {
        console.log('uploadImage2',req.file)
        let avatar = 'http://116.62.23.57/userImg/' + req.file.filename // 获取图片的地址
        res.send({ status: true, data: avatar })
    })
})

//在上传头像成功之后，前端再发送请求修改数据库头像（这里请求完成后才能更改成功）
router.post('/updateAvatar', auth, async (req, res) => {
    if (!req.user) return res.send({ status: false, msg: '需要登录' })
    userDB.findById({ _id: req.user.id }, { avatar: 1 }).then(async resp => {
        // console.log(resp)
        // console.log(req.body)
        // console.log(resp.avatar.split('3000')[1])
        if(resp.avatar.split('userImg/')[1] !== 'default6666666.png'){//不能把初始图也删了
            await fs.unlink(path.resolve(__dirname, "../public" + resp.avatar.split('57')[1]), (err) => { })
        } 
        await userDB.findByIdAndUpdate({ _id: req.user.id }, req.body).then(async respo => {
             const userInfo =await getUserInfo(req.user.id)
            console.log('头像更换返回---',userInfo)
            res.send({ status: true, msg: '头像更换成功', data: {
            ...userInfo._doc,messageCount:userInfo.messageCount
         }})
        }).catch(err => { })
    }).catch(err => { })
})



module.exports = router