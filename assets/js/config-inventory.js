// Fichier : assets/js/config-inventory.js
"use strict";

/**
 * ======================================================
 * CONFIGURATION DE L'ÉTAT DES LIEUX
 * ======================================================
 * Cette configuration est la "base de données" pour les éléments
 * à vérifier, basée sur le PDF "Etat-des-lieux-entree-bungalow.pdf".
 */

export const inventoryData = [
  // ======================================================
  // CUISINE - SALLE À MANGER
  // ======================================================
  {
    piece: "Cuisine - Salle à manger",
    element: "Structure (Murs, Sol, Plafond, Plinthes)",
    etat_initial: "Neuf",
    photo: "cuisine-structure.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Porte palière et fenêtres",
    etat_initial: "Neuf, fonctionnel",
    photo: "cuisine-fenetres.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Électricité (prises, interrupteurs, éclairage)",
    etat_initial: "Neuf, fonctionnel",
    photo: "cuisine-electricite.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Plan de travail et évier",
    etat_initial: "Neuf, fonctionnel, sans fuite",
    photo: "cuisine-evier.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Réfrigérateur",
    etat_initial: "Neuf, fonctionnel",
    photo: "refrigerateur.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Plaque de cuisson",
    etat_initial: "Neuf, fonctionnel",
    photo: "plaques-cuisson.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Four à micro-ondes",
    etat_initial: "Neuf, fonctionnel",
    photo: "micro-ondes.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Lave-linge",
    etat_initial: "Neuf, fonctionnel",
    photo: "lave-linge.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element:
      "Petit électroménager (Cafetière, Bouilloire, Grille-pain, Broyeur)",
    etat_initial: "Neuf, fonctionnel",
    photo: "petit-electromenager.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Téléviseur et télécommande",
    etat_initial: "Neuf, fonctionnel",
    photo: "television.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Mobilier (Table, 2 tabourets)",
    etat_initial: "Neuf",
    photo: "table-tabourets.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Vaisselle (Assiettes, verres, tasses, ramequins)",
    etat_initial: "Neuf, complet pour 6 personnes",
    photo: "vaisselle.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Couverts et ustensiles de cuisine",
    etat_initial: "Neuf, complet pour 6 personnes",
    photo: "couverts-ustensiles.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Matériel de cuisson (Poêles, casseroles, couvercles)",
    etat_initial: "Neuf",
    photo: "materiel-cuisson.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Accessoires de cuisine (Essoreuse, passoire, planche, etc.)",
    etat_initial: "Neuf",
    photo: "accessoires-cuisine.jpg",
  },
  {
    piece: "Cuisine - Salle à manger",
    element: "Produits et matériel de nettoyage",
    etat_initial: "Neuf, fourni",
    photo: "materiel-nettoyage.jpg",
  },

  // ======================================================
  // SALLE DE BAIN
  // ======================================================
  {
    piece: "Salle de bain",
    element: "Structure (Murs, Sol, Plafond, Faïence)",
    etat_initial: "Neuf",
    photo: "sdb-structure.jpg",
  },
  {
    piece: "Salle de bain",
    element: "Porte coulissante et fenêtre",
    etat_initial: "Neuf, fonctionnel",
    photo: "sdb-porte-fenetre.jpg",
  },
  {
    piece: "Salle de bain",
    element: "Douche (Barre, rideaux, étagère)",
    etat_initial: "Neuf, propre, bon écoulement",
    photo: "douche.jpg",
  },
  {
    piece: "Salle de bain",
    element: "Mobilier (Meubles bas et haut, miroir)",
    etat_initial: "Neuf",
    photo: "sdb-mobilier.jpg",
  },
  {
    piece: "Salle de bain",
    element: "Toilettes (WC, abattant, chasse d'eau, brosse)",
    etat_initial: "Neuf, fonctionnel",
    photo: "toilettes.jpg",
  },
  {
    piece: "Salle de bain",
    element: "Linge et accessoires (6 serviettes, tapis, sèche-cheveux)",
    etat_initial: "Neuf, propre",
    photo: "sdb-linge.jpg",
  },

  // ======================================================
  // CHAMBRE 1 (DOUBLE)
  // ======================================================
  {
    piece: "Chambre 1 (Double)",
    element: "Structure et ouvertures",
    etat_initial: "Neuf, fonctionnel",
    photo: "chambre1-structure.jpg",
  },
  {
    piece: "Chambre 1 (Double)",
    element: "Climatisation et télécommande",
    etat_initial: "Neuf, fonctionnel",
    photo: "climatisation1.jpg",
  },
  {
    piece: "Chambre 1 (Double)",
    element: "Literie (Lit, matelas, 2 oreillers)",
    etat_initial: "Bon état, propre",
    photo: "literie-double.jpg",
  },
  {
    piece: "Chambre 1 (Double)",
    element: "Linge de maison (parure complète)",
    etat_initial: "Neuf, propre",
    photo: "linge-double.jpg",
  },
  {
    piece: "Chambre 1 (Double)",
    element: "Rangements (Dressing tissu, 3 cintres, table de chevet)",
    etat_initial: "Neuf, bon état",
    photo: "rangement-double.jpg",
  },

  // ======================================================
  // CHAMBRE 2 (SIMPLE)
  // ======================================================
  {
    piece: "Chambre 2 (Simple)",
    element: "Structure et ouvertures",
    etat_initial: "Neuf, fonctionnel",
    photo: "chambre2-structure.jpg",
  },
  {
    piece: "Chambre 2 (Simple)",
    element: "Climatisation",
    etat_initial: "Neuf, fonctionnel",
    photo: "climatisation2.jpg",
  },
  {
    piece: "Chambre 2 (Simple)",
    element: "Literie (Lit, matelas, 4 coussins)",
    etat_initial: "Bon état, propre",
    photo: "literie-simple.jpg",
  },
  {
    piece: "Chambre 2 (Simple)",
    element: "Linge de maison (parure complète)",
    etat_initial: "Neuf, propre",
    photo: "linge-simple.jpg",
  },
  {
    piece: "Chambre 2 (Simple)",
    element:
      "Mobilier et rangements (Dressing, étagères, table basse, meuble à chaussures)",
    etat_initial: "Neuf",
    photo: "rangement-simple.jpg",
  },

  // ======================================================
  // TERRASSE
  // ======================================================
  {
    piece: "Terrasse",
    element: "Structure (Sol, Piliers, Plafond)",
    etat_initial: "Neuf",
    photo: "terrasse-structure.jpg",
  },
  {
    piece: "Terrasse",
    element: "Salon de jardin",
    etat_initial: "Neuf, complet",
    photo: "salon-jardin.jpg",
  },
  {
    piece: "Terrasse",
    element: "Table et chaises de jardin",
    etat_initial: "Neuf, complet",
    photo: "table-jardin.jpg",
  },
  {
    piece: "Terrasse",
    element: "Équipements divers (Corde à linge, boîte à clé)",
    etat_initial: "Neuf, fonctionnel",
    photo: "terrasse-divers.jpg",
  },
];
