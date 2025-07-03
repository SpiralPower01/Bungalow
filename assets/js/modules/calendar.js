"use strict";

/**
 * ======================================================
 * MODULE : GESTION DU CALENDRIER (v2)
 * ======================================================
 * Gère l'affichage et l'interaction du calendrier.
 * Ce module a maintenant deux modes :
 * - "Réservation" : pour les utilisateurs non connectés.
 * - "Tableau de bord" : pour les utilisateurs connectés, affiche la période réservée.
 */

// --- IMPORTATIONS ---
// On importe les constantes et les fonctions nécessaires depuis d'autres modules.
// Les chemins relatifs sont robustes : "../" signifie "remonter d'un dossier".
// Depuis /modules, on remonte vers /js pour trouver config.js.
import { NIGHTLY_RATE, EXTRA_PERSON_RATE } from "../config.js";
import { isLoggedIn } from "./auth.js"; // auth.js est dans le même dossier /modules.

// --- SÉLECTION DES ÉLÉMENTS DU DOM ---
// On regroupe tous les éléments HTML nécessaires au module pour un accès facile.
const DOM = {
  monthYear1: document.querySelector("#month-year-1"),
  datesGrid1: document.querySelector("#dates-grid-1"),
  monthYear2: document.querySelector("#month-year-2"),
  datesGrid2: document.querySelector("#dates-grid-2"),
  prevBtn: document.querySelector("#prev-month-btn"),
  nextBtn: document.querySelector("#next-month-btn"),
  occupantsSelect: document.querySelector("#occupants"),
  nightsDisplay: document.querySelector("#price-summary-nights"),
  priceDisplay: document.querySelector("#price-summary-total"),
  bookingBtn: document.querySelector("#confirm-booking-btn"),
  calendarWrapper: document.querySelector("#calendar-wrapper"),
};

// --- ÉTAT INTERNE DU MODULE ---
// Ces variables conservent l'état actuel du calendrier.
let displayDate = new Date(); // Le premier mois affiché à l'écran.
let startDate = null; // La date d'arrivée sélectionnée.
let endDate = null; // La date de départ sélectionnée.

// ======================================================
// FONCTIONS DE LOGIQUE (calculs, etc.)
// ======================================================

/**
 * Calcule les détails de la réservation (nuits, prix total).
 * @returns {Object|null} Un objet avec les détails ou null si la sélection est incomplète.
 */
function getBookingDetails() {
  if (!startDate || !endDate) return null;
  const diffTime = endDate.getTime() - startDate.getTime();
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const occupants = parseInt(DOM.occupantsSelect.value, 10);
  let finalNightlyRate = NIGHTLY_RATE;
  if (occupants > 2) {
    finalNightlyRate += (occupants - 2) * EXTRA_PERSON_RATE;
  }
  const total = nights * finalNightlyRate;
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    nights: nights,
    total: total,
  };
}

/**
 * Gère la logique de clic sur une date en mode "Réservation".
 * @param {Event} event - L'événement de clic.
 */
function handleDateClick(event) {
  const cell = event.target.closest(".date-cell");
  if (!cell || cell.classList.contains("inactive")) return;
  const clickedDate = new Date(cell.dataset.date);
  clickedDate.setMinutes(
    clickedDate.getMinutes() + clickedDate.getTimezoneOffset()
  );
  if (!startDate || (startDate && endDate)) {
    startDate = clickedDate;
    endDate = null;
  } else if (clickedDate > startDate) {
    endDate = clickedDate;
  } else {
    startDate = clickedDate;
  }
  updateSelectionUI();
  calculateAndDisplayPrice();
}

// ======================================================
// FONCTIONS D'AFFICHAGE (rendu, mise à jour de l'UI)
// ======================================================

/**
 * Met à jour l'interface pour afficher le prix calculé.
 */
function calculateAndDisplayPrice() {
  const details = getBookingDetails();
  if (details && details.nights > 0) {
    DOM.nightsDisplay.textContent = `${details.nights} nuit${
      details.nights > 1 ? "s" : ""
    }`;
    DOM.priceDisplay.textContent = `${details.total} €`;
    DOM.bookingBtn.disabled = false;
  } else {
    DOM.nightsDisplay.textContent = "-- nuits";
    DOM.priceDisplay.textContent = "-- €";
    DOM.bookingBtn.disabled = true;
  }
}

/**
 * Met à jour les classes CSS des cellules pour refléter la sélection.
 */
function updateSelectionUI() {
  document.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove("selected", "range-start", "range-end", "in-range");
    const cellDateStr = cell.dataset.date;
    if (!cellDateStr) return;
    const cellDate = new Date(cellDateStr);
    cellDate.setMinutes(cellDate.getMinutes() + cellDate.getTimezoneOffset());
    if (startDate && cellDate.getTime() === startDate.getTime()) {
      cell.classList.add("selected", "range-start");
    }
    if (endDate && cellDate.getTime() === endDate.getTime()) {
      cell.classList.add("selected", "range-end");
    }
    if (startDate && endDate && cellDate > startDate && cellDate < endDate) {
      cell.classList.add("in-range");
    }
  });
  applyDynamicGradient();
}

