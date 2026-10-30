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
    nombrejoueur.textContent = listj.length + " joueur(s)";

    if (listj.length > 0) {
        hd.classList.add("hidden");
    } else {
        hd.classList.remove("hidden");
    }
}

 export function creerSelectPosition(joueur) {
    const select = document.createElement("select");

    select.classList.add(
        "w-full",
        "bg-slate-900",
        "text-white",
        "p-2",
        "rounded-lg",
        "mt-2"
    );

    const banc = document.createElement("option");
    banc.value = "";
    banc.textContent = "Sur le banc";
    select.append(banc);

    Object.keys(positions).forEach(function(positionId) {
        if (positions[positionId].poste === joueur.post) {
            const option = document.createElement("option");
            option.value = positionId;
            option.textContent = positions[positionId].nom;
            select.append(option);
        }
    });

    select.value = joueur.position || "";

    select.addEventListener("change", function() {
        const anciennePosition = joueur.position || "";

        if (!assignerJoueur(joueur, select.value)) {
            select.value = anciennePosition;
        }
    });

    return select;
}

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
    span.textContent = jou.num;
    para.append(span);

    const titre = document.createElement("h1");
    titre.classList.add("font-bold", "text-white", "nom-joueur");
    titre.textContent = jou.nom;

    const parachild = document.createElement("p");
    parachild.classList.add("text-sm", "text-orange-400", "poste-joueur");
    parachild.textContent = jou.post;

    const divchild = document.createElement("div");
    divchild.append(titre, parachild);

    const ligneJoueur = document.createElement("div");
    ligneJoueur.classList.add(
        "flex", "justify-between", "items-center", "gap-3"
    );
    ligneJoueur.append(para, divchild);

    const divicon = document.createElement("div");
    divicon.classList.add("flex", "gap-4");

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

    const edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen", "cursor-pointer");

    edit.addEventListener("click", function() {
        cartemodification = parent;
        indexmodification = listj.indexOf(jou);

        nom.value = jou.nom;
        num.value = jou.num;
        post.value = jou.post;

        modal.classList.add("formpop");
    });

    divicon.append(sup, edit);
    ligneJoueur.append(divicon);
    parent.append(ligneJoueur);

    const selectPosition = creerSelectPosition(jou);
    parent.append(selectPosition);

    return parent;
}
 export function assignerJoueur(joueur, positionId) {
    document.querySelectorAll(".tiran").forEach(caseTerrain => {
        if (caseTerrain.dataset.joueur === joueur.num) {
            caseTerrain.innerHTML = caseTerrain.dataset.label || "";
            caseTerrain.classList.remove("occupee");
            delete caseTerrain.dataset.joueur;
        }
    });

    joueur.position = positionId;

    // Retour sur le banc
    if (!positionId) {
        sauvegarderJoueurs();
        return true;
    }

    const caseTerrain = document.getElementById(positionId);

    if (!caseTerrain) {
        joueur.position = "";
        sauvegarderJoueurs();
        return false;
    }


    // Verifier si occupée
    const occupee = listj.some(j =>
        j !== joueur && j.position === positionId
    );

    if (occupee) {
        const message= document.querySelector("#message")
        message.textContent =
        "Cette position est déjà occupée !";
        message.classList.remove("hidden");
        setTimeout(() => {
        message.classList.add("hidden");
    }, 3000);

        joueur.position = "";
        sauvegarderJoueurs();
        return false;
    }

    caseTerrain.dataset.label = positions[positionId].nom;
    caseTerrain.dataset.joueur = joueur.num;
    caseTerrain.classList.add("occupee");
    caseTerrain.innerHTML = `
        <div class="carte-terrain">
            <span>${joueur.num}</span>
            <span>${joueur.nom}</span>
        </div>
    `;

    sauvegarderJoueurs();
    return true;
}

