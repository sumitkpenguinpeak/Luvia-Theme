document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header_wrapper");
  const toggle = document.querySelector(".menu-drawer-button");
  const drawer = document.querySelector("#mobile-menu");
  const closeButton = drawer?.querySelector(".menu-drawer-close");
  const backdrop = document.querySelector(".menu-drawer-backdrop");
  const mobileQuery = window.matchMedia("(max-width: 680px)");

  if (!header || !toggle || !drawer || !closeButton || !backdrop) {
    return;
  }

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const closeDrawer = (restoreFocus = true) => {
    if (!header.classList.contains("menu-drawer-open")) {
      return;
    }

    header.classList.remove("menu-drawer-open");
    document.body.classList.remove("menu-drawer-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    drawer.setAttribute("aria-hidden", "true");

    if (restoreFocus && mobileQuery.matches) {
      toggle.focus();
    }
  };

  const openDrawer = () => {
    header.classList.add("menu-drawer-open");
    document.body.classList.add("menu-drawer-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    drawer.setAttribute("aria-hidden", "false");
    closeButton.focus();
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener("click", () => closeDrawer());
  closeButton.addEventListener("click", () => closeDrawer());

  drawer.addEventListener("click", (event) => {
    if (event.target.closest("a[href]")) {
      closeDrawer(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!header.classList.contains("menu-drawer-open")) {
      return;
    }

    if (event.key === "Escape") {
      closeDrawer();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = [...drawer.querySelectorAll(focusableSelector)];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  });

  const syncDrawerForViewport = () => {
    if (!mobileQuery.matches) {
      closeDrawer(false);
      drawer.setAttribute("aria-hidden", "false");
    } else if (!header.classList.contains("menu-drawer-open")) {
      drawer.setAttribute("aria-hidden", "true");
    }
  };

  mobileQuery.addEventListener("change", syncDrawerForViewport);
  syncDrawerForViewport();
});