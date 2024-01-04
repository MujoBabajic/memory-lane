//PROFILE NAV DROPDOWN

document.addEventListener("DOMContentLoaded", function () {
  const profileNavButton = document.querySelector(".profile-nav-button");

  profileNavButton.addEventListener("click", function () {
    const dropdownContent = this.querySelector(".dropdown-content");
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });
});
