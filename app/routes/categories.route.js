module.exports = app => {
    const categories = require("../controllers/category.controller")

    var router = require("express").Router();

    app.post("/category", categories.create);

    app.get("/categories", categories.findAll);

    app.get("/categories/deleted", categories.findAllCategories);

    app.get("/category/:id", categories.findOne)

    app.put("/category/:id", categories.update)

    app.put("/category/delete/:id", categories.delete)
}