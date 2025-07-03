// ======================================================
// CONFIGURATION & DONNÉES GLOBALES
// ======================================================
// Ce fichier centralise les constantes de l'application.

// --- Constantes pour le calcul du prix de la réservation ---
export const NIGHTLY_RATE = 60; // Prix de base par nuit pour 2 personnes.
export const EXTRA_PERSON_RATE = 15; // Supplément par personne additionnelle au-delà de 2.

// --- NOUVEAU : Données pour la liste des équipements ---
export const EQUIPMENT_DATA = [
  {
    category: "Cuisine & Repas",
    items: [
      '<i class="fas fa-utensils"></i>Plaque de cuisson au gaz',
      '<i class="fas fa-refrigerator"></i>Réfrigérateur',
      '<i class="fas fa-microwave"></i>Four à micro-ondes',
      '<i class="fas fa-coffee"></i>Cafetière & Bouilloire',
      '<i class="fas fa-blender"></i>Broyeur (Blender) & Grille-pain',
      '<i class="fas fa-utensils"></i>Vaisselle et couverts (pour 6)',
      '<i class="fas fa-concierge-bell"></i>Poêles, casseroles et plats',
      '<i class="fas fa-wine-glass"></i>Verre doseur, passoire, essoreuse',
    ],
  },
  {
    category: "Salle de Bain",
    items: [
      '<i class="fas fa-shower"></i>Douche à l\'italienne',
      '<i class="fas fa-wind"></i>Sèche-cheveux',
      '<i class="fas fa-towel"></i>Serviettes de bain fournies (6)',
      '<i class="fas fa-toilet"></i>WC et brosse de toilette',
    ],
  },
  {
    category: "Chambres & Confort",
    items: [
      '<i class="fas fa-snowflake"></i>Climatisation dans chaque chambre',
      '<i class="fas fa-bed"></i>Lit double (Chambre 1)',
      '<i class="fas fa-bed"></i>Lit simple (Chambre 2)',
      '<i class="fas fa-box-open"></i>Linge de maison complet fourni',
      '<i class="fas fa-tshirt"></i>Dressings en tissu et cintres',
    ],
  },
  {
    category: "Général & Extérieur",
    items: [
      '<i class="fas fa-wifi"></i>Wi-Fi haut débit',
      '<i class="fas fa-tshirt"></i>Lave-linge',
      '<i class="fas fa-iron"></i>Fer et table à repasser',
      '<i class="fas fa-chair"></i>Salon de jardin sur la terrasse',
      '<i class="fas fa-parking"></i>Place de parking sur la propriété',
      '<i class="fas fa-video"></i>Caméra de sécurité extérieure',
    ],
  },
];
