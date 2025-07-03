// Fichier : assets/js/modules/content-modal.js
"use strict";

/**
 * ======================================================
 * MODULE : CONTRÔLEUR DE MODALE DE CONTENU
 * ======================================================
 * Gère une modale générique pour afficher un titre et un contenu HTML.
 * Sait maintenant gérer les accordéons.
 */

const dom = {
  modal: null,
  closeBtn: null,
  title: null,
  content: null,
};

/**
 * Ajoute les écouteurs d'événements pour l'accordéon.
 * Cette fonction est appelée si un accordéon est détecté dans le contenu.
 */
function setupAccordionEvents() {
  if (!dom.content) return;

  const accordionItems = dom.content.querySelectorAll(".accordion-item");
  if (accordionItems.length === 0) return;

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Optionnel : Fermer tous les autres items pour n'en garder qu'un ouvert.
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem.querySelector(".accordion-content").style.maxHeight = null;
      });

      // Ouvrir l'item cliqué (s'il était fermé).
      if (!isOpen) {
        item.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * Affiche la modale avec un titre et un contenu spécifiques.
 * @param {string} titleText - Le titre à afficher dans l'en-tête de la modale.
 * @param {string} contentHTML - Le contenu HTML à injecter dans le corps de la modale.
 */
export function show(titleText, contentHTML) {
  if (!dom.modal) return;
  dom.title.textContent = titleText;
  dom.content.innerHTML = contentHTML;

  // Après avoir injecté le HTML, on vérifie s'il y a un accordéon à activer.
  setupAccordionEvents();

  dom.modal.classList.add("is-visible");
  document.body.style.overflow = "hidden";
}

/**
 * Cache la modale.
 */
function hide() {
  if (!dom.modal) return;
  dom.modal.classList.remove("is-visible");
  document.body.style.overflow = "";
}

/**
 * Initialise le module en sélectionnant les éléments du DOM et en attachant les écouteurs.
 */
export function initContentModal() {
  dom.modal = document.querySelector("#content-modal");
  if (!dom.modal) {
    return;
  }
  dom.closeBtn = dom.modal.querySelector(".modal-close-btn");
  dom.title = dom.modal.querySelector(".modal-header h3");
  dom.content = dom.modal.querySelector(".modal-content");

  if (!dom.closeBtn || !dom.title || !dom.content) {
    console.error("Structure de la modale de contenu invalide.");
    return;
  }

  dom.closeBtn.addEventListener("click", hide);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) {
      hide();
    }
  });

  console.log("Module Content Modal initialisé.");
}
