// Fichier : assets/js/modules/notifications.js
"use strict";

/**
 * ======================================================
 * MODULE : SIMULATION DE NOTIFICATIONS
 * ======================================================
 */

/**
 * Gère la simulation des notifications pour le client.
 * Actuellement, il vérifie si un rappel de fin de séjour doit être envoyé.
 * @param {object} userData - L'objet contenant les informations du profil de l'utilisateur.
 */
export function handleNotifications(userData) {
  // S'assurer que les données utilisateur existent
  if (!userData) return;

  // --- DÉCLENCHEUR 1 : RAPPEL DE FIN DE SÉJOUR ---
  checkDepartureReminder(userData);

  // (Futurs déclencheurs pourront être ajoutés ici)
}

/**
 * Vérifie si la date de départ du client est dans moins de 24h.
 * Si c'est le cas, affiche une notification de simulation dans la console.
 * @param {object} userData - L'objet contenant les informations du profil.
 */
function checkDepartureReminder(userData) {
  // S'assurer que la date de départ existe et est dans un format valide (ex: "17/08/2025 à 11:00")
  if (!userData.departure) {
    return;
  }

  // Conversion de la date de départ en objet Date valide
  const [datePart, timePart] = userData.departure.split(" à ");
  const [day, month, year] = datePart.split("/");
  // Note : month - 1 car les mois en JS sont de 0 à 11
  const departureDate = new Date(`${year}-${month}-${day}T${timePart}:00`);

  const now = new Date();

  // Calcule la différence en millisecondes
  const timeDifference = departureDate.getTime() - now.getTime();

  // Convertit la différence en heures
  const hoursDifference = timeDifference / (1000 * 3600);

  // Si le départ est dans le futur ET à moins de 24 heures
  if (hoursDifference > 0 && hoursDifference <= 24) {
    const clientName = `${userData.firstname || "Client"} ${
      userData.lastname || ""
    }`.trim();
    console.log(
      `%cSIMULATION : Envoi du SMS de fin de séjour au client ${clientName} avec les instructions de départ.`,
      "color: #00838f; font-weight: bold; font-size: 1.1em;"
    );
  }
}
