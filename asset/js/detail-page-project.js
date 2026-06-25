(function () {
  const detail = document.getElementById("detailPageProject");
  const content = document.getElementById("detailPageProjectContent");
  if (!detail || !content) return;

  const closeBtn = detail.querySelector("[data-project-detail-close]");
  const works = document.getElementById("works");
  const triggers = document.querySelectorAll("[data-project-detail]");

  function openDetail(id, e) {
    if (e) e.preventDefault();
    const project = PROJECTS[id];
    if (!project || project.type !== "detail") return;

    content.innerHTML = renderDetailProject(project);
    document.body.classList.add("is-project-detail-open");
    detail.setAttribute("aria-hidden", "false");
    detail.scrollTop = 0;
  }

  function closeDetail() {
    document.body.classList.remove("is-project-detail-open");
    detail.setAttribute("aria-hidden", "true");
    content.innerHTML = "";

    if (works) {
      works.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      openDetail(trigger.dataset.projectDetail, e);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDetail);
  }

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.body.classList.contains("is-project-detail-open")
    ) {
      closeDetail();
    }
  });
})();
