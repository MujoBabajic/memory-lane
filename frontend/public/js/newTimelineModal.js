const newTimelineModal = document.querySelector("#new-timeline-modal");
const newMemoryButton = document.querySelector("#new-timeline-button");
const closeNewTimelineModalButton = document.querySelector(
  "#close-new-timeline-modal"
);

newMemoryButton.addEventListener("click", () => {
  newTimelineModal.style.display = "block";
});

closeNewTimelineModalButton.addEventListener("click", () => {
  newTimelineModal.style.display = "none";
});
