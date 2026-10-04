const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const openButtons = document.querySelectorAll("[data-open-contact-form]");
  const closeButton = document.querySelector("[data-close-contact-form]");
  const status = document.querySelector("#form-status");
  const draftLink = document.querySelector("#mail-draft-link");
  let lastOpenButton;

  function openContactForm(event) {
    event.preventDefault();
    lastOpenButton = event.currentTarget;
    contactForm.hidden = false;
    openButtons.forEach((button) => button.setAttribute("aria-expanded", "true"));
    contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
    contactForm.querySelector("input").focus({ preventScroll: true });
  }

  function closeContactForm() {
    contactForm.hidden = true;
    openButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
    lastOpenButton?.focus();
  }

  openButtons.forEach((button) => button.addEventListener("click", openContactForm));
  closeButton.addEventListener("click", closeContactForm);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = new FormData(contactForm);
    const subject = String(fields.get("subject")).trim();
    const body = String(fields.get("message")).trim();
    const gmailParams = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "worzz.dev@gmail.com",
      su: subject,
      body,
    });
    const gmailDraft = `https://mail.google.com/mail/?${gmailParams.toString()}`;

    draftLink.href = gmailDraft;
    draftLink.hidden = false;
    status.textContent = "Le brouillon est prêt. Si Gmail ne s’ouvre pas, utilise le bouton ci-dessous.";
    window.open(gmailDraft, "_blank", "noopener,noreferrer");
  });
}
