"use strict";

// ======================================================
// FICHIER D'ENTRÉE PRINCIPAL (CHEF D'ORCHESTRE)
// ======================================================

// Importation des initialiseurs de chaque module
import { initBackgroundVideo } from "./modules/background-video.js";
import { initOverlay } from "./modules/overlay.js";
import { initAuth } from "./modules/auth.js";
import { initTour } from "./modules/tour.js";
import { initCalendar } from "./modules/calendar.js";
import { initBooking } from "./modules/booking.js";
import { initMobileNav } from "./modules/mobile-nav.js";

/**
 * Affiche un message de confirmation ou d'annulation après une redirection de paiement.
 */
function handlePaymentRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get("payment_status");

  if (paymentStatus === "success") {
    alert(
      "Paiement réussi ! Votre réservation est confirmée. Vous allez recevoir un e-mail de confirmation."
    );
  }

  if (paymentStatus === "canceled") {
    alert(
      "Le paiement a été annulé. Votre réservation n'a pas été finalisée. Vous pouvez essayer à nouveau."
    );
  }

  // Nettoie l'URL pour que le message n'apparaisse pas si l'utilisateur recharge la page
  if (paymentStatus) {
    history.replaceState(null, "", window.location.pathname);
  }
}

// Attend que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Lance chaque module
  initMobileNav(); // <-- AJOUTEZ CETTE LIGNE
  initOverlay();
  initAuth();
  initTour();
  initCalendar();
  initBooking();
  initBackgroundVideo();

  // Gère les redirections de paiement
  handlePaymentRedirect();

  console.log("Application modulaire initialisée avec succès.");
});
