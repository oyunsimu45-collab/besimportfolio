/* ========================================
   Tasarımcı Portföy - JavaScript
   ======================================== */

(function () {
  "use strict";

  // ---------- Yıl ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Header scroll ----------
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ---------- Mobil menü ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Mobil menüden linke tıklandığında kapanır
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Filtreleme (Çalışmalar) ----------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Aktif butonu değiştir
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.getAttribute("data-filter");

      // Kartları filtrele
      workCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hide");
          // Küçük gecikmeyle fade-in
          requestAnimationFrame(() => {
            card.style.display = "block";
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            });
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.classList.add("hide");
          }, 300);
        }
      });
    });
  });

  // ---------- Kaydırmada görünürlük animasyonu ----------
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Sayfa yüklendiğinde mevcut görünür elemanları da etkinleştir
  window.addEventListener("load", () => {
    document.querySelectorAll(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80 && rect.bottom >= 0) {
        el.classList.add("active");
      }
    });
  });

  // ---------- İletişim formu ----------
  const contactForm = document.getElementById("contactForm");
  const formMsg = document.getElementById("formMsg");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Demo: veriyi konsola yazdır (gerçek bir back-end'e bağlayabilirsiniz)
    console.log("Gönderilen mesaj:", data);

    // Kullanıcıya geri bildirim
    formMsg.textContent = "Mesajınız alındı! En kısa sürede size dönüş yapacağım.";
    formMsg.style.color = "#1a1a1a";

    contactForm.reset();

    setTimeout(() => {
      formMsg.textContent = "";
    }, 5000);
  });
})();