"use strict";

/**
 * Concept Academy
 * Main frontend interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");

  const mobileMenu = document.querySelector(".mobile-menu");
  const mobilePanel = document.querySelector(".mobile-panel");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileClose = document.querySelector(".mobile-close");
  const mobileLinks = document.querySelectorAll(".mobile-links a");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let lastFocusedElement = null;

  /**
   * Mobile menu
   */
  function openMobileMenu() {
    if (!mobileMenu) return;

    lastFocusedElement = document.activeElement;

    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle?.setAttribute("aria-expanded", "true");
    body.classList.add("menu-open");

    window.setTimeout(() => {
      mobileClose?.focus();
    }, 100);
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;

    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle?.setAttribute("aria-expanded", "false");
    body.classList.remove("menu-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }

  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-controls", "mobile-navigation");

  if (mobileMenu) {
    mobileMenu.id = "mobile-navigation";
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileClose?.addEventListener("click", closeMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  /**
   * Keyboard accessibility
   */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu?.classList.contains("open")) {
      closeMobileMenu();
    }

    if (
      event.key === "Tab" &&
      mobileMenu?.classList.contains("open") &&
      mobilePanel
    ) {
      trapFocus(event, mobilePanel);
    }
  });

  function trapFocus(event, container) {
    const focusableElements = container.querySelectorAll(
      [
        "a[href]",
        "button:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ].join(",")
    );

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Smooth scrolling
   */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();
        showToast("Bu səhifə tezliklə aktiv olacaq.");
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        event.preventDefault();

        if (href === "#login") {
          showToast("Daxil ol səhifəsi tezliklə əlavə olunacaq.");
        } else if (href === "#signup") {
          showToast("Hesab yaratma sistemi tezliklə aktiv olacaq.");
        } else if (href === "#resources") {
          showToast("Resurslar bölməsi hazırlanır.");
        }

        return;
      }

      event.preventDefault();

      const headerHeight = header?.offsetHeight ?? 0;
      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        18;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      if (history.pushState) {
        history.pushState(null, "", href);
      }
    });
  });

  /**
   * Header scroll state
   */
  function updateHeaderState() {
    if (!header) return;

    const isScrolled = window.scrollY > 20;

    header.classList.toggle("is-scrolled", isScrolled);

    header.style.boxShadow = isScrolled
      ? "0 10px 35px rgba(16, 19, 18, 0.08)"
      : "none";

    header.style.borderBottomColor = isScrolled
      ? "rgba(232, 228, 220, 1)"
      : "rgba(232, 228, 220, 0.75)";
  }

  updateHeaderState();

  window.addEventListener("scroll", updateHeaderState, {
    passive: true,
  });

  /**
   * Reveal animations
   */
  const revealElements = document.querySelectorAll(
    [
      ".hero-grid > *",
      ".choice",
      ".statement",
      ".course-card",
      ".system-box",
      ".service-card",
      ".workspace",
      ".dash-card",
    ].join(",")
  );

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(22px)";
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const siblings = Array.from(
            element.parentElement?.children ?? []
          );
          const index = Math.max(siblings.indexOf(element), 0);
          const delay = Math.min(index * 75, 300);

          element.animate(
            [
              {
                opacity: 0,
                transform: "translateY(22px)",
              },
              {
                opacity: 1,
                transform: "translateY(0)",
              },
            ],
            {
              duration: 600,
              delay,
              easing: "cubic-bezier(.2, .75, .25, 1)",
              fill: "forwards",
            }
          );

          observer.unobserve(element);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  }

  /**
   * Active navigation item
   */
  const navigationLinks = document.querySelectorAll(
    '.desktop-nav a[href^="#"], .mobile-links a[href^="#"]'
  );

  const navigationSections = Array.from(navigationLinks)
    .map((link) => {
      const selector = link.getAttribute("href");

      if (!selector || selector === "#") return null;

      return document.querySelector(selector);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navigationSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleSections.length) return;

        const activeId = visibleSections[0].target.id;

        navigationLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${activeId}`;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        threshold: [0.15, 0.3, 0.5],
        rootMargin: "-15% 0px -65% 0px",
      }
    );

    navigationSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /**
   * Course progress animations
   */
  const progressBars = document.querySelectorAll(".bar span");

  progressBars.forEach((bar) => {
    const originalWidth = bar.style.width || "0%";
    bar.dataset.targetWidth = originalWidth;

    if (!prefersReducedMotion) {
      bar.style.width = "0%";
    }
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const bar = entry.target;
          const targetWidth = bar.dataset.targetWidth || "0%";

          requestAnimationFrame(() => {
            bar.style.transition =
              "width 900ms cubic-bezier(.2, .7, .2, 1)";
            bar.style.width = targetWidth;
          });

          observer.unobserve(bar);
        });
      },
      {
        threshold: 0.4,
      }
    );

    progressBars.forEach((bar) => {
      progressObserver.observe(bar);
    });
  }

  /**
   * Progress ring animation
   */
  const progressRings = document.querySelectorAll(".progress-ring");

  progressRings.forEach((ring) => {
    const text = ring.querySelector("strong");
    const finalValue = Number.parseInt(text?.textContent ?? "0", 10);

    if (
      Number.isNaN(finalValue) ||
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    ring.style.background =
      "conic-gradient(var(--black) 0 0%, #eae8e2 0% 100%)";

    if (text) {
      text.textContent = "0%";
    }

    const ringObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          animateProgressRing(ring, text, finalValue);
          observer.unobserve(ring);
        });
      },
      {
        threshold: 0.45,
      }
    );

    ringObserver.observe(ring);
  });

  function animateProgressRing(ring, textElement, targetValue) {
    const duration = 1100;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(targetValue * easedProgress);

      ring.style.background = `conic-gradient(
        var(--black) 0 ${currentValue}%,
        #eae8e2 ${currentValue}% 100%
      )`;

      if (textElement) {
        textElement.textContent = `${currentValue}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Spark chart animation
   */
  const sparkBars = document.querySelectorAll(".spark i");

  sparkBars.forEach((bar) => {
    const finalHeight = bar.style.height || "0%";
    bar.dataset.finalHeight = finalHeight;

    if (!prefersReducedMotion) {
      bar.style.height = "0%";
    }
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const sparkObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const spark = entry.target;
          const bars = spark.querySelectorAll("i");

          bars.forEach((bar, index) => {
            window.setTimeout(() => {
              bar.style.transition =
                "height 550ms cubic-bezier(.2, .7, .2, 1)";
              bar.style.height = bar.dataset.finalHeight || "0%";
            }, index * 70);
          });

          observer.unobserve(spark);
        });
      },
      {
        threshold: 0.4,
      }
    );

    document.querySelectorAll(".spark").forEach((spark) => {
      sparkObserver.observe(spark);
    });
  }

  /**
   * Slight hero movement on pointer
   */
  const heroArt = document.querySelector(".hero-art");
  const heroImage = heroArt?.querySelector("img");

  if (
    heroArt &&
    heroImage &&
    !prefersReducedMotion &&
    window.matchMedia("(pointer: fine)").matches
  ) {
    heroArt.addEventListener("pointermove", (event) => {
      const bounds = heroArt.getBoundingClientRect();

      const x =
        (event.clientX - bounds.left) / bounds.width - 0.5;
      const y =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      heroImage.style.transform = `
        translate3d(${x * 8}px, ${y * 8}px, 0)
        rotateX(${y * -2}deg)
        rotateY(${x * 2}deg)
      `;
    });

    heroArt.addEventListener("pointerleave", () => {
      heroImage.style.transition = "transform 400ms ease";
      heroImage.style.transform =
        "translate3d(0, 0, 0) rotateX(0) rotateY(0)";

      window.setTimeout(() => {
        heroImage.style.transition = "";
      }, 400);
    });
  }

  /**
   * Button feedback and analytics
   */
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.textContent
        ?.replace(/\s+/g, " ")
        .trim();

      trackEvent("cta_click", {
        label: label || "unknown",
        destination: button.getAttribute("href") || "",
      });
    });
  });

  function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, parameters);
    }

    // Meta Pixel
    if (typeof window.fbq === "function") {
      const metaEventName =
        eventName === "cta_click" ? "Lead" : eventName;

      window.fbq("trackCustom", metaEventName, parameters);
    }

    // Development log
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.info(`[Analytics] ${eventName}`, parameters);
    }
  }

  /**
   * Toast notification
   */
  function showToast(message) {
    const oldToast = document.querySelector(".concept-toast");

    if (oldToast) {
      oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "concept-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = message;

    Object.assign(toast.style, {
      position: "fixed",
      left: "50%",
      bottom: "28px",
      zIndex: "9999",
      maxWidth: "calc(100% - 32px)",
      padding: "13px 18px",
      borderRadius: "12px",
      background: "#101312",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "1.4",
      textAlign: "center",
      boxShadow: "0 16px 44px rgba(16, 19, 18, 0.22)",
      transform: "translate(-50%, 18px)",
      opacity: "0",
      transition:
        "opacity 220ms ease, transform 220ms ease",
    });

    body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translate(-50%, 0)";
    });

    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, 18px)";

      window.setTimeout(() => {
        toast.remove();
      }, 250);
    }, 2800);
  }

  /**
   * Update copyright year automatically
   */
  const footer = document.querySelector("footer");

  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(
      /©\s*\d{4}/,
      `© ${new Date().getFullYear()}`
    );
  }

  /**
   * Prevent broken image icon
   */
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";
      image.parentElement?.classList.add("image-error");
    });
  });
});
