document.addEventListener("DOMContentLoaded", function () {
  // Handle clicks on menu links
  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".menu-link").forEach(function (link) {
        link.classList.remove("is-active");
      });
      this.classList.add("is-active");
    });
  });

  // Handle clicks on header links
  document.querySelectorAll(".main-header-link").forEach(function (link) {
    link.addEventListener("click", function () {
      document.querySelectorAll(".main-header-link").forEach(function (link) {
        link.classList.remove("is-active");
      });
      this.classList.add("is-active");
    });
  });

  // Handle clicks on dropdowns
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      document.querySelectorAll(".dropdown").forEach(function (dropdown) {
        dropdown.classList.remove("is-active");
      });
      this.classList.add("is-active");
    });
  });

  // Handle focus and blur events on search bar input
  var searchBar = document.querySelector(".search-bar input");
  var header = document.querySelector(".header");
  searchBar.addEventListener("focus", function () {
    header.classList.add("wide");
  });
  searchBar.addEventListener("blur", function () {
    header.classList.remove("wide");
  });

  // Handle clicks outside of the dropdown container
  document.addEventListener("click", function (e) {
    var container = document.querySelector(".status-button");
    var dd = document.querySelector(".dropdown");
    if (!container.contains(e.target)) {
      dd.classList.remove("is-active");
    }
  });

  // Handle clicks on dropdowns to show content overlay
  document.querySelectorAll(".dropdown").forEach(function (dropdown) {
    dropdown.addEventListener("click", function (e) {
      document.querySelector(".content-wrapper").classList.add("overlay");
      e.stopPropagation();
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dropdown")) {
      document.querySelector(".content-wrapper").classList.remove("overlay");
    }
  });

  // Handle clicks on status button to show popup
  document
    .querySelectorAll(".status-button:not(.open)")
    .forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelector(".overlay-app").classList.add("is-active");
      });
    });
  document.querySelectorAll(".pop-up .close").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelector(".overlay-app").classList.remove("is-active");
    });
  });

  // Handle clicks on dark mode toggle button
  document.querySelector(".dark-light").addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
  });
});
