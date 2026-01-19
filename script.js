const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Scroll progress */
const scrollBar = $("#scrollBar");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  scrollBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
});

/* Mobile nav */
const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
$$(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Active link highlight */
const sections = ["home","about","skills","portfolio","certificates","contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = $$(".nav__link");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });
sections.forEach(s => io.observe(s));

/* Theme toggle */
const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");
const THEME_KEY = "dd-theme";

function setTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = theme === "light" ? "☀" : "☾";
  localStorage.setItem(THEME_KEY, theme);
}
const saved = localStorage.getItem(THEME_KEY);
if (saved) setTheme(saved);
else {
  const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
  setTheme(prefersLight ? "light" : "dark");
}
themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

/* Animate skill bars */
const bars = $$(".bar span");
const barsIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const span = e.target;
    const w = span.style.width;
    span.style.width = "0%";
    requestAnimationFrame(() => { span.style.width = w; });
    barsIO.unobserve(span);
  });
}, { threshold: 0.3 });
bars.forEach(b => barsIO.observe(b));

/* Project filters */
const filterBtns = $$(".pill");
const projects = $$(".project");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.toggle("is-active", b === btn));
    projects.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
      card.style.display = (filter === "all" || tags.includes(filter)) ? "" : "none";
    });
  });
});

/* Certificate modal */
const modal = $("#modal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalClose = $("#modalClose");

function openModal({ title, img }){
  modalTitle.textContent = title || "Certificate";
  modalImg.src = img;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalImg.src = "";
}

$$(".cert").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!btn.dataset.img) return;
    openModal({ title: btn.dataset.title, img: btn.dataset.img });
  });
});
modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (e) => { if (e.target?.dataset?.close) closeModal(); });
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* Hero typing */
(function typingEffect(){
  const el = document.getElementById("typedText");
  if (!el) return;

  let phrases = [];
  try { phrases = JSON.parse(el.getAttribute("data-phrases") || "[]"); } catch {}
  if (!phrases.length) return;

  const typeSpeed = 45, deleteSpeed = 25, holdTime = 1100;
  let i = 0, j = 0, deleting = false;

  function tick(){
    const phrase = phrases[i];
    if (!deleting) {
      el.textContent = phrase.slice(0, j + 1);
      j++;
      if (j === phrase.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = phrase.slice(0, j - 1);
      j--;
      if (j === 0) {
        deleting = false;
        i = (i + 1) % phrases.length;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  tick();
})();
