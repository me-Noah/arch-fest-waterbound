document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");
    const menuLinks = document.querySelectorAll(".menu a");
    const headerHeight = document.querySelector("header").offsetHeight; // Get header height

    // Toggle menu on button click
    menuButton.addEventListener("click", function () {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Hide menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== menuButton) {
            menu.style.display = "none";
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
            menu.style.display = "none";
        });
    });

    // Gallery Slideshow
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function startSlideshow() {
        showSlide(currentIndex);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 1000);
    }

    if (slides.length > 0) {
        startSlideshow();
    }
});
