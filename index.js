document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) {
        slides.forEach((s, i) => s.classList.toggle("active", i === 0));

        setInterval(() => {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length;
            slides[index].classList.add("active");
        }, 4000);
    }
    const cards = document.querySelectorAll(".place-card");
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("show");
            });
        }, { threshold: 0.15 });

        cards.forEach(card => obs.observe(card));
    } else {
        window.addEventListener("scroll", () => {
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) card.classList.add("show");
            });
        });
    }

    const searchBar = document.getElementById("searchBar");
    const searchBtn = document.querySelector(".search-bar button");


    function filterPlaces() {
        const q = (searchBar.value || "").trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const desc = card.querySelector("p")?.textContent.toLowerCase() || "";

            if (!q || title.includes(q) || desc.includes(q)) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        if (placesContainer) {
            placesContainer.classList.toggle("single-result", visibleCount === 1);
        }

        const noMsg = document.querySelector(".no-results");
        if (noMsg) {
            noMsg.style.display = (visibleCount === 0 ? "block" : "none");
        }
    }

    if (searchBar) {
        searchBar.addEventListener("input", filterPlaces);
        searchBar.addEventListener("keyup", e => { if (e.key === "Enter") filterPlaces(); });
    }

    if (searchBar) {
        searchBar.addEventListener("input", filterPlaces);
        searchBar.addEventListener("keyup", (e) => {
            if (e.key === "Enter") filterPlaces();
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", filterPlaces);
    }

    window._debugFilter = filterPlaces;
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const aboutSection = document.querySelector("#about .about-container");

if ('IntersectionObserver' in window && aboutSection) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  obs.observe(aboutSection);
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    alert("Thank you, " + name + "! Your message has been sent successfully.");
    contactForm.reset();
  });
}
