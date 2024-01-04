//PROFILE NAV DROPDOWN

document.addEventListener("DOMContentLoaded", function () {
  const profileNavButton = document.querySelector(".profile-nav-button");

  profileNavButton.addEventListener("click", function () {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});

//CREATE TIMELINE MODAL

const modal = document.getElementById("new-timeline-modal");

const btn = document.getElementById("new-timeline-button");

const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const form = document.getElementById("new-timeline-form");
