
/**
 * Portfolio Website JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initAOS();
    initParticles();
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initSmoothScroll();
    initBackToTop();
    initFormValidation();
initNavbarScroll();
    initCursorTrail();
    initCertificatePreview();
});

/**
 * Initialize AOS (Animate On Scroll) Animation Library
 */
function initAOS() {
    // Check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100,
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
    }
}

/**
 * Initialize Particles.js Background
 */
function initParticles() {
    // Check if particlesJS is available
    if (typeof particlesJS !== 'undefined') {
        // Get current theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        const particleColor = isDark ? '#818cf8' : '#4f46e5';
        const linkColor = isDark ? '#94a3b8' : '#64748b';
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particleColor
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: linkColor,
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

/**
 * Dark/Light Mode Toggle
 * Saves preference to localStorage
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    if (savedTheme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        if (newTheme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Reinitialize particles with new colors
        initParticles();
    });
}

/**
 * Mobile Hamburger Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Typing Animation in Hero Section
 */
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Software Developer',
        'Python Developer',
        'AI Enthusiast',
        'Full Stack Developer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 60;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            isDeleting = true;
            typingSpeed = 3000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 600;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation after hero entrance
    setTimeout(type, 2500);
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Back to Top Button
 * Shows/hides based on scroll position
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact Form Validation and Email Sending via Web3Forms
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear error messages on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Please enter your email');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If valid, send email via Web3Forms
        if (isValid) {
            // Disable button to prevent double submission
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Add redirect URL for after submission (optional - Web3Forms will handle it)
            const formData = new FormData(form);
            formData.append('redirect', 'false');
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    formSuccess.classList.add('show');
                    
                    // Reset form
                    form.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.remove('show');
                    }, 5000);
                } else {
                    // Show error
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }
    });
    
    // Helper function to show error
    function showError(input, errorElement, message) {
        input.style.borderColor = 'var(--error)';
        errorElement.textContent = message;
    }
    
    // Helper function to clear error
    function clearError(input) {
        input.style.borderColor = 'var(--border-color)';
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

/**
 * Navbar Scroll Effect
 * Adds background and shadow when scrolled
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Glowing Cursor Trail Effect for Hero Section
 */
function initCursorTrail() {
    const heroSection = document.getElementById('home');
    const particleCount = 12;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId = null;
    
    // Check if touch device (disable trail on mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-trail';
            particle.style.opacity = '0';
            document.body.appendChild(particle);
            particles.push({
                element: particle,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0,
                size: Math.random() * 4 + 3,
                delay: i * 0.03
            });
        }
    }
    
    // Mouse move handler with throttling
    function handleMouseMove(e) {
        // Only track in hero section
        const rect = heroSection.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    }
    
    // Throttled mouse move
    let lastMouseMove = 0;
    const throttleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastMouseMove >= 16) { // ~60fps
            handleMouseMove(e);
            lastMouseMove = now;
        }
    };
    
    // Animate particles
    function animate() {
        particles.forEach((particle, index) => {
            // Ease towards mouse position
            const ease = 0.08;
            particle.targetX = mouseX;
            particle.targetY = mouseY;
            
            particle.x += (particle.targetX - particle.x) * ease;
            particle.y += (particle.targetY - particle.y) * ease;
            
            // Update particle position and opacity
            particle.element.style.left = (particle.x - particle.size / 2) + 'px';
            particle.element.style.top = (particle.y - particle.size / 2) + 'px';
            particle.element.style.transform = `scale(${particle.size * 0.01})`;
            
            // Fade out based on distance from mouse
            const distance = Math.hypot(particle.x - mouseX, particle.y - mouseY);
            const maxDistance = 50;
            particle.element.style.opacity = Math.max(0, 1 - distance / maxDistance);
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    createParticles();
    document.addEventListener('mousemove', throttleMouseMove);
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.parentNode.removeChild(particle.element);
            }
        });
    });
}

/**
 * Active Navigation Link on Scroll
 * Highlights current section in navbar
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}



/**
 * Certificate Preview on Hover
 */

function initCertificatePreview() {
    const certificateItems = document.querySelectorAll('.certificate-item');
    const certViewBtns = document.querySelectorAll('.cert-view-btn');
    
    // Button click to open modal
    certViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const imgSrc = btn.getAttribute('data-image');
            if (!imgSrc) return;
            
            const modal = document.createElement('div');
            modal.className = 'certificate-modal active';
            modal.innerHTML = `
                <img src="${imgSrc}" alt="Certificate" loading="lazy">
                <button class="modal-close">&times;</button>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    });
    
    // Hover overlay handled by CSS
}


// Initialize active nav link
initActiveNavLink();

