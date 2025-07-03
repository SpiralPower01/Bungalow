// Fichier : assets/js/modules/tour-controller.js
"use strict";

import { tourDOM } from "./tour-dom.js";
import * as state from "./tour-state.js";
import {
  setupEventListeners,
  updateUIForNewScene,
  hideDescription,
} from "./tour-ui.js";
import { play, pause } from "./tour-ui.js";

let activeVideoEvents = []; // Pour nettoyer les écouteurs d'événements

function cleanupActiveVideoEvents() {
  const activeVideo = state.getState().activeVideo;
  if (activeVideo) {
    activeVideoEvents.forEach(({ event, handler }) =>
      activeVideo.removeEventListener(event, handler)
    );
  }
  activeVideoEvents = [];
}

function setupVideoEvents() {
  cleanupActiveVideoEvents(); // Nettoie les anciens écouteurs

  const video = state.getState().activeVideo;
  if (!video) return;

  const onTimeUpdate = () => {
    const scene = state.getCurrentScene();
    if (state.getState().isPlaying && video.currentTime >= scene.pauseTime) {
      pause();
      showDescription();
    }
    updateVideoProgress();
  };

  const onEnded = () => {
    if (video === tourDOM.openingVideo) {
      // Transition vers la vidéo principale
      loadScene(state.getState().currentSceneIndex, true);
    } else {
      // A la fin d'une scène sur la vidéo principale
      pause();
      showDescription();
    }
  };

  video.addEventListener("timeupdate", onTimeUpdate);
  video.addEventListener("ended", onEnded);

  activeVideoEvents.push({ event: "timeupdate", handler: onTimeUpdate });
  activeVideoEvents.push({ event: "ended", handler: onEnded });
}

function showDescription() {
  state.setDescriptionVisible(true);
  tourDOM.descriptionPanel.classList.remove("is-hidden");
}

function updateVideoProgress() {
  const video = state.getState().activeVideo;
  if (!video || !video.duration) return;
  const progress = (video.currentTime / video.duration) * 100;
  tourDOM.progressBarFill.style.width = `${progress}%`;
}

export function loadScene(sceneIndex, shouldPlay = false) {
  state.goToScene(sceneIndex);
  const scene = state.getCurrentScene();

  const targetVideo =
    scene.videoFile === "OpeningVideo.mp4"
      ? tourDOM.openingVideo
      : tourDOM.mainTourVideo;

  if (state.getState().activeVideo !== targetVideo) {
    if (state.getState().activeVideo)
      state.getState().activeVideo.style.opacity = 0;
    targetVideo.style.opacity = 1;
    state.setActiveVideo(targetVideo);
  }

  targetVideo.currentTime = scene.startTime;
  setupVideoEvents();
  hideDescription();
  updateUIForNewScene();

  if (shouldPlay) {
    // Léger délai pour assurer que le navigateur est prêt
    setTimeout(() => play(), 100);
  }
}

// La fonction d'initialisation complète
export function initTour() {
  // Vérifie que les éléments essentiels existent avant de continuer
  if (!tourDOM.hubButton || !tourDOM.modal) {
    console.warn(
      "Impossible d'initialiser la visite guidée : éléments DOM manquants."
    );
    return;
  }

  // Met en place tous les écouteurs d'événements (clics, clavier, etc.)
  setupEventListeners();

  console.log("Visite guidée initialisée et prête.");
}
