// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // Animated counters for statistics
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = target / 100;
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(() => animateStats(), 20);
            } else {
                stat.textContent = target + (target >= 1000 ? '+' : '');
            }
        });
    }

    // Trigger stats animation when scrolling to about section
    const aboutSection = document.querySelector('.about');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                setTimeout(animateStats, 500);
            }
        });
    }, { threshold: 0.5 });

    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Intersection Observer for animations
    const observeElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .about-stats .stat');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    observeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Typing effect enhancement
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = "Hi, I'm Justin Michael King";
        let index = 0;
        let isDeleting = false;
        
        function typeEffect() {
            if (!isDeleting) {
                typingText.textContent = text.slice(0, index + 1);
                index++;
                if (index === text.length) {
                    setTimeout(() => isDeleting = true, 2000);
                }
            } else {
                typingText.textContent = text.slice(0, index - 1);
                index--;
                if (index === 0) {
                    isDeleting = false;
                }
            }
            
            const speed = isDeleting ? 80 : 120;
            setTimeout(typeEffect, speed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeEffect, 1000);
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #059669;' : ''}
            ${type === 'error' ? 'background: #dc2626;' : ''}
            ${type === 'info' ? 'background: #2563eb;' : ''}
        `;
        
        document.body.appendChild(notification);
        
        // Slide in animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => removeNotification(notification));
        
        // Auto remove after 5 seconds
        setTimeout(() => removeNotification(notification), 5000);
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Dynamic project loading (simulate loading from GitHub API)
    function loadGitHubProjects() {
        // This would normally fetch from GitHub API
        // For now, we'll use static data that matches your actual projects
        const projects = [
            {
                name: "RecyclingCenterApp",
                description: "Flutter-based recycling center management system with ML-powered waste classification and route optimization algorithms.",
                technologies: ["Flutter", "Python", "TensorFlow", "Computer Vision"],
                url: "https://github.com/Justin-MKing/RecyclingCenterApp",
                icon: "fas fa-recycle"
            },
            {
                name: "ML Data Pipeline",
                description: "Automated ETL pipeline with real-time data processing and model retraining capabilities for production ML systems.",
                technologies: ["Python", "Apache Spark", "Docker", "AWS"],
                url: "https://github.com/Justin-MKing",
                icon: "fas fa-brain"
            },
            {
                name: "Predictive Analytics Dashboard",
                description: "Interactive dashboard for real-time predictive analytics with advanced visualization and anomaly detection capabilities.",
                technologies: ["Python", "Streamlit", "Plotly", "PostgreSQL"],
                url: "https://github.com/Justin-MKing",
                icon: "fas fa-chart-line"
            }
        ];

        return projects;
    }

    // Lazy loading for images (if you add actual project images later)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Parallax effect for background elements
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    // Throttled scroll event for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Focus management for accessibility
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });

    // Preload critical resources
    function preloadResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.includes('.css') ? 'style' : 'font';
            link.href = resource;
            if (resource.includes('fonts.googleapis.com')) {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    }

    preloadResources();

    // Performance monitoring
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                        console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
                    }
                }, 0);
            });
        }
    }

    trackPerformance();

    // Service Worker registration for PWA capabilities (optional enhancement)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('SW registered:', registration))
            //     .catch(error => console.log('SW registration failed:', error));
        });
    }

    // Initialize theme preference (for future dark mode implementation)
    function initializeTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    initializeTheme();

    // Add loading animation removal
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading overlays if they exist
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // Console easter egg for developers
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║              Justin Michael King Portfolio               ║
    ║                  ML/AI Data Operator                     ║
    ║                                                          ║
    ║  Thanks for checking out the console!                   ║
    ║  Feel free to reach out if you'd like to collaborate.   ║
    ║                                                          ║
    ║  GitHub: https://github.com/Justin-MKing                ║
    ║  Email: justinking90@gmail.com                          ║
    ╚══════════════════════════════════════════════════════════╝
    `);
});