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
})();
