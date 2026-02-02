// ===================================
// MODERN DEVELOPER PORTFOLIO
// Interactive JavaScript
// ===================================

// ===== Matrix Rain Effect =====
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== Navigation =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.animateToggle();
        });
        
        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.resetToggle();
            });
        });
        
        // Smooth scroll with offset
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    animateToggle() {
        const spans = this.mobileToggle.querySelectorAll('span');
        if (this.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            this.resetToggle();
        }
    }
    
    resetToggle() {
        const spans = this.mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ===== Typing Animation =====
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.charIndex = 0;
        
        this.type();
    }
    
    type() {
        if (this.charIndex < this.text.length) {
            this.element.textContent = this.text.substring(0, this.charIndex + 1);
            this.charIndex++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.element.style.borderRight = 'none';
        }
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-card');
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.classList.add('fade-in');
        });
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ===== Skill Progress Animation =====
class SkillProgressAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
}

// ===== Particle Cursor Effect =====
class ParticleCursor {
    constructor() {
        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            if (this.particles.length < this.maxParticles && Math.random() > 0.8) {
                this.createParticle(e.clientX, e.clientY);
            }
        });
        
        this.animate();
    }
    
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = '#00ff41';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.opacity = '1';
        particle.style.transition = 'all 0.5s ease';
        
        document.body.appendChild(particle);
        
        this.particles.push({
            element: particle,
            life: 1
        });
        
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 10);
    }
    
    animate() {
        this.particles = this.particles.filter(particle => {
            particle.life -= 0.02;
            if (particle.life <= 0) {
                particle.element.remove();
                return false;
            }
            return true;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== Stats Counter Animation =====
class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    
                    // Only animate if it's a number
                    if (!isNaN(parseFloat(text))) {
                        this.animateNumber(target, parseFloat(text));
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        this.statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateNumber(element, target) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const stepDuration = duration / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, stepDuration);
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    new MatrixRain();
    
    // Initialize Navigation
    new Navigation();
    
    // Initialize Typing Animation
    const roleText = document.getElementById('roleText');
    if (roleText) {
        const text = roleText.textContent;
        roleText.textContent = '';
        setTimeout(() => {
            new TypingAnimation(roleText, text, 80);
        }, 1500);
    }
    
    // Initialize Scroll Animations
    new ScrollAnimations();
    
    // Initialize Skill Progress Animation
    new SkillProgressAnimation();
    
    // Initialize Particle Cursor (optional - can be disabled for performance)
    // new ParticleCursor();
    
    // Initialize Stats Counter
    new StatsCounter();
    
    // Add active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Accessibility Enhancements =====
// Add keyboard navigation support
document.querySelectorAll('.cta-button, .contact-card').forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, fellow developer!', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? I like your style! 🚀', 'color: #00d9ff; font-size: 14px;');
console.log('%cLet\'s connect: dhivakar084@gmail.com', 'color: #b967ff; font-size: 12px;');
