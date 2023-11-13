const sequelize=require("./public/db/database")

const Student = require("./public/models/student")
const Nastavnik = require("./public/models/nastavnik")
const Predmet = require("./public/models/predmet")
const Prisustvo = require("./public/models/prisustvo")

Nastavnik.hasMany(Predmet);
Predmet.belongsTo(Nastavnik);
Predmet.hasMany(Prisustvo);
Prisustvo.belongsTo(Predmet);
Student.hasMany(Prisustvo);
Prisustvo.belongsTo(Student);

var nastavnik,predmet,student;

sequelize.sync({force:true}).then(()=>{
    Nastavnik.bulkCreate([
        {
            username : "USERNAME",
            password_hash : "$2a$10$24Wk//ATPQio1APPSZIAceIzXO/OzIuIV2358.WX6uF2C8mjLAQ26"
        },
        {
            username : "USERNAME2",
            password_hash : "$2a$10$AlVppDOS3Y6PSFMSbmRnYuJyv3aaIpW95EE2veORFeFfujvOAEpDC"
        }
    ])
}).then(()=>{
     return Predmet.bulkCreate([
        {
            naziv : "PREDMET1",
            broj_predavanja_sedmicno : 3,
            broj_vjezbi_sedmicno : 2,
            nastavnikId : 1
        },
        {
            naziv : "PREDMET2",
            broj_predavanja_sedmicno : 3,
            broj_vjezbi_sedmicno : 2,
            nastavnikId : 1
        }
    ])
}).then(()=>{
    return Predmet.create(
        {
            naziv : "PREDMET3",
            broj_predavanja_sedmicno : 2,
            broj_vjezbi_sedmicno : 2
        }
    )
}).then((data)=>{
    predmet=data;
    return Nastavnik.findOne({where : {username:"USERNAME2"}})
}).then((data)=>{
    nastavnik=data;
    predmet.setNastavnik(nastavnik)
}).then(()=>{
    Student.bulkCreate([
        {ime:"Neko Nekic",index:18885},
        {ime:"Meho Mehic",index:18886},
        {ime:"Ziko Zikic",index:18887},
        {ime:"Miho Mihic",index:18888}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Neko Nekic"}});
}).then((data)=>{
    student=data;
    return Predmet.findOne({where : {naziv:"PREDMET1"}})
}).then((data)=>{
    predmet=data
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:3,vjezbe:1,predmetId:1,studentId:1},
        {sedmica:2,predavanja:2,vjezbe:1,predmetId:1,studentId:1},
        {sedmica:3,predavanja:2,vjezbe:0,predmetId:1,studentId:1},
        {sedmica:4,predavanja:3,vjezbe:0,predmetId:1,studentId:1},
        {sedmica:5,predavanja:1,vjezbe:1,predmetId:1,studentId:1},
        {sedmica:6,predavanja:1,vjezbe:1,predmetId:1,studentId:1},
        {sedmica:7,predavanja:2,vjezbe:2,predmetId:1,studentId:1},
        {sedmica:8,predavanja:2,vjezbe:1,predmetId:1,studentId:1}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Meho Mehic"}})
}).then((data)=>{
    student=data
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:2,predavanja:3,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:3,predavanja:2,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:6,predavanja:2,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:7,predavanja:3,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:8,predavanja:2,vjezbe:1,predmetId:1,studentId:student.id}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Ziko Zikic"}})
}).then((data)=>{
    student=data
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:2,predavanja:3,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:3,predavanja:2,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:4,predavanja:2,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:6,predavanja:3,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:7,predavanja:1,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:8,predavanja:3,vjezbe:2,predmetId:1,studentId:student.id}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Miho Mihic"}})
}).then((data)=>{
    student=data
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:2,predavanja:3,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:3,predavanja:2,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:4,predavanja:2,vjezbe:0,predmetId:1,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:1,predmetId:1,studentId:student.id},
        {sedmica:6,predavanja:2,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:7,predavanja:3,vjezbe:2,predmetId:1,studentId:student.id},
        {sedmica:8,predavanja:2,vjezbe:1,predmetId:1,studentId:student.id}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Neko Nekic"}});
}).then((data)=>{
    student=data;
    return Predmet.findOne({where : {naziv:"PREDMET2"}});
}).then((data)=>{
    predmet=data;
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:2,predavanja:3,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:3,predavanja:3,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:4,predavanja:3,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:6,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:7,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:9,predavanja:2,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:10,predavanja:3,vjezbe:2,predmetId:predmet.id,studentId:student.id}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Ziko Zikic"}})
}).then((data)=>{
    student=data;
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:2,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:3,predavanja:1,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:4,predavanja:3,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:6,predavanja:2,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:7,predavanja:3,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:8,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:9,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:10,predavanja:3,vjezbe:2,predmetId:predmet.id,studentId:student.id}
    ])
}).then(()=>{
    return Predmet.findOne({where : {naziv:"PREDMET3"}})
}).then((data)=>{
    predmet=data;
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:2,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:3,predavanja:1,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:4,predavanja:1,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:6,predavanja:2,vjezbe:0,predmetId:predmet.id,studentId:student.id},
        {sedmica:7,predavanja:2,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:8,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:10,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id}
    ])
}).then(()=>{
    return Student.findOne({where : {ime:"Ziko Zikic"}})
}).then((data)=>{
    student=data;
    return Prisustvo.bulkCreate([
        {sedmica:1,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:2,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:3,predavanja:1,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:4,predavanja:1,vjezbe:2,predmetId:predmet.id,studentId:student.id},
        {sedmica:5,predavanja:2,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:6,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:7,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:8,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:9,predavanja:1,vjezbe:1,predmetId:predmet.id,studentId:student.id},
        {sedmica:10,predavanja:2,vjezbe:2,predmetId:predmet.id,studentId:student.id}
    ])
})
.catch((error)=>{
    console.log(error);
})