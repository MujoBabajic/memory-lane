//EDIT MEMORY MODAL

const editMemoryModal = document.getElementById("edit-memory-modal");

const editMemoryButton = document.getElementById("edit-memory-button");

editMemoryButton.onclick = function () {
  editMemoryModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == editMemoryModal) {
    editMemoryModal.style.display = "none";
  }
};
