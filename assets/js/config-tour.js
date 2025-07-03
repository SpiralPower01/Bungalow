// Fichier : assets/js/config-tour.js
"use strict";

// Constantes pour la maintenance
export const PATHS = {
  videos: "assets/videos/",
  images: "assets/images/",
};

export const PLAYBACK_SPEEDS = [1, 1.5, 2];

// Données des scènes de la visite guidée
export const TOUR_DATA = [
  {
    sceneId: "terrasse",
    videoFile: "OpeningVideo.mp4",
    startTime: 0,
    pauseTime: 9,
    title: "Terrasse Ombragée",
    description:
      "Idéale pour profiter de moments de détente à l'extérieur tout en étant protégé du soleil.",
    images: ["00.jpg"],
  },
  {
    sceneId: "cuisine",
    videoFile: "PresentationVideo.mp4",
    startTime: 5,
    pauseTime: 22,
    title: "Cuisine Ouverte et Fonctionnelle",
    description:
      "Un petit espace moderne alliant esthétique et praticité, avec de nombreux rangements.",
    images: ["01.jpg", "02.jpg"],
  },
  {
    sceneId: "salle-de-bain",
    videoFile: "PresentationVideo.mp4",
    startTime: 43,
    pauseTime: 67,
    title: "Salle de Bain Moderne",
    description:
      "Douche à l'italienne, toilettes, et de multiples espaces de rangement.",
    images: ["07.jpg", "08.jpg", "09.jpg"],
  },
  {
    sceneId: "chambre-principale",
    videoFile: "PresentationVideo.mp4",
    startTime: 75,
    pauseTime: 98,
    title: "Chambre Principale Lumineuse",
    description:
      "Entièrement blanche, climatisée pour un confort optimal et équipée d'une grande armoire.",
    images: ["03.jpg", "04.jpg"],
  },
  {
    sceneId: "seconde-chambre",
    videoFile: "PresentationVideo.mp4",
    startTime: 126,
    pauseTime: 155,
    title: "Seconde Chambre Polyvalente",
    description:
      "Aménagée avec un lit simple et des rangements, parfaite pour un enfant ou comme bureau.",
    images: ["05.jpg", "06.jpg"],
  },
];
