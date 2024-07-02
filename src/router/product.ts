const productRouter = require("express")

const product = new productRouter()

const productController = require('../controller/product')

product.post('/create', productController.createProduct)
product.get('/get', productController.getProduct)
product.patch('/update', productController.updateProduct)
product.delete('/delete', productController.deleteProduct)

product.post('/newOrder', productController.alertingBot) //TODO Переместить в отдельный роут

module.exports = product