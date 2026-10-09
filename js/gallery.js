(function () {
  var d = document.createElement("dialog"),
    list = [],
    i = 0;
  d.className = "gal";
  d.setAttribute("aria-label", "Project screenshots");
  d.innerHTML =
    '<div class="gal-h"><strong></strong><span></span><button type="button" class="gal-x" aria-label="Close">&times;</button></div><div class="gal-b"><button type="button" class="gal-n" data-d="-1" aria-label="Previous screenshot">&#8249;</button><img alt=""><button type="button" class="gal-n" data-d="1" aria-label="Next screenshot">&#8250;</button></div>';
  document.body.appendChild(d);
  var ttl = d.querySelector("strong"),
    cnt = d.querySelector("span"),
    img = d.querySelector("img"),
    nav = d.querySelectorAll(".gal-n");
  function show(n) {
    i = (n + list.length) % list.length;
    img.src = list[i];
    img.alt = ttl.textContent + " screenshot " + (i + 1);
    cnt.textContent = i + 1 + " / " + list.length;
  }
  function open(b) {
    list = b.srcs;
    ttl.textContent = b.dataset.title;
    nav.forEach(function (x) {
      x.hidden = list.length < 2;
    });
    show(0);
    document.body.style.overflow = "hidden";
    d.showModal();
  }
  d.addEventListener("close", function () {
    document.body.style.overflow = "";
  });
  d.addEventListener("click", function (e) {
    if (e.target === d || e.target.closest(".gal-x")) d.close();
    var n = e.target.closest(".gal-n");
    if (n) show(i + +n.dataset.d);
  });
  d.addEventListener("keydown", function (e) {
    if (list.length > 1 && e.key === "ArrowLeft") show(i - 1);
    if (list.length > 1 && e.key === "ArrowRight") show(i + 1);
  });
  var x0 = 0,
    b = d.querySelector(".gal-b");
  b.addEventListener(
    "touchstart",
    function (e) {
      x0 = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  b.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - x0;
    if (list.length > 1 && Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1));
  });
  document.querySelectorAll("[data-shots]").forEach(function (btn) {
    btn.srcs = [];
    (function next(n) {
      var m = new Image(),
        s = "assets/projects/" + btn.dataset.shots + "-" + n + ".jpg";
      m.onload = function () {
        btn.srcs.push(s);
        btn.hidden = false;
        if (n < 10) next(n + 1);
      };
      m.src = s;
    })(1);
    btn.addEventListener("click", function () {
      open(btn);
    });
  });
})();
