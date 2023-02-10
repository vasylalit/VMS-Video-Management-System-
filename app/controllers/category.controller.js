const db = require("../models");
const Category = db.categories;
const Op = db.Sequelize.Op;


// To create category
exports.create = (req, res)=>{
    //Create a Tutorial
    const category = {
        categoryName : req.body.categoryName
    };
    
    Category.create(category)
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the category"
        })
    })
    //validate request
    if(!req.body.categoryName){
        res.status(400).send({
            message : "Content cannot be empty!"
        })
        return
    }
}

// To get all the categories which having "is_deleted" = 0 (by default)
exports.findAll = async(req, res) =>{
    const catObj ={}
    try{
        const categories = await Category.findAll({ where : {is_deleted : 0}});
        res.status(200).send(categories);

    }catch(err){
        console.log("Error while fetching all the categories")
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// To get the single category by categoryId
exports.findOne = (req, res)=>{
    const id = req.params.id

    Category.findByPk(id)
    .then(data=>{
        if(data){
            res.send(data)
        }else{
            res.status(404).send({
                message : `Cannot find Category with id=${id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : "Error while retrieving Category with id= " + id
        })
    })
}

// To get all the categories which having "is_deleted" = 1
exports.findAllCategories = async(req, res) =>{
    const catObj ={}
    try{
        const categories = await Category.findAll({ where : {is_deleted : 1}});
        res.status(200).send(categories);

    }catch(err){
        console.log("Error while fetching all the categories")
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// To update the category using its categoryId
exports.update = (req, res) => {
    const categoryId = req.params.id;
  
    Category.update(req.body, {
      where: { categoryId : categoryId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            categoryId,
            message: "Category has been updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Category with id "
        });
      });
  };


/* Updating the category. Yes, updating the category, not deleting any more.👇
But for the user, he is deleting the category.
When user hit the API of delete category, the data will goes to the list of *findAllcategories*
*/
exports.delete = (req, res) => {
    const categoryId = req.params.id;
  
    Category.update({is_deleted : 1},{
      where: { categoryId : categoryId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Category has been deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Category with given id"
        });
      });
  };