// Fichier : assets/js/modules/tour-dom.js
"use strict";

export const tourDOM = {
  // Déclencheur
  hubButton: document.querySelector('.hub-button[href="#apercu"]'),

  // Modale principale
  modal: document.querySelector("#video-tour-modal"),
  closeBtn: document.querySelector("#tour-close-btn"),

  // Vidéos et wrapper
  videoWrapper: document.querySelector(".video-wrapper"),
  openingVideo: document.querySelector("#opening-video"),
  mainTourVideo: document.querySelector("#main-tour-video"),

  // Panneau de description
  descriptionPanel: document.querySelector("#tour-description-panel"),
  sceneIndicator: document.querySelector("#tour-scene-indicator"),
  sceneTitle: document.querySelector("#tour-scene-title"),
  sceneDescription: document.querySelector("#tour-scene-description"),

  // Contrôles
  controls: {
    playPauseBtn: document.querySelector("#tour-play-pause-btn"),
    playPauseIcon: document.querySelector("#tour-play-pause-btn i"),
    skipBtn: document.querySelector("#tour-skip-btn"),
    speedBtn: document.querySelector("#tour-speed-btn"),
    speedBtnSpan: document.querySelector("#tour-speed-btn span"),
    prevSceneBtn: document.querySelector("#tour-prev-scene-btn"),
    nextSceneBtn: document.querySelector("#tour-next-scene-btn"),
    continueBtn: document.querySelector("#tour-continue-btn"),
  },

  // Barre de progression
  progressBarFill: document.querySelector("#video-progress-bar-fill"),
};
