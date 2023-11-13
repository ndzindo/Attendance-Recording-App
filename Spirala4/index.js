const express = require('express');
const session = require('express-session')
const bcrypt = require("bcrypt");
const app = express();

const sequelize=require("./public/db/database")
const {Op} = require('sequelize')

const Nastavnik = require("./public/models/nastavnik")
const Student = require("./public/models/student")
const Predmet = require("./public/models/predmet")
const Prisustvo = require("./public/models/prisustvo")

Nastavnik.hasMany(Predmet);
Predmet.belongsTo(Nastavnik);
Predmet.hasMany(Prisustvo);
Prisustvo.belongsTo(Predmet);
Student.hasMany(Prisustvo);
Prisustvo.belongsTo(Student);

app.use(express.static('public'))
app.use(express.json());

app.use(session({
    secret: 'dgdfghtrhjthstjzjkkt',
    resave: true,
    saveUninitialized: true
}));


app.post('/login',async function(req,res){
    var podaci = req.body;
    var validno = false;

    const profesor =await Nastavnik.findOne({where : {username:podaci["username"]}});
    if(profesor==null){
        res.json({poruka:"Neuspješna prijava"});
    }else{
        const predmeti = await Predmet.findAll({where : {nastavnikId:profesor.id}});
        bcrypt.compare(podaci["password"], profesor.password_hash, function (err,result){
            if(result){
                var string = "[";
                for(var i=0;i<predmeti.length;i++){
                    if(i==predmeti.length-1){
                        string+="\""+predmeti[i].naziv+"\"]";
                    }
                    else{
                        string+="\""+predmeti[i].naziv+"\",";
                    }
                }
                req.session.username = podaci["username"];
                req.session.predmeti = JSON.parse(string);
                res.send(`{"poruka":"Uspješna prijava"}`);
            }
            else{
                res.send(`{"poruka":"Neuspješna prijava"}`);
            }
            
        });
        
    }

 });

app.get('/predmeti',function(req,res){
    if(req.session.username)
        res.send(JSON.stringify(req.session.predmeti));
    else
        res.status(400).send(`{"greska":"Nastavnik nije loginovan"`);
});

app.post('/logout',function(req,res){
    req.session.username = null;
    req.session.predmeti = null;
    res.send(`{"poruka":"Uspješan logout"}`);
    req.session.destroy();
 });


 
app.get('/predmet/:NAZIV',async function(req,res){
    validno = false
    var predmet = await Predmet.findOne({where : {naziv:req.params.NAZIV}});
    var prisustva = await Prisustvo.findAll({where :{predmetId:predmet.id}, order:[['sedmica','ASC'], ['studentId','ASC']]});
    var studentiId = [];
    prisustva.forEach(x => {
        if(!studentiId.includes(x.studentId)){
            studentiId.push(x.studentId);
        }
    });
    var string="{ \"studenti\":[";
    for(var i=0;i<studentiId.length;i++){
        var student = await Student.findOne({where : {id:studentiId[i]}})
        if(i==studentiId.length-1){
            string+="{\"ime\":\""+student.ime+"\",\"index\":"+student.index+"}],";
        }
        else{
            string+="{\"ime\":\""+student.ime+"\",\"index\":"+student.index+"},";
        }
    }

    string+="\"prisustva\":[";
    for(var i=0;i<prisustva.length;i++){
        string+="{ \"sedmica\":"+prisustva[i].sedmica+", \"predavanja\":"+prisustva[i].predavanja+", \"vjezbe\":"+prisustva[i].vjezbe+", ";
        var student = await Student.findOne({where : {id:prisustva[i].studentId}});
        if(i==prisustva.length-1){
            string+="\"index\":"+student.index+"}],";
        }else{
            string+="\"index\":"+student.index+"},";
        }
    }

    string+="\"predmet\": \""+predmet.naziv+"\", \"brojPredavanjaSedmicno\": "+predmet.broj_predavanja_sedmicno+",\"brojVjezbiSedmicno\":"+predmet.broj_vjezbi_sedmicno+"}";
    console.log(JSON.parse(string));
    res.send(JSON.parse(string));
});


app.post('/prisustvo/predmet/:naziv/student/:index',async function(req,res){

    const student = await Student.findOne({where : {index:req.params.index}})
    const predmet = await Predmet.findOne({where : {naziv:req.params.naziv}})

    const prisustvo = await Prisustvo.findOne({ where: {[Op.and] : [{predmetId:predmet.id},
            {studentId:student.id},
            {sedmica:req.body['sedmica']}
        ]
    }})

    if(prisustvo==null){
        await Prisustvo.create({
            sedmica:req.body['sedmica'],
            predavanja:req.body['predavanja'],
            vjezbe:req.body['vjezbe'],
            predmetId:predmet.id,
            studentId:student.id})
    }
    else{
        prisustvo.predavanja=req.body['predavanja']
        prisustvo.vjezbe=req.body['vjezbe']
        await prisustvo.save()
    }
    
    const prisustva = await Prisustvo.findAll({where : {predmetId:predmet.id}, order:[['sedmica','ASC'], ['studentId','ASC']]})

    var studentiId = [];
    prisustva.forEach(x => {
        if(!studentiId.includes(x.studentId)){
            studentiId.push(x.studentId);
        }
    });
    var string="{ \"studenti\":[";
    for(var i=0;i<studentiId.length;i++){
        var student2 = await Student.findOne({where : {id:studentiId[i]}})
        if(i==studentiId.length-1){
            string+="{\"ime\":\""+student2.ime+"\",\"index\":"+student2.index+"}],";
        }
        else{
            string+="{\"ime\":\""+student2.ime+"\",\"index\":"+student2.index+"},";
        }
    }

    string+="\"prisustva\":[";
    for(var i=0;i<prisustva.length;i++){
        string+="{ \"sedmica\":"+prisustva[i].sedmica+", \"predavanja\":"+prisustva[i].predavanja+", \"vjezbe\":"+prisustva[i].vjezbe+", ";
        var student2 = await Student.findOne({where : {id:prisustva[i].studentId}});
        if(i==prisustva.length-1){
            string+="\"index\":"+student2.index+"}],";
        }else{
            string+="\"index\":"+student2.index+"},";
        }
    }

    string+="\"predmet\": \""+predmet.naziv+"\", \"brojPredavanjaSedmicno\": "+predmet.broj_predavanja_sedmicno+",\"brojVjezbiSedmicno\":"+predmet.broj_vjezbi_sedmicno+"}";
    res.send(JSON.parse(string));
 });


app.listen(3000);