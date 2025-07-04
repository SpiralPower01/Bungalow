// Fichier : assets/js/modules/guide-controller.js
"use strict";

import { guideData } from "../config-guide.js";

const dom = {
  modal: document.querySelector("#guide-modal"),
  closeBtn: document.querySelector("#close-guide-modal-btn"),
  title: document.querySelector("#guide-modal-title"),
  content: document.querySelector("#guide-modal-content"),
};

/**
 * Gère la logique d'ouverture/fermeture d'un accordéon (avec fermeture automatique des autres).
 * @param {HTMLElement} accordionContainer - Le conteneur de l'accordéon à gérer.
 */
function setupAccordionEvents(accordionContainer) {
  const items = accordionContainer.querySelectorAll(":scope > .accordion-item");
  if (!items) return;

  items.forEach((item) => {
    const header = item.querySelector(":scope > .accordion-header");
    header.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");

      // On ferme tous les éléments du même niveau
      items.forEach((i) => {
        i.classList.remove("is-open");
        i.querySelector(":scope > .accordion-content").style.maxHeight = null;
      });

      // Si l'élément cliqué n'était pas déjà ouvert, on l'ouvre
      if (!wasOpen) {
        item.classList.add("is-open");
        const content = item.querySelector(":scope > .accordion-content");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

/**
 * Génère le HTML de l'accordéon et l'injecte dans la modale.
 */
function renderAccordion() {
  if (!dom.content) return;

  const partner = guideData.partners[0];

  const mainAccordionHTML = `
    <div class="accordion">
      <div class="accordion-item">
        <button class="accordion-header">
          <span><i class="fas fa-star"></i> ${partner.category}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="accordion-content">
          <h4>${partner.name}</h4>
          <p>${partner.description}</p>
          <div class="guide-item-details">
            <span class="address-line"><i class="fas fa-map-marker-alt"></i><span>${
              partner.address
            }</span></span>
            <a href="${
              partner.mapsLink
            }" target="_blank" class="nav-app-link" aria-label="Itinéraire"><i class="fas fa-route"></i></a>
          </div>
          <div class="guide-item-socials">
          
            <a href="${
              partner.socials.instagram
            }" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="${
              partner.socials.facebook
            }" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="${
              partner.socials.google
            }" target="_blank" aria-label="Page Google"><i class="fab fa-google"></i></a>
          </div>
          <p class="partner-note">${partner.note}</p>
        </div>
      </div>

      ${guideData.placesOfInterest
        .map(
          (category) => `
        <div class="accordion-item">
            <button class="accordion-header">
                <span><i class="${category.icon}"></i> ${
            category.category
          }</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                <ul class="guide-list">
                    ${category.items
                      .map(
                        (item) => `
                        <li>
                            <span>${item.name}</span>
                            <a href="${item.mapsLink}" target="_blank" class="nav-app-link" aria-label="Itinéraire"><i class="fas fa-route"></i></a>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        </div>
      `
        )
        .join("")}


      <div class="accordion-item">
        <button class="accordion-header">
          <span><i class="fas fa-concierge-bell"></i> Services Utiles</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="accordion-content">
          <div class="accordion accordion--nested">
            ${guideData.services
              .map(
                (service) => `
              <div class="accordion-item">
                <button class="accordion-header">
                  <span>${service.category}</span>
                  <i class="fas fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                  <ul class="guide-list">
                    ${service.items
                      .map(
                        (item) => `
                      <li>
                        <div class="service-info">
                          <span class="service-name">${item.name}</span>
                          <span class="service-details">${item.distance} - Note : ${item.note}</span>
                        </div>
                        <a href="${item.link}" target="_blank" class="nav-app-link" aria-label="Lien"><i class="fas fa-external-link-alt"></i></a>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  dom.content.innerHTML = mainAccordionHTML;

  // On active la logique pour les deux niveaux d'accordéon
  const mainAccordion = dom.content.querySelector(".accordion");
  const nestedAccordion = mainAccordion.querySelector(".accordion--nested");

  setupAccordionEvents(mainAccordion);
  if (nestedAccordion) {
    setupAccordionEvents(nestedAccordion);
  }
}

function showModal() {
  if (!dom.modal) return;
  renderAccordion();
  dom.modal.classList.add("is-visible");
}

function hideModal() {
  if (!dom.modal) return;
  dom.modal.classList.remove("is-visible");
}

export function initGuideController() {
  const guideButton = document.querySelector('a.hub-button[href="#guide"]');
  if (!guideButton || !dom.modal || !dom.closeBtn) return;

  guideButton.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  dom.closeBtn.addEventListener("click", hideModal);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) {
      hideModal();
    }
  });

  console.log("Module Guide Controller (v2 - accordéon unique) initialisé.");
}
