// Fichier : assets/js/modules/content-data.js
"use strict";

/**
 * ======================================================
 * MODULE : DONNÉES DE CONTENU
 * ======================================================
 * Ce fichier centralise les contenus HTML à afficher dans les modales
 * pour une maintenance plus facile.
 */

// Contenu affiché à tous les utilisateurs (non connectés)
export const INFO_PUBLIC_HTML = `
    <p>Vous trouverez ici des informations générales sur le fonctionnement du bungalow et ses alentours.</p>
    <p>Pour accéder aux détails complets, incluant les instructions spécifiques, les codes et les manuels d'utilisation, veuillez vous connecter à votre espace personnel.</p>
    <p>La connexion vous donnera également accès à nos offres partenaires exclusives et aux procédures d'arrivée et de départ.</p>
`;

// Contenu détaillé réservé aux utilisateurs connectés, maintenant sous forme d'accordéon
export const INFO_PROTECTED_HTML = `
    <div class="accordion">
        <div class="accordion-item">
            <button class="accordion-header">
                <span>À votre arrivée & Parking</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                <p><strong>Accueil :</strong> Vous serez accueilli par un hôte, qui vous expliquera le fonctionnement de la location et répondra à vos questions.</p>
                <p><strong>Parking :</strong> Si vous êtes véhiculé, vous pourrez stationner votre véhicule sur la propriété à l’endroit indiqué.</p>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Règles du Logement</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                <ul>
                    <li>Le logement est <strong>non-fumeur</strong> et les <strong>animaux sont refusés</strong>.</li>
                    <li>Pour les fumeurs, un cendrier est à votre disposition sur la terrasse.</li>
                    <li>Le mobilier de la terrasse doit être utilisé avec précaution et remis à l'abri en cas d’intempéries.</li>
                    <li>Pensez à bien aérer la salle de bain après vos douches en ouvrant la fenêtre.</li>
                </ul>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Sécurité & Consommation</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                <p><strong>Consommation électrique :</strong> Votre location inclut une consommation de 60 kWh/semaine. Veillez à un usage écoresponsable.</p>
                <p><strong>Sécurité :</strong></p>
                <ul>
                    <li>Une caméra est située sur la propriété principale, au niveau de l’entrée arrière.</li>
                    <li>Les fenêtres sont teintées de l'extérieur pour garantir votre intimité.</li>
                    <li>Par temps de pluie, le carrelage peut s'avérer glissant.</li>
                    <li>Les couteaux de cuisine sont neufs et très tranchants.</li>
                </ul>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Fonctionnement des appareils</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                 <ul>
                    <li><strong>Téléviseur :</strong> Partage de connexion Wi-Fi et fonction "Caster" disponibles.</li>
                    <li><strong>Wi-Fi :</strong> Réseau : CANALBOX-1B4CC7 / Clé : HCGGNMf73d.</li>
                    <li><strong>Climatisation :</strong> Utilisez la télécommande en la dirigeant vers l'appareil.</li>
                </ul>
            </div>
        </div>

        <div class="accordion-item">
            <button class="accordion-header">
                <span>Gestion des déchets & État des lieux</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="accordion-content">
                <p><strong>Déchets :</strong> Les containers vert (ménagers) et jaune (recyclables) sont à votre disposition. Le verre se dépose au pied du container jaune.</p>
                <p><strong>État des lieux :</strong> Un état des lieux sera effectué à votre arrivée et à votre départ.</p>
            </div>
        </div>
    </div>
`;
