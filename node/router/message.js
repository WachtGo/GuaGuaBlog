const express = require('express')
const router = express.Router()
const { messageDB } = require('../module/mongoDB/model')//操作数据库

const { auth } = require('../module/plugin/token')

const { getBoardUsers } = require('../module/method/message')

//获取所有用户的昵称和id
router.get('/getBoardUsers', async (req, res) => {
    const users = await getBoardUsers()
    res.send({ status: true, msg: '获取成功', data: users })
})


//获取留言信息--由于只开放了个人，所以写死用户id直接获取的自己的留言
router.get('/getMessages', (req, res) => {
    if (!req.query.id) return;
    messageDB.find({ user: req.query.id }, { user: 0 }).then(response => {
        // console.log('getMessages------', response)
        res.send(
            { data: response }
        )
    }).catch(error => { })
})
//写留言，这个无需登录，游客也可以随意留言
router.post('/writeMessage', auth, (req, res) => {
    if (req.body.content === '' || req.body.createTime === '') {
        res.send({
            msg: '留言和大名都不能为空',
        })
        return
    }
   
    if(!req.body.id) return res.send({status:false,msg:'未获取到留板主人id'});
    messageDB.create({
        content: req.body.content,
        writer: req.body.writer,
        createTime: req.body.createTime,
        user: req.body.id
    }).then(response => {
        res.send({ status:true,msg:'留言成功' })
    }).catch(err => { })

})
//删除留言--这个需要登录，不然谁都能乱删
router.post('/deleteMessage', auth, (req, res) => {
    if (!req.user) return res.send({ status: false, msg: '需要登录' })
    messageDB.findByIdAndDelete({ _id: req.body._id }).then(response => {
        res.send({ status: true, msg: '删除成功' })
    }).catch(error => { res.send({ msg: '留言不存在' }) })
})


module.exports = router