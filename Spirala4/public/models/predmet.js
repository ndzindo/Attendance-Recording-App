const Sequelize=require('sequelize');
const sequelize=require("../db/database")

const Predmet=sequelize.define("predmet",{
    naziv:{
        type: Sequelize.STRING,
        allowNull:false
    },
    broj_predavanja_sedmicno:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    broj_vjezbi_sedmicno:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Predmet;