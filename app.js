"use strict";

/* =========================================================
   CONFIG
   Real linkləri və endpoint-ləri burada dəyişin.
   ========================================================= */

const APP_CONFIG = {
  leadEndpoint: "",
  paymentUrl: "",
  scheduleUrl: "",
  whatsappNumber: "",

  instagram: "https://instagram.com/shamilkazimli.dably",
  tiktok: "https://tiktok.com/@shamilkazimli.dably",
  linkedin: "#",
  website: "https://conceptacademy.az",

  source: "shamil-kazimli-editorial-page"
};

const SERVICE_DEFINITIONS = {
  general: {
    title: "Birlikdə işləyək",
    kicker: "ÜMUMİ MÜRACİƏT",
    description:
      "Sizə uyğun proqram və ya xidməti seçin, növbəti addımları birlikdə müəyyənləşdirək.",
    serviceLabel: "Ümumi müraciət",
    submitLabel: "Müraciəti göndər",
    fields: [
      {
        type: "select",
        name: "selectedService",
        label: "Maraqlandığınız xidmət",
        required: true,
        options: [
          ["", "Seçin"],
          ["4 aylıq SMM proqramı", "4 aylıq SMM proqramı"],
          [
            "Meta Ads videokursu",
            "Meta Ads videokursu — 300 AZN ön satış"
          ],
          [
            "Fərdi Strateji Sessiya",
            "Fərdi Strateji Sessiya — 250 AZN / 60 dəqiqə"
          ],
          ["Aylıq Meta xidməti", "Aylıq Meta xidməti"]
        ]
      }
    ]
  },

  "smm-course": {
    title: "4 aylıq SMM proqramı",
    kicker: "CANLI PRAKTİKİ PROQRAM",
    description:
      "Paketinizi seçin və proqramla bağlı müraciətinizi tamamlayın.",
    serviceLabel: "4 aylıq SMM proqramı",
    submitLabel: "Proqrama müraciət et",
    fields: [
      {
        type: "select",
        name: "coursePackage",
        label: "Paket",
        required: true,
        options: [
          ["", "Paket seçin"],
          [
            "Standard",
            "Standard — 300 AZN/ay və ya 1,000 AZN birdəfəlik"
          ],
          ["Pro", "Pro — 500 AZN/ay və ya 1,500 AZN birdəfəlik"]
        ]
      },
      {
        type: "select",
        name: "experienceLevel",
        label: "Hazırkı səviyyəniz",
        required: true,
        options: [
          ["", "Seçin"],
          ["Sıfırdan başlayıram", "Sıfırdan başlayıram"],
          ["Junior SMM", "Junior SMM"],
          ["Freelancer", "Freelancer"],
          ["Biznes sahibiyəm", "Biznes sahibiyəm"]
        ]
      },
      {
        type: "url",
        name: "instagramOrWebsite",
        label: "Instagram və ya portfolio linki",
        required: false,
        placeholder: "https://..."
      }
    ]
  },

  "meta-video": {
    title: "Meta Ads videokursu",
    kicker: "300 AZN ÖN SATIŞ",
    description:
      "Normal qiymət 600 AZN olacaq. Ön satış müraciətinizi tamamlayın.",
    serviceLabel: "Meta Ads videokursu — Ön satış — 300 AZN",
    submitLabel: "300 AZN-lik ön satış üçün müraciət et",
    fields: [
      {
        type: "select",
        name: "paymentPreference",
        label: "Ödəniş üsulu",
        required: true,
        options: [
          ["", "Seçin"],
          ["Kartla ödəniş", "Kartla ödəniş"],
          ["Bank köçürməsi", "Bank köçürməsi"],
          [
            "WhatsApp-da dəqiqləşdirmək",
            "WhatsApp-da dəqiqləşdirmək"
          ]
        ]
      },
      {
        type: "text",
        name: "instagramUsername",
        label: "Instagram username",
        required: false,
        placeholder: "@username"
      }
    ]
  },

  "strategy-session": {
    title: "Fərdi Strateji Sessiya",
    kicker: "250 AZN · 60 DƏQİQƏ",
    description:
      "Layihəniz haqqında məlumat verin. Müraciətiniz nəzərdən keçirildikdən sonra görüş detalları paylaşılacaq.",
    serviceLabel: "Fərdi Strateji Sessiya — 250 AZN / 60 dəqiqə",
    submitLabel: "250 AZN-lik sessiya üçün müraciət et",
    fields: [
      {
        type: "text",
        name: "company",
        label: "Şirkət və ya layihə adı",
        required: true,
        placeholder: "Layihə adı"
      },
      {
        type: "text",
        name: "industry",
        label: "Fəaliyyət sahəsi",
        required: true,
        placeholder: "Məsələn: e-commerce, təhsil..."
      },
      {
        type: "url",
        name: "website",
        label: "Instagram və ya sayt linki",
        required: true,
        placeholder: "https://..."
      },
      {
        type: "textarea",
        name: "mainProblem",
        label: "Hazırda qarşılaşdığınız əsas problem",
        required: true,
        placeholder: "Əsas problemi qısa və konkret yazın."
      },
      {
        type: "textarea",
        name: "expectation",
        label: "Görüşdən gözləntiniz",
        required: true,
        placeholder:
          "Sessiyanın sonunda hansı qərarı vermək istəyirsiniz?"
      },
      {
        type: "select",
        name: "monthlyBudget",
        label: "Aylıq reklam büdcəsi",
        required: false,
        options: [
          ["", "İstəyə bağlı"],
          ["0–500 AZN", "0–500 AZN"],
          ["500–1,500 AZN", "500–1,500 AZN"],
          ["1,500–5,000 AZN", "1,500–5,000 AZN"],
          ["5,000+ AZN", "5,000+ AZN"]
        ]
      }
    ]
  },

  "monthly-meta": {
    title: "Aylıq Meta xidməti",
    kicker: "REKLAM İDARƏETMƏSİ",
    description:
      "Layihəniz və reklam büdcəniz haqqında məlumat verin, uyğun əməkdaşlıq modeli təklif edək.",
    serviceLabel: "Aylıq Meta xidməti",
    submitLabel: "Xidmət üçün müraciət et",
    fields: [
      {
        type: "text",
        name: "company",
        label: "Şirkət adı",
        required: true,
        placeholder: "Şirkət və ya brend adı"
      },
      {
        type: "text",
        name: "industry",
        label: "Fəaliyyət sahəsi",
        required: true,
        placeholder: "Məsələn: butik, kurs, xidmət..."
      },
      {
        type: "url",
        name: "website",
        label: "Instagram və ya sayt linki",
        required: true,
        placeholder: "https://..."
      },
      {
        type: "select",
        name: "monthlyBudget",
        label: "Hazırkı aylıq reklam büdcəsi",
        required: true,
        options: [
          ["", "Seçin"],
          ["0–500 AZN", "0–500 AZN"],
          ["500–1,500 AZN", "500–1,500 AZN"],
          ["1,500–5,000 AZN", "1,500–5,000 AZN"],
          ["5,000+ AZN", "5,000+ AZN"]
        ]
      },
      {
        type: "textarea",
        name: "mainProblem",
        label: "Hazırkı əsas problem",
        required: true,
        placeholder:
          "Reklamda və ya satış sistemində əsas probleminiz nədir?"
      },
      {
        type: "textarea",
        name: "goal",
        label: "Hansı nəticəni əldə etmək istəyirsiniz?",
        required: true,
        placeholder: "Lead, satış, mesaj, qeydiyyat və s."
      }
    ]
  }
};

