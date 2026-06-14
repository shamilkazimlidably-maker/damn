"use strict";

/**
 * Concept Academy
 * Main frontend interactions
 *
 * Compatible with:
 * - index-new.html
 * - concept-academy-style.css
 */

(() => {
  const state = {
    mobileMenuOpen: false,
    lastFocusedElement: null,
    prefersReducedMotion: window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches,
    hasFinePointer: window.matchMedia("(pointer: fine)").matches,
  };

  const selectors = {
    header: "[data-header]",
    mobileMenu: "[data-mobile-menu]",
    menuToggle: "[data-menu-toggle]",
    menuClose: "[data-menu-close]",
    dropdownToggle: ".nav-dropdown-toggle",
    searchOpen: "[data-search-open]",
    searchClose: "[data-search-close]",
    searchDialog: "[data-search-dialog]",
    heroVisual: "[data-hero-visual]",
    systemMap: "[data-system-map]",
    systemStep: "[data-system-step]",
    systemLabel: "[data-system-label]",
    systemDescription: "[data-system-description]",
    progressBar: "[data-progress]",
    progressCircle: ".progress-circle[data-value]",
    currentYear: "[data-current-year]",
    toastRegion: "[data-toast-region]",
  };

  const elements = {};

  document.addEventListener("DOMContentLoaded", initializeApp);

  function initializeApp() {
    cacheElements();
    initializeLucideIcons();
    initializeCurrentYear();
    initializeHeader();
    initializeDesktopDropdowns();
    initializeMobileMenu();
    initializeSearchDialog();
    initializeSmoothScrolling();
    initializeActiveNavigation();
    initializeRevealAnimations();
    initializeProgressBars();
    initializeProgressCircles();
    initializeHeroParallax();
    initializeSystemMap();
    initializeAccordionBehavior();
    initializeVideoPreview();
    initializeForumVoting();
    initializeMagneticButtons();
    initializeButtonAnalytics();
    initializeImageFallbacks();
  }

  function cacheElements() {
    elements.header = document.querySelector(selectors.header);
    elements.mobileMenu = document.querySelector(selectors.mobileMenu);
    elements.menuToggle = document.querySelector(selectors.menuToggle);
    elements.menuCloseButtons = document.querySelectorAll(
      selectors.menuClose
    );
    elements.dropdownToggles = document.querySelectorAll(
      selectors.dropdownToggle
    );
    elements.searchOpenButton = document.querySelector(
      selectors.searchOpen
    );
    elements.searchCloseButton = document.querySelector(
      selectors.searchClose
    );
    elements.searchDialog = document.querySelector(
      selectors.searchDialog
    );
    elements.heroVisual = document.querySelector(selectors.heroVisual);
    elements.systemMap = document.querySelector(selectors.systemMap);
    elements.toastRegion = document.querySelector(selectors.toastRegion);
  }

  /* =====================================================
     LUCIDE ICONS
     ===================================================== */

  function initializeLucideIcons() {
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons({
        attrs: {
          "aria-hidden": "true",
          "stroke-width": 1.9,
        },
      });
    }
  }

  /* =====================================================
     CURRENT YEAR
     ===================================================== */

  function initializeCurrentYear() {
    const year = new Date().getFullYear();

    document.querySelectorAll(selectors.currentYear).forEach((element) => {
      element.textContent = String(year);
    });
  }

  /* =====================================================
     STICKY HEADER
     ===================================================== */

  function initializeHeader() {
    if (!elements.header) return;

    const updateHeaderState = () => {
      const isScrolled = window.scrollY > 18;

      elements.header.classList.toggle("is-scrolled", isScrolled);
      elements.header.dataset.scrolled = String(isScrolled);
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, {
      passive: true,
    });
  }

  /* =====================================================
     DESKTOP DROPDOWNS
     ===================================================== */

  function initializeDesktopDropdowns() {
    if (!elements.dropdownToggles?.length) return;

    elements.dropdownToggles.forEach((toggle) => {
      const navItem = toggle.closest(".nav-item");
      const dropdown = navItem?.querySelector(".nav-dropdown");

      if (!navItem || !dropdown) return;

      toggle.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        closeAllDropdowns();

        if (!isOpen) {
          openDropdown(toggle, dropdown);
        }
      });

      navItem.addEventListener("keydown", (event) => {
        handleDropdownKeyboard(event, toggle, dropdown);
      });

      dropdown.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });

    document.addEventListener("click", closeAllDropdowns);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllDropdowns();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1080) {
        closeAllDropdowns();
      }
    });
  }

  function openDropdown(toggle, dropdown) {
    toggle.setAttribute("aria-expanded", "true");
    dropdown.classList.add("is-open");
  }

  function closeDropdown(toggle, dropdown) {
    toggle.setAttribute("aria-expanded", "false");
    dropdown.classList.remove("is-open");
  }

  function closeAllDropdowns() {
    document
      .querySelectorAll(selectors.dropdownToggle)
      .forEach((toggle) => {
        const dropdown = toggle
          .closest(".nav-item")
          ?.querySelector(".nav-dropdown");

        if (dropdown) {
          closeDropdown(toggle, dropdown);
        }
      });
  }

  function handleDropdownKeyboard(event, toggle, dropdown) {
    const focusableElements = Array.from(
      dropdown.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );

    const activeIndex = focusableElements.indexOf(document.activeElement);

    if (event.key === "Escape") {
      closeDropdown(toggle, dropdown);
      toggle.focus();
      return;
    }

    if (
      event.key === "ArrowDown" &&
      document.activeElement === toggle
    ) {
      event.preventDefault();

      openDropdown(toggle, dropdown);
      focusableElements[0]?.focus();
      return;
    }

    if (event.key === "ArrowDown" && activeIndex >= 0) {
      event.preventDefault();

      const nextIndex = (activeIndex + 1) % focusableElements.length;
      focusableElements[nextIndex]?.focus();
      return;
    }

    if (event.key === "ArrowUp" && activeIndex >= 0) {
      event.preventDefault();

      const previousIndex =
        (activeIndex - 1 + focusableElements.length) %
        focusableElements.length;

      focusableElements[previousIndex]?.focus();
    }
  }

  /* =====================================================
     MOBILE MENU
     ===================================================== */

  function initializeMobileMenu() {
    if (!elements.mobileMenu || !elements.menuToggle) return;

    elements.menuToggle.setAttribute("aria-expanded", "false");

    elements.menuToggle.addEventListener("click", () => {
      if (state.mobileMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    elements.menuCloseButtons.forEach((button) => {
      button.addEventListener("click", closeMobileMenu);
    });

    elements.mobileMenu
      .querySelectorAll("a[href]")
      .forEach((link) => {
        link.addEventListener("click", () => {
          closeMobileMenu(false);
        });
      });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.mobileMenuOpen) {
        closeMobileMenu();
      }

      if (event.key === "Tab" && state.mobileMenuOpen) {
        const panel = elements.mobileMenu.querySelector(
          ".mobile-menu__panel"
        );

        trapFocus(event, panel);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1080 && state.mobileMenuOpen) {
        closeMobileMenu(false);
      }
    });
  }

  function openMobileMenu() {
    if (!elements.mobileMenu || !elements.menuToggle) return;

    state.lastFocusedElement = document.activeElement;
    state.mobileMenuOpen = true;

    elements.mobileMenu.classList.add("open", "is-open");
    elements.mobileMenu.setAttribute("aria-hidden", "false");
    elements.menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");

    window.setTimeout(() => {
      elements.mobileMenu
        .querySelector(
          '[data-menu-close]:not(.mobile-menu__backdrop)'
        )
        ?.focus();
    }, 120);
  }

  function closeMobileMenu(restoreFocus = true) {
    if (!elements.mobileMenu || !elements.menuToggle) return;

    state.mobileMenuOpen = false;

    elements.mobileMenu.classList.remove("open", "is-open");
    elements.mobileMenu.setAttribute("aria-hidden", "true");
    elements.menuToggle.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");

    if (
      restoreFocus &&
      state.lastFocusedElement instanceof HTMLElement
    ) {
      state.lastFocusedElement.focus();
    }
  }

  function trapFocus(event, container) {
    if (!container) return;

    const focusableElements = Array.from(
      container.querySelectorAll(
        [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ].join(",")
      )
    ).filter((element) => {
      return !element.hasAttribute("hidden");
    });

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /* =====================================================
     SEARCH DIALOG
     ===================================================== */

  function initializeSearchDialog() {
    if (
      !elements.searchDialog ||
      !elements.searchOpenButton
    ) {
      return;
    }

    elements.searchOpenButton.addEventListener(
      "click",
      openSearchDialog
    );

    elements.searchCloseButton?.addEventListener(
      "click",
      closeSearchDialog
    );

    elements.searchDialog.addEventListener("click", (event) => {
      const bounds = elements.searchDialog.getBoundingClientRect();

      const clickedOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (clickedOutside) {
        closeSearchDialog();
      }
    });

    elements.searchDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeSearchDialog();
    });

    const form = elements.searchDialog.querySelector("form");

    form?.addEventListener("submit", (event) => {
      const input = form.querySelector('input[type="search"]');
      const query = input?.value.trim();

      if (!query) {
        event.preventDefault();
        input?.focus();
        showToast("Axtarış üçün açar söz yaz.");
      }
    });
  }

  function openSearchDialog() {
    if (!elements.searchDialog) return;

    state.lastFocusedElement = document.activeElement;

    if (typeof elements.searchDialog.showModal === "function") {
      elements.searchDialog.showModal();
    } else {
      elements.searchDialog.setAttribute("open", "");
    }

    window.setTimeout(() => {
      elements.searchDialog
        .querySelector('input[type="search"]')
        ?.focus();
    }, 80);
  }

  function closeSearchDialog() {
    if (!elements.searchDialog) return;

    if (typeof elements.searchDialog.close === "function") {
      elements.searchDialog.close();
    } else {
      elements.searchDialog.removeAttribute("open");
    }

    if (state.lastFocusedElement instanceof HTMLElement) {
      state.lastFocusedElement.focus();
    }
  }

  /* =====================================================
     SMOOTH SCROLL
     ===================================================== */

  function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
          event.preventDefault();
          return;
        }

        let target;

        try {
          target = document.querySelector(href);
        } catch (error) {
          return;
        }

        if (!target) return;

        event.preventDefault();

        closeAllDropdowns();
        closeMobileMenu(false);

        const headerHeight = elements.header?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          18;

        window.scrollTo({
          top: Math.max(targetPosition, 0),
          behavior: state.prefersReducedMotion
            ? "auto"
            : "smooth",
        });

        if (window.history?.pushState) {
          window.history.pushState(null, "", href);
        }
      });
    });
  }

  /* =====================================================
     ACTIVE NAVIGATION
     ===================================================== */

  function initializeActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;

    const navigationLinks = Array.from(
      document.querySelectorAll(
        '.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]'
      )
    );

    const sectionMap = new Map();

    navigationLinks.forEach((link) => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") return;

      const section = document.querySelector(selector);

      if (section) {
        sectionMap.set(section, selector);
      }
    });

    if (!sectionMap.size) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio
          )[0];

        if (!visibleEntry) return;

        const activeSelector = sectionMap.get(
          visibleEntry.target
        );

        navigationLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === activeSelector;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        threshold: [0.12, 0.25, 0.45],
        rootMargin: "-15% 0px -65% 0px",
      }
    );

    sectionMap.forEach((selector, section) => {
      observer.observe(section);
    });
  }

  /* =====================================================
     REVEAL ANIMATIONS
     ===================================================== */

  function initializeRevealAnimations() {
    const revealSelectors = [
      ".hero__content > *",
      ".hero-ecosystem",
      ".choice-card",
      ".brand-statement__headline",
      ".brand-statement__columns article",
      ".program-card",
      ".post-preview",
      ".system-map__canvas",
      ".service-card",
      ".smm-packages",
      ".workspace-section__copy",
      ".workspace-demo",
      ".portfolio-section__copy",
      ".portfolio-stack",
      ".community-section__header",
      ".community-board",
      ".gamification-section__copy",
      ".progress-dashboard",
      ".founder-portrait",
      ".founder-section__content",
      ".resource-card",
      ".faq-section__intro",
      ".faq-list details",
      ".final-cta__inner > *",
    ];

    const revealElements = document.querySelectorAll(
      revealSelectors.join(",")
    );

    if (
      state.prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      revealElements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });

      return;
    }

    revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(28px)";
    });

    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const siblings = Array.from(
            element.parentElement?.children || []
          );

          const elementIndex = Math.max(
            siblings.indexOf(element),
            0
          );

          const delay = Math.min(elementIndex * 70, 280);

          element.animate(
            [
              {
                opacity: 0,
                transform: "translateY(28px)",
              },
              {
                opacity: 1,
                transform: "translateY(0)",
              },
            ],
            {
              duration: 650,
              delay,
              easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
              fill: "forwards",
            }
          );

          revealObserver.unobserve(element);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* =====================================================
     PROGRESS BARS
     ===================================================== */

  function initializeProgressBars() {
    const progressBars = document.querySelectorAll(
      selectors.progressBar
    );

    if (!progressBars.length) return;

    progressBars.forEach((bar) => {
      const value = clampNumber(
        Number.parseFloat(bar.dataset.progress || "0"),
        0,
        100
      );

      bar.dataset.progressValue = String(value);

      if (state.prefersReducedMotion) {
        bar.style.width = `${value}%`;
      } else {
        bar.style.width = "0%";
      }
    });

    if (
      state.prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries, progressObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const bar = entry.target;
          const value = Number.parseFloat(
            bar.dataset.progressValue || "0"
          );

          requestAnimationFrame(() => {
            bar.style.transition =
              "width 1000ms cubic-bezier(0.2, 0.75, 0.25, 1)";
            bar.style.width = `${value}%`;
          });

          progressObserver.unobserve(bar);
        });
      },
      {
        threshold: 0.35,
      }
    );

    progressBars.forEach((bar) => observer.observe(bar));
  }

  /* =====================================================
     PROGRESS CIRCLES
     ===================================================== */

  function initializeProgressCircles() {
    const circles = document.querySelectorAll(
      selectors.progressCircle
    );

    circles.forEach((circle) => {
      const targetValue = clampNumber(
        Number.parseFloat(circle.dataset.value || "0"),
        0,
        100
      );

      const label = circle.querySelector("strong");

      if (
        state.prefersReducedMotion ||
        !("IntersectionObserver" in window)
      ) {
        circle.style.setProperty("--value", targetValue);

        if (label) {
          label.textContent = `${Math.round(targetValue)}%`;
        }

        return;
      }

      circle.style.setProperty("--value", 0);

      if (label) {
        label.textContent = "0%";
      }

      const observer = new IntersectionObserver(
        (entries, circleObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateProgressCircle(
              circle,
              label,
              targetValue
            );

            circleObserver.unobserve(circle);
          });
        },
        {
          threshold: 0.4,
        }
      );

      observer.observe(circle);
    });
  }

  function animateProgressCircle(circle, label, targetValue) {
    const duration = 1100;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(
        targetValue * easedProgress
      );

      circle.style.setProperty("--value", currentValue);

      if (label) {
        label.textContent = `${currentValue}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* =====================================================
     HERO PARALLAX
     ===================================================== */

  function initializeHeroParallax() {
    if (
      !elements.heroVisual ||
      !state.hasFinePointer ||
      state.prefersReducedMotion
    ) {
      return;
    }

    const person = elements.heroVisual.querySelector(
      ".hero-person"
    );

    const nodes = Array.from(
      elements.heroVisual.querySelectorAll(
        ".ecosystem-node"
      )
    );

    let animationFrame = null;

    elements.heroVisual.addEventListener(
      "pointermove",
      (event) => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }

        animationFrame = requestAnimationFrame(() => {
          const bounds =
            elements.heroVisual.getBoundingClientRect();

          const normalizedX =
            (event.clientX - bounds.left) /
              bounds.width -
            0.5;

          const normalizedY =
            (event.clientY - bounds.top) /
              bounds.height -
            0.5;

          if (person) {
            person.style.transform = `
              translate3d(
                ${normalizedX * 12}px,
                ${normalizedY * 10}px,
                0
              )
            `;
          }

          nodes.forEach((node, index) => {
            const depth = 4 + (index % 4) * 2;

            node.style.transform = `
              translate3d(
                ${normalizedX * depth}px,
                ${normalizedY * depth}px,
                0
              )
            `;
          });
        });
      }
    );

    elements.heroVisual.addEventListener(
      "pointerleave",
      () => {
        if (person) {
          person.style.transition = "transform 450ms ease";
          person.style.transform = "translate3d(0, 0, 0)";
        }

        nodes.forEach((node) => {
          node.style.transition = "transform 450ms ease";
          node.style.transform = "translate3d(0, 0, 0)";
        });

        window.setTimeout(() => {
          if (person) {
            person.style.transition = "";
          }

          nodes.forEach((node) => {
            node.style.transition = "";
          });
        }, 460);
      }
    );
  }

  /* =====================================================
     SYSTEM MAP
     ===================================================== */

  function initializeSystemMap() {
    if (!elements.systemMap) return;

    const nodes = Array.from(
      elements.systemMap.querySelectorAll(
        selectors.systemStep
      )
    );

    const label = elements.systemMap.querySelector(
      selectors.systemLabel
    );

    const description = elements.systemMap.querySelector(
      selectors.systemDescription
    );

    if (!nodes.length) return;

    const activateNode = (node) => {
      nodes.forEach((currentNode) => {
        currentNode.classList.toggle(
          "is-active",
          currentNode === node
        );

        currentNode.setAttribute(
          "aria-pressed",
          String(currentNode === node)
        );
      });

      const newLabel =
        node.dataset.systemStep || "Marketinq sistemi";

      const newDescription =
        node.dataset.description || "";

      if (label) {
        label.textContent = newLabel;
      }

      if (description) {
        description.textContent = newDescription;
      }
    };

    nodes.forEach((node) => {
      node.setAttribute("aria-pressed", "false");

      node.addEventListener("click", () => {
        activateNode(node);
      });

      node.addEventListener("mouseenter", () => {
        if (state.hasFinePointer) {
          activateNode(node);
        }
      });

      node.addEventListener("focus", () => {
        activateNode(node);
      });
    });

    activateNode(nodes[0]);
  }

  /* =====================================================
     DETAILS / ACCORDIONS
     ===================================================== */

  function initializeAccordionBehavior() {
    const packageDetails = Array.from(
      document.querySelectorAll(
        ".package-comparison details"
      )
    );

    const faqDetails = Array.from(
      document.querySelectorAll(".faq-list details")
    );

    packageDetails.forEach((detailsElement) => {
      detailsElement.addEventListener("toggle", () => {
        if (
          !detailsElement.open ||
          window.innerWidth > 820
        ) {
          return;
        }

        packageDetails.forEach((otherElement) => {
          if (otherElement !== detailsElement) {
            otherElement.open = false;
          }
        });
      });
    });

    faqDetails.forEach((detailsElement) => {
      detailsElement.addEventListener("toggle", () => {
        if (!detailsElement.open) return;

        faqDetails.forEach((otherElement) => {
          if (otherElement !== detailsElement) {
            otherElement.open = false;
          }
        });
      });
    });

    document
      .querySelectorAll("details summary")
      .forEach((summary) => {
        summary.addEventListener("keydown", (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            const details = summary.closest("details");

            if (details) {
              details.open = !details.open;
            }
          }
        });
      });
  }

  /* =====================================================
     VIDEO PREVIEW
     ===================================================== */

  function initializeVideoPreview() {
    const playButton = document.querySelector(
      ".video-cover__play"
    );

    if (!playButton) return;

    playButton.addEventListener("click", () => {
      showToast(
        "Meta Ads videokursunun təqdimat videosu tezliklə əlavə olunacaq."
      );

      trackEvent("video_preview_click", {
        video: "meta_ads_course",
      });
    });
  }

  /* =====================================================
     FORUM VOTING
     ===================================================== */

  function initializeForumVoting() {
    document
      .querySelectorAll(".forum-topic__votes")
      .forEach((voteContainer) => {
        const button = voteContainer.querySelector("button");
        const number = voteContainer.querySelector("strong");

        if (!button || !number) return;

        button.setAttribute("aria-pressed", "false");

        button.addEventListener("click", () => {
          const hasVoted =
            button.getAttribute("aria-pressed") === "true";

          let currentValue =
            Number.parseInt(number.textContent || "0", 10) || 0;

          currentValue += hasVoted ? -1 : 1;

          number.textContent = String(
            Math.max(currentValue, 0)
          );

          button.setAttribute(
            "aria-pressed",
            String(!hasVoted)
          );

          voteContainer.classList.toggle(
            "has-voted",
            !hasVoted
          );

          button.style.color = !hasVoted
            ? "var(--coral)"
            : "";

          trackEvent("community_vote", {
            action: !hasVoted ? "upvote" : "remove_upvote",
          });
        });
      });
  }

  /* =====================================================
     MAGNETIC BUTTONS
     ===================================================== */

  function initializeMagneticButtons() {
    if (
      !state.hasFinePointer ||
      state.prefersReducedMotion
    ) {
      return;
    }

    document
      .querySelectorAll(".button")
      .forEach((button) => {
        button.addEventListener(
          "pointermove",
          (event) => {
            const bounds = button.getBoundingClientRect();

            const x =
              event.clientX -
              bounds.left -
              bounds.width / 2;

            const y =
              event.clientY -
              bounds.top -
              bounds.height / 2;

            button.style.transform = `
              translate3d(
                ${x * 0.08}px,
                ${y * 0.1}px,
                0
              )
            `;
          }
        );

        button.addEventListener(
          "pointerleave",
          () => {
            button.style.transition =
              "transform 350ms cubic-bezier(0.2, 0.75, 0.25, 1)";

            button.style.transform =
              "translate3d(0, 0, 0)";

            window.setTimeout(() => {
              button.style.transition = "";
            }, 360);
          }
        );
      });
  }

  /* =====================================================
     ANALYTICS
     ===================================================== */

  function initializeButtonAnalytics() {
    document
      .querySelectorAll("a, button")
      .forEach((element) => {
        element.addEventListener("click", () => {
          const label = element.textContent
            ?.replace(/\s+/g, " ")
            .trim();

          if (!label) return;

          if (
            element.matches(
              ".button, .text-link, .nav-link, .resource-card > a"
            )
          ) {
            trackEvent("cta_click", {
              label,
              destination:
                element.getAttribute("href") || "",
            });
          }
        });
      });
  }

  function trackEvent(eventName, parameters = {}) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
    }

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, parameters);
    }

    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isDevelopment) {
      console.info(
        `[Concept Analytics] ${eventName}`,
        parameters
      );
    }
  }

  /* =====================================================
     IMAGE FALLBACKS
     ===================================================== */

  function initializeImageFallbacks() {
    document.querySelectorAll("img").forEach((image) => {
      image.addEventListener("error", () => {
        const parent = image.parentElement;

        image.hidden = true;
        parent?.classList.add("image-error");

        if (
          parent?.classList.contains("hero-person") &&
          !parent.querySelector(".image-fallback")
        ) {
          const fallback = document.createElement("div");

          fallback.className = "image-fallback";
          fallback.setAttribute("aria-hidden", "true");
          fallback.textContent = "CA";

          Object.assign(fallback.style, {
            display: "grid",
            width: "100%",
            aspectRatio: "0.82",
            placeItems: "center",
            borderRadius: "48% 52% 38% 62% / 55% 42% 58% 45%",
            color: "#ffffff",
            background: "#101312",
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(90px, 15vw, 180px)",
          });

          parent.appendChild(fallback);
        }
      });
    });
  }

  /* =====================================================
     TOAST
     ===================================================== */

  function showToast(message, duration = 3000) {
    const region =
      elements.toastRegion || createToastRegion();

    const toast = document.createElement("div");

    toast.className = "concept-toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;

    Object.assign(toast.style, {
      opacity: "0",
      transform: "translateY(16px)",
      transition:
        "opacity 220ms ease, transform 220ms ease",
    });

    region.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(16px)";

      window.setTimeout(() => {
        toast.remove();
      }, 230);
    }, duration);
  }

  function createToastRegion() {
    const region = document.createElement("div");

    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");

    document.body.appendChild(region);

    elements.toastRegion = region;

    return region;
  }

  /* =====================================================
     HELPERS
     ===================================================== */

  function clampNumber(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }
})();
