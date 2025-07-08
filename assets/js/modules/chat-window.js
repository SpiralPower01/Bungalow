// Fichier: assets/js/modules/chat-window.js
"use strict";

const ADMIN_ID = "admin-user-id";
const API_URL = "http://localhost:3000/api";
const chatWindowEl = document.querySelector(".chat-window");
let socket;

// ... (la fonction handleReplySubmit reste la même)
function handleReplySubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const messageText = input.value.trim();
  const receiverId = form.dataset.userId;

  if (!messageText || !socket) return;

  const messageData = {
    text: messageText,
    receiverId: receiverId,
  };

  socket.emit("sendMessage", messageData);
  input.value = "";
}

// ... (la fonction displayNewMessage reste la même)
function displayNewMessage(msg) {
  const messageHistoryEl = document.getElementById("message-history");
  if (!messageHistoryEl) return;

  const currentConversationId =
    document.getElementById("reply-form")?.dataset.userId;
  if (
    msg.senderId !== currentConversationId &&
    msg.receiverId !== currentConversationId
  ) {
    return;
  }

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("chat-message-bubble");
  messageBubble.classList.add(
    msg.senderId === ADMIN_ID ? "admin-message" : "user-message"
  );
  messageBubble.innerHTML = `<p>${msg.content}</p>`;

  messageHistoryEl.appendChild(messageBubble);
  messageHistoryEl.scrollTop = messageHistoryEl.scrollHeight;
}

export async function loadConversation(userId) {
  if (!chatWindowEl) return;
  chatWindowEl.innerHTML = "<p>Chargement...</p>";

  // On se connecte au tchat en temps réel
  if (socket) socket.disconnect();
  socket = window.io("http://localhost:3000", {
    auth: { token: localStorage.getItem("adminAuthToken") }, // On utilise le vrai token
  });

  socket.on("connect", () => {
    console.log("Admin connecté au tchat via socket.");
  });

  socket.on("receiveMessage", (msg) => {
    displayNewMessage(msg);
  });

  // On récupère l'historique des messages
  try {
    const token = localStorage.getItem("adminAuthToken");
    if (!token) throw new Error("Token admin non trouvé.");

    // ON AJOUTE LE TOKEN À LA REQUÊTE
    const response = await fetch(`${API_URL}/messages/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Échec du chargement de l'historique.");
    }

    const messages = await response.json();

    const messagesHtml = messages
      .map(
        (msg) => `
              <div class="chat-message-bubble ${
                msg.senderId === ADMIN_ID ? "admin-message" : "user-message"
              }">
              <p>${msg.content}</p>
              </div>
          `
      )
      .join("");

    chatWindowEl.innerHTML = `
          <div id="message-history">${messagesHtml}</div>
          <form id="reply-form" data-user-id="${userId}">
              <input type="text" placeholder="Répondez ici..." required autocomplete="off" />
              <button type="submit">Envoyer</button>
          </form>
      `;
    document
      .getElementById("reply-form")
      .addEventListener("submit", handleReplySubmit);
    const messageHistoryEl = document.getElementById("message-history");
    messageHistoryEl.scrollTop = messageHistoryEl.scrollHeight;
  } catch (error) {
    console.error(error);
    chatWindowEl.innerHTML = "<p>Impossible de charger les messages.</p>";
  }
}
