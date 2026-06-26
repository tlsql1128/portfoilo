(function () {
  const left = document.querySelector("[data-pd-left]");
  const right = document.querySelector("[data-pd-right]");

  if (window.gsap) {
    gsap.from(left, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(right, {
      opacity: 0,
      scale: 0.94,
      duration: 0.9,
      ease: "power3.out",
    });
  } else {
    document.body.classList.add("pd-no-gsap");
  }
})();

/* ── MAIN SCREENS 라이트박스 ───────────────────────────── */
(function () {
  const lightbox = document.getElementById("pdLightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".pd-lightbox__img");
  const closeBtn = lightbox.querySelector(".pd-lightbox__close");
  const shots = document.querySelectorAll(".project-detail-shot");
  let lastFocused = null;

  function openLightbox(src, alt, position, isFullPage) {
    const lightboxStage = lightbox.querySelector(".pd-lightbox__stage");
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxImg.style.objectPosition = position || "center top";
    if (lightboxStage) {
      lightboxStage.classList.toggle("pd-lightbox__stage--full", !!isFullPage);
    }
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("pd-lightbox-open");
    lightbox.scrollTop = 0;
    closeBtn.focus();
  }

  function closeLightbox() {
    const lightboxStage = lightbox.querySelector(".pd-lightbox__stage");
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pd-lightbox-open");
    if (lightboxStage) lightboxStage.classList.remove("pd-lightbox__stage--full");
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
    if (e.target === lightbox || e.target === lightboxImg.parentElement) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
