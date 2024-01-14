const removeTimelineModal = document.getElementById("remove-timeline-modal");
const removeTimelineButton = document.getElementById("remove-timeline-button");
const closeRemoveTimelineModal = document.querySelector(
  "#close-remove-timeline-modal"
);

removeTimelineButton.addEventListener("click", () => {
  removeTimelineModal.style.display = "block";
});

closeRemoveTimelineModal.addEventListener("click", () => {
  removeTimelineModal.style.display = "none";
});
