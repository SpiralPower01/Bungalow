// Fichier: assets/js/modules/api.js
"use strict";

const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fait un appel à l'API pour connecter un utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<object>} Les données de la réponse (ex: le token).
 * @throws {Error} Lance une erreur si la connexion échoue.
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Si le serveur renvoie une erreur (4xx, 5xx), on la lance pour que le contrôleur puisse l'attraper.
    throw new Error(
      data.message || "Une erreur est survenue lors de la connexion."
    );
  }

  return data;
}
