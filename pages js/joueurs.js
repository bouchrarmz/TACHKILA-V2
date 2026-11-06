import { listj, sauvegarderJoueurs } from "./stockage.js";
import { afficherJoueurs } from "./page-effectif.js";
// Positions du terrain
export const positions = {
    GB: { poste: "GB", nom: "Gardien" },
    DG: { poste: "DEF", nom: "Défenseur gauche" },
    DC1: { poste: "DEF", nom: "Défenseur central 1" },
    DC2: { poste: "DEF", nom: "Défenseur central 2" },
    DD: { poste: "DEF", nom: "Défenseur droit" },
    MG: { poste: "MIL", nom: "Milieu gauche" },
    MC1: { poste: "MIL", nom: "Milieu central 1" },
    MC2: { poste: "MIL", nom: "Milieu central 2" },
    MD: { poste: "MIL", nom: "Milieu droit" },
    BU1: { poste: "ATT", nom: "Buteur 1" },
    BU2: { poste: "ATT", nom: "Buteur 2" }
};

// Assigner un joueur au terrain
export function assignerJoueur(joueur, positionId) {

    document.querySelectorAll(".tiran").forEach(caseTerrain => {
        if (caseTerrain.dataset.joueur === String(joueur.numero)) {
            caseTerrain.innerHTML = caseTerrain.dataset.label || "";
            caseTerrain.classList.remove("occupee");
            delete caseTerrain.dataset.joueur;
        }
    });

    joueur.position = positionId || null;

    // Retour sur le banc
    if (!positionId) {
        sauvegarderJoueurs();
        return true;
    }

    const caseTerrain = document.getElementById(positionId);

    if (!caseTerrain) {
        joueur.position = null;
        sauvegarderJoueurs();
        return false;
    }

    // Vérifier si la position est occupée
    const occupee = listj.some(j =>
        j !== joueur && j.position === positionId
    );

    if (occupee) {
        const message = document.querySelector("#message");

        message.textContent = "Cette position est déjà occupée !";
        message.classList.remove("hidden");

        setTimeout(() => {
            message.classList.add("hidden");
        }, 3000);

        joueur.position = null;
        sauvegarderJoueurs();
        return false;
    }

    // caseTerrain.dataset.label = positions[positionId].nom;
    // caseTerrain.dataset.joueur = String(joueur.numero);
    // caseTerrain.classList.add("occupee");

    caseTerrain.innerHTML = `
        <div class="carte-terrain">
            <span>${joueur.numero}</span>
            <span>${joueur.nom}</span>
        </div>
    `;

    sauvegarderJoueurs();
    return true;
}

// Actualiser le compteur
export function actualiserCompteur() {
    const nombrejoueur = document.querySelector(".nbrjoueur");
    // const hd = document.querySelector(".haid");

    console.log("Page actuelle:", location.pathname);
    console.log("Compteur:", nombrejoueur);
    console.log("Nombre joueurs:", listj.length);
    nombrejoueur.textContent = listj.length + " joueur(s)";

    // if (listj.length > 0) {
    //     hd.classList.add("hidden");
    // } else {
    //     hd.classList.remove("hidden");
    // }
}

// Créer le select des positions

// Créer la carte du joueur
export function creercarte(jou) {
    const parent = document.createElement("div");

    parent.classList.add(
        "flex", "flex-col",
        "bg-slate-800", "p-4", "rounded-xl",
        "border", "border-slate-700", "gap-3","carte-joueur"
    );

    const para = document.createElement("p");
 if (jou.poste=== "GB") {
    para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-orange-500",
        "flex", "justify-center", "items-center"
    );
 }
 if (jou.poste === "DEF") { para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-blue-500",
        "flex", "justify-center", "items-center"
    );
 }
 if (jou.poste === "MIL") { para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-red-500",
        "flex", "justify-center", "items-center"
    );
 }
 if (jou.poste === "ATT") { para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-green-500",
        "flex", "justify-center", "items-center"
    );
 }

    const span = document.createElement("span");
    span.classList.add("numero-joueur");
    span.textContent = jou.numero;
    para.append(span);

    const titre = document.createElement("h1");
    titre.classList.add("font-bold", "text-white", "nom-joueur");
    titre.textContent = jou.nom;

    const parachild = document.createElement("p");
    parachild.classList.add("text-sm", "text-orange-400", "poste-joueur");
    parachild.textContent = jou.poste;

    const divchild = document.createElement("div");
    divchild.append(titre, parachild);

    const ligneJoueur = document.createElement("div");

    ligneJoueur.classList.add(
        "flex", "justify-between", "items-center", "gap-3"
    );

    ligneJoueur.append(para, divchild);
    const parage= document.createElement('p');
    parage.textContent="Age :"+ jou.age+"ans"
     const parasatatut= document.createElement('p')
     parasatatut.textContent=jou.statut
     console.log("Statut du joueur :", jou.statut);
     if (jou.statut === "en forme") {
    parasatatut.classList.add("w-23", "rounded-xl",
         "border","bg-green-500", "border-green-900",
         "flex", "justify-center", "items-center"
);
    } else if (jou.statut === "blessé") {
    parasatatut.classList.add("w-23", "rounded-xl",
         "border","bg-red-500", "border-red-900",
         "flex", "justify-center", "items-center"
);
      }
      console.log(parasatatut.className);
