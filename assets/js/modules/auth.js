"use strict";

import { DOM } from "../dom-loader.js";

let isLoggedIn = false;

function handleLoginSuccess(userData) {
  isLoggedIn = true;
  DOM.loginModal.classList.remove("is-visible");
  DOM.loginLogoutBtn.textContent = "Se déconnecter";
  DOM.protectedContent.forEach((el) => {
    if (el.tagName === "LI") el.style.display = "list-item";
  });
  alert(`Bienvenue ${userData.name || userData.email} !`);
}

function handleLogout() {
  isLoggedIn = false;
  DOM.loginLogoutBtn.textContent = "Se connecter";
  DOM.protectedContent.forEach((el) => {
    if (el.tagName === "LI") el.style.display = "none";
  });
  alert("Vous avez été déconnecté.");
}

export function initAuth() {
  if (!DOM.loginLogoutBtn || !DOM.loginModal) return;

  // Clic sur le bouton principal "Se connecter / Se déconnecter"
  DOM.loginLogoutBtn.addEventListener("click", () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      DOM.loginModal.classList.add("is-visible");
    }
  });

  // Clic pour fermer la modale de connexion
  DOM.loginModal
    .querySelector(".modal-close-btn")
    .addEventListener("click", () =>
      DOM.loginModal.classList.remove("is-visible")
    );
  DOM.loginModal.addEventListener("click", (event) => {
    if (event.target === DOM.loginModal)
      DOM.loginModal.classList.remove("is-visible");
  });

  // Soumission du formulaire de CONNEXION
  DOM.loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    DOM.loginErrorMsg.textContent = "";
    const email = DOM.loginForm.querySelector("#username").value;
    const password = DOM.loginForm.querySelector("#password").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      handleLoginSuccess(data);
      DOM.loginForm.reset();
    } catch (error) {
      DOM.loginErrorMsg.textContent = error.message;
    }
  });
}
