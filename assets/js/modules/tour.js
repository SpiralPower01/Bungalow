"use strict";

// ======================================================
// MODULE : GESTION DE LA VISITE GUIDÉE (APERCU) (v-finale)
// ======================================================
import { DOM } from "../dom-loader.js";
import { TOUR_DATA } from "../config.js";

// --- ÉTAT INTERNE AU MODULE ---
let currentSceneIndex = 0;
const PLAYBACK_SPEEDS = [1, 1.5, 2];
let currentSpeedIndex = 0;
let controlsTimeout = null;
let currentMediaContentType = "image"; // 'image' ou 'text'

// --- FONCTIONS PRIVÉES DU MODULE ---

/**
 * Affiche les contrôles et lance un minuteur pour les cacher après 3 secondes.
 */
function startControlsTimeout() {
  DOM.showcaseContainer.classList.add("show-controls");
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    DOM.showcaseContainer.classList.remove("show-controls");
  }, 3000);
}

function updateDescriptionView(scene) {
  if (!DOM.descriptionShowcase) return;
  const titleEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__title"
  );
  const descEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__description"
  );
  const imageGridEl = DOM.descriptionShowcase.querySelector(
    ".description-showcase__image-grid"
  );

  if (!titleEl || !descEl || !imageGridEl) return;
  titleEl.textContent = scene.title;
  descEl.textContent = scene.description;
  imageGridEl.innerHTML = "";
  scene.images.forEach((imgName) => {
    const img = document.createElement("img");
    img.src = `assets/images/${imgName}`;
    img.alt = scene.title;
    imageGridEl.appendChild(img);
  });
  // On recrée le conteneur de l'icône car on a vidé le HTML
  const iconContainer = document.createElement("span");
  iconContainer.className = "click-to-focus-icon";
  iconContainer.innerHTML = '<i class="fas fa-search-plus"></i>';
  imageGridEl.appendChild(iconContainer);

  if (currentSceneIndex === TOUR_DATA.length - 1) {
    DOM.continueBtn.innerHTML =
      'Recommencer la visite <i class="fas fa-redo"></i>';
  } else {
    DOM.continueBtn.innerHTML =
      'Continuer la visite <i class="fas fa-arrow-right"></i>';
  }
  DOM.prevSceneBtn.style.display =
    currentSceneIndex === 0 ? "none" : "inline-flex";
  DOM.nextSceneBtn.style.display =
    currentSceneIndex === TOUR_DATA.length - 1 ? "none" : "inline-flex";
}

function loadScene(sceneIndex, shouldPlay = false) {
  if (sceneIndex < 0) sceneIndex = 0;
  if (sceneIndex >= TOUR_DATA.length) sceneIndex = TOUR_DATA.length - 1;
  currentSceneIndex = sceneIndex;

  const scene = TOUR_DATA[currentSceneIndex];
  DOM.descriptionShowcase.classList.add("is-hidden");

  // On s'assure de réinitialiser l'état des contrôles
  DOM.showcaseContainer.classList.remove("show-controls");

  const currentSrc = DOM.videoPlayer.src.split("/").pop();
  const newSrc = scene.videoSrc.split("/").pop();
  if (currentSrc !== newSrc) {
    DOM.videoPlayer.src = scene.videoSrc;
    DOM.videoPlayer.load();
  }

  DOM.videoPlayer.currentTime = scene.startTime || 0;
  updateDescriptionView(scene);
  DOM.videoPlayer.playbackRate = PLAYBACK_SPEEDS[currentSpeedIndex];

  if (shouldPlay) {
    // Un petit délai pour s'assurer que la vidéo est prête à jouer
    setTimeout(() => {
      if (DOM.videoPlayer.paused) {
        togglePlay();
      }
    }, 100);
  }
}

/**
 * Met en pause la lecture vidéo et affiche le panneau de description.
 */
function showCurrentDescription() {
  DOM.descriptionShowcase.classList.remove("is-hidden");
  if (!DOM.videoPlayer.paused) {
    DOM.videoPlayer.pause();
  }

  const icon = DOM.playPauseBtn.querySelector("i");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  DOM.showcaseContainer.classList.remove("is-playing");
  DOM.showcaseContainer.classList.add("show-controls");
  clearTimeout(controlsTimeout);
}

function togglePlay() {
  if (!DOM.videoPlayer || !DOM.playPauseBtn) return;
  const icon = DOM.playPauseBtn.querySelector("i");

  if (DOM.videoPlayer.paused) {
    DOM.videoPlayer.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    DOM.showcaseContainer.classList.add("is-playing");
    startControlsTimeout();
  } else {
    DOM.videoPlayer.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    DOM.showcaseContainer.classList.remove("is-playing");
  }
}

