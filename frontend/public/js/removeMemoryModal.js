// REMOVE MEMORY MODAL

const removeMemoryModal = document.getElementById("remove-memory-modal");

const removeMemoryButton = document.getElementById("remove-memory-button");

const closeRemoveMemoryModalButton = document.querySelector(
  "#close-remove-memory-modal"
);

removeMemoryButton.onclick = function () {
  removeMemoryModal.style.display = "block";
};

closeRemoveMemoryModalButton.addEventListener("click", () => {
  removeMemoryModal.style.display = "none";
});
