// Fichier : assets/js/modules/contact-controller.js
"use strict";

const API_URL = "http://localhost:3000/api";

import { isLoggedIn } from "./auth.js";

// NOUVEAU : On déclare une variable pour garder notre connexion socket.
let socket = null;

const dom = {
  modal: document.querySelector("#contact-chat-modal"),
  openBtn: document.querySelector('a.hub-button[href="#contact"]'),
  closeBtn: null,
  title: null,
  contactWrapper: null,
  chatWrapper: null,
  chatHistory: null,
  chatForm: null,
  chatInput: null,
  chatFileInput: null,
};

// --- LOGIQUE DU TCHAT (MISE À JOUR) ---

// --- MISE À JOUR DE CETTE FONCTION ---
function addMessageToUI(msg) {
  if (!dom.chatHistory) return;

  // On récupère l'ID de l'utilisateur actuel pour savoir s'il est l'expéditeur
  const token = localStorage.getItem("authToken");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentUserId = payload.userId;

  const messageEl = document.createElement("div");
  messageEl.classList.add("chat-message-bubble"); // On utilise le nouveau style

  // On applique le style en fonction de l'expéditeur
  if (msg.senderId === currentUserId) {
    messageEl.classList.add("user-message"); // Message de l'utilisateur (bleu-vert)
  } else {
    messageEl.classList.add("host-message"); // Message de l'hôte (gris)
  }

  const p = document.createElement("p");
  p.textContent = msg.content; // On lit "content" au lieu de "text"
  messageEl.appendChild(p);

  dom.chatHistory.appendChild(messageEl);
  dom.chatHistory.scrollTop = dom.chatHistory.scrollHeight;
}

// NOUVELLE FONCTION à ajouter
async function fetchAndDisplayHistory() {
  const token = localStorage.getItem("authToken");
  if (!token || !dom.chatHistory) return;

  try {
    const response = await fetch(`${API_URL}/messages/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch history");

    const messages = await response.json();

    // On vide l'historique pour ne pas afficher le message de bienvenue en double
    dom.chatHistory.innerHTML = "";

    messages.forEach((msg) => addMessageToUI(msg));
  } catch (error) {
    console.error("Error fetching history:", error);
    // On ne met pas de message d'erreur pour ne pas effacer le "Bonjour" initial si le chargement échoue
  }
}

function handleSendMessage(event) {
  event.preventDefault();
  const text = dom.chatInput.value.trim();
  if (text === "" || !socket) return;

  // On récupère l'ID de l'utilisateur depuis son token.
  // C'est une simulation, car le frontend ne peut pas lire le contenu du token.
  // Dans une vraie app, on ferait un appel API pour récupérer le profil.
  // Pour ce projet, on va tricher et le récupérer du localStorage.
  const token = localStorage.getItem("authToken");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const senderId = payload.userId;

  const message = {
    text: text,
    senderId: senderId, // On envoie l'ID de l'expéditeur
    receiverId: "admin-user-id", // Le destinataire est toujours l'admin
  };

  socket.emit("sendMessage", message);

  dom.chatInput.value = "";
  dom.chatInput.style.height = "auto";
}

// La gestion du fichier joint ne change pas pour l'instant
function handleFileAttach() {
  const file = dom.chatFileInput.files[0];
  if (!file || !socket) return;

  const message = {
    text: `Fichier joint : ${file.name}`,
    sender: "user",
    timestamp: new Date().toISOString(),
  };

  socket.emit("sendMessage", message);
  dom.chatFileInput.value = "";
}

// --- GESTION DE LA MODALE (MISE À JOUR) ---

function showModal() {
  if (!dom.modal) return;

  if (isLoggedIn()) {
    dom.title.textContent = "Tchat avec votre hôte";
    dom.contactWrapper.style.display = "none";
    dom.chatWrapper.style.display = "block";

    fetchAndDisplayHistory();
    // NOUVEAU : On établit la connexion Socket.IO
    if (!socket) {
      // NOUVEAU : On envoie le token pour authentifier la connexion
      socket = io("http://localhost:3000", {
        auth: {
          token: localStorage.getItem("authToken"),
        },
      });

      // On écoute les messages entrants du serveur
      socket.on("receiveMessage", (messageData) => {
        // On ajoute le message reçu à notre interface
        addMessageToUI(messageData);
      });
    }
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

    // NOUVEAU : On se déconnecte du socket quand on ferme la modale
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }
}

// La gestion du formulaire de contact classique ne change pas
function handleLegacyFormSubmit(event) {
  // ... (code de la fonction inchangé)
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

  dom.openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  dom.closeBtn.addEventListener("click", hideModal);
  dom.modal.addEventListener("click", (e) => {
    if (e.target === dom.modal) hideModal();
  });

  legacyContactForm.addEventListener("submit", handleLegacyFormSubmit);
  dom.chatForm.addEventListener("submit", handleSendMessage);
  dom.chatFileInput.addEventListener("change", handleFileAttach);

  dom.chatInput.addEventListener("input", () => {
    dom.chatInput.style.height = "auto";
    dom.chatInput.style.height = dom.chatInput.scrollHeight + "px";
  });

  console.log("Module Contact/Chat Controller (temps réel) initialisé.");
}
