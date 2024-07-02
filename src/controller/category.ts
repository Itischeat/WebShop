const resHandler = require('../handlers/responseHandler')
const models = require('../../models')
const db = models.sequelize.models

class categoriesController {
    async createCategories(req: any, res: any) {
        try {
            const name = req.body.name
            if (!(typeof name === 'string' && isNaN(+name))) {
                resHandler.sendError(res, 400, 'Неправильный формат имени')
            }
            const isAlready = await db.categories.findAll({where: {
                name: name
            }})
            if (!!isAlready.length) {
                resHandler.sendError(res, 400, "Данная категория уже создана")
            }
            await db.categories.create({
                name: name
            })
            resHandler.sendData(res, 201, "Новая категория создана")

        } catch(e: any) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    async getCategories(req: any, res: any) {
        try {
            const id = req.query.id
            const result = await db.categories.findAll({
                where: {
                    id: id
                }
            })
            if (result.length !== 0) {
                resHandler.sendData(res, 200, result)
            } else {
                resHandler.sendError(res, 404, "Категории по этому id не найдена")
            }
            
        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    async updateCategories(req: any, res: any) {
        try {
        const id = req.body.id
        const updatableName = req.body.name
        if (!(typeof updatableName === 'string' && isNaN(+updatableName))) {
            resHandler.sendError(res, 400, 'Неправильный формат имени')
        }
        const isAlready = await db.categories.findAll({where: {
            id:id
        }})
        if (!isAlready.length) {
            resHandler.sendError(res, 404, "Данной категории не существует")
        }

        await db.categories.update({name: updatableName}, {
            where: {
                id:id
            }
        })
        resHandler.sendData(res, 200, "Категория успешно обнавлена")

        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
    async deleteCategories(req: any, res: any) {
        try {
            const id = req.body.id
            const isAlready = await db.categories.findAll({where: {
            id:id
            }})
            if (!isAlready.length) {
                resHandler.sendError(res, 404, "Данной категории не существует")
            }

            await db.categories.destroy({
                where: {
                    id:id
                }
            })
            resHandler.sendData(res, 200, "Категория успешно удалена")
        } catch(e) {
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }

    async getProductByCategory(req: any, res: any) {
        try {
            const id = req.query.id

            
            const isAlreadyCategories = await db.categories.findAll({where: {
                id: id
            }})
            if (!isAlreadyCategories.length) {
                resHandler.sendError(res, 404, "Такой категории не существует")
            }


            const isAlreadyProducts = await db.products.findAll({where: {
                category_id: id
            }})
            if (!isAlreadyProducts.length) {
                resHandler.sendError(res, 404, "Продуктов в данной категории нету")
            }

            const result = await db.products.findAll({
                where: {
                    category_id: id
                }
            })
            resHandler.sendData(res, 200, result)
        } catch(e) {
            console.log(e)
            resHandler.sendError(res, 500, "Неизвестная ошибка")
        }
    }
}

module.exports = new categoriesController()

