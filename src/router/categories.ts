const categoriesRouter = require("express")

const categories = new categoriesRouter()

const categoriesController = require("../controller/category")

categories.post('/create', categoriesController.createCategories)
categories.get('/get', categoriesController.getCategories)
categories.patch('/update', categoriesController.updateCategories)
categories.delete('/delete', categoriesController.deleteCategories)
categories.get('/getProductsByCategory', categoriesController.getProductByCategory)



module.exports = categories