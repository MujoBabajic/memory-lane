//EDIT TIMELINE MODAL

const editTimelineModal = document.getElementById("edit-timeline-modal");
const editTimelineButton = document.getElementById("edit-timeline-button");
const closeEditTimelineModalButton = document.querySelector(
  "#close-edit-timeline-modal"
);

editTimelineButton.onclick = function () {
  editTimelineModal.style.display = "block";
};

window.onclick = function () {
  if (event.target == editTimelineModal) {
    editTimelineModal.style.display = "none";
  }
};

closeEditTimelineModalButton.addEventListener("click", () => {
  editTimelineModal.style.display = "none";
});
