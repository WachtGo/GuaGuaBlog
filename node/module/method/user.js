const { userDB, messageDB } = require('../mongoDB/model')//操作数据库

//传入数据库用户_id,返回数据包括：用户信息，留言数量
const getUserInfo = async (id) => {
    const user = await userDB.findOne({ _id: id })
    const message = await messageDB.find({ user: id }, { user: 0 })
    console.log('user---',user)
    return {
        ...user,
        messageCount: message.length,
    }
}

//获取数据库所有用户的id和nickname,


module.exports = {
    getUserInfo
}