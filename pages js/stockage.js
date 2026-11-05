 import { joueursInitiaux } from "./donnees-initiales.js";

export let listj = JSON.parse(localStorage.getItem("joueurs")) || joueursInitiaux;

export function sauvegarderJoueurs() {
    localStorage.setItem("joueurs", JSON.stringify(listj));
}
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