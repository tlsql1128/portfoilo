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

worksFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;

    worksFilters.forEach((btn) => btn.classList.remove("is-active"));
    filter.classList.add("is-active");

    applyWorksFilter(category);
  });
});

sortWorksByCategory();

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
