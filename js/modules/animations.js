"use strict";

/**
 * ======================================================
 * MODULE : ANIMATIONS AU DÉFILEMENT (SCROLL)
 * ======================================================
 * Utilise l'Intersection Observer pour faire apparaître les
 * sections au fur et à mesure que l'utilisateur défile.
 */

export function initScrollAnimations() {
  // On sélectionne toutes les sections qui ont notre classe "cachée"
  const hiddenSections = document.querySelectorAll(".section-hidden");

  if (hiddenSections.length === 0) return;

  // On configure notre "observateur"
  const observer = new IntersectionObserver(
    (entries) => {
      // Pour chaque "entrée" (chaque section observée)
      entries.forEach((entry) => {
        // Si la section est maintenant visible à l'écran...
        if (entry.isIntersecting) {
          // ... on lui ajoute la classe "visible" pour déclencher l'animation CSS.
          entry.target.classList.add("section-visible");

          // Optionnel : une fois animée, on arrête de l'observer pour optimiser.
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // L'animation se déclenche quand 15% de la section est visible.
      threshold: 0.15,
    }
  );

  // On demande à l'observateur de surveiller chaque section cachée.
  hiddenSections.forEach((section) => {
    observer.observe(section);
  });

  console.log("Module d'animations au défilement initialisé.");
}
