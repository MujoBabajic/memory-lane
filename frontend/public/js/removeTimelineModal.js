// REMOVE TIMELINE MODAL

const removeTimelineModal = document.getElementById("remove-timeline-modal");

const removeTimelineButton = document.getElementById("remove-timeline-button");

const closeRemoveTimelineModal = document.querySelector(
  "#close-remove-timeline-modal"
);

removeTimelineButton.onclick = function () {
  removeTimelineModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == removeTimelineModal) {
    removeTimelineModal.style.display = "none";
  }
};

closeRemoveTimelineModal.addEventListener("click", () => {
  removeTimelineModal.style.display = "none";
});
