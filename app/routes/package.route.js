module.exports = app => {
    const packages = require("../controllers/package.controller")

    var router = require("express").Router();

    app.post("/package", packages.create);

    app.get("/packages", packages.findAll);

    app.get("/packages/deleted", packages.findAllPackages);

    app.get("/package/:id", packages.findOne)

    app.put("/package/:id", packages.update)

    app.put("/package/delete/:id", packages.delete)
}