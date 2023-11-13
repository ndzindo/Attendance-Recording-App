const express = require('express');
const session = require('express-session')
const bcrypt = require("bcrypt");
const app = express();
const fs = require('fs');

app.use(express.static('public'))
app.use(express.json());

app.use(session({
    secret: 'dgdfghtrhjthstjzjkkt',
    resave: true,
    saveUninitialized: true
}));


app.post('/login',function(req,res){
    var podaci = req.body;
    var validno = false;
    fs.readFile('data/nastavnici.json', 'utf8', function (err, buffer){
        JSON.parse(buffer).forEach((x)=>{ 
            if(x["nastavnik"]["username"] == podaci["username"]){
                bcrypt.compare(podaci["password"], x["nastavnik"]["password_hash"], function (){
                    req.session.username = podaci["username"];
                    req.session.predmeti = x["predmeti"];
                    res.send(`{"poruka":"Uspješna prijava"}`);
                    validno = true
                });
            }
        });
    });
    setTimeout(function (){validno ? null : res.status(400).send(`{"poruka":"Neuspješna prijava"}`) ;}, 1000);
 });

app.get('/predmeti',function(req,res){
    if(req.session.username)
        res.send(JSON.stringify(req.session.predmeti));
    else
        res.status(400).send(`{"greska":"Nastavnik nije loginovan"`);
});

app.post('/logout',function(req,res){
    res.send(`{"poruka":"Uspješan logout"}`);
    req.session.username = null;
    req.session.predmeti = null;
    req.session.destroy();
 });


 
app.get('/predmet/:NAZIV',function(req,res){
    validno = false
    if(req.session.username){
        req.session.predmeti.forEach(function (x){
            if(x==req.params.NAZIV)
                fs.readFile('data/prisustva.json', 'utf8', function (err, buffer){
                    podaci = JSON.parse(buffer);
                    podaci.forEach(function (y){
                        if(y.predmet == x){
                            res.send(JSON.stringify(y));
                            validno = true;
                        }
                    });
                });
        });
        setTimeout(function (){validno ? null : res.status(400).send();}, 1000);
    }    
    else
        res.status(400).send();
});


app.post('/prisustvo/predmet/:naziv/student/:index',function(req,res){

    validno = false
    let i = 0, j = 0, ti = 0, tj = 0;

    if(req.session.username){
        req.session.predmeti.forEach(function (x){
            if(x==req.params.naziv)
            fs.readFile('data/prisustva.json', 'utf8', function (err, buffer){
                podaci = JSON.parse(buffer);
                podaci.forEach(function (y){
                    if (y.predmet == req.params.naziv){
                        ti = i
                        y.prisustva.forEach(function (z){

                            if (z.sedmica == req.body.sedmica && z.index == req.params.index){
                                tj = j;
                            }else{
                                j++;
                            }

                        });

                    }
                    else{
                        i++;
                    }
                });

                podaci[ti].prisustva[tj].predavanja = +req.body.predavanja
                podaci[ti].prisustva[tj].vjezbe = +req.body.vjezbe

                fs.writeFile("data/prisustva.json", JSON.stringify(podaci, null, 4), 'utf-8', function (err){

                    res.send(JSON.stringify(podaci[ti]));


                });


                
            });
        });
        setTimeout(function (){validno ? null : res.status(400).send();}, 1000);
    }
    else{
        res.status(400).send();
    }
    
 });


app.listen(3000);