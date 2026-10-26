const menuToggle = document.querySelector(".menu-toggle");
const menuIcon = menuToggle.querySelector("img");
const navigation = document.querySelector(".primary-navigation");
const testimonialList = document.querySelector(".testimonial-list");
const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const formMessage = document.querySelector("#form-message");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuIcon.src = "images/icon-hamburger.svg";
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  menuIcon.src = isExpanded ? "images/icon-hamburger.svg" : "images/icon-close.svg";
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle.focus();
  }
});

document.querySelectorAll(".slider-control").forEach((control) => {
  control.addEventListener("click", () => {
    const firstCard = testimonialList.querySelector(".testimonial-card");
    const styles = window.getComputedStyle(testimonialList);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    const direction = Number(control.dataset.direction);

    testimonialList.scrollBy({ left: direction * distance, behavior: "smooth" });
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!newsletterForm.reportValidity()) {
    return;
  }

  formMessage.textContent = `Thanks! ${newsletterEmail.value.trim()} is valid. This demo does not yet connect to a mailing-list service.`;
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
