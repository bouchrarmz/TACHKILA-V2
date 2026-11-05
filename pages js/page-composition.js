
import { listj, sauvegarderJoueurs ,} from "./stockage.js";
import {
    creercarte,
    assignerJoueur,
    actualiserCompteur
} from "./joueurs.js";
export function creercarte(jou) {
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

    

    divicon.append(sup, edit, gb);
    ligneJoueur.append(divicon);
    parent.append(ligneJoueur);


    return parent;
}
