"use strict";

// Imports des modules nécessaires pour la page d'accueil
import { isLoggedIn } from "./modules/auth.js";
import { initScrollAnimations } from "./modules/animations.js";
// CORRECTION : L'import du module d'équipement est supprimé car il n'est plus utilisé ici.

// --- NOUVEAU : BLOC DE REDIRECTION AUTOMATIQUE ---
(function autoRedirectClient() {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentStatus = urlParams.get("payment_status");

  // Étape 1 : Si l'utilisateur vient de payer avec succès, on le marque comme client.
  if (paymentStatus === "success") {
    localStorage.setItem("isClient", "true");
    // On nettoie l'URL et on redirige immédiatement vers l'expérience.
    window.history.replaceState(null, "", window.location.pathname); // Supprime les paramètres de l'URL
    window.location.replace("experience.html");
    return; // Stoppe le script ici
  }

  // Étape 2 : Si l'utilisateur est un client connu (drapeau permanent ou session active), on le redirige.
  const isAClient = localStorage.getItem("isClient") === "true";
  if (isAClient || isLoggedIn()) {
    window.location.replace("experience.html");
  }
})();
// --- FIN DU BLOC DE REDIRECTION ---

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
