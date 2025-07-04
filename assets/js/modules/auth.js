// Fichier : assets/js/modules/auth.js
"use strict";

/**
 * ======================================================
 * MODULE : GESTION DE L'AUTHENTIFICATION (v2 - avec cycle de vie)
 * ======================================================
 * Ce module gère l'état de connexion de l'utilisateur.
 * Il vérifie non seulement les identifiants mais aussi le statut du compte.
 * Il utilise sessionStorage pour conserver l'état de connexion
 * tant que l'onglet du navigateur est ouvert.
 */

// Données de simulation pour les utilisateurs.
// À terme, ces données viendront d'un appel à notre backend.
export const users = [
  {
    username: "Bungalow971",
    password: "Password2025!",
    status: "active", // Ce client a un accès valide.
    profile: {
      firstname: "Jean",
      lastname: "Dupont",
      email: "jean.dupont@email.com",
      phone: "0601020304",
      // ...autres données de profil
    },
  },
  {
    username: "ancienClient",
    password: "password123",
    status: "revoked", // Ce client a un accès révoqué.
    profile: {
      firstname: "Marie",
      lastname: "Durand",
    },
  },
];

/**
 * Tente de connecter un utilisateur avec les identifiants fournis.
 * @param {string} username - Le nom d'utilisateur entré.
 * @param {string} password - Le mot de passe entré.
 * @returns {string} "success" si la connexion réussit, "revoked" si l'accès est révoqué, "failed" sinon.
 */
export function login(username, password) {
  // 1. On cherche l'utilisateur dans notre liste de simulation.
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    // Si l'utilisateur n'est pas trouvé
    console.log("Échec de l'authentification : identifiants incorrects.");
    return "failed";
  }

  // 2. L'utilisateur est trouvé, on vérifie son statut.
  if (user.status !== "active") {
    // Si le compte n'est pas actif
    console.log(
      `Tentative de connexion bloquée pour ${username}. Statut : ${user.status}`
    );
    return "revoked";
  }

  // 3. Tout est correct, la connexion est autorisée.
  sessionStorage.setItem("isUserLoggedIn", "true");
  // On pourrait aussi stocker les informations du profil si nécessaire
  // localStorage.setItem('bungalowUserData', JSON.stringify(user.profile));
  console.log("Authentification réussie pour", username);
  return "success";
}

/**
 * Déconnecte l'utilisateur en supprimant le drapeau de session.
 */
export function logout() {
  sessionStorage.removeItem("isUserLoggedIn");
  // On pourrait aussi nettoyer les données du profil
  // localStorage.removeItem('bungalowUserData');
  console.log("Utilisateur déconnecté.");
}

/**
 * Vérifie si l'utilisateur est actuellement connecté.
 * @returns {boolean} Vrai si l'utilisateur est connecté, sinon faux.
 */
export function isLoggedIn() {
  const loggedIn = sessionStorage.getItem("isUserLoggedIn");
  return loggedIn === "true";
}
