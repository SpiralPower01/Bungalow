// Fichier : assets/js/modules/focus-overlay.js
"use strict";

import { PATHS } from "../config-tour.js";

/**
 * Module autonome pour gérer la modale de focus média (photos et détails).
 */
const focusOverlay = {
  // --- Éléments du DOM ---
  dom: {
    modal: document.querySelector("#media-focus-modal"),
    closeBtn: document.querySelector("#media-focus-close-btn"),
    content: document.querySelector("#media-focus-content"),
    thumbnails: document.querySelector("#media-focus-thumbnails"),
    toggleBtn: document.querySelector("#toggle-details-btn"),
  },

  // --- État interne ---
  state: {
    isVisible: false,
    currentScene: null,
    viewMode: "images", // 'images' ou 'details'
  },

  /**
   * Initialise le module.
   * @param {Object} triggerElement - L'élément HTML qui ouvrira la modale au clic.
   */
  init(triggerElement) {
    if (!this.dom.modal || !triggerElement) {
      console.warn("Éléments manquants pour initialiser le focus overlay.");
      return;
    }
    // L'événement sur le déclencheur est personnalisé pour recevoir les données
    triggerElement.addEventListener("openFocus", (e) => {
      this.show(e.detail.scene);
    });

    this.dom.closeBtn.addEventListener("click", () => this.hide());
    this.dom.modal.addEventListener("click", (e) => {
      if (e.target === this.dom.modal) this.hide();
    });
    this.dom.toggleBtn.addEventListener("click", () => this._toggleView());
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.state.isVisible) this.hide();
    });
  },

  /**
   * Affiche la modale avec les données d'une scène.
   * @param {Object} scene - Les données de la scène (ex: TOUR_DATA[0]).
   */
  show(scene) {
    this.state.isVisible = true;
    this.state.currentScene = scene;
    this.state.viewMode = "images"; // Toujours commencer par la vue image
    this.dom.modal.classList.add("is-visible");
    document.body.style.overflow = "hidden"; // Empêche le scroll de la page derrière
    this._renderImages();
  },

  /**
   * Cache la modale et nettoie son contenu.
   */
  hide() {
    this.state.isVisible = false;
    this.state.currentScene = null;
    this.dom.modal.classList.remove("is-visible");
    document.body.style.overflow = "";
    // Nettoyer pour la prochaine ouverture
    this.dom.content.innerHTML = "";
    this.dom.thumbnails.innerHTML = "";
  },

  // --- Fonctions de rendu privées ---

  _renderImages() {
    const { images, title } = this.state.currentScene;
    this.dom.content.innerHTML = ""; // Nettoyage
    this.dom.thumbnails.innerHTML = ""; // Nettoyage

    if (!images || images.length === 0) {
      this.dom.content.textContent =
        "Aucune image disponible pour cette scène.";
      return;
    }

    // Afficher l'image principale
    const mainImage = document.createElement("img");
    mainImage.src = `${PATHS.images}${images[0]}`;
    mainImage.alt = title;
    this.dom.content.appendChild(mainImage);

    // Afficher les miniatures
    images.forEach((imgFile, index) => {
      const thumb = document.createElement("img");
      thumb.src = `${PATHS.images}${imgFile}`;
      thumb.alt = `Miniature ${index + 1}`;
      thumb.dataset.index = index;
      if (index === 0) {
        thumb.classList.add("selected-thumbnail");
      }
      thumb.addEventListener("click", () =>
        this._changeMainImage(imgFile, thumb)
      );
      this.dom.thumbnails.appendChild(thumb);
    });
  },

  _renderDetails() {
    const { title, description } = this.state.currentScene;
    this.dom.content.innerHTML = `
      <div class="details-view">
        <h3>${title}</h3>
        <p>${description}</p>
        <p><em>(Ici pourrait se trouver une description bien plus détaillée, des spécifications techniques, etc.)</em></p>
      </div>
    `;
    this.dom.thumbnails.innerHTML = ""; // Pas de miniatures en vue "Détails"
  },

  // --- Fonctions de gestion d'événements privées ---

  _changeMainImage(imgFile, selectedThumb) {
    const mainImage = this.dom.content.querySelector("img");
    if (mainImage) {
      mainImage.src = `${PATHS.images}${imgFile}`;
    }
    // Mettre à jour la classe de sélection
    this.dom.thumbnails.querySelectorAll("img").forEach((thumb) => {
      thumb.classList.remove("selected-thumbnail");
    });
    selectedThumb.classList.add("selected-thumbnail");
  },

  _toggleView() {
    if (this.state.viewMode === "images") {
      this.state.viewMode = "details";
      this._renderDetails();
    } else {
      this.state.viewMode = "images";
      this._renderImages();
    }
  },
};

export default focusOverlay;
