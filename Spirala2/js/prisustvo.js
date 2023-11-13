import {TabelaPrisustvo} from "./TabelaPrisustvo.js";

let div = document.getElementById("divSadrzaj");
//instanciranje
let prisustvo = TabelaPrisustvo(div, {
	"studenti": [{
			"ime": "Neko Nekic",
			"index": 18885
		},
		{
			"ime": "Meho Mehic",
			"index": 18886
		},
        {
			"ime": "Ziko Zikic",
			"index": 18887
		},
        {
			"ime": "Miho Mihic",
			"index": 18888
		},
        
	],
	"prisustva": [{
			"sedmica": 1,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 1,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 1,
			"predavanja": 1,
			"vjezbe": 1,
			"index": 18887
		},{
			"sedmica": 1,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 2,
			"predavanja": 2,
			"vjezbe": 1,
			"index": 18885
		},{
			"sedmica": 2,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 2,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18887
		},{
			"sedmica": 2,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 3,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 3,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 3,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18887
		},{
			"sedmica": 3,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 4,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 4,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 4,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18887
		},{
			"sedmica": 4,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 5,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 5,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 5,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18887
		},{
			"sedmica": 5,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 6,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 6,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18886
		},{
			"sedmica": 6,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18887
		},{
			"sedmica": 6,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18888
		},{
			"sedmica": 7,
			"predavanja": 3,
			"vjezbe": 2,
			"index": 18885
		},{
			"sedmica": 7,
			"predavanja": 2,
			"vjezbe": 0,
			"index": 18886
		},{
			"sedmica": 7,
			"predavanja": 0,
			"vjezbe": 0,
			"index": 18887
		},{
			"sedmica": 7,
			"predavanja": 1,
			"vjezbe": 2,
			"index": 18888
		},  
	],
	"predmet": "Web Tehnologije",
	"brojPredavanjaSedmicno": 3,
	"brojVjezbiSedmicno": 2
}
);

if(prisustvo){
    window.sljedecaSedmica = prisustvo.sljedecaSedmica;
    window.prethodnaSedmica = prisustvo.prethodnaSedmica;
}

//pozivanje metoda
//prisustvo.sljedecaSedmica();
//prisustvo.prethodnaSedmica();