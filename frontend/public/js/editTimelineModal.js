const editTimelineModal = document.querySelector("#edit-timeline-modal");
const editTimelineButton = document.querySelector("#edit-timeline-button");
const closeEditTimelineModalButton = document.querySelector(
  "#close-edit-timeline-modal"
);

editTimelineButton.addEventListener("click", () => {
  editTimelineModal.style.display = "block";
});

closeEditTimelineModalButton.addEventListener("click", () => {
  editTimelineModal.style.display = "none";
});
