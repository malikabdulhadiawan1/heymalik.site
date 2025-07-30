/*=============== MOBILE NAV TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu when a link is clicked
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});


/*=============== SCROLL REVEAL ANIMATION ===============*/
// This function adds a 'visible' class to elements when they enter the viewport.
// It uses the Intersection Observer API for better performance than scroll event listeners.

const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null, // observes intersections relative to the viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a class to all children of the section that need animation
            const elementsToAnimate = entry.target.querySelectorAll('.about__container, .about__stats, .skills__card, .portfolio__card, .experience__item, .certs__card, .contact__content, .contact__info');
            
            // Fallback for sections that are the direct animated item
            if (entry.target.matches('.home, .about, .skills, .portfolio, .experience, .certs, .contact')) {
                 entry.target.querySelectorAll('.section__title, .section__subtitle, .home__content, .about__description').forEach((el, index) => {
                    el.style.transitionDelay = `${index * 100}ms`;
                    el.classList.add('fade-in');
                    el.classList.add('visible');
                 });
                 elementsToAnimate.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 100 + 200}ms`; // Stagger animation
                    el.classList.add('fade-in');
                    el.classList.add('visible');
                 });
            }
            
            // Stop observing the section once it has been animated to save resources
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing each section
sections.forEach(section => {
    // Initially hide elements that will be animated
    const elementsToAnimate = section.querySelectorAll('.about__container, .about__stats, .skills__card, .portfolio__card, .experience__item, .certs__card, .contact__content, .contact__info, .section__title, .section__subtitle, .home__content, .about__description');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
    });
    
    observer.observe(section);
});