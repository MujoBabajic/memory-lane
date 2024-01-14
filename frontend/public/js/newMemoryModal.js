//CREATE MEMORY MODAL

const newMemoryModal = document.getElementById("new-memory-modal");
const newMemoryButton = document.getElementById("new-memory-button");
const closeNewMemoryModalButton = document.querySelector(
  "#close-new-memory-modal"
);

newMemoryButton.onclick = function () {
  newMemoryModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == newMemoryModal) {
    newMemoryModal.style.display = "none";
  }
};

closeNewMemoryModalButton.addEventListener("click", () => {
  newMemoryModal.style.display = "none";
});
