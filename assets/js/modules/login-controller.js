// Fichier : assets/js/modules/login-controller.js
"use strict";

// --- NOUVELLES IMPORTATIONS ---
import * as api from "./api.js"; // On importe notre nouveau module api.js
import { logout, isLoggedIn } from "./auth.js"; // On garde logout et isLoggedIn

// --- SÉLECTION DES ÉLÉMENTS DU DOM (ne change pas) ---
const dom = {
  authContainer: document.querySelector("#auth-controls-container"),
  loginModal: document.querySelector("#login-modal"),
  closeLoginBtn: document.querySelector("#close-login-modal-btn"),
  loginForm: document.querySelector("#login-form"),
  usernameInput: document.querySelector("#username"),
  passwordInput: document.querySelector("#password"),
  errorMsg: document.querySelector("#login-error-msg"),
};

// --- FONCTIONS DE GESTION DE LA MODALE (ne changent pas) ---
function showLoginModal() {
  if (!dom.loginModal) return;
  dom.errorMsg.style.display = "none";
  dom.loginForm.reset();
  dom.loginModal.classList.add("is-visible");
  dom.usernameInput.focus();
}

function hideLoginModal() {
  if (!dom.loginModal) return;
  dom.loginModal.classList.remove("is-visible");
}

// --- GESTIONNAIRE DU FORMULAIRE (LOGIQUE MISE À JOUR) ---
async function handleFormSubmit(event) {
  event.preventDefault();
  dom.errorMsg.style.display = "none"; // On cache l'ancien message d'erreur

  try {
    // 1. On appelle notre backend via le module API
    const data = await api.loginUser(
      dom.usernameInput.value,
      dom.passwordInput.value
    );

    // 2. Si la connexion réussit, on sauvegarde le token
    localStorage.setItem("authToken", data.token);

    // On garde sessionStorage pour l'état de l'onglet actuel (rechargement simple)
    sessionStorage.setItem("isUserLoggedIn", "true");

    // 3. On recharge la page pour voir l'interface connectée
    window.location.reload();
  } catch (error) {
    // Si l'API renvoie une erreur, on l'affiche
    dom.errorMsg.textContent = error.message;
    dom.errorMsg.style.display = "block";
  }
}

// --- LE RESTE DU FICHIER NE CHANGE PAS ---
function handleLogoutClick() {
  logout();
  localStorage.removeItem("authToken"); // On nettoie aussi le token permanent
  window.location.reload();
}

function createHeaderControls() {
  if (!dom.authContainer) return;
  dom.authContainer.innerHTML = "";

  if (isLoggedIn()) {
    const profileBtn = document.createElement("button");
    profileBtn.id = "open-profile-btn";
    profileBtn.className = "profile-icon-btn";
    profileBtn.setAttribute("aria-label", "Ouvrir le profil");
    profileBtn.innerHTML = '<i class="fas fa-user-cog"></i>';

    const logoutBtn = document.createElement("button");
    logoutBtn.className = "button-secondary";
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Se déconnecter';
    logoutBtn.addEventListener("click", handleLogoutClick);
    dom.authContainer.append(profileBtn, logoutBtn);
  } else {
    const loginBtn = document.createElement("button");
    loginBtn.className = "button-primary";
    loginBtn.innerHTML = '<i class="fas fa-user-circle"></i> Se connecter';
    loginBtn.addEventListener("click", showLoginModal);
    dom.authContainer.append(loginBtn);
  }
}

export function initLoginController() {
  if (!dom.loginModal || !dom.loginForm || !dom.closeLoginBtn) {
    return;
  }

  dom.loginForm.addEventListener("submit", handleFormSubmit);
  dom.closeLoginBtn.addEventListener("click", hideLoginModal);

  // --- CORRECTION ICI ---
  // On utilise dom.loginModal au lieu de dom.modal
  dom.loginModal.addEventListener("click", (e) => {
    if (e.target === dom.loginModal) hideLoginModal();
  });
  // --------------------

  createHeaderControls();
  console.log("Module Login Controller (connecté au Backend) initialisé.");
}
