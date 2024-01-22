const editProfileModal = document.querySelector("#edit-profile-modal");
const openEditProfileModal = document.querySelector("#edit-profile-button");
const closeEditProfileModal = document.querySelector(
  "#close-edit-profile-modal"
);

openEditProfileModal.addEventListener("click", () => {
  editProfileModal.style.display = "block";
});

closeEditProfileModal.addEventListener("click", () => {
  editProfileModal.style.display = "none";
});
