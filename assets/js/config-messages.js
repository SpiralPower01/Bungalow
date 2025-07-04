// Fichier : assets/js/config-messages.js
"use strict";

/**
 * ======================================================
 * CONFIGURATION : MODÈLES DE MESSAGES
 * ======================================================
 * Centralise les modèles de messages (email/SMS) pour une
 * gestion et une évolution facilitées.
 * Inspiré du document "Exemple de méssage personalisable...".
 */

export const messageTemplates = {
  // --- Envoyé après la réservation pour donner les accès ---
  temporaryCredentials: {
    subject: "Vos accès à l'espace client du bungalow",
    body: `Bonjour {firstname}, suite à votre réservation, nous avons le plaisir de vous donner accès à votre espace client personnalisé. Vous y trouverez toutes les informations sur votre séjour, le livret d'accueil, et pourrez compléter votre heure d'arrivée.\n\nConnectez-vous sur : {experience_url}\nIdentifiant : {email}\nMot de passe temporaire : {temp_password}\n\nNous vous recommandons de conserver ce mot de passe précieusement. Il sera valide jusqu'à une semaine après la fin de votre séjour.`,
  },

  // --- Message de bienvenue, envoyé le jour de l'arrivée ---
  welcome: {
    subject: "Bienvenue au Bungalow {firstname} !",
    body: `Ça y est, vous êtes arrivés ! Nous vous souhaitons un excellent séjour. N'oubliez pas de consulter les instructions d'entrée dans votre espace client pour le code de la boîte à clés et le Wi-Fi.`,
  },

  // --- Rappel de fin de séjour ---
  departureReminder: {
    subject: "Informations concernant votre départ",
    body: `Bonjour {firstname}, nous espérons que votre séjour se passe bien. Juste un petit rappel, votre départ est prévu le {departure_date} à {departure_time}. Merci de suivre les instructions de départ disponibles dans votre espace client.`,
  },

  // --- Message de remerciement après le départ ---
  postDeparture: {
    subject: "Merci pour votre séjour !",
    body: `Toute l'équipe vous remercie d'avoir choisi notre bungalow. Nous espérons vous revoir bientôt ! Si vous avez apprécié votre expérience, n'hésitez pas à nous laisser un avis.`,
  },

  // --- Message pour inciter à compléter le profil ---
  completeProfile: {
    subject: "Finalisez la préparation de votre séjour !",
    body: `Bonjour {firstname}, nous avons remarqué que votre heure d'arrivée n'est pas encore renseignée. Pour nous permettre d'organiser au mieux votre accueil, merci de la compléter dans votre espace profil.`,
  },
};
