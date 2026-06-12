"use strict";

/*
  Real lead toplamaq üçün aşağıdakı dəyərə öz webhook,
  CRM və ya Google Apps Script endpoint-inizi əlavə edin.

  Boş saxlanıldıqda müraciətlər demo məqsədilə
  brauzerin localStorage yaddaşında saxlanılır.
*/
const LEAD_ENDPOINT = "";

const body = document.body;

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const modal = document.getElementById("leadModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const serviceField = document.getElementById("serviceField");
const leadForm = document.getElementById("leadForm");
const submitButton = leadForm.querySelector(".button--submit");

const toast = document.getElementById("toast");
const currentYear = document.getElementById("currentYear");

const nameField = document.getElementById("nameField");
const phoneField = document.getElementById("phoneField");
const emailField = document.getElementById("emailField");

const serviceDescriptions = {
  "4 aylıq SMM proqramı":
    "Proqram haqqında ətraflı məlumat və qeydiyyat üçün əlaqə məlumatlarınızı daxil edin.",

  "Aylıq Meta xidməti":
    "Biznesiniz üçün aylıq Meta reklam idarəetməsi xidməti barədə məlumat alın.",

  "Konsultasiya":
    "Layihənizi analiz etmək və sizə uyğun yol xəritəsi almaq üçün müraciət edin.",

  "Ümumi müraciət":
    "Əlaqə məlumatlarınızı daxil edin. Sizinlə uyğun zamanda əlaqə saxlayaq."
};

/* Mobil menyu */
function toggleMenu(forceState) {
  if (!menuButton || !mobileMenu) return;

  const shouldOpen =
    typeof forceState === "boolean"
      ? forceState
      : !mobileMenu.classList.contains("is-open");

  mobileMenu.classList.toggle("is-open", shouldOpen);
  menuButton.classList.toggle("is-active", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
}

/* Lead modalını aç */
function openModal(service = "Ümumi müraciət") {
  if (!modal || !leadForm) return;

  const selectedService = Object.prototype.hasOwnProperty.call(
    serviceDescriptions,
    service
  )
    ? service
    : "Ümumi müraciət";

  serviceField.value = selectedService;
  modalTitle.textContent = selectedService;
  modalDescription.textContent = serviceDescriptions[selectedService];

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");

  toggleMenu(false);

  window.setTimeout(() => {
    nameField?.focus();
  }, 170);
}

/* Lead modalını bağla */
function closeModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");

  clearErrors();
}

/* Bildiriş göstər */
function showToast(message, isError = false) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timeoutId);

  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3600);
}

/* Form xətası */
function setFieldError(field, message) {
  if (!field) return;

  field.classList.add("is-invalid");

  const fieldWrapper = field.closest("label");
  const errorElement = fieldWrapper?.querySelector(".field-error");

  if (errorElement) {
    errorElement.textContent = message;
  }
}

/* Form xətasını sil */
function clearFieldError(field) {
  if (!field) return;

  field.classList.remove("is-invalid");

  const fieldWrapper = field.closest("label");
  const errorElement = fieldWrapper?.querySelector(".field-error");

  if (errorElement) {
    errorElement.textContent = "";
  }
}

function clearErrors() {
  [nameField, phoneField, emailField].forEach(clearFieldError);
}

/* Telefon nömrəsini təmizlə */
function normalizePhone(value) {
  return value.replace(/[^\d+]/g, "");
}

/* Form yoxlaması */
function validateForm() {
  clearErrors();

  let isValid = true;

  const name = nameField.value.trim();
  const phone = normalizePhone(phoneField.value.trim());
  const email = emailField.value.trim();

  if (name.length < 3) {
    setFieldError(nameField, "Ad və soyadı düzgün qeyd edin.");
    isValid = false;
  }

  if (!/^\+?\d{9,15}$/.test(phone)) {
    setFieldError(phoneField, "Telefon nömrəsini düzgün qeyd edin.");
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError(emailField, "Email ünvanını düzgün qeyd edin.");
    isValid = false;
  }

  return isValid;
}

/* Demo lead-i localStorage-da saxla */
function saveLeadLocally(payload) {
  try {
    const savedLeads = localStorage.getItem("shamilKazimliLeads");
    const currentLeads = savedLeads ? JSON.parse(savedLeads) : [];

    currentLeads.push(payload);

    localStorage.setItem(
      "shamilKazimliLeads",
      JSON.stringify(currentLeads)
    );
  } catch (error) {
    console.error("Lead localStorage-da saxlanılmadı:", error);
  }
}

/* Lead göndər */
async function sendLead(payload) {
  if (!LEAD_ENDPOINT) {
    saveLeadLocally(payload);

    return {
      ok: true,
      demo: true
    };
  }

  const response = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Lead endpoint sorğunu qəbul etmədi.");
  }

  return {
    ok: true,
    demo: false
  };
}

/* Mobil menyu düyməsi */
menuButton?.addEventListener("click", () => {
  toggleMenu();
});

/* Menyuda link basıldıqda menyunu bağla */
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu(false);
  });
});

/* Aktiv müraciət düymələri */
document.querySelectorAll(".js-open-modal").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService =
      button.dataset.service || "Ümumi müraciət";

    openModal(selectedService);
  });
});

/* Modal bağlama düymələri */
document.querySelectorAll(".js-close-modal").forEach((element) => {
  element.addEventListener("click", closeModal);
});

/* ESC düyməsi ilə modalı bağla */
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    modal?.classList.contains("is-open")
  ) {
    closeModal();
  }
});

/* Yazmağa başlayanda xəta mesajını sil */
[nameField, phoneField, emailField].forEach((field) => {
  field?.addEventListener("input", () => {
    clearFieldError(field);
  });
});

/* Form göndərilməsi */
leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const payload = {
    service: serviceField.value,
    name: nameField.value.trim(),
    phone: normalizePhone(phoneField.value.trim()),
    email: emailField.value.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
    page: window.location.href,
    source: "shamil-kazimli-personal-page"
  };

  submitButton.disabled = true;
  submitButton.classList.add("is-loading");

  try {
    const result = await sendLead(payload);

    /*
      Meta Pixel saytda quraşdırılıbsa,
      uğurlu form göndərilməsindən sonra Lead eventi işləyir.
    */
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: payload.service,
        content_category: "Lead Form"
      });
    }

    /*
      Google Analytics 4 quraşdırılıbsa
      generate_lead eventi göndərilir.
    */
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        service_name: payload.service
      });
    }

    leadForm.reset();
    closeModal();

    showToast(
      result.demo
        ? "Müraciət demo rejimində brauzerdə saxlanıldı. Real müraciətlər üçün LEAD_ENDPOINT əlavə edin."
        : "Müraciətiniz qəbul edildi. Tezliklə sizinlə əlaqə saxlanılacaq."
    );
  } catch (error) {
    console.error("Lead göndərilərkən xəta baş verdi:", error);

    showToast(
      "Müraciəti göndərmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.",
      true
    );
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");
  }
});

/* Cari ili avtomatik göstər */
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
