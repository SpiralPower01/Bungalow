// ======================================================
// MODULE : SIMULATION DE NOTIFICATIONS
// ======================================================

/**
 * Gère la simulation des notifications pour le client.
 * Actuellement, il vérifie si un rappel de fin de séjour doit être envoyé.
 * @param {object} userProfile - L'objet contenant les informations du profil utilisateur.
 */
export function handleNotifications(userProfile) {
  // --- DÉCLENCHEUR 1 : RAPPEL DE FIN DE SÉJOUR ---
  checkDepartureReminder(userProfile);

  // (Futurs déclencheurs pourront être ajoutés ici)
}

/**
 * Vérifie si la date de départ du client est dans moins de 24h.
 * Si c'est le cas, affiche une notification de simulation dans la console.
 * @param {object} userProfile - L'objet contenant les informations du profil utilisateur.
 */
function checkDepartureReminder(userProfile) {
  // S'assurer que la date de départ existe dans le profil
  if (!userProfile || !userProfile.departureDate) {
    return; // Pas de date de départ, on ne fait rien.
  }

  const departureDate = new Date(userProfile.departureDate);
  const now = new Date();

  // Calcule la différence en millisecondes
  const timeDifference = departureDate.getTime() - now.getTime();

  // Convertit la différence en heures (1000ms * 60s * 60min)
  const hoursDifference = timeDifference / (1000 * 3600);

  // Si le départ est dans le futur et à moins de 24 heures
  if (hoursDifference > 0 && hoursDifference <= 24) {
    console.log(
      `%cSIMULATION : Envoi du SMS de fin de séjour au client ${userProfile.name} avec les instructions de départ.`,
      "color: #007bff; font-weight: bold;"
    );
  }
}
