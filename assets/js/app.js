function scrollToMain() {
  document.getElementById("main").scrollIntoView({ behavior: "smooth" });
}

function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString("en-GB", { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// Smooth reveal sections when scrolling into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section").forEach((sec) => {
  sec.style.opacity = "0";
  sec.style.transform = "translateY(28px)";
  sec.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(sec);
});

// Keyboard accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === " ") {
    const hero = document.getElementById("hero");
    if (hero && window.scrollY < hero.offsetHeight * 0.8) {
      e.preventDefault();
      scrollToMain();
    }
  }
});
