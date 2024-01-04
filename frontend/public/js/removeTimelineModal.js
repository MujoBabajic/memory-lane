// REMOVE TIMELINE MODAL

const removeTimelineModal = document.getElementById("remove-timeline-modal");

const removeTimelineButton = document.getElementById("remove-timeline-button");

const span = document.getElementsByClassName("close")[0];

removeTimelineButton.onclick = function () {
  removeTimelineModal.style.display = "block";
};

span.onclick = function () {
  removeTimelineModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == removeTimelineModal) {
    removeTimelineModal.style.display = "none";
  }
};
