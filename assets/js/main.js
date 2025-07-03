"use strict";

// Imports des modules nécessaires pour la page d'accueil
import { initScrollAnimations } from "./modules/animations.js";
// CORRECTION : L'import du module d'équipement est supprimé car il n'est plus utilisé ici.

/**
 * Gère la transition de sortie lors du clic sur un lien.
 * @param {string} linkId - L'ID de l'élément <a> à cibler.
 * @param {HTMLElement} body - L'élément body de la page.
 */
function setupPageExit(linkId, body) {
  const link = document.getElementById(linkId);
  if (link) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const destination = event.currentTarget.href;
      body.classList.add("is-exiting");
      setTimeout(() => {
        window.location.href = destination;
      }, 400);
    });
  }
}

// --- ÉCOUTEUR D'ÉVÉNEMENTS PRINCIPAL ---
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // --- GESTION DES TRANSITIONS DE PAGE ---
  body.classList.remove("is-entering");
  setupPageExit("link-to-experience", body);

  // CORRECTION : Toute la logique de la modale équipement a été supprimée.

  // --- GESTION DU FORMULAIRE DE CONTACT (FORMSPREE) ---
  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#contact-form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      try {
        const response = await fetch(e.target.action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          formStatus.textContent = "Merci ! Votre message a bien été envoyé.";
          formStatus.style.color = "var(--color-primary)";
          contactForm.reset();
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.errors
            .map((error) => error.message)
            .join(", ");
          throw new Error(errorMessage);
        }
      } catch (error) {
        formStatus.textContent =
          "Oups ! Une erreur est survenue. Veuillez réessayer.";
        formStatus.style.color = "red";
        console.error("Erreur d'envoi Formspree:", error);
      }
    });
  }

  // --- INITIALISATIONS DES MODULES ---
  initScrollAnimations();
  // CORRECTION : L'initialisation du module équipement est supprimée.

  console.log("Application (index.html) allégée et initialisée.");
});
