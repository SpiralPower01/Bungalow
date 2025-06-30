"use strict";
import { DOM } from "../dom-loader.js";
import { getBookingDetails } from "./calendar.js";

export function initBooking() {
  if (!DOM.bookNowBtn) return;

  DOM.bookNowBtn.addEventListener("click", async () => {
    const bookingDetails = getBookingDetails();

    if (!bookingDetails || bookingDetails.total <= 0) {
      alert("Veuillez sélectionner une période valide avant de réserver.");
      return;
    }

    DOM.bookNowBtn.textContent = "Préparation...";
    DOM.bookNowBtn.disabled = true;

    try {
      const response = await fetch(
        "http://localhost:3000/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails), // On envoie tous les détails
        }
      );

      if (!response.ok) {
        throw new Error("La réponse du serveur n'est pas valide.");
      }

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error("Erreur lors de la redirection vers Stripe:", error);
      alert("Une erreur est survenue. Impossible de procéder au paiement.");
      DOM.bookNowBtn.textContent = "Réserver";
      // On recalcule le prix pour s'assurer que le bouton est dans le bon état
      // (Cette partie pourrait être améliorée en important calculateAndDisplayPrice)
      DOM.bookNowBtn.disabled = false;
    }
  });
}
