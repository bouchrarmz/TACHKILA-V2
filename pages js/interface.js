
// Ouvrir une modale
export function ouvrirModal() {
    const modal = document.querySelector("#popup-joueur");
    const ajoute = document.getElementById("btn");

    if (!ajoute || !modal) return;
    ajoute.addEventListener("click", () => {
        modal.classList.add("formpop");
    });
}

// Fermer une modale
export function fermerModal() {
    const form = document.querySelector("#form");
    const modal = document.querySelector("#popup-joueur");
    const annuler = document.querySelector(".btn-annuler");
    annuler.addEventListener("click", () => {
        modal.classList.remove("formpop");
        form.reset()
        // indexmodification = -1;
        // cartemodification = null;
    });
    
}

// Afficher un message (Toast)
export function afficherMsgError(message) {
    const toast = document.querySelector("#toast");

    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}