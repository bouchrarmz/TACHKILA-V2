
// Ouvrir une modale
export function ouvrirModal(modal) {
    modal.classList.add("formpop");
}

// Fermer une modale
export function fermerModal(modal) {
    modal.classList.remove("formpop");
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