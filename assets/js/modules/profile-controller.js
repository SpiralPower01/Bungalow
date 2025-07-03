// Fichier : assets/js/modules/profile-controller.js
"use strict";

/**
 * ======================================================
 * MODULE : CONTRÔLEUR DU PROFIL UTILISATEUR (v3 - Avec notification simulée)
 * ======================================================
 * Gère la modale de profil, la sauvegarde des données,
 * les notifications et l'accordéon pour le responsive.
 */

const dom = {
  openBtn: null,
  modal: document.querySelector("#profile-modal"),
  closeBtn: document.querySelector("#close-profile-modal-btn"),
  form: document.querySelector("#profile-form"),
  notificationPopup: document.querySelector("#info-notification-popup"),
  closeNotificationBtn: document.querySelector("#close-notification-popup-btn"),
};

const USER_DATA_KEY = "bungalowUserData";

// --- Fonctions de gestion des données ---

/**
 * Charge les données de l'utilisateur depuis le localStorage et remplit le formulaire.
 */
function loadUserData() {
  const data = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};

  dom.form.elements.firstname.value = data.firstname || "";
  dom.form.elements.lastname.value = data.lastname || "";
  dom.form.elements.email.value = data.email || "";
  dom.form.elements.phone.value = data.phone || "";

  if (data.arrival) {
    const [datePart, timePart] = data.arrival.split("T");
    const [year, month, day] = datePart.split("-");
    dom.form.elements["arrival-date"].value = `${day}/${month}/${year}`;
    dom.form.elements["arrival-time"].value = timePart || "";
  } else {
    dom.form.elements["arrival-date"].value = "03/07/2025";
    dom.form.elements["arrival-time"].value = "";
  }

  if (data.departure) {
    const [datePart, timePart] = data.departure.split(" à ");
    dom.form.elements["departure-date"].value = datePart;
    dom.form.elements["departure-time"].value = timePart || "10:00";
  } else {
    dom.form.elements["departure-date"].value = "04/07/2025";
    dom.form.elements["departure-time"].value = "10:00";
  }

  dom.form.elements.duration.value = data.duration || "7 nuits";
}

/**
 * Sauvegarde les données du formulaire dans le localStorage.
 * @param {Event} event - L'événement de soumission du formulaire.
 */
function saveUserData(event) {
  event.preventDefault();
  const formData = new FormData(dom.form);
  const data = Object.fromEntries(formData.entries());

  const arrivalDateParts = data["arrival-date"].split("/");
  if (arrivalDateParts.length === 3 && data["arrival-time"]) {
    const arrivalISODate = `${arrivalDateParts[2]}-${arrivalDateParts[1]}-${arrivalDateParts[0]}`;
    data.arrival = `${arrivalISODate}T${data["arrival-time"]}`;
  } else {
    data.arrival = null;
  }

  data.departure = `${data["departure-date"]} à ${data["departure-time"]}`;

  delete data["arrival-date"];
  delete data["arrival-time"];
  delete data["departure-date"];
  delete data["departure-time"];

  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
  window.location.reload();
}

// --- Fonctions de gestion de la modale et des notifications ---

function showModal() {
  if (!dom.modal) return;
  loadUserData();
  dom.modal.classList.add("is-visible");
}

function hideModal() {
  if (!dom.modal) return;
  dom.modal.classList.remove("is-visible");
}

/**
 * Vérifie si des infos sont manquantes et déclenche les notifications (visuelle et simulée).
 */
function checkAndShowNotification() {
  const data = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {};
  if (!data.arrival) {
    // Action simulée : Log dans la console [cite: 51]
    console.log(
      `%cSIMULATION : Envoi d'un email de rappel au client pour compléter son heure d'arrivée.`,
      "color: #ff9800; font-weight: bold; font-size: 1.1em;"
    );

    // Action visuelle : Affichage du pop-up après un délai
    setTimeout(() => {
      if (dom.notificationPopup) {
        dom.notificationPopup.classList.add("is-visible");
      }
    }, 3000);
  }
}

function hideNotification() {
  if (dom.notificationPopup) {
    dom.notificationPopup.classList.remove("is-visible");
  }
}

// --- Logique de l'accordéon ---

function setupProfileAccordion() {
  const accordionItems = dom.form.querySelectorAll(".accordion-item");
  if (accordionItems.length === 0) return;

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const content = item.querySelector(".accordion-content");
      if (item.classList.contains("is-open")) {
        item.classList.remove("is-open");
        content.style.maxHeight = null;
      } else {
        accordionItems.forEach((otherItem) => {
          otherItem.classList.remove("is-open");
          otherItem.querySelector(".accordion-content").style.maxHeight = null;
        });
        item.classList.add("is-open");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

// --- Fonction publique d'initialisation ---

export function initProfileController() {
  dom.openBtn = document.querySelector("#open-profile-btn");
  if (!dom.openBtn) return;

  dom.openBtn.addEventListener("click", showModal);
  dom.closeBtn.addEventListener("click", hideModal);
  dom.form.addEventListener("submit", saveUserData);
  dom.closeNotificationBtn.addEventListener("click", hideNotification);

  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) hideModal();
  });

  setupProfileAccordion();
  checkAndShowNotification(); // Cette fonction contient maintenant les deux logiques

  console.log("Module Profile Controller initialisé.");
}