const state = {
  currentStep: 1,
  activeServiceKey: "general",
  activePackage: "",
  lastPayload: null,
  lastFocusedElement: null
};

const elements = {
  modal: document.getElementById("leadModal"),
  modalDialog: document.querySelector(".modal__dialog"),
  modalTitle: document.getElementById("modalTitle"),
  modalKicker: document.getElementById("modalKicker"),
  modalDescription: document.getElementById("modalDescription"),
  leadForm: document.getElementById("leadForm"),
  serviceField: document.getElementById("serviceField"),
  packageField: document.getElementById("packageField"),
  dynamicFields: document.getElementById("dynamicFields"),
  reviewCard: document.getElementById("reviewCard"),
  consentField: document.getElementById("consentField"),
  paymentNote: document.getElementById("paymentNote"),
  successState: document.getElementById("successState"),
  successMessage: document.getElementById("successMessage"),
  successWhatsApp: document.getElementById("successWhatsApp"),
  successPayment: document.getElementById("successPayment"),
  submitButton: document.querySelector(".button--submit"),
  submitLabel: document.querySelector(".button__label"),
  toast: document.getElementById("toast"),
  currentYear: document.getElementById("currentYear"),
  mainPhone: document.getElementById("mainPhone")
};

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

function sanitizeText(value) {
  return String(value ?? "").trim();
}

