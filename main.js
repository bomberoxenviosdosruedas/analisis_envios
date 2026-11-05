/**
 * Envíos DosRuedas — Scripts Base Nueva (Optimizado para Producción)
 * Módulos: Navegador + Accesibilidad WAI-ARIA, Animación Hero (GSAP) y Footer
 */
(() => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. Control del Header con rAF y Guardia de Estado (Cero Layout Thrashing)
  // ------------------------------------------------------------------------
  const header = document.getElementById("site-header");
  if (header) {
    let isScrolled = false;
    let ticking = false;

    const updateHeaderState = () => {
      const shouldBeScrolled = window.scrollY > 25;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        header.classList.toggle("scrolled", isScrolled);
      }
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeaderState);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateHeaderState();
  }

  // ------------------------------------------------------------------------
  // 2. Accesibilidad WAI-ARIA en Menús Desplegables de Escritorio
  // ------------------------------------------------------------------------
  const dropdownItems = document.querySelectorAll(".primary-nav .nav-item");
  dropdownItems.forEach((item) => {
    const trigger = item.querySelector(".dropdown-trigger");
    const menu = item.querySelector(".dropdown-menu");
    if (!trigger || !menu) return;

    const setExpanded = (expanded) => {
      trigger.setAttribute("aria-expanded", String(expanded));
    };

    item.addEventListener("mouseenter", () => setExpanded(true));
    item.addEventListener("mouseleave", () => setExpanded(false));

    item.addEventListener("focusin", () => setExpanded(true));
    item.addEventListener("focusout", (e) => {
      if (!item.contains(e.relatedTarget)) {
        setExpanded(false);
      }
    });

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      setExpanded(!isExpanded);
    });

    item.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
        trigger.focus();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 3. Control de Cajón Móvil Deslizante (Drawer) con Trampa de Foco
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileDrawer = document.getElementById("mobile-nav");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  const getFocusableElements = (container) =>
    container
      ? Array.from(
          container.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];

  function toggleMobileDrawer(isOpen) {
    if (!mobileOverlay || !menuToggle) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    mobileOverlay.setAttribute("aria-hidden", String(!isOpen));
    mobileOverlay.classList.toggle("is-active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      drawerCloseBtn?.focus();
    } else {
      menuToggle.focus();
    }
  }

  menuToggle?.addEventListener("click", () => toggleMobileDrawer(true));
  drawerCloseBtn?.addEventListener("click", () => toggleMobileDrawer(false));

  mobileOverlay?.addEventListener("click", (e) => {
    if (e.target === mobileOverlay) {
      toggleMobileDrawer(false);
    }
  });

  window.addEventListener("keydown", (e) => {
    if (!mobileOverlay?.classList.contains("is-active")) return;

    if (e.key === "Escape") {
      toggleMobileDrawer(false);
      return;
    }

    if (e.key === "Tab") {
      const focusable = getFocusableElements(mobileDrawer);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  mobileOverlay?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMobileDrawer(false));
  });

  // ------------------------------------------------------------------------
  // 4. Botón de Scroll to Top
  // ------------------------------------------------------------------------
  const btnScrollTop = document.getElementById("btn-scroll-top");
  btnScrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ------------------------------------------------------------------------
  // 5. Animación Tipográfica Hero con GSAP (Batch DOM vía DocumentFragment)
  // ------------------------------------------------------------------------
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateHero = () => {
    if (reducedMotion || !window.gsap) return;

    const glyphs = [];
    document.querySelectorAll("[data-reveal]").forEach((line) => {
      const text = line.textContent.trim();
      const fragment = document.createDocumentFragment();

      for (const char of text) {
        const span = document.createElement("span");
        span.className = "glyph";
        span.textContent = char === " " ? "\u00a0" : char;
        fragment.appendChild(span);
        glyphs.push(span);
      }

      line.replaceChildren(fragment);
    });

    const tl = window.gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.fromTo(
      glyphs,
      { yPercent: 115, rotationX: -75, opacity: 0 },
      {
        yPercent: 0,
        rotationX: 0,
        opacity: 1,
        duration: 0.68,
        stagger: 0.018,
        ease: "back.out(1.25)",
        clearProps: "willChange",
      },
      0
    )
      .fromTo(
        ".map-art",
        { opacity: 0, y: 18, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.25
      )
      .fromTo(
        ".map-chip",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
        },
        0.8
      );
  };

  if (window.gsap) {
    animateHero();
  } else {
    window.addEventListener("DOMContentLoaded", animateHero, { once: true });
  }
})();
