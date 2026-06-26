function renderDetailProject(p) {
  const features = p.features
    .map(
      (f, i) => `
      <li class="dpp-feature">
        <span class="dpp-feature__num">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="dpp-feature__title">${f.title}</h3>
        <p class="dpp-feature__desc">${f.desc}</p>
      </li>`
    )
    .join("");

  const colors = p.colors
    .map(
      (c) => `
      <div class="dpp-color">
        <span class="dpp-color__chip${c === "#FFFFFF" ? " dpp-color__chip--border" : ""}" style="background:${c}"></span>
        <span class="dpp-color__hex">${c}</span>
      </div>`
    )
    .join("");

  const keywords = p.keywords
    .map((k) => `<li class="dpp-keyword">${k}</li>`)
    .join("");

  const zoom = p.zoom
    .map(
      (z) => `
      <li class="dpp-zoom__card">
        <div class="dpp-placeholder dpp-placeholder--zoom">이미지 준비중</div>
        <h3 class="dpp-zoom__title">${z.title}</h3>
        <p class="dpp-zoom__desc">${z.desc}</p>
      </li>`
    )
    .join("");

  const tags = p.tags.map((t) => `<li class="dpp-tag">${t}</li>`).join("");
  const tools = p.tools.map((t) => `<li class="dpp-tool-badge">${t}</li>`).join("");

  const accent = p.accent || "#6F747A";

  const mockup = p.mockup
    ? `<div class="dpp-mockup"><img src="${p.mockup}" alt="${p.title} 모바일 목업" loading="lazy" decoding="async"></div>`
    : `<div class="dpp-placeholder dpp-placeholder--mockup">MOBILE MOCKUP</div>`;

  const sidePreview = p.detailImage
    ? `<div class="dpp-side-img"><img src="${p.detailImage}" alt="${p.title} 상세페이지 전체 이미지" loading="lazy" decoding="async"></div>`
    : `<div class="dpp-placeholder dpp-placeholder--side">
              <span class="dpp-side__caption">DETAIL PAGE IMAGE</span>
            </div>`;

  return `
    <section class="detail-page-project__section" aria-label="${p.title} 프로젝트 상세" style="--dpp-accent: ${accent}">
      <div class="detail-page-project__inner">
        <div class="detail-page-project__content">
          <div class="dpp-hero">
            <div class="dpp-hero__info">
              <p class="dpp-hero__eyebrow">PROJECT DETAIL</p>
              <h1 class="dpp-hero__title">${p.title}</h1>
              <p class="dpp-hero__desc">${p.desc[0]}<br>${p.desc[1]}</p>
              <ul class="dpp-tags">${tags}</ul>
              <dl class="dpp-meta">
                <div class="dpp-meta__row"><dt>Year</dt><dd>${p.year}</dd></div>
                <div class="dpp-meta__row"><dt>Period</dt><dd>${p.period}</dd></div>
                <div class="dpp-meta__row"><dt>Role</dt><dd>${p.role}</dd></div>
              </dl>
              <div class="dpp-tools">
                <p class="dpp-tools__label">Tools</p>
                <ul class="dpp-tools__list">${tools}</ul>
              </div>
            </div>
            <div class="dpp-hero__mockup">${mockup}
            </div>
          </div>

          <div class="dpp-block">
            <p class="dpp-block__num">01</p>
            <h2 class="dpp-block__title">PROJECT OVERVIEW</h2>
            <p class="dpp-block__text">${p.overview}</p>
            <ul class="dpp-features">${features}</ul>
          </div>

          <div class="dpp-block">
            <p class="dpp-block__num">02</p>
            <h2 class="dpp-block__title">DESIGN CONCEPT</h2>
            <p class="dpp-block__text">${p.concept}</p>
            <div class="dpp-concept">
              <div class="dpp-concept__left">
                <div class="dpp-concept__group">
                  <p class="dpp-concept__label">COLOR</p>
                  <div class="dpp-colors">${colors}</div>
                </div>
                <div class="dpp-concept__group">
                  <p class="dpp-concept__label">TYPOGRAPHY</p>
                  <div class="dpp-type">
                    <span class="dpp-type__aa">Aa</span>
                    <div class="dpp-type__info">
                      <p class="dpp-type__font">Pretendard</p>
                      <p class="dpp-type__weight">Bold</p>
                      <p class="dpp-type__weight">Medium</p>
                      <p class="dpp-type__weight">Regular</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dpp-concept__right">
                <p class="dpp-concept__label">KEYWORD</p>
                <ul class="dpp-keywords">${keywords}</ul>
              </div>
            </div>
          </div>

          <div class="dpp-block">
            <p class="dpp-block__num">03</p>
            <h2 class="dpp-block__title">FULL DETAIL PAGE</h2>
            <p class="dpp-block__text">실제 상세페이지의 전체 흐름을 한눈에 확인할 수 있습니다.</p>
            <div class="dpp-placeholder dpp-placeholder--full">FULL DETAIL PREVIEW</div>
            <div class="dpp-timeline" aria-hidden="true">
              <span class="dpp-timeline__dot"></span>
              <span class="dpp-timeline__dot"></span>
              <span class="dpp-timeline__dot"></span>
              <span class="dpp-timeline__dot"></span>
              <span class="dpp-timeline__dot"></span>
            </div>
          </div>

          <div class="dpp-block">
            <p class="dpp-block__num">04</p>
            <h2 class="dpp-block__title">ZOOM DETAIL</h2>
            <p class="dpp-block__text">주요 영역을 확대하여 디자인 요소와 정보를 더 자세히 보여줍니다.</p>
            <ul class="dpp-zoom">${zoom}</ul>
          </div>
        </div>

        <aside class="detail-page-project__side">
          <div class="detail-page-project__side-preview">
            <p class="dpp-side__label">FULL PAGE PREVIEW</p>
            <p class="dpp-side__sub">상세페이지 전체 미리보기</p>
            ${sidePreview}
          </div>
        </aside>
      </div>
    </section>`;
}

