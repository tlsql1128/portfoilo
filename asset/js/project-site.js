(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const root = document.getElementById("siteProjectRoot");

  if (!root || !id || !PROJECTS[id] || PROJECTS[id].type !== "site") {
    if (root) {
      root.innerHTML =
        '<p style="padding:120px 40px;text-align:center;color:#666;">프로젝트를 찾을 수 없습니다. <a href="index.html#works">Works로 돌아가기</a></p>';
    }
    return;
  }

  const project = PROJECTS[id];
  document.title = `${project.title} — Project`;
  root.innerHTML = renderSiteProject(project);

  const left = root.querySelector("[data-pd-left]");
  const right = root.querySelector("[data-pd-right]");

  if (window.gsap && left && right) {
    gsap.from(left, { opacity: 0, x: -40, duration: 0.8, ease: "power3.out" });
    gsap.from(right, { opacity: 0, scale: 0.94, duration: 0.9, ease: "power3.out" });
  }

  initProjectDetailLightbox(root);
})();

function initProjectDetailLightbox(scope) {
  const lightbox = document.getElementById("pdLightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".pd-lightbox__img");
  const lightboxStage = lightbox.querySelector(".pd-lightbox__stage");
  const closeBtn = lightbox.querySelector(".pd-lightbox__close");
  const shots = (scope || document).querySelectorAll(".project-detail-shot");
  let lastFocused = null;

  function openLightbox(src, alt, position, isFullPage) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxImg.style.objectPosition = position || "center top";
    lightboxStage.classList.toggle("pd-lightbox__stage--full", isFullPage);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("pd-lightbox-open");
    lightbox.scrollTop = 0;
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pd-lightbox-open");
    lightboxStage.classList.remove("pd-lightbox__stage--full");
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  shots.forEach((shot) => {
    const img = shot.querySelector("img");
    if (!img) return;

    shot.setAttribute("role", "button");
    shot.setAttribute("tabindex", "0");

    const trigger = () => {
      lastFocused = shot;
      const position = img.style.objectPosition || "center top";
      const isFullPage = shot.dataset.fullPage === "true";
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"), position, isFullPage);
    };

    shot.addEventListener("click", trigger);
    shot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxStage) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
