'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// testimonials / modal variables (if present)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
};

if (testimonialsItem && testimonialsItem.length > 0 && modalContainer) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar && modalImg) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
      if (text && modalText) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  }
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const normSelected = selectedValue.trim().toLowerCase();
  for (let i = 0; i < filterItems.length; i++) {
    const rawCat = (filterItems[i].dataset.category || "").toLowerCase();
    const categories = rawCat.split(",").map(function (c) { return c.trim(); });
    if (normSelected === "all" || categories.includes(normSelected) || rawCat === normSelected) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all select items (mobile dropdown)
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn && filterBtn.length > 0 ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables & email client fallback
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = form.querySelector('[name="fullname"]');
    const emailInput = form.querySelector('[name="email"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');

    const name = nameInput ? nameInput.value.trim() : "Visitor";
    const email = emailInput ? emailInput.value.trim() : "";
    const userSubject = subjectInput && subjectInput.value.trim() ? subjectInput.value.trim() : `Portfolio Message from ${name}`;
    const message = messageInput ? messageInput.value.trim() : "";

    const subject = encodeURIComponent(userSubject);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\nMessage:\n${message}`);

    window.location.href = `mailto:shreypatel8032@gmail.com?subject=${subject}&body=${body}`;
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase().trim();
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }
    // Update active nav link
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k] === this) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }
  });
}