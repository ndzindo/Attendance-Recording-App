window.onload= function(){
    lougout = document.getElementById("logout")



    
    logout.onclick = function(){ PoziviAjax.postLogout(()=>{window.location.replace("prijava.html");})};

    let div = document.getElementById("divSadrzaj");
    let menu = document.getElementById("predmeti");


    function tabelaPredmeta(dobar, podaci){
        if(dobar){
            prisustvo = TabelaPrisustvo(div, podaci);
            if(prisustvo){
                window.sljedecaSedmica = prisustvo.sljedecaSedmica;
                window.prethodnaSedmica = prisustvo.prethodnaSedmica;
            }
        }
        else
            console.log("prisustva");
    }

    window.tabelaPredmeta = tabelaPredmeta;
    window.posaljiPrisustvo = posaljiPrisustvo;
    
    function postaviPredmete(dobar, podaci){
        if(dobar)
            podaci.forEach(function(x){
                menu.innerHTML = menu.innerHTML + `<a href="#" onclick="window.tr=null;PoziviAjax.getPredmet(this.innerHTML,tabelaPredmeta);">${x}  </a>`
            })
        else
            console.log("predmeti");
    }

    PoziviAjax.getPredmeti(postaviPredmete);

    function posaljiPrisustvo(naziv, index, sedmica, predavanja, vjezbe){

        PoziviAjax.postPrisustvo(naziv, index, {"sedmica": sedmica, "predavanja": predavanja, "vjezbe": vjezbe}, tabelaPredmeta);

    }
	
}