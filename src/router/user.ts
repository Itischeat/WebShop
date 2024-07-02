const userRouter = require("express")

const user = new userRouter()

const userController = require('../controller/user')
const authMiddleWare = require("../middleware/authMiddleWare")

user.post('/registration', userController.registration)
user.post('/login', userController.login)
user.get('/someDo', authMiddleWare, userController.someDo)

module.exports = user