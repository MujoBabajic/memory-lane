//CREATE MEMORY MODAL

const newMemoryModal = document.getElementById("new-memory-modal");

const newMemoryButton = document.getElementById("new-memory-button");

newMemoryButton.onclick = function () {
  newMemoryModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == newMemoryModal) {
    newMemoryModal.style.display = "none";
  }
};
