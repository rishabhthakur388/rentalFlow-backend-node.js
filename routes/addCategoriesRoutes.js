const express = require("express")
const { addItemsCategory, addItemsSubCategory } = require("../controllers/addCategories")
const Router = express.Router()

Router.post('/addCategories', addItemsCategory)
Router.post('/addItemsSubCategory', addItemsSubCategory)

module.exports = Router