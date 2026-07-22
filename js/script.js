/**
 * M Saif Ali - Portfolio
 * Smooth scroll, theme toggle, scroll reveal, counters, project modal, filters
 */
(function () {
  "use strict";

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Smooth scroll
  document.querySelectorAll(".smooth-scroll").forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          const navbarCollapse = document.getElementById("navbarNav");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            const bsCollapse =
              bootstrap.Collapse.getInstance(navbarCollapse) ||
              new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Navbar scroll effect
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    function updateNavbar() {
      mainNav.classList.toggle("scrolled", window.scrollY > 50);
    }
    window.addEventListener("scroll", updateNavbar);
    updateNavbar();
  }

  // Dark / Light mode
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  function getPreferredTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
    return localStorage.getItem("theme") || "light";
  }
  function setTheme(theme) {
    html.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    const sunIcon = themeToggle?.querySelector(".sun-icon");
    const moonIcon = themeToggle?.querySelector(".moon-icon");
    if (theme === "dark") {
      sunIcon?.classList.add("d-none");
      moonIcon?.classList.remove("d-none");
    } else {
      sunIcon?.classList.remove("d-none");
      moonIcon?.classList.add("d-none");
    }
  }
  if (themeToggle) {
    setTheme(getPreferredTheme());
    themeToggle.addEventListener("click", function () {
      setTheme(
        html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark",
      );
    });
  }

  // Download CV (placeholder – set href to your CV file)
  const downloadCv = document.getElementById("downloadCv");
  if (downloadCv) {
    downloadCv.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") e.preventDefault();
      // Set downloadCv.href to your CV URL when ready
    });
  }

  // Scroll reveal – reveal children when section is in view
  document.querySelectorAll(".scroll-reveal").forEach(function (section) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            section.querySelectorAll(".reveal-up").forEach(function (el) {
              el.classList.add("visible");
            });
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0 },
    );
    sectionObserver.observe(section);
  });

  document.querySelectorAll(".reveal-up").forEach(function (el) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.05 },
    );
    observer.observe(el);
  });

  // Section headers – underline when visible
  document.querySelectorAll(".section-header").forEach(function (header) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(header);
  });

  // Skill bars
  const skillBarObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute("data-skill-value") || "0";
          const card = bar.closest(".skill-card");
          if (card) {
            card.classList.add("visible");
            card.style.setProperty("--skill-width", value + "%");
          }
          skillBarObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll(".skill-bar[data-skill-value]")
    .forEach(function (bar) {
      bar.style.width = "0%";
      skillBarObserver.observe(bar);
    });

  // Project filter
  const filterBtns = document.querySelectorAll(".btn-filter");
  const projectItems = document.querySelectorAll(".project-item");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      projectItems.forEach(function (item) {
        const categories = (item.getAttribute("data-category") || "").split(
          " ",
        );
        const show = filter === "all" || categories.includes(filter);
        item.classList.toggle("hide", !show);
      });
    });
  });

  // Project modal data
  const projectData = {
    attendance: {
      title: "Attendance Management System",
      description:
        "A Laravel-based system to manage employee or student attendance with login authentication, daily attendance records, reporting and admin dashboard.",
      tech: "Laravel, PHP, MySQL, Bootstrap, JavaScript",
      live: "#",
      github: "#",
    },
    school: {
      title: "School Management System",
      description:
        "A complete system for managing students, teachers, classes, fee management, attendance tracking and reporting.",
      tech: "Laravel, PHP, MySQL, Bootstrap",
      live: "#",
      github: "#",
    },
    property: {
      title: "Property Management System",
      description:
        "A web platform where users can list and browse properties. Includes admin dashboard, property listings and search features.",
      tech: "Laravel, PHP, MySQL, JavaScript",
      live: "#",
      github: "#",
    },
    mergersales: {
      title: "MergerSales Business Listing Platform",
      description:
        "A business listing website where users can list businesses for sale or partnerships. Includes listing management and contact system.",
      tech: "Laravel, PHP, MySQL, Bootstrap",
      live: "#",
      github: "#",
    },
    fbws: {
      title: "FBWS Website",
      description:
        "A responsive corporate website designed to present business services and information.",
      tech: "HTML, CSS, JavaScript, Bootstrap, PHP",
      live: "#",
      github: "#",
    },
    ecommerce: {
      title: "E-Commerce Store",
      description:
        "A full-featured online store built with Laravel including product catalog, shopping cart, checkout, order management, and admin panel for inventory and sales.",
      tech: "Laravel, PHP, MySQL, Bootstrap, JavaScript",
      live: "#",
      github: "#",
    },
    focus: {
      title: "Focus on Today",
      image: "js_projects.png",
      description:
        "A JavaScript-based goal tracking project where users can add their daily goals, mark them complete, and stay focused on today’s tasks.",
      tech: "HTML, CSS, JavaScript, Local Storage",
      live: "https://grand-madeleine-6471de.netlify.app/",
    },
    protfolio: {
      title: "Protfolio Website",
      image: "protfolio.png",
      description:
        "A personal portfolio website showcasing skills, experience, projects, and professional journey in a clean and responsive layout.",
      tech: "HTML, CSS, JavaScript, Local Storage",
      live: "https://saifaliportfolio1.netlify.app/",
    },
    react: {
      title: "React Project",
      image: "coading.png",
      description:
        "  Coding with Saiif is a web development learning website where students can learn HTML, CSS, JavaScript, Bootstrap, PHP, and Laravel with practical guidance.",
      tech: "HTML, CSS, JavaScript, Local Storage",
      live: "https://coadingwithsaif.netlify.app/",
    },

    court: {
      title: "Court Managnment System",
      image: "court.png",
      description:
        "     Court Management System is a web-based platform designed to manage cases, hearings, lawyers, clients, court schedules, and legal records in an organized way.",
      tech: "HTML, CSS, JavaScript, Local Storage",
      live: "https://courtmanagmentsyatem.netlify.app/",
    },

    mms: {
      title: "Multi Mail System",
      image: "mms.png",
      description:
        "       MMS (Multi Mail System) is a web-based platform where users can send emails to multiple people at the same time quickly and efficiently.",
      tech: "HTML, CSS, JavaScript, Local Storage",
    },

    cloth: {
      title: "Trousers and Shirts E-Commerce Store",
      image: "cloth.png",
      description:
        "A trousers and shirts e-commerce store where users can browse products, view details, add items to cart, and place orders online.",
      tech: "HTML, CSS, JavaScript, Local Storage",
    },

    shopify: {
      title: "HandCrafted Store",
      image: "shopify.png",
      description:
        "Handcrafted Store is a modern and fully responsive Shopify eCommerce website designed with a clean, elegant, and user-friendly interface. The store focuses on delivering a seamless shopping experience through intuitive navigation, attractive product showcases, secure checkout integration, and mobile-optimized performance. I customized the layout, refined the user experience, and ensured the website maintains a premium visual identity while providing fast loading speeds and a smooth purchasing journey across all devices.",
      tech: "Shopify, Liquid, JavaScript (ES6), Responsive Design",
    },
  };

  const projectModal = document.getElementById("projectModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", function (e) {
      const trigger = e.relatedTarget;
      const key = trigger?.getAttribute("data-project");
      const data = key ? projectData[key] : null;
      if (data) {
        document.getElementById("projectModalLabel").textContent = data.title;
        document.getElementById("modalDescription").textContent =
          data.description;
        const card = trigger?.closest(".project-card") || trigger;
        const image =
          card?.querySelector(".project-image")?.getAttribute("data-image") ||
          "";
        const live = card?.getAttribute("data-live") || data.live || "#";
        document.getElementById("modalTech").textContent = data.tech;
        document.getElementById("modalScreenshot").src = image;
        document.getElementById("modalLiveBtn").href = live;
        document.getElementById("modalGitHubBtn").href = data.github;
        document
          .getElementById("modalLiveBtn")
          .classList.toggle("disabled", live === "#");
      }
    });
  }

  // Animated counters
  function animateCounter(el, target, duration) {
    const start = 0;
    const isDecimal = target % 1 !== 0;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = isDecimal ? target + "+" : target + "+";
    }
    requestAnimationFrame(update);
  }

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count")) || 0;
          animateCounter(el, target, 1500);
          statObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.3 },
  );
  document.querySelectorAll(".stat-number").forEach(function (el) {
    statObserver.observe(el);
  });

  // Contact form – open WhatsApp with pre-filled message (you receive on 03272000339)
  const whatsappNumber = "923272000339"; // Pakistan: 92 + 3272000339
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();
      const whatsappText =
        "*New message from portfolio contact form*\n\n" +
        "*Name:* " +
        name +
        "\n" +
        "*Email:* " +
        email +
        "\n\n" +
        "*Message:*\n" +
        message;
      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl =
        "https://wa.me/" + whatsappNumber + "?text=" + encodedText;
      contactForm.reset();
      window.open(whatsappUrl, "_blank");
    });
  }
})();

document.querySelectorAll(".project-card").forEach(function (card) {
  const live = card.getAttribute("data-live") || "#";
  const liveLink = card.querySelector(".project-live-link");
  if (liveLink) {
    liveLink.href = live;
    liveLink.classList.toggle("disabled", live === "#");
    liveLink.addEventListener("click", function (e) {
      e.stopPropagation();
      if (live === "#") e.preventDefault();
    });
  }
});
