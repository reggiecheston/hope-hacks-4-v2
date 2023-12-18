const hamburgerMenuIcon = document.querySelector(".hamburger-menu__icon");
const hamburgerMenuItems = document.querySelector(".hamburger-menu__items");

hamburgerMenuIcon.addEventListener("click", () => {
  hamburgerMenuItems.classList.toggle("open");
});
