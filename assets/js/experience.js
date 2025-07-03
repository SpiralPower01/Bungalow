// Fichier : assets/js/experience.js
"use strict";

// --- IMPORTATIONS DES MODULES ---
// Chaque module est importé avec un chemin relatif clair.
import { initCalendar } from "./modules/calendar.js";
import { initTour } from "./modules/tour-controller.js";
import { closeModal as closeTourModal } from "./modules/tour-ui.js";
import focusOverlay from "./modules/focus-overlay.js";
import equipmentModal from "./modules/equipment-modal.js";
import { initLoginController } from "./modules/login-controller.js";
import { isLoggedIn } from "./modules/auth.js";
import {
  initContentModal,
  show as showContentModal,
} from "./modules/content-modal.js";
import {
  INFO_PUBLIC_HTML,
  INFO_PROTECTED_HTML,
} from "./modules/content-data.js";
import { initProfileController } from "./modules/profile-controller.js";
import { handleNotifications } from "./modules/notifications.js";

/**
 * Gère la bannière de bienvenue pour les utilisateurs connectés.
 */
function initWelcomeBanner() {
  const banner = document.querySelector("#welcome-banner");
  if (!banner) return;

  const data = JSON.parse(localStorage.getItem("bungalowUserData")) || {};
  const firstname = data.firstname || "Client";
  const lastname = data.lastname || "";

  let arrivalInfo = "Arrivée non définie";
  if (data.arrival) {
    const arrivalDate = new Date(data.arrival);
    arrivalInfo = arrivalDate.toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  let departureInfo = "Départ non défini";
  if (data.departure) {
    departureInfo = data.departure;
  }

  banner.innerHTML = `
        <div class="welcome-message">
            <p>Bienvenue, <strong>${firstname} ${lastname}</strong></p>
        </div>
        <div class="welcome-details">
            <p><strong>Arrivée :</strong> ${arrivalInfo}</p>
            <p><strong>Départ :</strong> ${departureInfo}</p>
        </div>
    `;
}

/**
 * Gère la transition de sortie lors du clic sur un lien.
 */
function setupPageExit(linkSelector) {
  const link = document.querySelector(linkSelector);
  if (link) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const destination = event.currentTarget.href;
      document.body.classList.add("is-exiting");
      setTimeout(() => {
        window.location.href = destination;
      }, 400);
    });
  }
}

/**
 * Initialise le bouton de sortie globale des overlays.
 */
function initGlobalOverlayExit() {
  const exitButtons = document.querySelectorAll(".global-overlay-close-btn");
  if (exitButtons.length > 0) {
    exitButtons.forEach((button) => {
      button.addEventListener("click", () => {
        closeTourModal();
        focusOverlay.hide();
      });
    });
  }
}

/**
 * Initialise les interactions du Hub de navigation.
 */
function initHubInteractions() {
  const infoButton = document.querySelector(
    'a.hub-button[href="#fonctionnement"]'
  );
  if (infoButton) {
    infoButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (isLoggedIn()) {
        showContentModal("Informations & Fonctionnement", INFO_PROTECTED_HTML);
      } else {
        showContentModal("Informations Générales", INFO_PUBLIC_HTML);
      }
    });
  }
}

// --- POINT D'ENTRÉE PRINCIPAL DE L'APPLICATION ---
// S'exécute une fois que toute la page HTML est chargée.
document.addEventListener("DOMContentLoaded", () => {
  // On vérifie l'état de connexion en premier.
  if (isLoggedIn()) {
    document.body.classList.add("user-is-logged-in");
    initWelcomeBanner(); // Affiche la bannière si connecté.
  }

  // Gère l'animation d'entrée de la page.
  document.body.classList.remove("is-entering");
  setupPageExit(".back-to-home-link");

  // Initialise tous les modules un par un.
  initLoginController();
  initCalendar();
  initTour();
  equipmentModal.init();
  initContentModal();
  initHubInteractions();
  initProfileController();

  const galleryTriggerBtn = document.querySelector("#open-focus-gallery-btn");
  if (galleryTriggerBtn) {
    focusOverlay.init(galleryTriggerBtn);
  }

  initGlobalOverlayExit();
  console.log("Page Expérience initialisée avec tous les modules.");
});
