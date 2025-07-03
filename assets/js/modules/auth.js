// Fichier : assets/js/modules/auth.js
"use strict";

/**
 * ======================================================
 * MODULE : GESTION DE L'AUTHENTIFICATION (SIMULÉE)
 * ======================================================
 * Ce module gère l'état de connexion de l'utilisateur.
 * Il utilise sessionStorage pour conserver l'état de connexion
 * tant que l'onglet du navigateur est ouvert.
 */

// Identifiants de connexion pour la simulation
const VALID_USERNAME = "Bungalow971";
const VALID_PASSWORD = "Password2025!";

/**
 * Tente de connecter un utilisateur avec les identifiants fournis.
 * @param {string} username - Le nom d'utilisateur entré.
 * @param {string} password - Le mot de passe entré.
 * @returns {boolean} Vrai si la connexion a réussi, sinon faux.
 */
export function login(username, password) {
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Si les identifiants sont corrects, on enregistre un "drapeau"
    // dans le stockage de la session du navigateur.
    sessionStorage.setItem("isUserLoggedIn", "true");
    console.log("Authentification réussie.");
    return true;
  }
  console.log("Échec de l'authentification.");
  return false;
}

/**
 * Déconnecte l'utilisateur en supprimant le drapeau de session.
 */
export function logout() {
  sessionStorage.removeItem("isUserLoggedIn");
  console.log("Utilisateur déconnecté.");
}

/**
 * Vérifie si l'utilisateur est actuellement connecté.
 * @returns {boolean} Vrai si l'utilisateur est connecté, sinon faux.
 */
export function isLoggedIn() {
  // On vérifie simplement la présence et la valeur de notre drapeau.
  const loggedIn = sessionStorage.getItem("isUserLoggedIn");
  return loggedIn === "true";
}
