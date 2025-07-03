// Fichier : assets/js/modules/tour-ui.js
"use strict";

import { tourDOM } from "./tour-dom.js";
import * as state from "./tour-state.js";
import { loadScene } from "./tour-controller.js";

// --- Fonctions de mise à jour du DOM ---
export function updateUIForNewScene() {
  const scene = state.getCurrentScene();
  const sceneIndex = state.getState().currentSceneIndex;
  const totalScenes = state.getTotalScenes();

  tourDOM.sceneTitle.textContent = scene.title;
  tourDOM.sceneDescription.textContent = scene.description;
  tourDOM.sceneIndicator.textContent = `Scène ${
    sceneIndex + 1
  } sur ${totalScenes}`;

  tourDOM.controls.continueBtn.textContent =
    sceneIndex === totalScenes - 1
      ? "Recommencer la visite"
      : "Continuer la visite";
  tourDOM.controls.prevSceneBtn.style.visibility =
    sceneIndex === 0 ? "hidden" : "visible";
  tourDOM.controls.nextSceneBtn.style.visibility =
    sceneIndex === totalScenes - 1 ? "hidden" : "visible";
}

export function updateVideoProgress() {
  const video = state.getState().activeVideo;
  if (!video || !video.duration) return;
  const progress = (video.currentTime / video.duration) * 100;
  tourDOM.progressBarFill.style.width = `${progress}%`;
}

function togglePlayIcon(isPlaying) {
  tourDOM.controls.playPauseIcon.classList.toggle("fa-play", !isPlaying);
  tourDOM.controls.playPauseIcon.classList.toggle("fa-pause", isPlaying);
}

export function showDescription() {
  state.setDescriptionVisible(true);
  tourDOM.descriptionPanel.classList.remove("is-hidden");
}

export function hideDescription() {
  state.setDescriptionVisible(false);
  tourDOM.descriptionPanel.classList.add("is-hidden");
}

// --- Fonctions d'action ---
export function play() {
  const video = state.getState().activeVideo;
  if (video && video.paused) {
    video.play();
    state.setPlaying(true);
    togglePlayIcon(true);
  }
}

export function pause() {
  const video = state.getState().activeVideo;
  if (video && !video.paused) {
    video.pause();
    state.setPlaying(false);
    togglePlayIcon(false);
  }
}

export function togglePlayPause() {
  if (state.getState().isPlaying) {
    pause();
  } else {
    if (state.getState().isDescriptionVisible) {
      hideDescription();
    }
    play();
  }
}

export function updateSpeedButton() {
  const newSpeed = state.nextSpeed();
  state.getState().activeVideo.playbackRate = newSpeed;
  tourDOM.controls.speedBtnSpan.textContent = `x${newSpeed}`;
}

// --- Gestionnaires d'événements ---
function handleKeydown(e) {
  if (!state.getState().isModalOpen) return;
  switch (e.key) {
    case " ":
      e.preventDefault();
      togglePlayPause();
      break;
    case "ArrowRight":
      if (state.getState().isDescriptionVisible) {
        state.nextScene();
        updateUIForNewScene();
      } else {
        state.nextScene();
        loadScene(
          state.getState().currentSceneIndex,
          state.getState().isPlaying
        );
      }
      break;
    case "ArrowLeft":
      if (state.getState().isDescriptionVisible) {
        state.prevScene();
        updateUIForNewScene();
      } else {
        state.prevScene();
        loadScene(
          state.getState().currentSceneIndex,
          state.getState().isPlaying
        );
      }
      break;
    case "Escape":
      closeModal();
      break;
  }
}

// CORRECTION : La fonction est maintenant exportée
export function closeModal() {
  pause();
  state.setModalOpen(false);
  tourDOM.modal.classList.remove("is-visible");
  state.resetTour();
}

function openModal() {
  state.setModalOpen(true);
  tourDOM.modal.classList.add("is-visible");
  loadScene(0, true);
}

// --- Initialisation des écouteurs ---
export function setupEventListeners() {
  const galleryTriggerBtn = document.querySelector("#open-focus-gallery-btn");

  tourDOM.hubButton.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  tourDOM.closeBtn.addEventListener("click", closeModal);
  tourDOM.modal.addEventListener("click", (e) => {
    if (e.target === tourDOM.modal) closeModal();
  });

  tourDOM.controls.playPauseBtn.addEventListener("click", togglePlayPause);
  tourDOM.videoWrapper.addEventListener("click", (e) => {
    if (state.getState().isDescriptionVisible) return;
    togglePlayPause();
  });

  if (galleryTriggerBtn) {
    galleryTriggerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const openFocusEvent = new CustomEvent("openFocus", {
        detail: { scene: state.getCurrentScene() },
      });
      e.currentTarget.dispatchEvent(openFocusEvent);
    });
  }

  tourDOM.controls.continueBtn.addEventListener("click", () => {
    const nextIndex =
      (state.getState().currentSceneIndex + 1) % state.getTotalScenes();
    loadScene(nextIndex, true);
  });

  tourDOM.controls.nextSceneBtn.addEventListener("click", () => {
    state.nextScene();
    updateUIForNewScene();
  });

  tourDOM.controls.prevSceneBtn.addEventListener("click", () => {
    state.prevScene();
    updateUIForNewScene();
  });

  tourDOM.controls.skipBtn.addEventListener("click", () => {
    pause();
    showDescription();
  });

  tourDOM.controls.speedBtn.addEventListener("click", updateSpeedButton);

  window.addEventListener("keydown", handleKeydown);
}
