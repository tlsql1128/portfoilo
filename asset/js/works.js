const worksGrid = document.querySelector(".works__grid");
const worksFilters = document.querySelectorAll(".works__filter");
const worksCards = document.querySelectorAll(".works__card");

const categoryOrder = {
  landing: 1,
  "detail-page": 2,
  "web-site": 3,
  "team-project": 4,
};

function sortWorksByCategory() {
  if (!worksGrid) return;

  const cards = Array.from(worksGrid.querySelectorAll(".works__card"));

  cards.sort((a, b) => {
    const orderA = categoryOrder[a.dataset.category] ?? 99;
    const orderB = categoryOrder[b.dataset.category] ?? 99;
    return orderA - orderB;
  });

  cards.forEach((card) => worksGrid.appendChild(card));
}

function applyWorksFilter(category) {
  worksCards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.classList.toggle("is-hidden", !match);
  });

  if (category === "all") {
    sortWorksByCategory();
  }
}

function setWorksFilter(category) {
  worksFilters.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.filter === category);
  });
  applyWorksFilter(category);
}

function getActiveWorksFilter() {
  const active = document.querySelector(".works__filter.is-active");
  return active ? active.dataset.filter : "all";
}

worksFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    setWorksFilter(filter.dataset.filter);
  });
});

sortWorksByCategory();

/* ── 상세 페이지에서 돌아올 때 필터·스크롤 복원 ───────────────────────────── */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const WORKS_SCROLL_KEY = "worksScrollY";
const WORKS_FILTER_KEY = "worksFilter";

function saveWorksState() {
  sessionStorage.setItem(WORKS_SCROLL_KEY, String(window.scrollY));
  sessionStorage.setItem(WORKS_FILTER_KEY, getActiveWorksFilter());
}

document.querySelectorAll(".works__card-link").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href");
    if (href && href !== "#") {
      saveWorksState();
    }
  });
});

function restoreWorksState() {
  const savedFilter = sessionStorage.getItem(WORKS_FILTER_KEY);
  const savedScroll = sessionStorage.getItem(WORKS_SCROLL_KEY);

  if (savedFilter === null && savedScroll === null) return;

  if (savedFilter) {
    setWorksFilter(savedFilter);
  }

  if (savedScroll !== null) {
    const scrollY = parseInt(savedScroll, 10) || 0;
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }

  sessionStorage.removeItem(WORKS_FILTER_KEY);
  sessionStorage.removeItem(WORKS_SCROLL_KEY);
}

restoreWorksState();
window.addEventListener("pageshow", restoreWorksState);

const worksRevealTargets = document.querySelectorAll(".works [data-reveal]");

if (worksRevealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  worksRevealTargets.forEach((target) => observer.observe(target));
}
