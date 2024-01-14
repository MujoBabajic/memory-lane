const newMemoryModal = document.querySelector("#new-memory-modal");
const newMemoryButton = document.querySelector("#new-memory-button");
const closeNewMemoryModalButton = document.querySelector(
  "#close-new-memory-modal"
);

newMemoryButton.addEventListener("click", () => {
  newMemoryModal.style.display = "block";
});

closeNewMemoryModalButton.addEventListener("click", () => {
  newMemoryModal.style.display = "none";
});
