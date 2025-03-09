document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const scrollToTopButton = document.getElementById("scrollToTop");

    // Hide initially
    scrollToTopButton.style.display = "none";

    // Toggle menu on button click
    menuButton?.addEventListener("click", function () {
        menu?.classList.toggle("show-menu");
    });

    // Hide menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-container") && !event.target.closest(".menu-btn")) {
            menu?.classList.remove("show-menu");
        }
    });

    // Smooth scrolling with offset for fixed header
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);

            if (targetId === "about") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offsetPosition = targetSection.offsetTop - headerHeight - 10;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }

            menu?.classList.remove("show-menu");
        });
    });

    // Gallery Slideshow
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let slideshowInterval;
    const slideshowContainer = document.querySelector(".slideshow-container");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function startSlideshow() {
        if (slides.length === 0) return;
        showSlide(currentIndex);
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 1500);
    }

    slideshowContainer?.addEventListener("mouseenter", () => clearInterval(slideshowInterval));
    slideshowContainer?.addEventListener("mouseleave", startSlideshow);

    if (slides.length > 0) startSlideshow();

    // Scroll to Top Button Logic
    window.addEventListener("scroll", function () {
        const scrollHeight = window.innerHeight + window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollHeight >= documentHeight - 20) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
