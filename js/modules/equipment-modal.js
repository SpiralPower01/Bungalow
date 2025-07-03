// Fichier : assets/js/modules/equipment-modal.js
"use strict";

import { EQUIPMENT_DATA } from "../config.js";

/**
 * Module pour initialiser et gérer la modale des équipements.
 */
const equipmentModal = {
  dom: {
    modal: document.querySelector("#equipment-modal"),
    openBtn: document.querySelector('a[href="#equipements"]'),
    closeBtn: document.querySelector("#close-equipment-modal-btn"),
    content: document.querySelector("#equipment-list-content"),
  },

  /**
   * Affiche la modale.
   */
  show() {
    if (this.dom.modal) {
      this.dom.modal.classList.add("is-visible");
      document.body.style.overflow = "hidden";
    }
  },

  /**
   * Cache la modale.
   */
  hide() {
    if (this.dom.modal) {
      this.dom.modal.classList.remove("is-visible");
      document.body.style.overflow = "";
    }
  },

  /**
   * Génère le HTML de la liste des équipements et l'injecte dans la modale.
   */
  renderEquipmentList() {
    if (!this.dom.content || !EQUIPMENT_DATA) {
      this.dom.content.innerHTML =
        "<p>Erreur lors du chargement des données.</p>";
      return;
    }

    const accordionHTML = EQUIPMENT_DATA.map(
      (category) => `
            <div class="accordion-item">
                <button class="accordion-header">
                    <span>${category.category}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <ul>
                        ${category.items
                          .map((item) => `<li>${item}</li>`)
                          .join("")}
                    </ul>
                </div>
            </div>
        `
    ).join("");

    this.dom.content.innerHTML = `<div class="accordion">${accordionHTML}</div>`;
    this.setupAccordionEvents();
  },

  /**
   * Ajoute les écouteurs d'événements pour l'accordéon.
   */
  setupAccordionEvents() {
    const accordionItems = this.dom.content.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const content = item.querySelector(".accordion-content");

      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        // Fermer tous les autres items
        accordionItems.forEach((otherItem) => {
          otherItem.classList.remove("is-open");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        });

        // Ouvrir ou fermer l'item cliqué
        if (!isOpen) {
          item.classList.add("is-open");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  },

  /**
   * Initialise le module en attachant tous les écouteurs nécessaires.
   */
  init() {
    if (!this.dom.modal || !this.dom.openBtn || !this.dom.closeBtn) {
      return;
    }

    this.dom.openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.renderEquipmentList();
      this.show();
    });

    this.dom.closeBtn.addEventListener("click", () => this.hide());
    this.dom.modal.addEventListener("click", (e) => {
      if (e.target === this.dom.modal) {
        this.hide();
      }
    });

    console.log("Module 'Equipment Modal' initialisé.");
  },
};

export default equipmentModal;
