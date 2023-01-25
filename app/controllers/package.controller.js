const db = require("../models");
const Package = db.packages;
const Op = db.Sequelize.Op;


// To create category
exports.create = (req, res)=>{
    //Create a Tutorial
    const package = {
        packageTitle : req.body.packageTitle,
        packagePrice : req.body.packagePrice,
        validity : req.body.validity,
        numberOfDevices : req.body.numberOfDevices
    };
    
    Package.create(package)
    .then(data => {
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occured while creating the package"
        })
    })
    //validate request
    if(!req.body.packageTitle){
        res.status(400).send({
            message : "Content cannot be empty!"
        })
        return
    }
}

// To get all the categories which having "is_deleted" = 0 (by default)
exports.findAll = async(req, res) =>{
    const pacObj ={}
    try{
        const packages = await Package.findAll({ where : {is_deleted : 0}});
        res.status(200).send(packages);

    }catch(err){
        console.log("Error while fetching all the packages")
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// To get the single category by categoryId
exports.findOne = (req, res)=>{
    const id = req.params.id

    Package.findByPk(id)
    .then(data=>{
        if(data){
            res.send(data)
        }else{
            res.status(404).send({
                message : `Cannot find Package with id=${id}`
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message : "Error while retrieving Package with id= " + id
        })
    })
}

// To get all the categories which having "is_deleted" = 1
exports.findAllPackages = async(req, res) =>{
    const pacObj ={}
    try{
        const packages = await Package.findAll({ where : {is_deleted : 1}});
        res.status(200).send(packages);

    }catch(err){
        console.log("Error while fetching all the packages")
        res.status(500).send({
            message : "Internal server error"
        })
    }
}

// To update the category using its categoryId
exports.update = (req, res) => {
    const packageId = req.params.id;
  
    Package.update(req.body, {
      where: { packageId : packageId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            packageId,
            message: "Package has been updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Package with id=${id}. Maybe Package was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Package with id=" + id
        });
      });
  };


/* Updating the package. Yes, updating the package, not deleting any more.👇
But for the user, he is deleting the package.
When user hit the API of delete package, the data will goes to the list of *findAllPackages*
*/
exports.delete = (req, res) => {
    const packageId = req.params.id;
  
    Package.update({is_deleted : 1},{
      where: { packageId : packageId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Package has been deleted successfully."
          });
        } else {
          res.send({
            message: `Cannot delete Package with id=${id}. Maybe Package was not found !`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Package with given id"
        });
      });
  };