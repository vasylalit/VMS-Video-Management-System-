module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      categoryId: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        defaultValue:0
      },
      created_by:{
        type : Sequelize.INTEGER,
        defaultValue:0
      },
      modified_by:{
        type : Sequelize.INTEGER,
        defaultValue:0
      }
    },
    {
      tableName : "categories"
    });
  
    return Category;
};