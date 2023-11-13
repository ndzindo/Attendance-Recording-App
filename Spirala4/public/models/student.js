const Sequelize=require('sequelize');
const sequelize=require("../db/database")

const Student=sequelize.define("student",{
    
    ime:{
        type: Sequelize.STRING,
        allowNull:false
    },
    index:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Student;