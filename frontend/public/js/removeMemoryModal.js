// REMOVE MEMORY MODAL

const removeMemoryModal = document.getElementById("remove-memory-modal");

const removeMemoryButton = document.getElementById("remove-memory-button");

const span = document.getElementsByClassName("close")[0];

removeMemoryButton.onclick = function () {
  removeMemoryModal.style.display = "block";
};

span.onclick = function () {
  removeMemoryModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == removeMemoryModal) {
    removeMemoryModal.style.display = "none";
  }
};
