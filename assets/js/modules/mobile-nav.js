// Fichier : assets/js/modules/mobile-nav.js
"use strict";
import { DOM } from "../dom-loader.js";

function closeNavMenu() {
  DOM.mainNav.classList.remove("nav--visible");
  const icon = DOM.navToggleBtn.querySelector("i");
  icon.classList.remove("fa-times");
  icon.classList.add("fa-bars");
}

function openNavMenu() {
  DOM.mainNav.classList.add("nav--visible");
  const icon = DOM.navToggleBtn.querySelector("i");
  icon.classList.add("fa-times");
  icon.classList.remove("fa-bars");
}

export function initMobileNav() {
  // Sécurité : si les éléments n'existent pas, on ne fait rien.
  if (!DOM.navToggleBtn || !DOM.mainNav) return;

  DOM.navToggleBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche le clic de se propager au document
    const isVisible = DOM.mainNav.classList.contains("nav--visible");
    if (isVisible) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  });

  // NOUVEAU : Écouteur pour fermer le menu si on clique en dehors
  document.addEventListener("click", (event) => {
    const isVisible = DOM.mainNav.classList.contains("nav--visible");
    // Si le menu est visible et que le clic n'est ni sur le menu, ni sur le bouton qui l'ouvre
    if (
      isVisible &&
      !DOM.mainNav.contains(event.target) &&
      !DOM.navToggleBtn.contains(event.target)
    ) {
      closeNavMenu();
    }
  });
}
