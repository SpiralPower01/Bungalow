// Fichier : assets/js/modules/inventory-controller.js
"use strict";

import { inventoryData } from "../config-inventory.js";

const INVENTORY_STATE_KEY = "bungalowInventoryState";

const dom = {
  modal: document.querySelector("#inventory-modal"),
  openBtn: document.querySelector("#hub-inventory-btn"),
  closeBtn: document.querySelector("#close-inventory-modal-btn"),
  listContainer: document.querySelector("#inventory-list-container"),
};

function groupDataByPiece(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.piece]) {
      acc[item.piece] = [];
    }
    acc[item.piece].push(item);
    return acc;
  }, {});
}

function renderInventory() {
  const groupedData = groupDataByPiece(inventoryData);
  let html = "";

  for (const piece in groupedData) {
    html += `
            <div class="inventory-piece-group">
                <h3 class="inventory-piece-header">${piece}</h3>
                <ul class="inventory-item-list">
        `;

    groupedData[piece].forEach((item, index) => {
      const itemId = `${piece.replace(/\s+/g, "-")}-${index}`;
      const photoHtml = item.photo
        ? `<img src="assets/images/inventory/${item.photo}" alt="Photo de ${item.element}" class="item-photo">`
        : "";

      html += `
                <li class="inventory-item" data-item-id="${itemId}">
                    ${photoHtml}
                    <div class="item-details">
                        <span class="item-name">${item.element}</span>
                        <span class="item-initial-state">${item.etat_initial}</span>
                    </div>
                    
                    <div class="item-actions">
                        <button class="btn-action btn-ok" data-action="ok">
                            <i class="fas fa-check"></i> Conforme
                        </button>
                        <button class="btn-action btn-problem" data-action="problem">
                            <i class="fas fa-exclamation-triangle"></i> Signaler
                        </button>
                    </div>

                    <div class="item-problem-details" hidden>
                        <textarea placeholder="Décrivez le problème constaté..."></textarea>
                        <button class="btn-action btn-upload-photo">
                            <i class="fas fa-camera"></i> Ajouter une photo
                        </button>
                    </div>
                </li>
            `;
    });

    html += `</ul></div>`;
  }

  dom.listContainer.innerHTML = html;
  addAccordionListeners();
  addItemActionListeners();
  loadInventoryState();
}

function addAccordionListeners() {
  const headers = dom.listContainer.querySelectorAll(".inventory-piece-header");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const group = header.parentElement;
      const content = header.nextElementSibling;

      if (!group.classList.contains("is-open")) {
        const openGroups = dom.listContainer.querySelectorAll(
          ".inventory-piece-group.is-open"
        );
        openGroups.forEach((openGroup) => {
          openGroup.classList.remove("is-open");
          openGroup.querySelector(".inventory-item-list").style.maxHeight =
            null;
        });
      }

      group.classList.toggle("is-open");
      if (group.classList.contains("is-open")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
}

function handleItemAction(event) {
  const target = event.target;
  const button = target.closest(".btn-action");
  const textarea = target.closest("textarea");

  if (!button && !textarea) return;

  const item = target.closest(".inventory-item");
  const itemId = item.dataset.itemId;
  const problemDetails = item.querySelector(".item-problem-details");
  let currentState = {};

  if (button) {
    const action = button.dataset.action;
    if (action === "ok") {
      item.classList.toggle("is-ok");
      item.classList.remove("has-problem");
      problemDetails.hidden = true;
    } else if (action === "problem") {
      item.classList.toggle("has-problem");
      item.classList.remove("is-ok");
      problemDetails.hidden = !item.classList.contains("has-problem");
    }
  }

  currentState.status = item.classList.contains("is-ok")
    ? "ok"
    : item.classList.contains("has-problem")
    ? "problem"
    : "unchecked";
  currentState.description = item.querySelector("textarea").value;

  saveInventoryState(itemId, currentState);
}

function addItemActionListeners() {
  dom.listContainer.addEventListener("click", handleItemAction);
  dom.listContainer.addEventListener("input", handleItemAction);
}

function saveInventoryState(itemId, state) {
  const existingStates =
    JSON.parse(localStorage.getItem(INVENTORY_STATE_KEY)) || {};
  existingStates[itemId] = state;
  localStorage.setItem(INVENTORY_STATE_KEY, JSON.stringify(existingStates));
}

function loadInventoryState() {
  const states = JSON.parse(localStorage.getItem(INVENTORY_STATE_KEY)) || {};
  for (const itemId in states) {
    const item = dom.listContainer.querySelector(`[data-item-id="${itemId}"]`);
    if (item) {
      const state = states[itemId];
      if (state.status === "ok") {
        item.classList.add("is-ok");
      } else if (state.status === "problem") {
        item.classList.add("has-problem");
        item.querySelector(".item-problem-details").hidden = false;
      }
      item.querySelector("textarea").value = state.description || "";
    }
  }
}

function showModal() {
  if (dom.modal) {
    dom.modal.hidden = false;
    setTimeout(() => {
      dom.modal.classList.add("is-visible");
      renderInventory();
    }, 10);
  }
}

function hideModal() {
  if (dom.modal) {
    dom.modal.classList.remove("is-visible");
    dom.modal.addEventListener(
      "transitionend",
      () => {
        dom.modal.hidden = true;
      },
      { once: true }
    );
  }
}

export function initInventoryController() {
  if (dom.openBtn) {
    dom.openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showModal();
    });
  }

  if (dom.closeBtn) {
    dom.closeBtn.addEventListener("click", hideModal);
  }

  if (dom.modal) {
    dom.modal.addEventListener("click", (e) => {
      if (e.target === dom.modal) {
        hideModal();
      }
    });
  }

  console.log("Module Inventory Controller initialisé et actif.");
}
