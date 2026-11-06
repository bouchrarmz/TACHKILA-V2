
import { listj, sauvegarderJoueurs, } from "./stockage.js";
// import {
//     actualiserCompteur
// } from "./joueurs.js";
const joueurs = document.querySelector('.joueurs')
const positions = {
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
export function actualiserCompteur() {
    const nombrejoueur = document.querySelector(".nbrjoueur");
    // const hd = document.querySelector(".haid");

    console.log("Page actuelle:", location.pathname);
    console.log("Compteur:", nombrejoueur);
    console.log("Nombre joueurs:", listj.length);
    nombrejoueur.textContent = listj.length + " joueur(s)";

 if (listj.length > 0) {
    hd.classList.add("hidden");
     } else {
        hd.classList.remove("hidden");
     }
}


export function afficherj(jou) {
    const parent = document.createElement("div");

    parent.classList.add(
        "flex", "flex-col",
        "bg-slate-800", "p-4", "rounded-xl",
        "border", "border-slate-700", "gap-3"
    );

    const para = document.createElement("p");

    para.classList.add(
        "w-9", "h-9", "rounded-full",
        "border-2", "border-orange-500",
        "flex", "justify-center", "items-center"
    );

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

    const divicon = document.createElement("div");
    divicon.classList.add("flex", "gap-4");
    // Supprimer
    const sup = document.createElement("i");
    sup.classList.add("fa-solid", "fa-trash", "cursor-pointer");

    sup.addEventListener("click", function () {

        const index = listj.indexOf(jou);

        if (index !== -1) {
            listj.splice(index, 1);
        }

        parent.remove();
        sauvegarderJoueurs();
        actualiserCompteur();
    });



    divicon.append(sup);
    ligneJoueur.append(divicon);
    parent.append(ligneJoueur);
    joueurs.append(parent)
}

function renderplqyer(){
    listj.forEach(jou=>{
        afficherj(jou)
    })
}
renderplqyer();
actualiserCompteur();
