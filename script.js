document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const headerHeight = document.querySelector("header").offsetHeight; // Get header height

    // Toggle menu on button click
    menuButton.addEventListener("click", function () {
        menu.classList.toggle("show-menu");
    });

    // Hide menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".menu-container") && !event.target.closest(".menu-btn")) {
            menu.classList.remove("show-menu");
        }
    });

    // Smooth scrolling with offset for fixed header
    menuLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            
            if (targetId === "about") {
                // If "About" is clicked, scroll to the very top
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const offsetPosition = targetSection.offsetTop - headerHeight - 10;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }

            // Hide menu after clicking a link
            menu.classList.remove("show-menu");
        });
    });

    // Gallery Slideshow
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;
    let slideshowInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function startSlideshow() {
        if (slides.length === 0) return; // Prevent errors if no slides exist
        
        showSlide(currentIndex);
        slideshowInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 1000); // Changed from 1000ms (1 sec) to 3000ms (3 sec) for better viewing
    }

    // Pause slideshow on hover
    document.querySelector(".slideshow-container")?.addEventListener("mouseenter", function () {
        clearInterval(slideshowInterval);
    });

    document.querySelector(".slideshow-container")?.addEventListener("mouseleave", function () {
        startSlideshow();
    });

    if (slides.length > 0) {
        startSlideshow();
    }
});
