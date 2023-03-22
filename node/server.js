//通过token

const express = require('express')
const path = require('path')
const cors = require('cors')
require('./module/mongoDB/mongo')



const app = express()
app.use(cors())

//处理json数据
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//防止在服务器上 刷新404
const history = require('connect-history-api-fallback')
app.use(history())
//静态资源目录
app.use(express.static(path.join(__dirname, 'public')))

//路由
app.use('/', require('./router/a_index'))





app.listen(80, () => { console.log('------服务启动在 \n http://localhost:80 \n http://127.0.0.1:80') })

