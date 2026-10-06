// Interactive behavior for Modern JavaScript Tutorial
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("sidebar-search");
  const chapterItems = document.querySelectorAll(".chapter-item");
  const modalBackdrop = document.getElementById("soon-modal-backdrop");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalClose = document.getElementById("modal-close");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const themeToggle = document.getElementById("theme-toggle");
  const themeText = document.getElementById("theme-text");

  // Mobile menu toggle
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Close sidebar on click outside on mobile
  document.addEventListener("click", (e) => {
    if (sidebar && sidebar.classList.contains("open") && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });

  // JS Theme Switcher (Light / Dark)
  const updateThemeUI = (theme) => {
    if (themeText) {
      themeText.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  };

  const savedTheme = localStorage.getItem("js-tutorial-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeUI(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    updateThemeUI("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    updateThemeUI("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("js-tutorial-theme", next);
      updateThemeUI(next);
    });
  }

  // Real-time chapter filter search across 175 chapters
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase().trim();
      chapterItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  // Handle coming soon chapter clicks
  const comingSoonLinks = document.querySelectorAll(".chapter-link.coming-soon");
  comingSoonLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const chapterName = link.getAttribute("data-title") || link.innerText.replace("Coming soon", "").trim();
      const section = link.getAttribute("data-section") || "Roadmap";
      
      if (modalTitle && modalDesc && modalBackdrop) {
        modalTitle.textContent = chapterName;
        modalDesc.innerHTML = `This chapter is part of <strong>${section}</strong> and is next on the roadmap.<br><br>Chapter 1: <em>An Introduction to JavaScript</em> is fully ready right now!`;
        modalBackdrop.classList.add("open");
      }
    });
  });

  // Close modal
  if (modalClose && modalBackdrop) {
    modalClose.addEventListener("click", () => {
      modalBackdrop.classList.remove("open");
    });
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove("open");
      }
    });
  }
});