function normalizePhone(value) {
  return String(value ?? "").replace(/[^\d+]/g, "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^\+?\d{9,15}$/.test(normalizePhone(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message, isError = false) {
  if (!elements.toast) return;

  elements.toast.textContent = message;
  elements.toast.classList.toggle("is-error", isError);
  elements.toast.classList.add("is-visible");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 3800);
}

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmContent: params.get("utm_content") || "",
    utmTerm: params.get("utm_term") || ""
  };
}

function trackMeta(eventName, payload = {}, custom = false) {
  if (typeof window.fbq !== "function") return;

  if (custom) {
    window.fbq("trackCustom", eventName, payload);
  } else {
    window.fbq("track", eventName, payload);
  }
}

function trackGA(eventName, payload = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
}

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

function bindSocialLinks() {
  qsa(".js-social-link").forEach((link) => {
    const key = link.dataset.social;
    const url = APP_CONFIG[key];

    if (!url || url === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Bu keçidi APP_CONFIG daxilində əlavə edin.");
      });

      return;
    }

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

/* =========================================================
   REVEAL AND SCROLL FADE
   ========================================================= */

function initRevealAnimations() {
  const items = qsa(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          "is-visible",
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  items.forEach((item) => {
    observer.observe(item);
  });
}

function updateScrollFade() {
  const viewportCenter = window.innerHeight / 2;

  qsa(".scroll-fade").forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const distance = Math.abs(viewportCenter - elementCenter);

    const normalized = Math.min(
      distance / (window.innerHeight * 0.95),
      1
    );

    const opacity = 1 - normalized * 0.18;

    element.style.setProperty(
      "--scroll-opacity",
      opacity.toFixed(3)
    );
  });
}

let fadeRaf = null;

function requestScrollFadeUpdate() {
  if (fadeRaf) return;

  fadeRaf = requestAnimationFrame(() => {
    updateScrollFade();
    fadeRaf = null;
  });
}

/* =========================================================
   PHONE 3D TILT
   ========================================================= */

function initPhoneTilt() {
  const phone = elements.mainPhone;

  if (!phone) return;

  const media = window.matchMedia(
    "(min-width: 721px) and (prefers-reduced-motion: no-preference)"
  );

  function onMove(event) {
    if (!media.matches) return;

    const rect = phone.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 5;
    const rotateX = y * -4;

    phone.style.transform =
      `rotate(-5.5deg) ` +
      `rotateX(${rotateX}deg) ` +
      `rotateY(${rotateY}deg) ` +
      "translateZ(0)";
  }

  function onLeave() {
    phone.style.transform = "";
  }

  phone.addEventListener("pointermove", onMove);
  phone.addEventListener("pointerleave", onLeave);
}

/* =========================================================
   COURSE PACKAGE SWITCH
   ========================================================= */

function initPackageSwitch() {
  qsa("[data-package-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const packageName = button.dataset.packageTab;

      qsa("[data-package-tab]").forEach((tab) => {
        const isActive = tab === button;

        tab.classList.toggle("is-active", isActive);
        tab.setAttribute(
          "aria-selected",
          String(isActive)
        );
      });

      qsa("[data-package-panel]").forEach((panel) => {
        const isActive =
          panel.dataset.packagePanel === packageName;

        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}

/* =========================================================
   COMING SOON
   ========================================================= */

function initComingSoonCards() {
  qsa("[data-coming-soon]").forEach((card) => {
    const notify = () => {
      const productName = card.dataset.comingSoon;

      showToast(
        "Hazırda sponsorluq müraciətləri açıq deyil."
      );

      trackMeta(
        "ComingSoonInterest",
        {
          product_name: productName
        },
        true
      );

      trackGA("coming_soon_interest", {
        product_name: productName
      });
    };

    card.addEventListener("click", notify);

    card.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        notify();
      }
    });
  });
}

