 import { joueursInitiaux } from "./donnees-initiales.js";

export let listj =
    JSON.parse(localStorage.getItem("joueurs")) || joueursInitiaux;

export function sauvegarderJoueurs() {
    localStorage.setItem("joueurs", JSON.stringify(listj));
}