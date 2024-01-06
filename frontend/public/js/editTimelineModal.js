//EDIT TIMELINE MODAL

const editTimelineModal = document.getElementById("edit-timeline-modal");

const editTimelineButton = document.getElementById("edit-timeline-button");

editTimelineButton.onclick = function () {
  editTimelineModal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == editTimelineModal) {
    editTimelineModal.style.display = "none";
  }
};