/* =========================================================
   DYNAMIC FORM FIELDS
   ========================================================= */

function createField(fieldConfig) {
  const wrapper = document.createElement("label");
  wrapper.className = "field";

  const label = document.createElement("span");
  label.textContent = fieldConfig.label;
  wrapper.appendChild(label);

  let input;

  if (fieldConfig.type === "textarea") {
    input = document.createElement("textarea");
    input.rows = 4;
  } else if (fieldConfig.type === "select") {
    input = document.createElement("select");

    (fieldConfig.options || []).forEach(
      ([value, text]) => {
        const option = document.createElement("option");

        option.value = value;
        option.textContent = text;

        input.appendChild(option);
      }
    );
  } else {
    input = document.createElement("input");
    input.type = fieldConfig.type || "text";
  }

  input.name = fieldConfig.name;
  input.dataset.dynamicField = "true";

  if (fieldConfig.placeholder) {
    input.placeholder = fieldConfig.placeholder;
  }

  if (fieldConfig.required) {
    input.required = true;
  }

  if (
    state.activeServiceKey === "smm-course" &&
    fieldConfig.name === "coursePackage" &&
    state.activePackage
  ) {
    input.value = state.activePackage;
  }

  const error = document.createElement("small");
  error.className = "field-error";

  input.addEventListener("input", () => {
    clearFieldError(input);
  });

  input.addEventListener("change", () => {
    clearFieldError(input);
  });

  wrapper.append(input, error);

  return wrapper;
}

function renderDynamicFields(serviceKey) {
  const config = SERVICE_DEFINITIONS[serviceKey];

  elements.dynamicFields.innerHTML = "";

  (config.fields || []).forEach((field) => {
    elements.dynamicFields.appendChild(
      createField(field)
    );
  });
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(serviceKey = "general", packageName = "") {
  const config =
    SERVICE_DEFINITIONS[serviceKey] ||
    SERVICE_DEFINITIONS.general;

  state.activeServiceKey =
    SERVICE_DEFINITIONS[serviceKey]
      ? serviceKey
      : "general";

  state.activePackage = packageName || "";
  state.currentStep = 1;
  state.lastFocusedElement = document.activeElement;

  elements.modalTitle.textContent = config.title;
  elements.modalKicker.textContent = config.kicker;
  elements.modalDescription.textContent =
    config.description;

  elements.serviceField.value =
    config.serviceLabel;

  elements.packageField.value =
    state.activePackage;

  elements.submitLabel.textContent =
    config.submitLabel;

  elements.paymentNote.textContent =
    serviceKey === "meta-video"
      ? "Normal satış qiyməti 600 AZN olacaq. Formu göndərmək avtomatik ödəniş demək deyil."
      : "Formu göndərmək avtomatik ödəniş demək deyil.";

  elements.leadForm.hidden = false;
  elements.successState.hidden = true;

  elements.leadForm.reset();

  elements.serviceField.value =
    config.serviceLabel;

  elements.packageField.value =
    state.activePackage;

  renderDynamicFields(state.activeServiceKey);
  updateFormStep(1);

  elements.modal.classList.add("is-open");

  elements.modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

  trackMeta(
    state.activeServiceKey === "meta-video"
      ? "PreSaleInterest"
      : "ServiceInterest",

    state.activeServiceKey === "meta-video"
      ? {
          product_name: "Meta Ads videokursu",
          value: 300,
          currency: "AZN"
        }
      : {
          service_name: config.serviceLabel
        },

    true
  );

  trackGA("select_service", {
    service_name: config.serviceLabel
  });

  setTimeout(() => {
    qs(
      "input, select, textarea, button",
      qs('[data-form-step="1"]')
    )?.focus();
  }, 180);
}

function closeModal() {
  elements.modal.classList.remove("is-open");

  elements.modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("modal-open");

  elements.leadForm.reset();
  clearAllErrors();

  if (
    state.lastFocusedElement instanceof HTMLElement
  ) {
    state.lastFocusedElement.focus();
  }
}

function updateFormStep(step) {
  state.currentStep = Math.max(
    1,
    Math.min(step, 3)
  );

  qsa(
    "[data-form-step]",
    elements.leadForm
  ).forEach((panel) => {
    const isActive =
      Number(panel.dataset.formStep) ===
      state.currentStep;

    panel.classList.toggle(
      "is-active",
      isActive
    );

    panel.hidden = !isActive;
  });

  qsa("[data-progress-step]").forEach((item) => {
    const number =
      Number(item.dataset.progressStep);

    item.classList.toggle(
      "is-active",
      number === state.currentStep
    );

    item.classList.toggle(
      "is-complete",
      number < state.currentStep
    );
  });

  if (state.currentStep === 3) {
    renderReview();
  }

  elements.modalDialog.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function trapFocus(event) {
  if (
    event.key !== "Tab" ||
    !elements.modal.classList.contains("is-open")
  ) {
    return;
  }

  const focusable = qsa(
    [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])'
    ].join(","),
    elements.modalDialog
  ).filter((element) => {
    return (
      !element.hidden &&
      element.offsetParent !== null
    );
  });

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (
    event.shiftKey &&
    document.activeElement === first
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    document.activeElement === last
  ) {
    event.preventDefault();
    first.focus();
  }
}

