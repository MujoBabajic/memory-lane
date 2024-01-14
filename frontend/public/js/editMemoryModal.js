//EDIT MEMORY MODAL

const editMemoryModal = document.getElementById("edit-memory-modal");

const editMemoryButton = document.getElementById("edit-memory-button");
const closeEditMemoryModalButton = document.querySelector(
  "#close-edit-memory-modal"
);

editMemoryButton.onclick = function () {
  editMemoryModal.style.display = "block";
};

closeEditMemoryModalButton.addEventListener("click", () => {
  editMemoryModal.style.display = "none";
});
