/**
 * Envíos DosRuedas — Layout Interactive Engine
 * Modules: Header Scroll Dynamics, Desktop WAI-ARIA Dropdowns,
 *          Mobile Drawer with Focus Trap, and Scroll to Top.
 */
(() => {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. Header Scroll State via requestAnimationFrame (Zero Layout Thrashing)
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
  // 2. Desktop Dropdowns WAI-ARIA Accessibility
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
  // 3. Mobile Navigation Drawer with Focus Trap
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
  // 4. Scroll to Top Button
  // ------------------------------------------------------------------------
  const btnScrollTop = document.getElementById("btn-scroll-top");
  btnScrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
