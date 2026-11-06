import { listj, sauvegarderJoueurs } from "./stockage.js";

import {
    regexage,
    regexnom,
    regexnumbrejoueur
} from "./validation.js";

import {
    creercarte,
    assignerJoueur,
    actualiserCompteur,
    search,
    catigorijoueur,
    afficherParPagination
} from "./joueurs.js";
import {
    ouvrirModal,
    fermerModal,
} from "./interface.js";


const modal = document.querySelector("#popup-joueur");
const form = document.querySelector(".formM");
// console.log(form)
const statut= document.querySelector('.statut')
const nom = document.querySelector(".nom");
const num = document.querySelector(".num");
const post = document.querySelector(".post");
const age= document.querySelector(".age");
const formj = document.querySelector(".formj");
const invalidnbr = document.querySelector(".invalidnumbr");
const invalidnom = document.querySelector(".mesageinvalidN");
const invalidage = document.querySelector(".invalidage");
let indexmodification = -1;
let cartemodification = null;

ouvrirModal() 

fermerModal()

// Récupérer les informations de modification
document.addEventListener("modifierJoueur", (event) => {
    indexmodification = event.detail.index;
    cartemodification = event.detail.carte;
});

// validation de formilair 
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;
    
    if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 1 et 30";
        valid = false;
    } else {
        invalidnbr.textContent = "";
    }

    if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";
        valid = false;
    } else {
        invalidnom.textContent = "";
    }
    if (!regexage.test(age.value.trim())) {
        invalidage.textContent = "age est invalide";
        valid = false;
    } else {
        invalidage.textContent = "";
    }

    if (!valid) {
        return;
    }

    // Créer le joueur
    const jou = {
        id: indexmodification === -1
            ? Date.now().toString()
            : listj[indexmodification].id,
        nom: nom.value.trim(),
        numero: Number(num.value.trim()),
        poste: post.value,
        age: age.value,
        statut: statut.value,

    };

    // Vérifier si le numéro existe déjà
    const numeroExiste = listj.some((j, index) =>
        j.numero === jou.numero && index !== indexmodification
    );

    if (numeroExiste) {
        invalidnbr.textContent = "Ce numéro est déjà utilisé";
        return;
    }

    if (indexmodification === -1) {

        listj.push(jou);

    } else {

        // Modifier le joueur
        listj[indexmodification] = jou;
    }

    sauvegarderJoueurs();
    afficherJoueurs();

    form.reset();

    modal.classList.remove("formpop");

    indexmodification = -1;
    cartemodification = null;

    actualiserCompteur();
});

// Afficher les joueurs
export function afficherJoueurs(joueursafficher=listj) {
    formj.innerHTML = "";

   joueursafficher.forEach(function(jou) {
        const parent = creercarte(jou);
        formj.append(parent);
        
    });

    // Afficher les positions déjà enregistrées
    // listj.forEach(function(jou) {
    //     if (jou.position) {
    //         assignerJoueur(jou, jou.position);
    //     }
    // });
 }

// Vérifier le nom pendant la saisie
nom.addEventListener("input", function() {

    if (nom.value.trim() === "") {
        invalidnom.textContent = "";

    } else if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";

    } else {
        invalidnom.textContent = "";
    }
});

// Vérifier le numéro pendant la saisie
num.addEventListener("input", function() {

    if (num.value.trim() === "") {
        invalidnbr.textContent = "";

    } else if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 2 et 30";

    } else {
        invalidnbr.textContent = "";
    }
});

// Affichage initial
afficherJoueurs()
actualiserCompteur();
search(listj);
 catigorijoueur(listj)
 let itemsPerPage = 6;
let currentPage = 1;
 afficherParPagination(listj,currentPage,itemsPerPage)



