// Fichier : assets/js/modules/tour-state.js
"use strict";

import { TOUR_DATA, PLAYBACK_SPEEDS } from "../config-tour.js";

// L'état unique qui pilote toute la visite
const state = {
  isModalOpen: false,
  currentSceneIndex: 0,
  isPlaying: false,
  isDescriptionVisible: false,
  currentSpeedIndex: 0,
  activeVideo: null,
};

export function getState() {
  return { ...state };
}

export function getCurrentScene() {
  return TOUR_DATA[state.currentSceneIndex];
}

export function getTotalScenes() {
  return TOUR_DATA.length;
}

export function setActiveVideo(videoElement) {
  state.activeVideo = videoElement;
}

export function setModalOpen(isOpen) {
  state.isModalOpen = isOpen;
}

export function setPlaying(playing) {
  state.isPlaying = playing;
}

export function setDescriptionVisible(visible) {
  state.isDescriptionVisible = visible;
}

export function nextScene() {
  state.currentSceneIndex = (state.currentSceneIndex + 1) % TOUR_DATA.length;
  return getCurrentScene();
}

export function prevScene() {
  state.currentSceneIndex =
    (state.currentSceneIndex - 1 + TOUR_DATA.length) % TOUR_DATA.length;
  return getCurrentScene();
}

export function goToScene(index) {
  if (index >= 0 && index < TOUR_DATA.length) {
    state.currentSceneIndex = index;
  }
}

export function nextSpeed() {
  state.currentSpeedIndex =
    (state.currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
  return PLAYBACK_SPEEDS[state.currentSpeedIndex];
}

export function resetTour() {
  state.currentSceneIndex = 0;
  state.isPlaying = false;
  state.isDescriptionVisible = false;
  state.currentSpeedIndex = 0;
}