console.log(parasatatut.textContent);
     
    const divicon = document.createElement("div");
    divicon.classList.add("flex", "gap-4");
    const spa = document.createElement("button");
    spa.classList.add("bostegb");
    spa.textContent = "C";
    spa.classList.add( "w-9", "h-9", "rounded-xl",
         "border","bg-slate-900", "border-slate-700",
        "flex", "justify-center", "items-center",)
spa.addEventListener('click', function(){
    parent.parentElement.querySelectorAll(".carte-joueur").forEach((carte)=>{
        carte.classList.remove("!border-fuchsia-900");
        carte.querySelector(".bostegb")
            .classList.remove("!bg-fuchsia-900");
    }
    )
    console.log("Button clicked");
    parent.classList.add( 
        "!border-fuchsia-900")
        spa.classList.add('!bg-fuchsia-900')
    
})
   
    // Supprimer
    const sup = document.createElement("i");
    sup.classList.add("fa-solid", "fa-trash", "cursor-pointer");

    sup.addEventListener("click", function() {

        if (jou.position) {
            const caseTerrain = document.getElementById(jou.position);
            if (caseTerrain) {
                caseTerrain.innerHTML = caseTerrain.dataset.label || "";
                caseTerrain.classList.remove("occupee");
                delete caseTerrain.dataset.joueur;
            }
        }
        const index = listj.indexOf(jou);

        if (index !== -1) {
            listj.splice(index, 1);
        }

        parent.remove();
        sauvegarderJoueurs();
        actualiserCompteur();
    });

    // Modifier
    const edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen", "cursor-pointer");

    edit.addEventListener("click", function() {

        const modal = document.querySelector("#popup-joueur");

        const nom = document.querySelector(".nom");
        const num = document.querySelector(".num");
        const post = document.querySelector(".post");
         const age = document.querySelector(".age");
         const statut= document.querySelector(".statut");

        document.dispatchEvent(new CustomEvent("modifierJoueur", {
            detail: {
                joueur: jou,
                carte: parent,
                index: listj.indexOf(jou)
            }
        }));
        nom.value = jou.nom;
        num.value = jou.numero;
        post.value = jou.poste;
        age.value= jou.age
        statut.value=jou.statut
        modal.classList.add("formpop");
    });

    divicon.append(sup, edit,spa);
    ligneJoueur.append(divicon);
    parent.append(ligneJoueur ,parage , parasatatut);
    return parent;
    
}
export function search(list){
const searchInput=document.querySelector('#searchInput')
let filternom=[];
searchInput.addEventListener('input' , function(e) {
   let nomsearch=searchInput.value.toLowerCase()
//    let nomsearch=e.target.value.toLowerCase()
   filternom= list.filter(c=> c.nom.toLowerCase().includes(nomsearch))
   afficherJoueurs(filternom)
})
}
 export function catigorijoueur(liste){
 const listefilter=document.querySelectorAll( ".listefilter li ")
 listefilter.forEach((catigori)=>{
    catigori.addEventListener('click', function(){
        if(catigori.dataset.poste==='tout'){
             afficherJoueurs()
        }else{
  const postej= liste.filter( p=>p.poste===catigori.dataset.poste)
 afficherJoueurs(postej)
        }
  })
  })
}


 export function afficherParPagination(list,currentPage,itemsPerPage){
    const start= (currentPage-1)*itemsPerPage
    const  end =start+itemsPerPage
    const pageitem=list.slice(start,end)
    console.log(pageitem);
    afficherJoueurs(pageitem)

     const btnPrec = document.getElementById("prec");
const btnSuiv = document.getElementById("suiv");
btnSuiv.addEventListener('click', function(){
    console.log('hoo')
    if(currentPage < Math.ceil(listj.length / itemsPerPage)){
        currentPage++;
    afficherParPagination(listj,currentPage,itemsPerPage)

    }

})
btnPrec.addEventListener('click', function(){
     if(currentPage > 1){
        currentPage--;
        afficherParPagination(listj,currentPage,itemsPerPage);
    }


})

    }
    
    

 

 



