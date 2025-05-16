// assets/js/main.js

export function initSidebarHover() {
  const list = document.querySelectorAll(".navigation li");

  function activelink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }

  list.forEach((item) =>
    item.addEventListener("mouseover", activelink)
  );
}


// Toggle Menu
export function setupToggleMenu() {
  const navigation = document.querySelector(".navigation");
  const main = document.querySelector(".main");
  const toggle = document.querySelector(".toggle");

toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active");
}
}
export function setupNotificationDropdown() {
  const notificationBtn = document.querySelector(".notification-btn");
  const notification = document.querySelector(".notification");
  const closeBtn = document.querySelector(".close-dropdown");

  if (!notificationBtn || !notification || !closeBtn) return;

  notificationBtn.addEventListener("click", () => {
    notification.classList.toggle("show");
  });

  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show");
  });

  // Optional: close dropdown if clicking outside
  document.addEventListener("click", (e) => {
    if (
      notification.classList.contains("show") &&
      !notification.contains(e.target) &&
      e.target !== notificationBtn
    ) {
      notification.classList.remove("show");
    }
  });
}
