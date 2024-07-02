const resHandler = require('../handlers/responseHandler')
const models = require('../../models')
const db = models.sequelize.models
const TelegramApi = require("node-telegram-bot-api")

class productController {
    async createProduct(req: any, res: any) {
        try {
            const {category_id, name, description} = req.body

            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, 'Неправильный формат имени')
            }
            else if (!(typeof description === 'string' && isNaN(+description))) {
                resHandler.sendError(res, 400, "Некорректно введено описание")
            }
            const isAlready = await db.products.findAll({where: {
                name: name
            }})
            if (!!isAlready.length) {
                resHandler.sendError(res, 400, "Данный продукт уже создан")
            }
            const isCategories = await db.categories.findAll({where: {
                id: category_id
            }})
            if (!isCategories.length) {
                resHandler.sendError(res, 400, "Данной категории не существует")
            }

            await db.products.create({
                category_id: category_id,
                name: name,
                description: description
            })
            resHandler.sendData(res, 201, "Продукт успешно создан")
            } catch(e: any) {
                console.log(e)
                resHandler.sendError(res, 500, "Неизвестная ошибка")
            }
        }
    async getProduct(req: any, res: any) {
        try {
            const id = req.query.id
            const result = await db.products.findAll({ where: {id: id} })
            if (result.length !== 0) {
                resHandler.sendData(res, 200, result)
            } else {
                resHandler.sendError(res, 404, "Продукт по этому id не найден")
            }
        } catch(e: any) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    async updateProduct(req: any, res: any) {
        try {
            const {id, category_id, name, description} = req.body

            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, 'Неправильный формат имени')
            }

            else if (!(typeof description === 'string' && isNaN(+description))) {
                resHandler.sendError(res, 400, "Некорректно введено описание")
            }

            const isCategories = await db.categories.findAll({where: {
                id: category_id
            }})
            if (!isCategories.length) {
                resHandler.sendError(res, 400, "Данной категории не существует")
            }

            await db.products.update({
                category_id: category_id,
                name: name,
                description: description,
            },
            {
                where: {
                    id: id
                }
            })
            resHandler.sendData(res, 200, "Продукт успешно обнавлён")

        } catch(e: any) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    async deleteProduct(req: any, res: any) {
        try {
            const id = req.body.id

            const isProducts = await db.products.findAll({where: {
                id: id
            }})
            if (!isProducts.length) {
                resHandler.sendError(res, 400, "Данного продукта не существует")
            }

            const result = await db.products.destroy({
                where: {
                    id: id
                }
            })
            resHandler.sendData(res, 200, result)
        } catch (e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }

    async alertingBot(req: any, res: any) {             //TODO: Вынести в отдельный роут и контроллер
        try {
            const token = process.env.TG_TOKEN || "6891662574:AAHAwcfH5q8zAqycwwR-5Z7V_AOqa9jyue8"
            const bot = new TelegramApi(token, { polling: true })
            const chat_id = process.env.CHAT_ID || 801605103
            const {number, name} = req.body
            const isValidNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(number)
            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, 'Неправильный формат имени')
            }
            else if (!isValidNumber) {
                resHandler.sendError(res, 400, 'Неправильно введён номер')
            }
            
            bot.sendMessage(chat_id, `<b>Новый заказ!</b>\nИмя: ${name}\nНомер: ${number}`, {parse_mode: 'HTML'})
            resHandler.sendData(res, 200, "Сообщение успешно отправленно ботом")
        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
}

module.exports = new productController()