const Sequelize=require('sequelize');
const sequelize = require("../db/database")

const Nastavnik=sequelize.define("nastavnik",{
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password_hash:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Nastavnik;