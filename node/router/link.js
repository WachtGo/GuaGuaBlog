const express = require('express')
const router = express.Router()
const { linkDB } = require('../module/mongoDB/model')//操作数据库

const { auth } = require('../module/plugin/token')


//获取友链-
router.get('/getlink', auth, (req, res) => {
    let userId = ''
    req.user ? userId = req.user.id : userId = '6411871200aeb8f6dd21b78f'//未登录则获取站主的留言板
    linkDB.find({ user: userId }, { user: 0 }).then(response => {
        res.send(
            { data: response }
        )
    }).catch(error => { })
})
//添加友链,需要登陆
router.post('/addlink', auth, (req, res) => {
    if (!req.user) { return res.send({ status: false, msg: '需要登录' }) }
    linkDB.create({
        linkname: req.body.linkname,
        linkurl: req.body.linkurl,
        user: req.user.id
    }).then(response => {
        res.send({ status: true, msg: '添加成功', data: response })
    }).catch(err => { res.send({ status: false, msg: '输入链接地址有误' }) })

})
//删除--这个需要登录，不然谁都能乱删
router.post('/deletelink', auth, (req, res) => {
    if (!req.user) { return res.send({ status: false, msg: '需要登录' }) }
    linkDB.findByIdAndDelete({ _id: req.body._id }).then(response => {
        res.send({ status: true, msg: '删除成功' })
    }).catch(error => { res.send({ status: false, msg: '链接不存在' }) })
})

module.exports = router