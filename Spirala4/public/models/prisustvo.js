const Sequelize=require('sequelize');
const sequelize=require("../db/database")

const Prisustvo=sequelize.define("prisustvo",{
    sedmica:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    predavanja:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    vjezbe:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Prisustvo;