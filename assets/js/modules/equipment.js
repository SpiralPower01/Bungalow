"use strict";

/**
 * ======================================================
 * MODULE : GESTION DE LA LISTE DES ÉQUIPEMENTS (v2)
 * ======================================================
 * Ce module génère un accordéon pour la liste des équipements
 * et l'injecte dans la modale correspondante.
 */

const equipmentListContent = document.querySelector("#equipment-list-content");

/**
 * Contient le HTML de l'accordéon des équipements.
 */
function getEquipmentHTML() {
  return `
    <div>
      <button class="accordion-btn">Cuisine & Repas</button>
      <div class="accordion-panel">
        <ul>
          <li><i class="fas fa-utensils"></i>Plaque de cuisson au gaz</li>
          <li><i class="fas fa-refrigerator"></i>Réfrigérateur</li>
          <li><i class="fas fa-microwave"></i>Four à micro-ondes</li>
          <li><i class="fas fa-coffee"></i>Cafetière & Bouilloire</li>
          <li><i class="fas fa-blender"></i>Broyeur (Blender) & Grille-pain</li>
          <li><i class="fas fa-utensils"></i>Vaisselle et couverts (pour 6)</li>
          <li><i class="fas fa-concierge-bell"></i>Poêles, casseroles et plats</li>
          <li><i class="fas fa-wine-glass"></i>Verre doseur, passoire, essoreuse</li>
        </ul>
      </div>

      <button class="accordion-btn">Salle de Bain</button>
      <div class="accordion-panel">
        <ul>
          <li><i class="fas fa-shower"></i>Douche à l'italienne</li>
          <li><i class="fas fa-wind"></i>Sèche-cheveux</li>
          <li><i class="fas fa-towel"></i>Serviettes de bain fournies (6)</li>
          <li><i class="fas fa-toilet"></i>WC et brosse de toilette</li>
        </ul>
      </div>
      
      <button class="accordion-btn">Chambres & Confort</button>
      <div class="accordion-panel">
        <ul>
          <li><i class="fas fa-snowflake"></i>Climatisation dans chaque chambre</li>
          <li><i class="fas fa-bed"></i>Lit double (Chambre 1)</li>
          <li><i class="fas fa-bed"></i>Lit simple (Chambre 2)</li>
          <li><i class="fas fa-box-open"></i>Linge de maison complet fourni</li>
          <li><i class="fas fa-tshirt"></i>Dressings en tissu et cintres</li>
        </ul>
      </div>

      <button class="accordion-btn">Général & Extérieur</button>
      <div class="accordion-panel">
        <ul>
          <li><i class="fas fa-wifi"></i>Wi-Fi haut débit</li>
          <li><i class="fas fa-tshirt"></i>Lave-linge</li>
          <li><i class="fas fa-iron"></i>Fer et table à repasser</li>
          <li><i class="fas fa-chair"></i>Salon de jardin sur la terrasse</li>
          <li><i class="fas fa-parking"></i>Place de parking sur la propriété</li>
          <li><i class="fas fa-video"></i>Caméra de sécurité extérieure</li>
        </ul>
      </div>
    </div>
  `;
}

/**
 * Ajoute les écouteurs d'événements pour faire fonctionner l'accordéon.
 * NOUVELLE LOGIQUE : Ferme les autres panneaux avant d'en ouvrir un.
 */
function attachAccordionListeners() {
  const accordions = equipmentListContent.querySelectorAll(".accordion-btn");
  accordions.forEach((currentAccordion) => {
    currentAccordion.addEventListener("click", function () {
      // Stocke l'état actif actuel avant toute modification
      const wasActive = this.classList.contains("active");

      // Étape 1 : On ferme TOUS les panneaux
      accordions.forEach((acc) => {
        acc.classList.remove("active");
        acc.nextElementSibling.style.maxHeight = null;
      });

      // Étape 2 : Si le panneau cliqué n'était pas déjà ouvert, on l'ouvre.
      if (!wasActive) {
        this.classList.add("active");
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

/**
 * Initialise le module en injectant le HTML et en attachant les écouteurs.
 */
export function initEquipmentList() {
  if (equipmentListContent) {
    equipmentListContent.innerHTML = getEquipmentHTML();
    attachAccordionListeners(); // On attache la logique de clic
    console.log("Module Équipements (accordéon) initialisé.");
  }
}