function showMediaFocusOverlay(contentType, imageIndex = 0) {
  //... (Cette fonction reste identique à la version précédente)
  if (!DOM.mediaFocusModal || !TOUR_DATA[currentSceneIndex]) return;

  const scene = TOUR_DATA[currentSceneIndex];
  DOM.mediaContent.innerHTML = "";
  DOM.thumbnailGrid.innerHTML = "";
  currentMediaContentType = contentType;

  if (contentType === "image") {
    const img = document.createElement("img");
    img.src = `assets/images/${scene.images[imageIndex]}`;
    img.alt = scene.title;
    DOM.mediaContent.appendChild(img);

    DOM.toggleMediaContentBtn.querySelector("i").className =
      "fas fa-info-circle";
    DOM.toggleMediaContentBtn.querySelector("span").textContent = "Détails";

    scene.images.forEach((imgName, index) => {
      const thumb = document.createElement("img");
      thumb.src = `assets/images/${imgName}`;
      thumb.alt = `Thumbnail ${index + 1}`;
      thumb.dataset.index = index;
      if (index === imageIndex) {
        thumb.classList.add("selected-thumbnail");
      }
      thumb.addEventListener("click", () =>
        showMediaFocusOverlay("image", index)
      );
      DOM.thumbnailGrid.appendChild(thumb);
    });
    DOM.thumbnailGrid.style.display = "flex";
    DOM.mediaContent.classList.remove("media-content__text-mode");
  } else if (contentType === "text") {
    const textDiv = document.createElement("div");
    textDiv.classList.add("media-content__text");
    textDiv.innerHTML = `<h3>${scene.title}</h3><p>${scene.detailedDescription}</p>`;
    DOM.mediaContent.appendChild(textDiv);

    DOM.toggleMediaContentBtn.querySelector("i").className = "fas fa-images";
    DOM.toggleMediaContentBtn.querySelector("span").textContent = "Images";

    DOM.thumbnailGrid.style.display = "none";
    DOM.mediaContent.classList.add("media-content__text-mode");
  }

  DOM.mediaFocusModal.classList.remove("is-hidden");
  DOM.mediaFocusModal.classList.add("is-visible");
}

function hideMediaFocusOverlay() {
  //... (Cette fonction reste identique à la version précédente)
  if (DOM.mediaFocusModal) {
    DOM.mediaFocusModal.classList.add("is-hidden");
    DOM.mediaFocusModal.classList.remove("is-visible");
  }
}

// --- FONCTION D'INITIALISATION EXPORTÉE ---
export function initTour() {
  if (!DOM.showcaseContainer) return;

  loadScene(currentSceneIndex);

  // --- ÉCOUTEURS D'ÉVÉNEMENTS ---

  DOM.playPauseBtn.addEventListener("click", togglePlay);
  DOM.videoPlayer.addEventListener("click", togglePlay);

  // Écouteur pour afficher les contrôles au survol
  DOM.showcaseContainer.addEventListener("mousemove", () => {
    if (DOM.showcaseContainer.classList.contains("is-playing")) {
      startControlsTimeout();
    }
  });

  // NOUVEAU : Écouteur pour cacher les contrôles quand la souris quitte la zone
  DOM.showcaseContainer.addEventListener("mouseleave", () => {
    if (DOM.showcaseContainer.classList.contains("is-playing")) {
      DOM.showcaseContainer.classList.remove("show-controls");
    }
  });

  DOM.videoPlayer.addEventListener("timeupdate", () => {
    if (!TOUR_DATA[currentSceneIndex]) return;
    const scene = TOUR_DATA[currentSceneIndex];
    if (
      DOM.videoPlayer.currentTime >= scene.pauseTime &&
      DOM.descriptionShowcase.classList.contains("is-hidden")
    ) {
      showCurrentDescription();
    }
  });

  DOM.continueBtn.addEventListener("click", () => {
    let nextIndex = currentSceneIndex + 1;
    if (nextIndex >= TOUR_DATA.length) nextIndex = 0;
    loadScene(nextIndex, true);
  });

  DOM.toggleSpeedBtn.addEventListener("click", () => {
    currentSpeedIndex = (currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
    const newSpeed = PLAYBACK_SPEEDS[currentSpeedIndex];
    DOM.videoPlayer.playbackRate = newSpeed;
    DOM.toggleSpeedBtn.querySelector("span").textContent = `x${newSpeed}`;
  });

  DOM.skipVideoBtn.addEventListener("click", showCurrentDescription);

  DOM.nextSceneBtn.addEventListener("click", () => {
    if (currentSceneIndex < TOUR_DATA.length - 1) {
      currentSceneIndex++;
      updateDescriptionView(TOUR_DATA[currentSceneIndex]);
    }
  });

  DOM.prevSceneBtn.addEventListener("click", () => {
    if (currentSceneIndex > 0) {
      currentSceneIndex--;
      updateDescriptionView(TOUR_DATA[currentSceneIndex]);
    }
  });

  if (DOM.mediaFocusModal) {
    DOM.mediaFocusCloseBtn.addEventListener("click", hideMediaFocusOverlay);
    DOM.mediaFocusModal.addEventListener("click", (event) => {
      if (event.target === DOM.mediaFocusModal) {
        hideMediaFocusOverlay();
      }
    });

    DOM.clickableDescriptionContent.forEach((element) => {
      element.addEventListener("click", () =>
        showMediaFocusOverlay("image", 0)
      );
    });

    DOM.toggleMediaContentBtn.addEventListener("click", () => {
      if (currentMediaContentType === "image") {
        showMediaFocusOverlay("text");
      } else {
        showMediaFocusOverlay("image", 0);
      }
    });
  }
}
