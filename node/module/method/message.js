const { userDB } = require('../mongoDB/model')//操作数据库

//获取数据库所有用户的昵称和_id
const getBoardUsers = async () => {
    const users = await userDB.find({}, { avatar: 1, nickname: 1, _id: 1 })
    return users
}

//获取数据库所有用户的id和nickname,


module.exports = {
    getBoardUsers
}