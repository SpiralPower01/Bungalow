// Fichier : assets/js/config-guide.js
"use strict";

/**
 * ======================================================
 * CONFIGURATION : GUIDE & BONNES ADRESSES
 * ======================================================
 * Centralise toutes les données pour le guide touristique,
 * les partenaires et les services de proximité.
 * Les données sont issues de vos recherches.
 */

export const guideData = {
  // --- Partenaire mis en avant ---
  partners: [
    {
      name: "LABORD' BEACH",
      category: "Notre Partenaire Privilège",
      description:
        "Restaurant et bar à tapas créole avec une vue imprenable sur la plage de l'Anse Laborde.",
      address: "All. de la Pointe d'Antigue, Anse-Bertrand",
      mapsLink:
        "https://www.google.com/maps/search/?api=1&query=Labord%E2%80%99+Beach",
      socials: {
        instagram: "https://www.instagram.com/labordbeach/?hl=fr",
        facebook: "https://www.facebook.com/labordbeach/?locale=fr_FR",
        google: "https://g.co/kgs/nZhr8Ap",
      },
      note: "N'oubliez pas votre code de réduction unique !",
    },
  ],

  // --- Lieux d'intérêt touristique ---
  placesOfInterest: [
    {
      category: "Plages & Lagons",
      icon: "fas fa-water",
      description: "Découvrez les joyaux naturels de la côte.",
      items: [
        {
          name: "Plage de la Chapelle",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie3",
        },
        {
          name: "Plage du Souffleur",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie6",
        },
        {
          name: "Anse Castalia",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Anse+Castalia+Guadeloupe",
        },
      ],
    },
    {
      category: "Sites d'Intérêt",
      icon: "fas fa-compass",
      description: "Des panoramas à couper le souffle.",
      items: [
        {
          name: "La Pointe de la Grande Vigie",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie4",
        },
        {
          name: "La Porte d'Enfer",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie8",
        },
        {
          name: "La Mahaudière",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie4",
        },
        {
          name: "Écomusée Beauport",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie7",
        },
      ],
    },
    {
      category: "Randonnées & Activités",
      icon: "fas fa-hiking",
      description: "Explorez la région à pied ou sur l'eau.",
      items: [
        {
          name: "Le Sentier du Souffleur (Port-Louis)",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Sentier+du+Souffleur+Port-Louis",
        },
        {
          name: "Activités nautiques (Surf, Paddle à Anse-Bertrand)",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=surf+anse+bertrand",
        },
        {
          name: "Ravine-Sable (Étang et Observatoire)",
          mapsLink:
            "https://www.google.com/maps/search/?api=1&query=Pointe+de+la+Grande+Vigie2",
        },
      ],
    },
  ],

  // --- Services de proximité (pour la section "Informations Utiles") ---
  services: [
    {
      category: "Commerces de Proximité",
      items: [
        {
          name: "SUPERETTE DE LACROIX",
          distance: "~1,5 km",
          note: "4,7/5",
          link: "https://www.google.com/maps/place/SUPERETTE+DE+LACROIX/@16.469249,-61.509996,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8c7f7b3e3b:0x8f7a3c9b4e5d2f1e!8m2!3d16.469249!4d-61.509996",
        },
        {
          name: "ANSE B'MARKET",
          distance: "~1,8 km",
          note: "4,0/5",
          link: "https://www.google.com/maps/place/ANSE+B'MARKET/@16.471913,-61.510723,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.471913!4d-61.510723",
        },
        {
          name: "Maximax Anse-Bertrand",
          distance: "~2,0 km",
          note: "4,0/5",
          link: "https://www.google.com/maps/place/Maximax+Anse-Bertrand/@16.473124,-61.511234,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.473124!4d-61.511234",
        },
      ],
    },
    {
      category: "Boulangeries",
      items: [
        {
          name: "Boulangerie La Défense",
          distance: "~1,7 km",
          note: "4,0/5",
          link: "https://www.google.com/maps/place/Boulangerie+La+D%C3%A9fense/@16.470258,-61.510007,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.470258!4d-61.510007",
        },
        {
          name: "Boulangerie du Nord",
          distance: "~2,0 km",
          note: "4,4/5",
          link: "https://www.google.com/maps/place/Boulangerie+du+Nord/@16.473124,-61.511234,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.473124!4d-61.511234",
        },
        {
          name: "La Boulangerie du Sportif",
          distance: "~2,3 km",
          note: "4,2/5",
          link: "https://www.google.com/maps/place/La+Boulangerie+du+Sportif/@16.475146,-61.513356,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.475146!4d-61.513356",
        },
      ],
    },
    {
      category: "Pharmacies",
      items: [
        {
          name: "Pharmacie de la Chapelle",
          distance: "~2,0 km",
          note: "4,8/5",
          link: "https://www.google.com/maps/place/Pharmacie+de+la+Chapelle/@16.473124,-61.511234,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.473124!4d-61.511234",
        },
        {
          name: "Pharmacie D'Anse-Bertrand",
          distance: "~2,2 km",
          note: "Non spécifiée",
          link: "https://www.google.com/maps/place/Pharmacie+D'Anse-Bertrand/@16.474135,-61.512345,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.474135!4d-61.512345",
        },
      ],
    },
    {
      category: "Garages Fiables",
      items: [
        {
          name: "TOP GARAGE - ANSE AUTO",
          distance: "~2,3 km",
          note: "5,0/5",
          link: "https://www.top-garage.fr/garage/anse-auto",
        },
        {
          name: "Anse Auto Service",
          distance: "~2,3 km",
          note: "4,3/5",
          link: "https://www.google.com/maps/place/Anse+Auto+Service/@16.475146,-61.513356,17z/data=!3m1!4b1!4m5!3m4!1s0x8c133c8b9f7a3e3b:0x9f8a3c9b4e5d2f1e!8m2!3d16.475146!4d-61.513356",
        },
      ],
    },
    {
      category: "Banques / Guichets",
      items: [
        {
          name: "La Banque Postale",
          distance: "~2,2 km",
          note: "5,0/5",
          link: "https://www.labanquepostale.fr/particulier.html",
        },
      ],
    },
  ],
};
