const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const navbar = document.getElementById("navbar");

function toggleMenu() {
  if (navbar.className == "invisible") {
    navbar.className = "visible";
    menuIcon.setAttribute("src", "images/hamburgerIconDark.png");
  }
  else {
    navbar.className = "invisible";
    menuIcon.setAttribute("src", "images/hamburgerIconLight.png");
  }
}

menuButton.addEventListener("click", toggleMenu);