// ======================================================
// SÉLECTION DES ÉLÉMENTS DU DOM
// ======================================================
// Ce module sélectionne une seule fois tous les éléments HTML
// dont l'application a besoin et les exporte.

export const DOM = {
  // Overlays & Navigation
  pageContainer: document.querySelector(".page-container"),
  navContainer: document.querySelector(".main-nav ul"),
  mainNav: document.querySelector(".main-nav"), // <-- AJOUTEZ CETTE LIGNE
  navToggleBtn: document.querySelector(".nav-toggle"),
  allNavLinks: document.querySelectorAll(".main-nav a"),
  allPages: document.querySelectorAll(".page-content"),
  openingVideo: document.querySelector("#openingVideo"), // Remplace l'ancienne ligne
  mainVideo: document.querySelector("#mainVideo"), // Ajoute celle-ci
  mainCloseButton: document.querySelector(".page-container .close-button"),

  // Authentification
  loginLogoutBtn: document.querySelector("#login-logout-btn"),
  loginModal: document.querySelector("#login-modal"),
  loginForm: document.querySelector("#login-form"),
  loginErrorMsg: document.querySelector(".login-error-message"),
  modalCloseBtn: document.querySelector("#login-modal .close-button"),
  protectedContent: document.querySelectorAll(".protected-content"),

  // Visite Guidée (Aperçu)
  showcaseContainer: document.querySelector(".video-showcase"),
  videoPlayer: document.querySelector(".video-showcase__player"),
  playPauseBtn: document.querySelector(".play-pause-btn"),
  descriptionShowcase: document.querySelector(".description-showcase"),
  continueBtn: document.querySelector(".continue-btn"),
  toggleSpeedBtn: document.querySelector("#toggle-speed-btn"),
  skipVideoBtn: document.querySelector("#skip-video-btn"),
  prevSceneBtn: document.querySelector("#prev-scene-btn"),
  nextSceneBtn: document.querySelector("#next-scene-btn"),

  // Modale de Focus Média
  mediaFocusModal: document.querySelector("#media-focus-modal"),
  mediaFocusCloseBtn: document.querySelector(
    "#media-focus-modal .media-focus-close-btn"
  ),
  mediaContent: document.querySelector("#media-focus-modal .media-content"),
  thumbnailGrid: document.querySelector("#media-focus-modal .thumbnail-grid"),
  toggleMediaContentBtn: document.querySelector("#toggle-media-content-btn"),
  clickableDescriptionContent: document.querySelectorAll(
    ".description-showcase .clickable-content"
  ),

  // Calendrier
  calendarContainer: document.querySelector("#doubleCalendar"),
  reservationBar: document.querySelector(".reservation-bar"),
  monthYearElement1: document.querySelector("#month-year-1"),
  datesGridElement1: document.querySelector("#dates-grid-1"),
  monthYearElement2: document.querySelector("#month-year-2"),
  datesGridElement2: document.querySelector("#dates-grid-2"),
  prevBtn: document.querySelector("#prev-month-btn"),
  nextBtn: document.querySelector("#next-month-btn"),
  arrivalDateInput: document.querySelector("#date-arrival"),
  departureDateInput: document.querySelector("#date-departure"),
  occupantsSelect: document.querySelector("#occupants"),
  nightsDisplay: document.querySelector(".price-summary__nights"),
  priceDisplay: document.querySelector(".price-summary__total"),

  //Booking
  bookNowBtn: document.querySelector("#book-now-btn"),
  bookingConfirmationModal: document.querySelector(
    "#booking-confirmation-modal"
  ),
};
