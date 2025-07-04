// Fichier : assets/js/modules/user-lifecycle.js
"use strict";

import { users } from "./auth.js"; // ATTENTION: Il faudra exporter la variable 'users' depuis auth.js

/**
 * Révoque l'accès de l'utilisateur actuellement connecté.
 * Ceci est une simulation. Dans une vraie application, cela appellerait un backend.
 */
function revokeCurrentUserAccess() {
  // Dans notre simulation, nous n'avons qu'un seul vrai utilisateur modifiable.
  // Nous allons cibler 'Bungalow971' pour la démo.
  const currentUser = users.find((u) => u.username === "Bungalow971");

  if (currentUser) {
    currentUser.status = "revoked";
    console.log(
      `Statut de ${currentUser.username} mis à jour : ${currentUser.status}`
    );
    alert(
      "Merci pour votre avis ! Votre accès va maintenant être révoqué. Vous allez être déconnecté."
    );

    // Déconnexion et rechargement de la page
    sessionStorage.removeItem("isUserLoggedIn");
    window.location.reload();
  }
}

/**
 * Initialise les déclencheurs du cycle de vie de l'utilisateur.
 */
export function initUserLifecycle() {
  // On utilise la délégation d'événement sur le document
  // car le bouton est dans une modale chargée dynamiquement.
  document.addEventListener("click", function (event) {
    if (event.target && event.target.id === "simulate-review-btn") {
      revokeCurrentUserAccess();
    }
  });
}
