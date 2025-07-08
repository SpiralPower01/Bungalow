// Fichier: assets/js/modules/conversation-list.js
"use strict";

import { loadConversation } from "./chat-window.js";

const API_URL = "http://localhost:3000/api";
const conversationListEl = document.getElementById("conversation-list");

function handleConversationClick(event) {
  const clickedItem = event.target.closest(".conversation-item");
  if (!clickedItem) return;

  document
    .querySelectorAll(".conversation-item")
    .forEach((item) => item.classList.remove("active"));
  clickedItem.classList.add("active");

  const userId = clickedItem.dataset.userId;
  loadConversation(userId);
}

async function fetchAndDisplayConversations() {
  if (!conversationListEl) return;

  // On récupère le token de l'admin
  const token = localStorage.getItem("adminAuthToken");

  if (!token) {
    conversationListEl.innerHTML =
      "<p>Erreur : Token admin non trouvé. Veuillez vous reconnecter.</p>";
    return;
  }

  try {
    // On ajoute le token dans les en-têtes de la requête
    const response = await fetch(`${API_URL}/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Échec de la récupération des conversations.");
    }

    const conversations = await response.json();

    if (conversations.length === 0) {
      conversationListEl.innerHTML =
        "<p>Aucune conversation pour le moment.</p>";
      return;
    }

    conversationListEl.innerHTML = conversations
      .map(
        (convo) => `
                <div class="conversation-item" data-user-id="${convo.id}">
                    <p>${convo.email}</p>
                </div>
                `
      )
      .join("");

    conversationListEl.addEventListener("click", handleConversationClick);
  } catch (error) {
    console.error(error);
    conversationListEl.innerHTML = "<p>Impossible de charger.</p>";
  }
}

export function initConversationList() {
  fetchAndDisplayConversations();
}
