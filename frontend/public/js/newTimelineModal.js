//CREATE TIMELINE MODAL

const newTimelineModal = document.getElementById("new-timeline-modal");

const newTimelineButton = document.getElementById("new-timeline-button");

const span = document.getElementsByClassName("close")[0];

newTimelineButton.onclick = function () {
  newTimelineModal.style.display = "block";
};

span.onclick = function () {
  newTimelineModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == newTimelineModal) {
    newTimelineModal.style.display = "none";
    removeTimelineModal.style.display = "none";
  }
};
