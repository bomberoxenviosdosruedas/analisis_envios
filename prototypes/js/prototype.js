/**
 * Envíos DosRuedas — Prototype UX Interaction Script
 * Micro-interactions, Default-driven Quoter, Service Tabs, and Accessible Navigation.
 */
(() => {
  "use strict";

  // -------------------------------------------------------------------------
  // 1. Header Scroll State via requestAnimationFrame
  // -------------------------------------------------------------------------
  const header = document.getElementById("site-header");
  const btnScrollTop = document.getElementById("btn-scroll-top");

  if (header || btnScrollTop) {
    let isScrolled = false;
    let ticking = false;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 25;
      if (header && shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle("scrolled", isScrolled);
      }
      if (btnScrollTop) {
        btnScrollTop.classList.toggle("visible", scrollY > 320);
      }
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    onScroll();
  }

  btnScrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer & Keyboard Trapping
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  function toggleDrawer(isOpen) {
    if (!mobileOverlay || !menuToggle) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileOverlay.setAttribute("aria-hidden", String(!isOpen));
    mobileOverlay.classList.toggle("is-active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      drawerCloseBtn?.focus();
    } else {
      menuToggle.focus();
    }
  }

  menuToggle?.addEventListener("click", () => toggleDrawer(true));
  drawerCloseBtn?.addEventListener("click", () => toggleDrawer(false));
  mobileOverlay?.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) toggleDrawer(false);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileOverlay?.classList.contains("is-active")) {
      toggleDrawer(false);
    }
  });

  // -------------------------------------------------------------------------
  // 3. Interactive Quick Quoter (Default-Driven UX)
  // -------------------------------------------------------------------------
  const zoneChips = document.querySelectorAll(".zone-chip-btn");
  const speedButtons = document.querySelectorAll(".speed-btn");
  const priceDisplay = document.getElementById("quoter-price-value");
  const etaDisplay = document.getElementById("quoter-eta-text");
  const quoterWaLink = document.getElementById("quoter-wa-link");

  const zoneRates = {
    "Centro": 2400,
    "Güemes / Alem": 2800,
    "Puerto / Mogotes": 3600,
    "Constitución": 3200
  };

  const speedModifiers = {
    "express": { add: 600, eta: "En franja de 90 a 180 min" },
    "flex":    { add: 0,   eta: "Mismo día (14 a 21 hs)" },
    "lowcost": { add: -400, eta: "Próximas 24 a 48 hs" }
  };

  let currentZone = "Güemes / Alem";
  let currentSpeed = "express";

  function calculateQuote() {
    const base = zoneRates[currentZone] || 2800;
    const modifier = speedModifiers[currentSpeed] || speedModifiers["express"];
    const total = base + modifier.add;

    if (priceDisplay) {
      priceDisplay.textContent = `$${total.toLocaleString("es-AR")}`;
    }
    if (etaDisplay) {
      etaDisplay.textContent = `${currentZone} · ${modifier.eta}`;
    }

    if (quoterWaLink) {
      const msg = `Hola! Quiero pedir un envío hacia ${currentZone} con tarifa ${currentSpeed.toUpperCase()} ($${total}).`;
      quoterWaLink.href = `https://api.whatsapp.com/send/?phone=5492236025348&text=${encodeURIComponent(msg)}`;
    }
  }

  zoneChips.forEach(chip => {
    chip.addEventListener("click", () => {
      zoneChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentZone = chip.dataset.zone || chip.textContent.trim();
      calculateQuote();
    });
  });

  speedButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      speedButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentSpeed = btn.dataset.speed || "express";
      calculateQuote();
    });
  });

  // Calculate initial default state
  calculateQuote();

  // -------------------------------------------------------------------------
  // 4. Interactive Services Segmented Controller
  // -------------------------------------------------------------------------
  const serviceTabs = document.querySelectorAll(".segment-tabs-nav .tab-btn");
  const serviceCards = document.querySelectorAll(".service-active-card");

  serviceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.service;
      serviceTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      serviceCards.forEach(card => {
        if (card.id === `service-${targetId}`) {
          card.style.display = "grid";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });

})();
