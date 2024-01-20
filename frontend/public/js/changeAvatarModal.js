const changeAvatarModal = document.querySelector("#change-avatar-modal");
const changeAvatarButton = document.querySelector("#open-change-avatar-modal");
const closeChangeAvatarModalButton = document.querySelector(
  "#close-change-avatar-modal"
);
const pfp = document.querySelector("#open-change-avatar-modal");
const changeAvatarHoverText = document.querySelector("#hover-text-msg");

changeAvatarButton.addEventListener("click", () => {
  changeAvatarModal.style.display = "block";
});

closeChangeAvatarModalButton.addEventListener("click", () => {
  changeAvatarModal.style.display = "none";
});

pfp.addEventListener("mouseover", () => {
  changeAvatarHoverText.style.display = "block";
});

pfp.addEventListener("mouseout", () => {
  changeAvatarHoverText.style.display = "none";
});
