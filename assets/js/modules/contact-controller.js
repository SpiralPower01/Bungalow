// Fichier : assets/js/modules/contact-controller.js
"use strict";

import { isLoggedIn } from "./auth.js";

const CHAT_STORAGE_KEY = "bungalowChatHistory";

const dom = {
  modal: document.querySelector("#contact-chat-modal"),
  openBtn: document.querySelector('a.hub-button[href="#contact"]'),
  closeBtn: null,
  title: null,
  contactWrapper: null,
  // Nouveaux éléments pour le tchat
  chatWrapper: null,
  chatHistory: null,
  chatForm: null,
  chatInput: null,
  chatFileInput: null,
};

// --- LOGIQUE DU TCHAT ---

/**
 * Ajoute un message à l'interface graphique.
 * @param {{text: string, sender: 'user'|'host', timestamp: Date}} messageObject - L'objet du message.
 */
function addMessageToUI(messageObject) {
  if (!dom.chatHistory) return;
  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message", messageObject.sender);
  messageEl.innerHTML = `<p>${messageObject.text}</p>`;
  dom.chatHistory.appendChild(messageEl);

  // Fait défiler automatiquement vers le bas
  dom.chatHistory.scrollTop = dom.chatHistory.scrollHeight;
}

/**
 * Charge l'historique depuis le localStorage et l'affiche.
 */
function loadChatHistory() {
  if (!dom.chatHistory) return;
  dom.chatHistory.innerHTML = ""; // Vide l'historique actuel
  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
  history.forEach(addMessageToUI);
}

/**
 * Gère la soumission d'un nouveau message.
 * @param {Event} event
 */
function handleSendMessage(event) {
  event.preventDefault();
  const text = dom.chatInput.value.trim();
  if (text === "") return;

  const message = {
    text: text,
    sender: "user",
    timestamp: new Date().toISOString(),
  };

  // Ajout et sauvegarde
  addMessageToUI(message);
  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
  history.push(message);
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));

  dom.chatInput.value = "";
  dom.chatInput.style.height = "auto"; // Réinitialise la hauteur

  // Simulation de la réponse de l'hôte
  setTimeout(() => {
    const response = {
      text: "Merci pour votre message ! Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.",
      sender: "host",
      timestamp: new Date().toISOString(),
    };
    addMessageToUI(response);
    history.push(response);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
  }, 1500);
}

/**
 * Gère la sélection d'un fichier.
 */
function handleFileAttach() {
  const file = dom.chatFileInput.files[0];
  if (!file) return;

  // Simulation : on affiche juste le nom du fichier dans le tchat
  const message = {
    text: `<i>Fichier joint : ${file.name}</i>`,
    sender: "user",
    timestamp: new Date().toISOString(),
  };

  addMessageToUI(message);
  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
  history.push(message);
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));

  // Réinitialise l'input pour pouvoir sélectionner le même fichier à nouveau
  dom.chatFileInput.value = "";
}

// --- GESTION DE LA MODALE ---

function showModal() {
  if (!dom.modal) return;

  // Logique d'affichage conditionnel
  if (isLoggedIn()) {
    dom.title.textContent = "Tchat avec votre hôte";
    dom.contactWrapper.style.display = "none";
    dom.chatWrapper.style.display = "block";
    loadChatHistory(); // On charge l'historique du tchat
  } else {
    dom.title.textContent = "Nous Contacter";
    dom.contactWrapper.style.display = "block";
    dom.chatWrapper.style.display = "none";
  }

  dom.modal.classList.add("is-visible");
}

function hideModal() {
  if (dom.modal) {
    dom.modal.classList.remove("is-visible");
  }
}

function handleLegacyFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const statusP = document.getElementById("contact-form-status-modal");
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        statusP.textContent = "Merci ! Message envoyé.";
        statusP.style.color = "var(--color-primary)";
        form.reset();
      } else {
        response.json().then((data) => {
          statusP.textContent = data.errors
            ? data.errors.map((e) => e.message).join(", ")
            : "Oups! Une erreur est survenue.";
          statusP.style.color = "red";
        });
      }
    })
    .catch((error) => {
      statusP.textContent = "Oups! Une erreur est survenue.";
      statusP.style.color = "red";
    });
}

export function initContactController() {
  if (!dom.modal || !dom.openBtn) return;

  // Sélection des éléments DOM
  dom.closeBtn = dom.modal.querySelector(".modal-close-btn");
  dom.title = dom.modal.querySelector("#contact-chat-modal-title");
  dom.contactWrapper = dom.modal.querySelector("#contact-form-wrapper");
  dom.chatWrapper = dom.modal.querySelector("#chat-interface-wrapper");
  dom.chatHistory = dom.modal.querySelector(".chat-history");
  dom.chatForm = dom.modal.querySelector(".chat-input-form");
  dom.chatInput = dom.modal.querySelector(".chat-input-form textarea");
  dom.chatFileInput = dom.modal.querySelector("#chat-file-input");
  const legacyContactForm = dom.modal.querySelector("#contact-form-standalone");

  if (
    !dom.closeBtn ||
    !dom.title ||
    !dom.contactWrapper ||
    !dom.chatWrapper ||
    !legacyContactForm ||
    !dom.chatForm
  ) {
    console.error("Structure de la modale de contact/tchat invalide.");
    return;
  }

  // Écouteurs d'événements
  dom.openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  dom.closeBtn.addEventListener("click", hideModal);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) hideModal();
  });

  legacyContactForm.addEventListener("submit", handleLegacyFormSubmit);

  // Nouveaux écouteurs pour le tchat
  dom.chatForm.addEventListener("submit", handleSendMessage);
  dom.chatFileInput.addEventListener("change", handleFileAttach);

  // Ajustement auto de la hauteur du textarea
  dom.chatInput.addEventListener("input", () => {
    dom.chatInput.style.height = "auto";
    dom.chatInput.style.height = dom.chatInput.scrollHeight + "px";
  });

  console.log("Module Contact/Chat Controller initialisé.");
}
