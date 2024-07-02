const models = require('../../models')
const db = models.sequelize.models
const bcrypt = require('bcrypt')
const {secret} = require('../security')
const jwt = require('jsonwebtoken')
const resHandler = require('../handlers/responseHandler')

class userController {
    async registration(req: any, res: any) {
        try {
            const {name, password} = req.body

            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, "Некорректно введено имя")
            }

            const isAlready = await db.users.findAll({where: {name: name}})
            if (isAlready.length) {
                resHandler.sendError(res, 400, "Данный пользователь уже создан")
            }
            const hashPassword = await bcrypt.hash(password, 7)

            await db.users.create({
                name: name,
                password: hashPassword
            })
            resHandler.sendData(res, 201, "Пользователь успешно создан")
        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    
    async login(req: any, res: any) {
        try {
            const {name, password} = req.body

            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, "Некорректно введено имя")
            }

            const user = await db.users.findAll({where: {name: name}})

            if (!user.length) {
                resHandler.sendError(res, 400, "Данный пользователь не зарегистрирован")
            }

            const isHashPassword = await bcrypt.compare(password, user[0].dataValues.password)
            if (!isHashPassword) {
                resHandler.sendError(res, 404, "Введёный пароль не верный")
            }
            
            const token = jwt.sign({id: user[0].dataValues.id}, secret, {expiresIn: '7h'})
            resHandler.sendData(res, 200, token)

        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    
    async someDo(req: any, res: any) {
        try {
            resHandler.sendData(res, 200, 'hello world')
        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
}

module.exports = new userController()