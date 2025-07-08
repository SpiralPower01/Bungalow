// Fichier: assets/js/admin.js
"use strict";

import { initConversationList } from "./modules/conversation-list.js";

document.addEventListener("DOMContentLoaded", () => {
  initConversationList();
  console.log("Panel admin initialisé.");
});
