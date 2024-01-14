//CREATE TIMELINE MODAL

const newTimelineModal = document.getElementById("new-timeline-modal");

const newMemoryButton = document.getElementById("new-timeline-button");

const span = document.getElementsByClassName("close")[0];

newMemoryButton.onclick = function () {
  newTimelineModal.style.display = "block";
};

span.onclick = function () {
  newTimelineModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == newTimelineModal) {
    newTimelineModal.style.display = "none";
  } else if (event.target == document.querySelector("#edit-timeline-modal")) {
    document.getElementById("edit-timeline-modal").style.display = "none";
  } else if (event.target == document.querySelector("#remove-timeline-modal")) {
    document.getElementById("remove-timeline-modal").style.display = "none";
  }
};