function renderSiteProject(p) {
  const features = p.features
    .map(
      (f, i) => `
      <li class="overview-feature-card">
        <div class="overview-feature-card__head">
          <span class="overview-feature-card__num">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="overview-feature-card__title">${f.title}</h3>
        </div>
        <p class="overview-feature-card__desc">${f.desc}</p>
      </li>`
    )
    .join("");

  const checklist = p.solution.items
    .map((item) => `<li class="project-detail-checklist__item">${item}</li>`)
    .join("");

  const colors = p.colors
    .map(
      (c) => `
      <div class="project-detail-color">
        <span class="project-detail-color__chip${c === "#FFFFFF" ? " project-detail-color__chip--border" : ""}" style="background:${c}"></span>
        <span class="project-detail-color__hex">${c}</span>
      </div>`
    )
    .join("");

  const screens = p.screens
    .map((screen) => {
      const label = typeof screen === "string" ? screen : screen.label;
      const src = typeof screen === "string" ? null : screen.image;
      const isFullPage = typeof screen === "object" && screen.image;

      const content = src
        ? `<div class="project-detail-shot${isFullPage ? " project-detail-shot--page" : ""}" data-full-page="${isFullPage ? "true" : "false"}">
            <img src="${src}" alt="${p.title} ${label}" loading="lazy" decoding="async">
          </div>`
        : `<div class="project-detail-placeholder project-detail-placeholder--screen">이미지 준비중</div>`;

      return `
      <div class="project-detail-screen">
        <p class="project-detail-screen__label">${label}</p>
        ${content}
      </div>`;
    })
    .join("");

  const deviceSizes = [
    { key: "desktop", label: "DESKTOP", modifier: "desktop" },
    { key: "tablet", label: "TABLET", modifier: "tablet" },
    { key: "mobile", label: "MOBILE", modifier: "mobile" },
  ];

  const devices = deviceSizes
    .map(({ key, label, modifier }) => {
      const src = p.devices?.[key];
      const content = src
        ? `<div class="project-detail-frame project-detail-frame--${modifier}">
            <img src="${src}" alt="${p.title} ${label} 화면" loading="lazy" decoding="async">
          </div>`
        : `<div class="project-detail-placeholder project-detail-placeholder--${modifier}">이미지 준비중</div>`;
      return `
      <div class="project-detail-device">
        ${content}
        <p class="project-detail-device__label">${label}</p>
      </div>`;
    })
    .join("");

  const tags = p.tags.map((t) => `<li class="pd-kv__tag">${t}</li>`).join("");

  const metaTeam = p.team
    ? `<div class="pd-kv__meta-row"><dt>Team</dt><dd>${p.team}</dd></div>`
    : "";

  const liveSite = p.website
    ? `<div class="pd-kv__live">
        <p class="pd-kv__live-label">Visit Website</p>
        <a class="pd-kv__live-link" href="${p.website}" target="_blank" rel="noopener noreferrer">
          ${p.website.replace(/^https?:\/\//, "")}
          <span class="pd-kv__live-icon" aria-hidden="true">↗</span>
        </a>
      </div>`
    : "";

  const toolsHtml = p.tools
    .map((t) => `<li class="pd-kv__tool-badge">${t}</li>`)
    .join("");

  const accent = p.accent || "#6F747A";

  return `
    <div class="pd-topbar">
      <div class="pd-topbar__inner">
        <a class="pd-back" href="index.html#works" onclick="if(history.length>1){event.preventDefault();history.back();}">
          <span class="pd-back__icon" aria-hidden="true">←</span>
          Back to Projects
        </a>
      </div>
    </div>

    <section class="pd-kv" aria-label="프로젝트 상세 비주얼" style="--pd-accent: ${accent}">
      <div class="pd-kv__inner">
        <div class="pd-kv__info" data-pd-left>
          <p class="pd-kv__eyebrow">PROJECT</p>
          <h1 class="pd-kv__title">${p.title}</h1>
          <p class="pd-kv__desc">${p.desc[0]}<br>${p.desc[1]}</p>
          <ul class="pd-kv__tags">${tags}</ul>
          <hr class="pd-kv__divider">
          <dl class="pd-kv__meta">
            <div class="pd-kv__meta-row"><dt>Year</dt><dd>${p.year}</dd></div>
            <div class="pd-kv__meta-row"><dt>Period</dt><dd>${p.period}</dd></div>
            ${metaTeam}
            <div class="pd-kv__meta-row"><dt>Role</dt><dd>${p.role}</dd></div>
          </dl>
          ${liveSite}
          <div class="pd-kv__tools">
            <p class="pd-kv__tools-label">Tools</p>
            <ul class="pd-kv__tools-badges">${toolsHtml}</ul>
          </div>
        </div>
        <div class="pd-kv__visual" data-pd-right>
          ${
            p.mockup
              ? `<img class="pd-kv__mockup-img" src="${p.mockup}" alt="${p.title} 목업">`
              : `<div class="pd-kv__mockup-placeholder">DESKTOP MOCKUP</div>`
          }
        </div>
      </div>
    </section>

    <div class="project-detail" style="--pd-accent: ${accent}">
      <section class="project-detail__section">
        <div class="project-detail__grid">
          <article class="project-detail-card">
            <h2 class="project-detail-card__title">
              <span class="project-detail-card__num">01</span>
              <span class="project-detail-card__name">OVERVIEW</span>
            </h2>
            <p class="project-detail-card__text">${p.overview}</p>
            <ul class="overview-feature-list">${features}</ul>
          </article>
          <article class="project-detail-card">
            <h2 class="project-detail-card__title">
              <span class="project-detail-card__num">02</span>
              <span class="project-detail-card__name">SOLUTION</span>
            </h2>
            <p class="project-detail-card__text">${p.solution.text}</p>
            <ul class="project-detail-checklist">${checklist}</ul>
          </article>
        </div>

        <article class="project-detail-card project-detail-card--wide project-detail-system">
          <div class="project-detail-system__left">
            <h2 class="project-detail-card__title">
              <span class="project-detail-card__num">03</span>
              <span class="project-detail-card__name">DESIGN SYSTEM</span>
            </h2>
            <div class="project-detail-system__block">
              <p class="project-detail-system__label">COLOR</p>
              <div class="project-detail-colors">${colors}</div>
            </div>
            <div class="project-detail-system__block">
              <p class="project-detail-system__label">TYPOGRAPHY</p>
              <div class="project-detail-type">
                <span class="project-detail-type__aa">Aa</span>
                <div class="project-detail-type__info">
                  <p class="project-detail-type__font">${p.font || "Pretendard"}</p>
                  <p class="project-detail-type__weights">Bold</p>
                  <p class="project-detail-type__weights">Medium</p>
                  <p class="project-detail-type__weights">Regular</p>
                </div>
              </div>
            </div>
          </div>
          <div class="project-detail-system__right">${devices}
          </div>
        </article>

        <article class="project-detail-card project-detail-card--wide">
          <h2 class="project-detail-card__title">
            <span class="project-detail-card__num">04</span>
            <span class="project-detail-card__name">MAIN SCREENS</span>
          </h2>
          <div class="project-detail-screens">${screens}</div>
        </article>
      </section>
    </div>`;
}
