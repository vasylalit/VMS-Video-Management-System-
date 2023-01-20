module.exports = (sequelize, Sequelize) => {
    const Package = sequelize.define("package", {
      packageId : {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      packageTitle : {
        type: Sequelize.STRING,
        allowNull:false
      },
      packagePrice : {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      validity : {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      numberOfDevices : {
        type : Sequelize.INTEGER,
        defaultValue:0
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
    //   created_by:{
    //     type : Sequelize.INTEGER,
    //     defaultValue:0
    //   },
    //   modified_by:{
    //     type : Sequelize.INTEGER,
    //     defaultValue:0
    //   }
    },
    {
      tableName : "packages"
    });
  
    return Package;
};