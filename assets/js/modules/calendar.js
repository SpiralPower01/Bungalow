"use strict";

import { DOM } from "../dom-loader.js";
import { NIGHTLY_RATE, EXTRA_PERSON_RATE } from "../config.js";

// --- ÉTAT INTERNE AU MODULE ---
let displayDate = new Date();
let startDate = null;
let endDate = null;
let bookedDatesFromServer = [];
let currentTotalPrice = 0;
let currentNumberOfNights = 0;

// --- FONCTIONS PRIVÉES DU MODULE ---

function calculateAndDisplayPrice() {
  if (!DOM.bookNowBtn) return;

  if (startDate && endDate) {
    const diffTime = endDate.getTime() - startDate.getTime();
    const numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (numberOfNights > 0) {
      const numberOfOccupants = parseInt(DOM.occupantsSelect.value, 10);
      let currentNightlyRate = NIGHTLY_RATE;
      if (numberOfOccupants > 2) {
        currentNightlyRate += (numberOfOccupants - 2) * EXTRA_PERSON_RATE;
      }
      const totalPrice = numberOfNights * currentNightlyRate;
      DOM.nightsDisplay.textContent = `${numberOfNights} nuit${
        numberOfNights > 1 ? "s" : ""
      }`;
      DOM.priceDisplay.textContent = `${totalPrice} €`;
      DOM.bookNowBtn.disabled = false;

      currentTotalPrice = totalPrice;
      currentNumberOfNights = numberOfNights;
    } else {
      DOM.nightsDisplay.textContent = "-- nuits";
      DOM.priceDisplay.textContent = "-- €";
      DOM.bookNowBtn.disabled = true;
      currentTotalPrice = 0;
      currentNumberOfNights = 0;
    }
  } else {
    DOM.nightsDisplay.textContent = "-- nuits";
    DOM.priceDisplay.textContent = "-- €";
    DOM.bookNowBtn.disabled = true;
    currentTotalPrice = 0;
    currentNumberOfNights = 0;
  }
}

function updateSelection() {
  document.querySelectorAll(".date-cell").forEach((cell) => {
    cell.classList.remove("selected", "range-start", "range-end", "in-range");
    const cellDateStr = cell.dataset.date;
    if (!cellDateStr) return;
    const cellDate = new Date(cellDateStr.replace(/-/g, "/"));
    if (startDate && cellDate.getTime() === startDate.getTime())
      cell.classList.add("selected", "range-start");
    if (endDate && cellDate.getTime() === endDate.getTime())
      cell.classList.add("selected", "range-end");
    if (startDate && endDate && cellDate > startDate && cellDate < endDate)
      cell.classList.add("in-range");
  });
  applyDynamicGradient();
}

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
    let loopDate = new Date(year, month, i);
    let isToday = loopDate.getTime() === today.getTime() ? "today" : "";
    let isPast = loopDate < today ? "inactive" : "";
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      i
    ).padStart(2, "0")}`;

    if (bookedDatesFromServer.includes(dateString)) {
      isPast = "inactive";
    }

    datesHTML += `<div class="date-cell ${isToday} ${isPast}" data-date="${dateString}">${i}</div>`;
  }
  return datesHTML;
}

function renderCalendars() {
  DOM.monthYearElement1.textContent = displayDate.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  DOM.datesGridElement1.innerHTML = generateMonthGrid(displayDate);
  let nextMonthDate = new Date(displayDate);
  nextMonthDate.setMonth(displayDate.getMonth() + 1);
  DOM.monthYearElement2.textContent = nextMonthDate.toLocaleDateString(
    "fr-FR",
    { month: "long", year: "numeric" }
  );
  DOM.datesGridElement2.innerHTML = generateMonthGrid(nextMonthDate);
  updateSelection();
}

function handleDateClick(event) {
  const clickedCell = event.target.closest(".date-cell");
  if (!clickedCell || clickedCell.classList.contains("inactive")) return;
  const clickedDate = new Date(clickedCell.dataset.date.replace(/-/g, "/"));
  if (!startDate || (startDate && endDate)) {
    startDate = clickedDate;
    endDate = null;
  } else if (clickedDate > startDate) {
    endDate = clickedDate;
  } else {
    startDate = clickedDate;
  }
  DOM.arrivalDateInput.value = startDate
    ? startDate.toLocaleDateString("fr-FR")
    : "--/--/----";
  DOM.departureDateInput.value = endDate
    ? endDate.toLocaleDateString("fr-FR")
    : "--/--/----";
  updateSelection();
  calculateAndDisplayPrice();
}

/**
 * Applique un dégradé dynamique sur les cellules de la période sélectionnée.
 */
function applyDynamicGradient() {
  const selectedCells = document.querySelectorAll(
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
    const startRatio = i / totalCells;
    const r1 = Math.round(
      startColor.r + startRatio * (endColor.r - startColor.r)
    );
    const g1 = Math.round(
      startColor.g + startRatio * (endColor.g - startColor.g)
    );
    const b1 = Math.round(
      startColor.b + startRatio * (endColor.b - startColor.b)
    );

    const endRatio = (i + 1) / totalCells;
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

// --- FONCTION D'INITIALISATION EXPORTÉE ---

export async function initCalendar() {
  if (!DOM.calendarContainer) return;

  try {
    const response = await fetch("http://localhost:3000/api/availabilities");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    bookedDatesFromServer = await response.json();
  } catch (error) {
    console.error(
      "Impossible de charger les disponibilités depuis le serveur:",
      error
    );
  }

  DOM.reservationBar.addEventListener("click", (event) => {
    // S'assure que le clic n'est pas sur le menu déroulant des voyageurs
    if (event.target.id === "occupants") return;

    DOM.calendarContainer.classList.toggle("is-visible");

    // Positionner dynamiquement le calendrier sous le header
    if (DOM.calendarContainer.classList.contains("is-visible")) {
      const mainHeader = document.querySelector(".main-header");
      const headerHeight = mainHeader.offsetHeight;
      DOM.calendarContainer.style.top = `${headerHeight + 10}px`; // 10px de marge
    }
  });

  DOM.datesGridElement1.addEventListener("click", handleDateClick);
  DOM.datesGridElement2.addEventListener("click", handleDateClick);

  DOM.prevBtn.addEventListener("click", () => {
    displayDate.setMonth(displayDate.getMonth() - 1);
    renderCalendars();
  });
  DOM.nextBtn.addEventListener("click", () => {
    displayDate.setMonth(displayDate.getMonth() + 1);
    renderCalendars();
  });

  DOM.occupantsSelect.addEventListener("change", calculateAndDisplayPrice);

  renderCalendars();
}

export function getBookingDetails() {
  if (!startDate || !endDate) return null;

  // Formatter les dates en YYYY-MM-DD pour le backend
  const formatForBackend = (date) => date.toISOString().split("T")[0];

  return {
    startDate: formatForBackend(startDate),
    endDate: formatForBackend(endDate),
    total: currentTotalPrice,
    nights: currentNumberOfNights,
  };
}
