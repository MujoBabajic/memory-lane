const removeMemoryModal = document.querySelector("#remove-memory-modal");
const removeMemoryButton = document.querySelector("#remove-memory-button");
const closeRemoveMemoryModalButton = document.querySelector(
  "#close-remove-memory-modal"
);

removeMemoryButton.addEventListener("click", () => {
  removeMemoryModal.style.display = "block";
});

closeRemoveMemoryModalButton.addEventListener("click", () => {
  removeMemoryModal.style.display = "none";
});
