
import{ assignerJoueur , creercarte , creerSelectPosition , actualiserCompteur } from "./joueurs.js";
import { listj, sauvegarderJoueurs } from "./stockage.js";
import { regexnom, regexnumbrejoueur, regexage } from "./validation.js";
const form = document.querySelector('#form')
const ajoute = document.querySelector("#btn");
const modal = document.querySelector("#popup-joueur");
let indexmodification = -1;
let cartemodification = null;
const nom = document.querySelector('.nom');
const num = document.querySelector('.num');
const post = document.querySelector('.post');
const formj = document.querySelector('.formj');
const age =document.querySelector('.age');
const statut = document.querySelector('.statut');

ajoute.addEventListener('click', () => {
    modal.classList.add('formpop');
});
 function ajoutejoueure(){
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

     if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 1 et 10";
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

    if (!valid) {
        return;
    }

    const jou = {
        nom: nom.value.trim(),
        num: num.value.trim(),
        post: post.value
    };

    if (indexmodification === -1) {
        const numeroExiste = listj.some(j => j.num === jou.num);

        if (numeroExiste) {
            invalidnbr.textContent = "Ce numero  déja utilise";
            return;
        }
        
        
       listj.push(jou);
        sauvegarderJoueurs();

    const parent = creercarte(jou);
          formj.append(parent);

       

    } else {
        const joueurActuel = listj[indexmodification];
        const numeroExiste = listj.some((j, index) =>
            j.num === jou.num && index !== indexmodification
        );
        if (numeroExiste) {
            invalidnbr.textContent = "Ce numéro est déjà utilisé";
            return;
        }

        joueurActuel.nom = jou.nom;
        joueurActuel.num = jou.num;
        joueurActuel.post = jou.post;
        sauvegarderJoueurs();

        
        cartemodification.querySelector(".numero-joueur").textContent = jou.num;
        cartemodification.querySelector(".nom-joueur").textContent = jou.nom;
        cartemodification.querySelector(".poste-joueur").textContent = jou.post;
    }

    compter = listj.length;
    nombrejoueur.textContent = compter + " joueur(s)";

    
    form.reset();
    modal.classList.remove('formpop');

    indexmodification = -1;
    cartemodification = null;

    if (hd) {
        hd.classList.add('hidden');
    }
});

nom.addEventListener("input", function() {
    if (nom.value.trim() === "") {
        invalidnom.textContent = "";
    } else if (!regexnom.test(nom.value.trim())) {
        invalidnom.textContent = "Le nom est invalide";
    } else {
        invalidnom.textContent = "";
    }
});

num.addEventListener("input", function() {
    if (num.value.trim() === "") {
        invalidnbr.textContent = "";
    } else if (!regexnumbrejoueur.test(num.value.trim())) {
        invalidnbr.textContent = "Entre un numéro entre 1 et 20";
    } else {
        invalidnbr.textContent = "";
    }
});

// AFFICHER J 
formj.innerHTML = "";

listj.forEach(function(jou) {
    const parent = creercarte(jou);
    formj.append(parent);
});

listj.forEach(function(jou) {
    if (jou.position) {
        assignerJoueur(jou, jou.position);
    }
});
}
actualiserCompteur();





