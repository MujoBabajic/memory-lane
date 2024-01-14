const editMemoryModal = document.querySelector("#edit-memory-modal");
const editMemoryButton = document.querySelector("#edit-memory-button");
const closeEditMemoryModalButton = document.querySelector(
  "#close-edit-memory-modal"
);

editMemoryButton.addEventListener("click", () => {
  editMemoryModal.style.display = "block";
});

closeEditMemoryModalButton.addEventListener("click", () => {
  editMemoryModal.style.display = "none";
});