/* =========================================================
   VALIDATION
   ========================================================= */

function setFieldError(field, message) {
  field.classList.add("is-invalid");

  const error =
    field
      .closest(".field")
      ?.querySelector(".field-error");

  if (error) {
    error.textContent = message;
  }
}

function clearFieldError(field) {
  field.classList.remove("is-invalid");

  const error =
    field
      .closest(".field")
      ?.querySelector(".field-error");

  if (error) {
    error.textContent = "";
  }
}

function clearAllErrors() {
  qsa(
    ".is-invalid",
    elements.leadForm
  ).forEach((field) => {
    field.classList.remove("is-invalid");
  });

  qsa(
    ".field-error",
    elements.leadForm
  ).forEach((error) => {
    error.textContent = "";
  });
}

function validateField(field) {
  clearFieldError(field);

  const value = sanitizeText(field.value);

  if (field.required && !value) {
    setFieldError(
      field,
      "Bu sahə mütləqdir."
    );

    return false;
  }

  if (!value) return true;

  if (
    field.type === "email" &&
    !isValidEmail(value)
  ) {
    setFieldError(
      field,
      "Email ünvanını düzgün qeyd edin."
    );

    return false;
  }

  if (
    field.type === "tel" &&
    !isValidPhone(value)
  ) {
    setFieldError(
      field,
      "Telefon nömrəsini düzgün qeyd edin."
    );

    return false;
  }

  if (field.type === "url") {
    try {
      new URL(value);
    } catch {
      setFieldError(
        field,
        "Linki https:// ilə birlikdə daxil edin."
      );

      return false;
    }
  }

  if (
    field.name === "name" &&
    value.length < 3
  ) {
    setFieldError(
      field,
      "Ad və soyadı düzgün qeyd edin."
    );

    return false;
  }

  return true;
}

function validateStep(step) {
  const panel = qs(
    `[data-form-step="${step}"]`,
    elements.leadForm
  );

  if (!panel) return true;

  const fields = qsa(
    "input, select, textarea",
    panel
  ).filter((field) => {
    return (
      !field.disabled &&
      field.type !== "hidden"
    );
  });

  let isValid = true;
  let firstInvalid = null;

  fields.forEach((field) => {
    const valid = validateField(field);

    if (!valid && !firstInvalid) {
      firstInvalid = field;
    }

    isValid = valid && isValid;
  });

  if (!isValid && firstInvalid) {
    firstInvalid.focus();
  }

  return isValid;
}

function validateConsent() {
  const error = qs(".consent-error");

  if (!elements.consentField.checked) {
    error.textContent =
      "Davam etmək üçün razılıq verməlisiniz.";

    return false;
  }

  error.textContent = "";

  return true;
}

