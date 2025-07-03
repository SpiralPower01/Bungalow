// Fichier : assets/js/modules/login-controller.js
"use strict";

/**
 * ======================================================
 * MODULE : CONTRÔLEUR DE CONNEXION (v3 - Stable)
 * ======================================================
 * Gère l'affichage des boutons de connexion/déconnexion/profil
 * et la logique de la modale de connexion.
 */

// --- IMPORTATIONS ---
import { login, logout, isLoggedIn } from "./auth.js";

// --- SÉLECTION DES ÉLÉMENTS DU DOM ---
// On regroupe tous les éléments HTML nécessaires au module.
const dom = {
  // Le conteneur dédié qui recevra les boutons d'authentification.
  authContainer: document.querySelector("#auth-controls-container"),

  // Éléments de la modale de connexion
  loginModal: document.querySelector("#login-modal"),
  closeLoginBtn: document.querySelector("#close-login-modal-btn"),
  loginForm: document.querySelector("#login-form"),
  usernameInput: document.querySelector("#username"),
  passwordInput: document.querySelector("#password"),
  errorMsg: document.querySelector("#login-error-msg"),
};

// --- FONCTIONS DE GESTION DE LA MODALE ---

/**
 * Affiche la fenêtre (modale) de connexion.
 */
function showLoginModal() {
  if (!dom.loginModal) return;
  dom.errorMsg.style.display = "none"; // On cache les anciens messages d'erreur.
  dom.loginForm.reset(); // On vide les champs.
  dom.loginModal.classList.add("is-visible");
  dom.usernameInput.focus(); // On met le curseur directement dans le champ.
}

/**
 * Cache la fenêtre (modale) de connexion.
 */
function hideLoginModal() {
  if (!dom.loginModal) return;
  dom.loginModal.classList.remove("is-visible");
}

// --- GESTIONNAIRES D'ÉVÉNEMENTS ---

/**
 * Gère la soumission du formulaire de connexion.
 * @param {Event} event - L'événement de soumission.
 */
async function handleFormSubmit(event) {
  event.preventDefault(); // Empêche le rechargement de la page par défaut.
  const success = login(dom.usernameInput.value, dom.passwordInput.value);
  if (success) {
    // Si la connexion réussit, on recharge la page pour que toute l'interface
    // (bannière, calendrier, etc.) se mette à jour.
    window.location.reload();
  } else {
    // Sinon, on affiche un message d'erreur.
    dom.errorMsg.textContent = "Identifiant ou mot de passe incorrect.";
    dom.errorMsg.style.display = "block";
  }
}

/**
 * Gère le clic sur le bouton de déconnexion.
 */
function handleLogoutClick() {
  logout(); // On appelle la fonction de déconnexion.
  window.location.reload(); // On recharge la page pour revenir à l'état "visiteur".
}

/**
 * Crée et injecte les boutons appropriés dans l'en-tête
 * en fonction de l'état de connexion de l'utilisateur.
 */
function createHeaderControls() {
  if (!dom.authContainer) return;

  // On vide le conteneur pour éviter les doublons.
  dom.authContainer.innerHTML = "";

  if (isLoggedIn()) {
    // --- MODE CONNECTÉ ---
    // On crée le bouton pour accéder au profil.
    const profileBtn = document.createElement("button");
    profileBtn.id = "open-profile-btn";
    profileBtn.className = "profile-icon-btn";
    profileBtn.setAttribute("aria-label", "Ouvrir le profil");
    profileBtn.innerHTML = '<i class="fas fa-user-cog"></i>';

    // On crée le bouton pour se déconnecter.
    const logoutBtn = document.createElement("button");
    logoutBtn.className = "button-secondary";
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Se déconnecter';
    logoutBtn.addEventListener("click", handleLogoutClick);

    // On ajoute les deux boutons au conteneur.
    dom.authContainer.append(profileBtn, logoutBtn);
  } else {
    // --- MODE NON-CONNECTÉ ---
    // On crée un seul bouton pour se connecter.
    const loginBtn = document.createElement("button");
    loginBtn.className = "button-primary"; // Style plus visible.
    loginBtn.innerHTML = '<i class="fas fa-user-circle"></i> Se connecter';
    loginBtn.addEventListener("click", showLoginModal);

    // On ajoute ce bouton au conteneur.
    dom.authContainer.append(loginBtn);
  }
}

/**
 * Initialise le contrôleur de connexion.
 */
export function initLoginController() {
  if (!dom.loginModal || !dom.loginForm || !dom.closeLoginBtn) {
    return;
  }

  // On attache les événements pour la modale de connexion.
  dom.loginForm.addEventListener("submit", handleFormSubmit);
  dom.closeLoginBtn.addEventListener("click", hideLoginModal);
  dom.loginModal.addEventListener("click", (e) => {
    if (e.target === dom.loginModal) hideLoginModal();
  });

  // On crée les boutons dans l'en-tête.
  createHeaderControls();

  console.log("Module Login Controller initialisé.");
}
