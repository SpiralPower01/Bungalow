// Fichier : assets/js/config-content.js
"use strict";

/**
 * ======================================================
 * CONFIGURATION : CONTENUS DES MODALES
 * ======================================================
 * Centralise les textes affichés dans les fenêtres modales
 * pour les instructions d'entrée, de départ, etc.
 */

export const modalContent = {
  // --- Contenu pour le bouton "Instructions d'Entrée" ---
  entryInstructions: {
    title: "📝 Instructions d'Arrivée",
    content: `
      <h3>Bienvenue ! Votre arrivée autonome</h3>
      <p>Votre arrivée se fait en toute autonomie à partir de 15h.</p>
      <ul>
        <li>La boîte à clés se situe à droite de la porte d'entrée.</li>
        <li>Le code pour récupérer la clé est : <strong>1234</strong>.</li>
        <li>Merci de nous envoyer un message pour nous confirmer que vous êtes bien arrivé.</li>
      </ul>
      <hr>
      <h3>Accès Wi-Fi</h3>
      <p>Pour vous connecter, utilisez les informations suivantes :</p>
      <ul>
        <li><strong>Réseau (SSID) :</strong> Bungalow-Guest</li>
        <li><strong>Mot de passe :</strong> BungaLoc123!</li>
      </ul>
      <hr>
      <h3>Contacts utiles</h3>
      <p>En cas d'urgence ou de besoin, n'hésitez pas à nous contacter :</p>
      <ul>
        <li><strong>Téléphone :</strong> 06 12 34 56 78</li>
        <li><strong>Email :</strong> contact@bungalow-location.fr</li>
      </ul>
    `,
  },

  // --- Contenu pour le bouton "Instructions de Départ" ---
  departureInstructions: {
    title: "👋 Instructions de Départ",
    content: `
      <h3>Votre départ du bungalow</h3>
      <p>Toutes les bonnes choses ont une fin ! Votre départ doit s'effectuer avant <strong>11h00</strong>.</p>
      <hr>
      <h3>Check-list avant de partir :</h3>
      <ul>
        <li>✓ Avoir fait la vaisselle et l'avoir rangée.</li>
        <li>✓ Vider les poubelles dans les conteneurs prévus à cet effet.</li>
        <li>✓ Fermer toutes les fenêtres.</li>
        <li>✓ Éteindre les lumières et la climatisation.</li>
      </ul>
      <hr>
      <h3>Restitution des clés</h3>
      <p>Merci de remettre la clé dans la boîte à clés et de vous assurer qu'elle est bien refermée.</p>
      <hr>
      <h3>Votre avis compte pour nous !</h3>
      <p>Nous espérons que vous avez passé un excellent séjour. Si vous avez 2 minutes, nous serions ravis de lire votre retour d'expérience. Laissez-nous un avis sur la plateforme de votre choix !</p>
      <p><em>(Pour simuler, cliquer sur le bouton ci-dessous révoquera votre accès à cet espace client, comme si vous aviez terminé votre parcours.)</em></p>
      <button class="btn" id="simulate-review-btn">J'ai laissé un avis</button>
    `,
  },

  // --- Contenu pour le Livret d'Accueil complet (utilisé par "Infos & Fonctionnement") ---
  welcomeBooklet: {
    title: "Informations & Fonctionnement",
    content: `
        <h3>Livret d'Accueil Complet</h3>
        <p>Ici se trouverait la version complète de votre livret d'accueil, possiblement avec des sections en accordéon pour chaque partie : règles de la maison, fonctionnement des appareils, etc.</p>
        `,
  },
  // --- NOUVEAU : Contenu pour les Offres Partenaires ---
  partnerOffers: {
    title: "🌟 Offres Partenaires Exclusives",
    content: `
      <h3>Bénéficiez de réductions chez nos partenaires !</h3>
      <p>En tant que client de Miss'K, présentez simplement le code de réduction unique reçu par email pour profiter d'avantages exclusifs.</p>
      <hr>
      <div class="partner-highlight" style="background-color: #fff; padding: 1.5rem; border-radius: 8px; border: 1px solid #eee; margin-top: 1rem;">
          <h4>LABORD' BEACH <span style="font-size: 0.9rem; color: var(--color-primary); font-weight: bold;">-15% sur l'addition</span></h4>
          <p>Un restaurant et bar à tapas créole offrant une vue magnifique sur l'une des plus belles plages de Guadeloupe.</p>
          <p><strong>Adresse :</strong> Allée de la pointe d’antigues, Plage de l’anse Laborde, 97121 Anse-Bertrand </p>
      </div>
      <p style="margin-top: 1.5rem;"><em>D'autres offres seront bientôt ajoutées. Restez connectés !</em></p>
    `,
  },
};