/* =========================================================
   REVIEW AND PAYLOAD
   ========================================================= */

function getFormPayload() {
  const formData =
    new FormData(elements.leadForm);

  const dynamicValues = {};

  qsa(
    "[data-dynamic-field]",
    elements.leadForm
  ).forEach((field) => {
    dynamicValues[field.name] =
      sanitizeText(field.value);
  });

  return {
    name: sanitizeText(
      formData.get("name")
    ),

    phone: normalizePhone(
      formData.get("phone")
    ),

    email: sanitizeText(
      formData.get("email")
    ).toLowerCase(),

    note: sanitizeText(
      formData.get("note")
    ),

    service: elements.serviceField.value,

    package:
      elements.packageField.value ||
      dynamicValues.coursePackage ||
      "",

    ...dynamicValues,

    source: APP_CONFIG.source,
    pageUrl: window.location.href,
    createdAt: new Date().toISOString(),

    ...getUtmParams()
  };
}

function renderReview() {
  const payload = getFormPayload();

  const rows = [
    ["Xidmət", payload.service],
    ["Paket", payload.package],
    ["Ad və soyad", payload.name],
    ["Telefon", payload.phone],
    ["Email", payload.email]
  ];

  const optionalKeys = [
    "selectedService",
    "experienceLevel",
    "paymentPreference",
    "instagramUsername",
    "company",
    "industry",
    "website",
    "instagramOrWebsite",
    "monthlyBudget",
    "mainProblem",
    "expectation",
    "goal",
    "note"
  ];

  optionalKeys.forEach((key) => {
    if (!payload[key]) return;

    const labels = {
      selectedService: "Seçilən xidmət",
      experienceLevel: "Səviyyə",
      paymentPreference: "Ödəniş üsulu",
      instagramUsername: "Instagram",
      company: "Şirkət / layihə",
      industry: "Fəaliyyət sahəsi",
      website: "Link",
      instagramOrWebsite: "Link",
      monthlyBudget: "Aylıq büdcə",
      mainProblem: "Əsas problem",
      expectation: "Gözlənti",
      goal: "Məqsəd",
      note: "Qeyd"
    };

    rows.push([
      labels[key] || key,
      payload[key]
    ]);
  });

  elements.reviewCard.innerHTML = rows
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => {
      return `
        <div class="review-row">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `;
    })
    .join("");
}

/* =========================================================
   LEAD SUBMISSION
   ========================================================= */

function saveLeadLocally(payload) {
  const storageKey = "shamilKazimliLeads";

  try {
    const existing = JSON.parse(
      localStorage.getItem(storageKey) || "[]"
    );

    existing.push(payload);

    localStorage.setItem(
      storageKey,
      JSON.stringify(existing)
    );

    console.table(payload);
  } catch (error) {
    console.error(
      "Lead localStorage-da saxlanılmadı:",
      error
    );
  }
}

async function sendLead(payload) {
  if (!APP_CONFIG.leadEndpoint) {
    saveLeadLocally(payload);

    return {
      ok: true,
      demo: true
    };
  }

  const response = await fetch(
    APP_CONFIG.leadEndpoint,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    throw new Error(
      `Lead endpoint ${response.status} statusu qaytardı.`
    );
  }

  return {
    ok: true,
    demo: false
  };
}

function buildWhatsAppUrl(payload) {
  if (!APP_CONFIG.whatsappNumber) {
    return "";
  }

  const phone =
    APP_CONFIG.whatsappNumber.replace(
      /\D/g,
      ""
    );

  const message =
    `Salam, mən ${payload.service} ilə bağlı ` +
    `müraciət etmişəm. Adım: ${payload.name}.`;

  return (
    `https://wa.me/${phone}` +
    `?text=${encodeURIComponent(message)}`
  );
}

