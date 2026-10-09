(function () {
  var t;
  try {
    t = localStorage.getItem("theme");
  } catch (e) {}
  if (t) document.documentElement.dataset.theme = t;
  var nav = [
    ["index.html", "Home"],
    ["portfolio.html", "Portfolio"],
    ["certifications.html", "Certifications"],
    ["cv.html", "CV"],
  ];
  var page = location.pathname.split("/").pop() || "index.html";
  document.addEventListener("DOMContentLoaded", function () {
    var links = nav
      .map(function (n) {
        return (
          '<a href="' +
          n[0] +
          '"' +
          (n[0] === page ? ' aria-current="page"' : "") +
          ">" +
          n[1] +
          "</a>"
        );
      })
      .join("");
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<a class="skip" href="#main">Skip to content</a><header class="topbar"><div class="in"><a class="brand" href="index.html">Santosh Bhandari</a><nav aria-label="Main">' +
        links +
        '</nav><button id="theme" type="button" aria-label="Enable dark theme" title="Enable dark theme"><i id="theme-icon" class="fa-solid fa-moon" aria-hidden="true"></i></button></div></header>',
    );
    var s = document.getElementById("side");
    if (s)
      s.innerHTML =
        '<div class="avatar"><span aria-hidden="true">SB</span><img src="assets/profile.jpg" alt="Portrait of Santosh Bhandari" onerror="this.remove()"></div><h1>Santosh Bhandari</h1><p class="role"> MERN Stack Developer </p><ul><li><span class="k"><i class="fa-solid fa-location-dot profile-icon" aria-hidden="true"></i>Location</span>Pokhara, Nepal</li><li><span class="k"><i class="fa-solid fa-building-columns profile-icon" aria-hidden="true"></i>Studied at</span>Informatics College Pokhara</li><li><a href="https://santoshbhandari.info.np"><i class="fa-solid fa-globe profile-icon" aria-hidden="true"></i><span>santoshbhandari.info.np</span></a></li><li><a href="https://github.com/SantoshBhandari21" rel="me noopener"><i class="fa-brands fa-github profile-icon" aria-hidden="true"></i><span>GitHub</span></a></li><li><a href="https://www.linkedin.com/in/santosh-bhandari-560b00424/" rel="me noopener"><i class="fa-brands fa-linkedin profile-icon" aria-hidden="true"></i><span>LinkedIn</span></a></li></ul>';
    var f = document.getElementById("footer");
    if (f)
      f.innerHTML =
        '<div class="in"><span>&copy; 2025 Santosh Bhandari. All rights reserved.</span></div>';
    document.querySelectorAll(".cert-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var figure = button.nextElementSibling;
        var isHidden = figure.hasAttribute("hidden");
        if (isHidden) {
          figure.removeAttribute("hidden");
          button.setAttribute("aria-expanded", "true");
          button.textContent = "Hide Certificate";
        } else {
          figure.setAttribute("hidden", "");
          button.setAttribute("aria-expanded", "false");
          button.textContent = "View Certificate";
        }
      });
    });
    var themeButton = document.getElementById("theme");
    var updateThemeIcon = function () {
      var isDark = document.documentElement.dataset.theme === "dark";
      var icon = document.getElementById("theme-icon");
      icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Enable light theme" : "Enable dark theme",
      );
      themeButton.setAttribute(
        "title",
        isDark ? "Enable light theme" : "Enable dark theme",
      );
    };
    updateThemeIcon();
    themeButton.onclick = function () {
      var d = document.documentElement,
        n = d.dataset.theme === "dark" ? "light" : "dark";
      d.dataset.theme = n;
      updateThemeIcon();
      try {
        localStorage.setItem("theme", n);
      } catch (e) {}
    };
  });
})();
