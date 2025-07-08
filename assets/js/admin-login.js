"use strict";

const loginForm = document.getElementById("admin-login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = ""; // Vider l'ancien message d'erreur

  try {
    const response = await fetch("http://localhost:3000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Une erreur est survenue.");
    }

    // Si la connexion réussit :
    localStorage.setItem("adminAuthToken", data.token); // On stocke le token
    window.location.href = "administrateur.html"; // On redirige vers le panel
  } catch (error) {
    errorMessage.textContent = error.message;
  }
});
