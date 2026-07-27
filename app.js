(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     0. Intro text lives in index.html (#recipientHeadline, #introMessage)
     Birthday card message lives in memories-data.js (BIRTHDAY_CARD)
  --------------------------------------------------------- */
  const openLetterBtn = document.getElementById("openLetterBtn");
  const birthdayCardModal = document.getElementById("birthdayCardModal");
  const birthdayCardBackdrop = document.getElementById("birthdayCardBackdrop");
  const birthdayCardClose = document.getElementById("birthdayCardClose");
  const birthdayCardHeading = document.getElementById("birthdayCardHeading");
  const birthdayCardBody = document.getElementById("birthdayCardBody");
  const birthdayCardSignoff = document.getElementById("birthdayCardSignoff");

  function renderBirthdayCard() {
    if (typeof BIRTHDAY_CARD === "undefined") return;
    birthdayCardHeading.textContent = BIRTHDAY_CARD.heading || "";
    birthdayCardSignoff.textContent = BIRTHDAY_CARD.signoff || "";

    birthdayCardBody.innerHTML = "";
    const paragraphs = (BIRTHDAY_CARD.message || "").split(/\n\s*\n/);
    paragraphs.forEach((text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const p = document.createElement("p");
      p.textContent = trimmed;
      birthdayCardBody.appendChild(p);
    });
  }

  function openBirthdayCard() {
    renderBirthdayCard();
    birthdayCardModal.classList.remove("hidden");
    birthdayCardClose.focus();
  }

  function closeBirthdayCard() {
    birthdayCardModal.classList.add("hidden");
    openLetterBtn.focus();
  }

  openLetterBtn.addEventListener("click", openBirthdayCard);
  birthdayCardClose.addEventListener("click", closeBirthdayCard);
  birthdayCardBackdrop.addEventListener("click", (e) => {
    if (e.target === birthdayCardBackdrop) closeBirthdayCard();
  });
  document.addEventListener("keydown", (e) => {
    if (birthdayCardModal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeBirthdayCard();
  });

  /* ---------------------------------------------------------
     1. Ambient floating motes (decorative, skipped for reduced motion)
  --------------------------------------------------------- */
  const ambientLayer = document.getElementById("ambient");
  function buildAmbient() {
    if (prefersReducedMotion) return;
    ambientLayer.innerHTML = "";
    const count = window.innerWidth < 640 ? 10 : 16;
    for (let i = 0; i < count; i++) {
      const mote = document.createElement("div");
      mote.className = "mote";
      const size = 4 + Math.random() * 8;
      mote.style.width = `${size}px`;
      mote.style.height = `${size}px`;
      mote.style.left = `${Math.random() * 100}%`;
      mote.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
      mote.style.animationDuration = `${14 + Math.random() * 12}s`;
      mote.style.animationDelay = `${Math.random() * 14}s`;
      ambientLayer.appendChild(mote);
    }
  }
  buildAmbient();

  /* ---------------------------------------------------------
     1b. Intro fireworks (home page only)
  --------------------------------------------------------- */
  const introFireworksCanvas = document.getElementById("introFireworks");
  let introFireworksRAF = null;
  let introFireworkParticles = [];
  let introFireworksActive = true;

  const fireworkColors = ["#E9CC9B", "#D9A65E", "#F0B9C6", "#C98A93", "#FFFFFF", "#FFD27A", "#FFB347", "#E7B9A8"];
  let introRockets = [];

  function resizeIntroFireworks() {
    if (!introFireworksCanvas) return;
    introFireworksCanvas.width = introFireworksCanvas.offsetWidth;
    introFireworksCanvas.height = introFireworksCanvas.offsetHeight;
  }

  function spawnIntroBurst(cx, cy, scale) {
    const count = Math.floor((40 + Math.random() * 24) * scale);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.35;
      const speed = (2.2 + Math.random() * 4.5) * scale;
      introFireworkParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 55 + Math.random() * 35,
        size: (2 + Math.random() * 3.5) * scale,
        color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
      });
    }
  }

  function launchIntroRocket() {
    if (!introFireworksCanvas || !introFireworksActive) return;
    const w = introFireworksCanvas.width;
    const h = introFireworksCanvas.height;
    introRockets.push({
      x: w * (0.15 + Math.random() * 0.7),
      y: h + 10,
      targetY: h * (0.12 + Math.random() * 0.38),
      speed: 4 + Math.random() * 2.5,
      hue: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
      trail: [],
    });
    if (!introFireworksRAF) animateIntroFireworks();
  }

  function spawnIntroFirework() {
    launchIntroRocket();
    if (Math.random() > 0.45) {
      window.setTimeout(() => {
        if (!introFireworksActive || !introFireworksCanvas) return;
        const w = introFireworksCanvas.width;
        const h = introFireworksCanvas.height;
        spawnIntroBurst(w * (0.1 + Math.random() * 0.8), h * (0.1 + Math.random() * 0.35), 0.85 + Math.random() * 0.35);
        if (!introFireworksRAF) animateIntroFireworks();
      }, 350 + Math.random() * 500);
    }
  }

  function animateIntroFireworks() {
    if (!introFireworksCanvas) return;
    const ctx = introFireworksCanvas.getContext("2d");
    ctx.clearRect(0, 0, introFireworksCanvas.width, introFireworksCanvas.height);

    introRockets = introRockets.filter((rocket) => {
      rocket.trail.push({ x: rocket.x, y: rocket.y });
      if (rocket.trail.length > 12) rocket.trail.shift();
      rocket.y -= rocket.speed;

      rocket.trail.forEach((point, i) => {
        const t = i / rocket.trail.length;
        ctx.globalAlpha = t * 0.7;
        ctx.fillStyle = rocket.hue;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.2 * t, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#FFF8F2";
      ctx.beginPath();
      ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
      ctx.fill();

      if (rocket.y <= rocket.targetY) {
        spawnIntroBurst(rocket.x, rocket.y, 1.1 + Math.random() * 0.4);
        return false;
      }
      return true;
    });

    introFireworkParticles.forEach((p) => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035;
      p.vx *= 0.988;
      const t = p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, 1 - t);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - t * 0.3), 0, Math.PI * 2);
      ctx.fill();
      if (t < 0.5 && Math.random() > 0.7) {
        ctx.globalAlpha = (0.5 - t) * 0.6;
        ctx.fillRect(p.x - 1, p.y, p.size * 2.5, 1.2);
      }
    });
    ctx.globalAlpha = 1;
    introFireworkParticles = introFireworkParticles.filter((p) => p.life < p.maxLife);

    if (introFireworksActive && (introFireworkParticles.length > 0 || introRockets.length > 0)) {
      introFireworksRAF = requestAnimationFrame(animateIntroFireworks);
    } else {
      introFireworksRAF = null;
      ctx.clearRect(0, 0, introFireworksCanvas.width, introFireworksCanvas.height);
    }
  }

  let introFireworksInterval = null;

  function startIntroFireworks() {
    if (prefersReducedMotion || !introFireworksCanvas) return;
    introFireworksActive = true;
    resizeIntroFireworks();
    spawnIntroFirework();
    if (introFireworksInterval) return;
    introFireworksInterval = window.setInterval(() => {
      if (introFireworksActive) spawnIntroFirework();
    }, 1400);
  }

  function stopIntroFireworks() {
    introFireworksActive = false;
    if (introFireworksInterval) {
      window.clearInterval(introFireworksInterval);
      introFireworksInterval = null;
    }
    if (introFireworksRAF) {
      cancelAnimationFrame(introFireworksRAF);
      introFireworksRAF = null;
    }
    introFireworkParticles = [];
    introRockets = [];
    if (introFireworksCanvas) {
      const ctx = introFireworksCanvas.getContext("2d");
      ctx.clearRect(0, 0, introFireworksCanvas.width, introFireworksCanvas.height);
    }
  }

  window.addEventListener("resize", resizeIntroFireworks);
  startIntroFireworks();

  /* ---------------------------------------------------------
     2. Screen transitions: Intro -> Categories -> Main
  --------------------------------------------------------- */
  const introScreen = document.getElementById("intro");
  const categoriesScreen = document.getElementById("categories");
  const mainScreen = document.getElementById("main");
  const categoryGrid = document.getElementById("categoryGrid");
  const categoryBadge = document.getElementById("categoryBadge");
  const mainTitle = document.getElementById("mainTitle");
  const totalCountEl = document.getElementById("totalCount");
  const changeCategoryBtn = document.getElementById("changeCategoryBtn");

  function transitionScreens(fromEl, toEl) {
    if (fromEl === introScreen) stopIntroFireworks();
    if (toEl === introScreen) startIntroFireworks();

    fromEl.style.opacity = "0";
    setTimeout(() => {
      fromEl.classList.add("hidden");
      toEl.classList.remove("hidden");
      requestAnimationFrame(() => (toEl.style.opacity = "1"));
    }, 450);
  }

  document.getElementById("enterBtn").addEventListener("click", () => {
    transitionScreens(introScreen, categoriesScreen);
  });

  document.getElementById("backToIntroBtn").addEventListener("click", () => {
    transitionScreens(categoriesScreen, introScreen);
  });

  function memoryMatchesCategory(memory, categoryId) {
    if (categoryId === "special") {
      return memory.category === "special" || !!memory.special;
    }
    return memory.category === categoryId;
  }

  function getCategoryCount(categoryId) {
    return MEMORIES.filter((m) => memoryMatchesCategory(m, categoryId)).length;
  }

  function buildCategoryPicker() {
    categoryGrid.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const count = getCategoryCount(cat.id);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn";
      btn.setAttribute("role", "listitem");
      btn.disabled = count === 0;
      btn.innerHTML = `
        <span class="category-btn-emoji" aria-hidden="true">${cat.emoji}</span>
        <span class="category-btn-label">${cat.label}</span>
        <span class="category-btn-count">${count} ${count === 1 ? "memory" : "memories"}</span>
      `;
      btn.addEventListener("click", () => selectCategory(cat.id));
      categoryGrid.appendChild(btn);
    });
  }
  buildCategoryPicker();

  /* ---------------------------------------------------------
     3. Deck state
     ---------------------------------------------------------
     activePool  — indices into MEMORIES for the selected category.
     deckOrder   — shuffled order within activePool.
     drawnCount  — how many cards from deckOrder have been revealed.
     viewCursor  — which position in deckOrder is on screen.
  --------------------------------------------------------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let selectedCategoryId = null;
  let activePool = [];
  let deckOrder = [];
  let drawnCount = 0;
  let viewCursor = -1;
  let currentMemoryIndex = null;

  const pullBtn = document.getElementById("pullBtn");
  const pullBtnLabel = document.getElementById("pullBtnLabel");
  const prevBtn = document.getElementById("prevBtn");
  const resetBtn = document.getElementById("resetBtn");
  const cardInner = document.getElementById("cardInner");
  const cardContent = document.getElementById("cardContent");
  const cardPlaceholder = document.getElementById("cardPlaceholder");
  const counterText = document.getElementById("counterText");
  const emptyNote = document.getElementById("emptyNote");

  function getCategoryMeta(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId) || { label: "Memories", emoji: "💌" };
  }

  function resetDeckState() {
    drawnCount = 0;
    viewCursor = -1;
    currentMemoryIndex = null;
    isTransitioning = false;

    cardInner.classList.remove("special");
    cardContent.innerHTML = "";
    cardContent.className = "card-content";
    cardPlaceholder.classList.remove("hidden");
    cardContent.appendChild(cardPlaceholder);
    updateCounter();
    refreshControls();
  }

  function selectCategory(categoryId) {
    selectedCategoryId = categoryId;
    activePool = MEMORIES.map((_, i) => i).filter((i) =>
      memoryMatchesCategory(MEMORIES[i], categoryId)
    );
    deckOrder = shuffle(activePool.map((_, i) => i));

    const meta = getCategoryMeta(categoryId);
    categoryBadge.textContent = `${meta.emoji} ${meta.label}`;
    mainTitle.textContent = meta.label;
    totalCountEl.textContent = activePool.length;

    resetDeckState();
    transitionScreens(categoriesScreen, mainScreen);
  }

  changeCategoryBtn.addEventListener("click", () => {
    const hasProgress = drawnCount > 0;
    if (hasProgress) {
      const confirmed = window.confirm(
        "Switch category? Your progress in this deck will be cleared."
      );
      if (!confirmed) return;
    }
    resetDeckState();
    transitionScreens(mainScreen, categoriesScreen);
  });

  function pad(n) {
    return String(n).padStart(3, "0");
  }

  function updateCounter() {
    counterText.firstChild.textContent = `${drawnCount} of `;
  }

  const TRANSITION_MS = prefersReducedMotion ? 80 : 340;
  let isTransitioning = false;

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function hasVisibleCard() {
    return cardContent.classList.contains("card-content--active");
  }

  /* ---------------------------------------------------------
     4. Build the (lazy) media element for the active card.
        Only the memory currently being viewed is fetched — nothing
        else in the deck is loaded until it's actually reached.
  --------------------------------------------------------- */
  function mountCardContent(memory) {
    const mediaWrap = document.createElement("div");
    mediaWrap.className = "card-media";

    const shimmer = document.createElement("div");
    shimmer.className = "media-shimmer";
    mediaWrap.appendChild(shimmer);

    let mediaEl;
    if (memory.type === "video") {
      mediaEl = document.createElement("video");
      mediaEl.src = memory.src;
      mediaEl.muted = true;
      mediaEl.loop = true;
      mediaEl.playsInline = true;
      mediaEl.preload = "metadata";
      mediaEl.controls = true;
      if (memory.poster) mediaEl.poster = memory.poster;
    } else {
      mediaEl = document.createElement("img");
      mediaEl.src = memory.src;
      mediaEl.loading = "eager";
      mediaEl.decoding = "async";
      mediaEl.alt = memory.caption || "A shared memory";
    }

    const onMediaReady = () => shimmer.remove();
    mediaEl.addEventListener("load", onMediaReady);
    mediaEl.addEventListener("loadeddata", onMediaReady);
    mediaEl.addEventListener("loadedmetadata", onMediaReady);
    mediaEl.addEventListener("error", () => {
      shimmer.remove();
      mediaEl.style.display = "none";
    });
    mediaWrap.appendChild(mediaEl);

    const textWrap = document.createElement("div");
    textWrap.className = "card-text";

    const labelEl = document.createElement("p");
    labelEl.className = "card-memory-label";
    labelEl.textContent = `Memory No. ${pad(viewCursor + 1)}`;
    textWrap.appendChild(labelEl);

    if (memory.date) {
      const dateEl = document.createElement("p");
      dateEl.className = "card-date";
      dateEl.textContent = memory.date;
      textWrap.appendChild(dateEl);
    }

    const caption = (memory.caption || "").trim();
    if (caption) {
      const captionEl = document.createElement("p");
      captionEl.className = "card-caption";
      captionEl.textContent = caption;
      textWrap.appendChild(captionEl);
    }

    cardContent.appendChild(mediaWrap);
    cardContent.appendChild(textWrap);

    if (memory.type === "video") {
      cardInner._playVideo = () => mediaEl.play().catch(() => { });
    } else {
      cardInner._playVideo = null;
    }
  }

  /* ---------------------------------------------------------
     5. Rendering a card at a given cursor position (new or revisited)
  --------------------------------------------------------- */
  async function renderCardAt(cursor, isFreshDraw, direction = "next") {
    if (isTransitioning) return;

    viewCursor = cursor;
    currentMemoryIndex = activePool[deckOrder[cursor]];
    const memory = MEMORIES[currentMemoryIndex];
    const isSpecial = !!memory.special || (cursor + 1) % SITE_CONFIG.specialEveryAbout === 0;
    const leavingRight = direction === "prev";

    isTransitioning = true;
    pullBtn.disabled = true;
    prevBtn.disabled = true;

    const hasContent = hasVisibleCard() || !cardPlaceholder.classList.contains("hidden");

    if (hasContent) {
      cardContent.classList.remove(
        "card-content--entered",
        "card-content--enter-from-right",
        "card-content--enter-from-left"
      );
      cardContent.classList.add(
        "card-content--leaving",
        leavingRight ? "card-content--leave-right" : "card-content--leave-left"
      );
      await wait(TRANSITION_MS);
    }

    cardPlaceholder.classList.add("hidden");
    cardContent.innerHTML = "";
    cardContent.classList.remove(
      "card-content--leaving",
      "card-content--leave-left",
      "card-content--leave-right"
    );

    mountCardContent(memory);
    cardInner.classList.toggle("special", isSpecial);

    cardContent.classList.add("card-content--active", "card-content--entering");
    cardContent.classList.add(
      leavingRight ? "card-content--enter-from-left" : "card-content--enter-from-right"
    );

    await wait(20);
    cardContent.classList.add("card-content--entered");
    await wait(TRANSITION_MS);

    cardContent.classList.remove(
      "card-content--entering",
      "card-content--enter-from-left",
      "card-content--enter-from-right"
    );

    if (cardInner._playVideo) cardInner._playVideo();
    if (isFreshDraw && isSpecial) burstSparkle();

    isTransitioning = false;
    refreshControls();
  }

  function refreshControls() {
    if (isTransitioning) return;

    prevBtn.disabled = viewCursor <= 0;

    const atTip = viewCursor + 1 >= drawnCount;
    const deckComplete = drawnCount >= activePool.length;
    const disablePull = atTip && deckComplete;

    pullBtn.disabled = disablePull;
    pullBtnLabel.textContent = disablePull
      ? "Deck complete"
      : !atTip
        ? "Next Memory"
        : drawnCount === 0
          ? "Pull a Memory"
          : "Pull Another Memory";

    emptyNote.classList.toggle("hidden", !disablePull);
  }

  /* ---------------------------------------------------------
     6. Pull / Next button
  --------------------------------------------------------- */
  pullBtn.addEventListener("click", () => {
    if (pullBtn.disabled || isTransitioning) return;

    if (viewCursor + 1 < drawnCount) {
      renderCardAt(viewCursor + 1, false, "next");
      return;
    }

    if (drawnCount >= activePool.length) return;

    const cursor = drawnCount;
    drawnCount++;
    updateCounter();
    renderCardAt(cursor, true, "next");
  });

  prevBtn.addEventListener("click", () => {
    if (viewCursor <= 0 || isTransitioning) return;
    renderCardAt(viewCursor - 1, false, "prev");
  });

  /* ---------------------------------------------------------
     7. Reset
  --------------------------------------------------------- */
  resetBtn.addEventListener("click", () => {
    const hasProgress = drawnCount > 0;
    if (hasProgress) {
      const confirmed = window.confirm(
        "Start the deck over? This will reshuffle the current category."
      );
      if (!confirmed) return;
    }

    deckOrder = shuffle(activePool.map((_, i) => i));
    resetDeckState();
  });

  /* ---------------------------------------------------------
     8. Sparkle / confetti burst for special pulls
  --------------------------------------------------------- */
  const canvas = document.getElementById("sparkleCanvas");
  const ctx = canvas.getContext("2d");
  let sparkleParticles = [];
  let sparkleRAF = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const sparkleColors = ["#E9CC9B", "#D9A65E", "#F0B9C6", "#C98A93", "#FFFFFF"];

  function burstSparkle() {
    if (prefersReducedMotion) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.42;
    const count = 70;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      sparkleParticles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 0,
        maxLife: 55 + Math.random() * 30,
        size: 2 + Math.random() * 3,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }
    canvas.style.opacity = "1";
    if (!sparkleRAF) animateSparkle();
  }

  function animateSparkle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkleParticles.forEach((p) => {
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      const t = p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, 1 - t);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    sparkleParticles = sparkleParticles.filter((p) => p.life < p.maxLife);

    if (sparkleParticles.length > 0) {
      sparkleRAF = requestAnimationFrame(animateSparkle);
    } else {
      sparkleRAF = null;
      canvas.style.opacity = "0";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ---------------------------------------------------------
     9. Initial control state
  --------------------------------------------------------- */
  updateCounter();
  refreshControls();
})();
