/* ============================================================
   云擎科技 - 交互脚本
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initHeroSlider();
  initCountUp();
});

/* 移动端导航 */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
    toggle.textContent = menu.classList.contains("open") ? "✕" : "☰";
  });

  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("open");
      toggle.textContent = "☰";
    }
  });
}

/* Hero 轮播 */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length === 0) return;

  const dots = document.querySelectorAll(".hero-dots span");
  const prev = document.querySelector(".hero-arrow.prev");
  const next = document.querySelector(".hero-arrow.next");
  let current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove("active");
    if (dots.length) dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots.length) dots[current].classList.add("active");
  }

  function start() {
    stop();
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  if (prev) prev.addEventListener("click", () => { goTo(current - 1); start(); });
  if (next) next.addEventListener("click", () => { goTo(current + 1); start(); });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { goTo(i); start(); });
  });

  start();
}

/* 数字滚动 */
function initCountUp() {
  const nums = document.querySelectorAll("[data-count]");
  if (nums.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1600;
        const startTime = performance.now();

        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  nums.forEach((n) => observer.observe(n));
}

/* 搜索框 */
function openSearch() {
  const keyword = prompt("请输入搜索关键词：");
  if (keyword && keyword.trim()) {
    alert("搜索结果功能演示：\"" + keyword.trim() + "\"");
  }
}
