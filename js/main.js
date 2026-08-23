/* ============================================================
   伟业泽城 - 企业官网交互脚本
   包含：移动端导航、轮播图、数字滚动、搜索等交互功能
   ============================================================ */

/**
 * 页面加载完成后初始化所有交互功能
 * DOMContentLoaded 确保 DOM 结构已就绪再执行脚本
 */
document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();   // 初始化移动端导航
  initHeroSlider();  // 初始化首页轮播图
  initCountUp();     // 初始化数字滚动动画
});

/**
 * 移动端导航
 * 点击汉堡按钮展开/收起抽屉式菜单，
 * 点击菜单外区域时自动收起。
 */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle"); // 汉堡按钮
  const menu = document.querySelector(".nav-menu");     // 导航菜单

  // 如果页面不存在这些元素则直接返回，避免报错
  if (!toggle || !menu) return;

  // 点击汉堡按钮切换菜单的展开状态
  toggle.addEventListener("click", function () {
    menu.classList.toggle("open");
    // 根据展开状态切换按钮图标（☰ ↔ ✕）
    toggle.textContent = menu.classList.contains("open") ? "✕" : "☰";
  });

  // 点击菜单外部区域时收起菜单
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("open");
      toggle.textContent = "☰";
    }
  });
}

/**
 * 首页 Hero 轮播图
 * 支持自动播放、左右箭头切换、指示点点击跳转。
 */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide"); // 所有幻灯片
  if (slides.length === 0) return; // 无幻灯片时直接返回

  const dots = document.querySelectorAll(".hero-dots span"); // 指示点
  const prev = document.querySelector(".hero-arrow.prev");   // 上一张按钮
  const next = document.querySelector(".hero-arrow.next");   // 下一张按钮

  let current = 0;   // 当前展示的幻灯片索引
  let timer = null;  // 自动播放定时器

  /**
   * 切换到指定索引的幻灯片
   * @param {number} index - 目标索引（支持负数与越界，自动取模循环）
   */
  function goTo(index) {
    // 移除当前幻灯片的 active 状态
    slides[current].classList.remove("active");
    if (dots.length) dots[current].classList.remove("active");

    // 计算新索引（取模确保循环播放）
    current = (index + slides.length) % slides.length;

    // 激活新幻灯片
    slides[current].classList.add("active");
    if (dots.length) dots[current].classList.add("active");
  }

  // 启动自动播放（每 5 秒切换一张）
  function start() {
    stop(); // 先清除旧定时器，避免叠加
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  // 停止自动播放
  function stop() {
    if (timer) clearInterval(timer);
  }

  // 绑定左右箭头事件
  if (prev) prev.addEventListener("click", () => { goTo(current - 1); start(); });
  if (next) next.addEventListener("click", () => { goTo(current + 1); start(); });

  // 绑定指示点点击事件
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { goTo(i); start(); });
  });

  start(); // 开始自动播放
}

/**
 * 数字滚动动画
 * 当带 data-count 属性的元素滚动进入可视区时，
 * 数字从 0 平滑递增到目标值。
 */
function initCountUp() {
  const nums = document.querySelectorAll("[data-count]"); // 所有需要计数的元素
  if (nums.length === 0) return;

  // 使用 IntersectionObserver 监听元素是否进入可视区
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return; // 未进入可视区则跳过

        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10); // 目标数值
        const suffix = el.getAttribute("data-suffix") || "";        // 后缀（如 "+"、"年"）
        const duration = 1600; // 动画时长（毫秒）
        const startTime = performance.now();

        /**
         * 逐帧更新数字（使用 requestAnimationFrame 实现流畅动画）
         * @param {number} now - 当前时间戳
         */
        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1); // 动画进度 0~1
          const eased = 1 - Math.pow(1 - progress, 3); // 缓出函数，动画末尾减速
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix; // 更新显示
          if (progress < 1) requestAnimationFrame(tick); // 未完成则继续下一帧
        }
        requestAnimationFrame(tick); // 开始动画
        observer.unobserve(el);      // 动画开始后停止监听
      });
    },
    { threshold: 0.4 } // 元素 40% 进入可视区时触发
  );

  nums.forEach((n) => observer.observe(n)); // 监听所有计数元素
}

/**
 * 搜索框（演示功能）
 * 通过弹窗模拟搜索交互。
 */
function openSearch() {
  const keyword = prompt("请输入搜索关键词：");
  if (keyword && keyword.trim()) {
    alert("搜索结果功能演示：\"" + keyword.trim() + "\"");
  }
}