/**
 * Génère la grille HTML des jours pour un mois donné.
 * @param {Date} date - Le premier jour du mois à afficher.
 * @returns {string} Le HTML de la grille des dates.
 */
function generateMonthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();
  let datesHTML = "";
  let startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = startDayIndex; i > 0; i--) {
    datesHTML += `<div class="date-cell inactive">${
      lastDateOfLastMonth - i + 1
    }</div>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const loopDate = new Date(year, month, i);
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i
    ).padStart(2, "0")}`;
    let classes = "date-cell";
    if (loopDate.getTime() < today.getTime()) {
      classes += " inactive";
    }
    if (loopDate.getTime() === today.getTime()) {
      classes += " today";
    }
    datesHTML += `<div class="${classes}" data-date="${dateString}">${i}</div>`;
  }
  return datesHTML;
}

/**
 * Affiche les deux calendriers (mois N et mois N+1) à l'écran.
 */
function renderCalendars() {
  DOM.monthYear1.textContent = displayDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  DOM.datesGrid1.innerHTML = generateMonthGrid(displayDate);
  const nextMonthDate = new Date(displayDate);
  nextMonthDate.setMonth(displayDate.getMonth() + 1);
  DOM.monthYear2.textContent = nextMonthDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  DOM.datesGrid2.innerHTML = generateMonthGrid(nextMonthDate);
  updateSelectionUI();
}

/**
 * Applique l'effet de barre de dégradé sur la période sélectionnée.
 */
function applyDynamicGradient() {
  const selectedCells = DOM.calendarWrapper.querySelectorAll(
    ".date-cell.selected, .date-cell.in-range:not(.inactive)"
  );
  const totalCells = selectedCells.length;
  if (totalCells < 2) {
    selectedCells.forEach((cell) => {
      cell.style.removeProperty("--grad-start-color");
      cell.style.removeProperty("--grad-end-color");
    });
    return;
  }
  const startColor = { r: 0, g: 131, b: 143 };
  const endColor = { r: 255, g: 179, b: 0 };
  selectedCells.forEach((cell, i) => {
    const startRatio = i / (totalCells - 1);
    const r1 = Math.round(
      startColor.r + startRatio * (endColor.r - startColor.r)
    );
    const g1 = Math.round(
      startColor.g + startRatio * (endColor.g - startColor.g)
    );
    const b1 = Math.round(
      startColor.b + startRatio * (endColor.b - startColor.b)
    );
    const endRatio = (i + 1) / (totalCells - 1);
    const r2 = Math.round(
      startColor.r + endRatio * (endColor.r - startColor.r)
    );
    const g2 = Math.round(
      startColor.g + endRatio * (endColor.g - startColor.g)
    );
    const b2 = Math.round(
      startColor.b + endRatio * (endColor.b - startColor.b)
    );
    cell.style.setProperty("--grad-start-color", `rgb(${r1}, ${g1}, ${b1})`);
    cell.style.setProperty("--grad-end-color", `rgb(${r2}, ${g2}, ${b2})`);
  });
}

// ======================================================
// INITIALISATION
// ======================================================

/**
 * Initialise le module calendrier.
 * La logique s'adapte en fonction de l'état de connexion de l'utilisateur.
 */
export function initCalendar() {
  if (!DOM.calendarWrapper) return;

  if (isLoggedIn()) {
    // --- MODE CONNECTÉ (TABLEAU DE BORD) ---
    // Le calendrier devient un simple afficheur de la période réservée.
    const userData = JSON.parse(localStorage.getItem("bungalowUserData")) || {};
    if (userData.arrival && userData.departure) {
      startDate = new Date(userData.arrival);

      const [depDateStr, depTimeStr] = userData.departure.split(" à ");
      const [day, month, year] = depDateStr.split("/");
      endDate = new Date(`${year}-${month}-${day}T${depTimeStr}:00`);

      // On centre le calendrier sur la date d'arrivée pour la pertinence.
      displayDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    }
  } else {
    // --- MODE NON-CONNECTÉ (RÉSERVATION) ---
    // Le calendrier est interactif pour permettre la sélection de dates.
    DOM.calendarWrapper.addEventListener("click", handleDateClick);
    DOM.occupantsSelect.addEventListener("change", calculateAndDisplayPrice);
    DOM.bookingBtn.addEventListener("click", () => {
      const bookingDetails = getBookingDetails();
      if (!bookingDetails) {
        alert("Veuillez sélectionner une période valide.");
        return;
      }
      alert(`Réservation simulée pour ${bookingDetails.nights} nuits.`);
    });
  }

  // La navigation entre les mois est commune aux deux modes.
  DOM.prevBtn.addEventListener("click", () => {
    displayDate.setMonth(displayDate.getMonth() - 1);
    renderCalendars();
  });
  DOM.nextBtn.addEventListener("click", () => {
    displayDate.setMonth(displayDate.getMonth() + 1);
    renderCalendars();
  });

  // Affiche le calendrier une première fois au chargement.
  renderCalendars();
  console.log("Module Calendrier initialisé.");
}