function showSuccess(payload, result) {
  elements.leadForm.hidden = true;
  elements.successState.hidden = false;

  elements.successMessage.textContent =
    result.demo
      ? "Müraciət demo rejimində brauzerdə saxlanıldı. Real lead toplamaq üçün APP_CONFIG.leadEndpoint əlavə edin."
      : "Tezliklə sizinlə əlaqə saxlanılacaq.";

  const whatsappUrl =
    buildWhatsAppUrl(payload);

  elements.successWhatsApp.hidden =
    !whatsappUrl;

  if (whatsappUrl) {
    elements.successWhatsApp.href =
      whatsappUrl;
  }

  const canPay =
    state.activeServiceKey === "meta-video" &&
    Boolean(APP_CONFIG.paymentUrl);

  elements.successPayment.hidden =
    !canPay;

  if (canPay) {
    elements.successPayment.href =
      APP_CONFIG.paymentUrl;
  }

  elements.modalDialog.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   EVENT BINDINGS
   ========================================================= */

function bindModalButtons() {
  qsa(".js-open-form").forEach((button) => {
    button.addEventListener("click", () => {
      openModal(
        button.dataset.service || "general",
        button.dataset.package || ""
      );
    });
  });

  qsa(".js-close-modal").forEach((element) => {
    element.addEventListener(
      "click",
      closeModal
    );
  });

  qsa(".js-next-step").forEach((button) => {
    button.addEventListener("click", () => {
      if (!validateStep(state.currentStep)) {
        return;
      }

      updateFormStep(
        state.currentStep + 1
      );
    });
  });

  qsa(".js-prev-step").forEach((button) => {
    button.addEventListener("click", () => {
      updateFormStep(
        state.currentStep - 1
      );
    });
  });

  elements.leadForm.addEventListener(
    "input",
    (event) => {
      if (
        event.target.matches(
          "input, select, textarea"
        )
      ) {
        clearFieldError(event.target);
      }
    }
  );

  elements.leadForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      if (
        !validateStep(3) ||
        !validateConsent()
      ) {
        return;
      }

      const payload = getFormPayload();

      state.lastPayload = payload;

      elements.submitButton.disabled = true;

      elements.submitButton.classList.add(
        "is-loading"
      );

      try {
        const result =
          await sendLead(payload);

        trackMeta("Lead", {
          content_name: payload.service,
          content_category:
            "Personal Brand Lead Form"
        });

        trackGA("generate_lead", {
          service_name: payload.service
        });

        if (
          state.activeServiceKey ===
          "meta-video"
        ) {
          trackMeta("InitiateCheckout", {
            content_name:
              "Meta Ads videokursu",
            value: 300,
            currency: "AZN"
          });

          trackGA("begin_checkout", {
            currency: "AZN",
            value: 300,

            items: [
              {
                item_name:
                  "Meta Ads videokursu",
                price: 300,
                quantity: 1
              }
            ]
          });
        }

        showSuccess(payload, result);

        showToast(
          "Müraciətiniz qəbul edildi."
        );
      } catch (error) {
        console.error(
          "Lead göndərilərkən xəta:",
          error
        );

        showToast(
          "Müraciəti göndərmək mümkün olmadı. Yenidən cəhd edin.",
          true
        );
      } finally {
        elements.submitButton.disabled =
          false;

        elements.submitButton.classList.remove(
          "is-loading"
        );
      }
    }
  );

  elements.successPayment?.addEventListener(
    "click",
    () => {
      trackMeta("InitiateCheckout", {
        content_name:
          "Meta Ads videokursu",
        value: 300,
        currency: "AZN"
      });

      trackGA("begin_checkout", {
        currency: "AZN",
        value: 300
      });
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape" &&
        elements.modal.classList.contains(
          "is-open"
        )
      ) {
        closeModal();
        return;
      }

      trapFocus(event);
    }
  );
}

/* =========================================================
   FAQ
   ========================================================= */

function initFaq() {
  qsa(".faq-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      qsa(".faq-item").forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {
  if (elements.currentYear) {
    elements.currentYear.textContent =
      new Date().getFullYear();
  }

  bindSocialLinks();
  initRevealAnimations();
  initPhoneTilt();
  initPackageSwitch();
  initComingSoonCards();
  bindModalButtons();
  initFaq();

  updateScrollFade();

  window.addEventListener(
    "scroll",
    requestScrollFadeUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    requestScrollFadeUpdate
  );
}

document.addEventListener(
  "DOMContentLoaded",
  init
);
