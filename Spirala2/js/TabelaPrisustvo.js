    let TabelaPrisustvo = function (divRef, podaci) {
    
        
    var studentL=podaci.studenti.length;
    var l=podaci.prisustva.length;
    var prvaSed=podaci.prisustva[0].sedmica;
    var sedmice=podaci.prisustva[l-1].sedmica-prvaSed+1;
    let tr=0;
    var br=0;

   console.log(sedmice);
  var predavanja=podaci.brojPredavanjaSedmicno;
  var vjezbe=podaci.brojVjezbiSedmicno;

      
   function validacija(){
      for(var t=0; t<l; t++){
        if(podaci.prisustva[t].predavanja> predavanja || podaci.prisustva[t].vjezbe> vjezbe ){
            return false;
        }
        if(podaci.prisustva[t].predavanja<0 || podaci.prisustva[t].vjezbe<0 ){
            return false;
        }
      }
    
      for(var i=0; i<l; i++){
        var br=0; 
        for(var j=0; j<l; j++){
            if(podaci.prisustva[i].index==podaci.prisustva[j].index && podaci.prisustva[i].sedmica==podaci.prisustva[j].sedmica ){
                br++;
            }
        }
        if(br>1){
            return false;
        }
      }

      for(var i=0; i<studentL; i++){
        for(var j=i+1; j<studentL; j++){
            if(podaci.studenti[i].index==podaci.studenti[j].index){
                return false;
            }
        }
      }

      
      for(var i=0; i<l; i++){
        var ima=0;
        for(var j=0; j<studentL; j++){
            if(podaci.prisustva[i].index==podaci.studenti[j].index){
                ima=1;
               
            }     
        }if(ima==0){
                return false;
              }
      }

     for(var p=0; p<l-1; p++){
        var ima=1;
        if(podaci.prisustva[p].sedmica==podaci.prisustva[p+1].sedmica || podaci.prisustva[p+1].sedmica==podaci.prisustva[p].sedmica+1 )
        {
            ima=1;
        }
        else{
            console.log(podaci.prisustva[p].sedmica + "    " + podaci.prisustva[p+1].sedmica )
            return false;
        }
     }

     return true;
  }

  // console.log(vjezbe);

  function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
    for ( i in lookup ) {
      while ( num >= lookup[i] ) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }
          
   function tabela(data){
    divRef.innerHTML= "";
    if(validacija()===false){
        divRef.innerHTML="Podaci o prisustvu nisu validni!"
    }
  else{
    let rez=" <h1>"+  podaci.predmet +" - BSc 3 - Računarstvo i informatika</h1>"
    rez+="<br>  <table><th>Ime i <br> prezime</th> <th>Index</th>"
      var i; 
      for(i=prvaSed-1; i<=sedmice; i++){
        if(i==data){
            rez+='<th colspan="5">'+ romanize(i+1) +  "</th>" 
        }
      else if(i==sedmice){
            rez+='<th colspan="5">'+ romanize(i+1) +  "-"+romanize(15)+"</th>" 
        }
       else{rez+="<th>"+ romanize(i+1) +  "</th>"} 
      }
      rez+="</tr>"
    var i; 
    for(i=0; i < studentL ; i++){
        rez+=" <tr>"
       rez+='<th rowspan="2"> '+ podaci.studenti[i].ime + "</th>"
       rez+='<th rowspan="2"> '+ podaci.studenti[i].index + "</th>"
       let indeks=podaci.studenti[i].index;
      
        var j; 
        for(j=prvaSed-1; j<sedmice; j++){
            if(j==data){
                for(var m=0; m<predavanja; m++)
               { rez +="<td>P<br>" +(m+1) + " </td>"}
               for(var m=0; m<vjezbe; m++)
               { rez +="<td>V<br>" +(m+1) + " </td>"}
            } 
            
            else{
                
                for(var t=0; t<l; t++){
                    if(podaci.prisustva[t].index==indeks && podaci.prisustva[t].sedmica==j+1 ){
                        var pr=podaci.prisustva[t].predavanja;
                        var vj=podaci.prisustva[t].vjezbe;
                     
                    }
                }
               
                var pos=Math.round((pr+vj)/(predavanja+vjezbe)*100);
               
            rez+='<th rowspan="2">'+pos+'%</th>';
        }
        }
    rez+='<th rowspan="2" ></th> </tr><tr>'
    var broj=podaci.prisustva[data*studentL+i].predavanja;
  
    for( var d=0; d<predavanja; d++){
       if(d<broj){
       rez+='<td class="zelena" ></td>'  }
       else{
           rez+='<td class="crvena" ></td>'   
       }
    }

    broj=podaci.prisustva[data*studentL+i].vjezbe;
    for( var d=0; d<vjezbe; d++){
       if(d<broj){
       rez+='<td class="zelena" ></td>'  }
       else{
           rez+='<td class="crvena" ></td>'   
       }
    }
     rez+="</tr>"
     }
   

    rez+='</table> <button onclick="prethodnaSedmica()"> <i class="fa-solid fa-arrow-left" style="font-size:50px;"></i> </button> <button onclick="sljedecaSedmica()" style="margin: 10px;"> <i class="fa-solid fa-arrow-right" style="font-size:50px;"></i> </button>';

    divRef.innerHTML = rez;
}
   };
             
   tabela(tr);    
    
        let sljedecaSedmica = function () {
            if (tr != sedmice-1)
          {  tabela(++tr);}
            
    
    
        }
    
        let prethodnaSedmica = function () {
            if (tr != prvaSed-1)            
          {  tabela(--tr);}
    
        }
    
        return {
            sljedecaSedmica: sljedecaSedmica,
            prethodnaSedmica: prethodnaSedmica
        }
    };
    
    export {TabelaPrisustvo}
    