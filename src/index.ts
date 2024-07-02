const express = require("express")
const app = new express()
const PORT = process.env.PORT || 8080
const categories = require("./router/categories")
const product = require("./router/product")
const user = require('./router/user')
const db = require('../models')

app.use(express.json())
app.use('/categories', categories)
app.use("/product", product)
app.use("/user", user)


app.listen(PORT, async () => {
    await db.sequelize.sync({alter: true})
    console.log(`Server started on ${PORT} port`)
})
