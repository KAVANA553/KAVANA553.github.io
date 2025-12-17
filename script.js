// CV Download functionality
function downloadCV() {
    // Create a link element
    const link = document.createElement('a');
    
    // Set the download attribute and file name
    link.download = 'KAVANA_BS_CV.html';
    
    // Path to the CV file
    link.href = 'cv.html';
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Store download info in localStorage
    const downloadInfo = {
        timestamp: new Date().toISOString(),
        fileName: 'KAVANA_BS_CV.html'
    };
    localStorage.setItem('cvDownload', JSON.stringify(downloadInfo));
    
    console.log('CV downloaded successfully!');
}

// Add event listener to download CV button
document.addEventListener('DOMContentLoaded', function() {
    const downloadCVBtn = document.querySelector('.about-image .btn.primary');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCV();
        });
    }
});

// Mobile menu toggle with animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu with animation
hamburger.addEventListener('click', () => {
    // Toggle active class for hamburger icon and nav links
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate nav items
    if (navLinks.classList.contains('active')) {
        // Menu is opening
        navItems.forEach((item, index) => {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
    } else {
        // Menu is closing
        navItems.forEach(item => {
            item.style.animation = '';
        });
    }
});

// Close mobile menu when clicking on a nav link with smooth transition
navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            // Add closing animation
            navLinks.style.animation = 'slideOut 0.5s ease forwards';
            
            // Wait for animation to complete before removing classes
            setTimeout(() => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navLinks.style.animation = '';
            }, 500);
        }
    });
});

// Enhanced smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting on scroll with throttling
let isScrolling;
window.addEventListener('scroll', () => {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
        const scrollPosition = window.scrollY + 100; // Add offset for better UX
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to current section link
                if (navLink) navLink.classList.add('active');
            }
        });
    }, 100); // Adjust the timeout as needed
}, false);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeElements = document.querySelectorAll('.fade-in');
const skillItems = document.querySelectorAll('.skill');
const projectCards = document.querySelectorAll('.project-card');

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
});

// Animate skills on scroll
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, 100 * index);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

skillItems.forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'scale(0.8)';
    skill.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    skill.style.transitionDelay = `${index * 0.1}s`;
    skillObserver.observe(skill);
});

// Animate project cards with staggered delay
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    card.style.transitionDelay = `${index * 0.15}s`;
    fadeInObserver.observe(card);
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Add animation to hero content
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    
    // Trigger animation after a small delay
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);
}

// Add hover effect to project cards
projectCards.forEach(card => {
    const image = card.querySelector('img');
    const info = card.querySelector('.project-info');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add animation to skill icons
const skills = document.querySelectorAll('.skill i');
skills.forEach(skill => {
    skill.addEventListener('mouseover', () => {
        skill.style.animation = 'bounce 0.5s ease';
    });
    
    skill.addEventListener('animationend', () => {
        skill.style.animation = '';
    });
});

// Add animation to social icons
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.id = 'scrollToTopBtn';
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const scrollToTopCSS = `
    #scrollToTopBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 999;
    }
    
    #scrollToTopBtn:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = scrollToTopCSS;
document.head.appendChild(styleElement);

// Initial check
fadeInOnScroll();

// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}