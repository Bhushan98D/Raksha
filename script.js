// Music Control
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        isMusicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Music autoplay blocked'));
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        isMusicPlaying = true;
    }
});

// Photo Upload Functionality
const photoArea = document.getElementById('photoArea');
const photoUpload = document.getElementById('photoUpload');

photoArea.addEventListener('click', () => {
    photoUpload.click();
});

photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoArea.innerHTML = `<img src="${e.target.result}" alt="Our Photo">`;
            photoArea.style.border = 'none';
            
            // Add fade-in animation
            const img = photoArea.querySelector('img');
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
        };
        reader.readAsDataURL(file);
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-rakhi, .floating-flower, .floating-star, .floating-heart');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Typing Effect for Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const titleElement = document.querySelector('.sister-name');
    const originalText = titleElement.textContent;
    setTimeout(() => {
        typeWriter(titleElement, originalText, 150);
    }, 1000);
});

// Heart Beat Animation on Hover
document.querySelectorAll('.heart-animation').forEach(heart => {
    heart.addEventListener('mouseenter', () => {
        heart.style.animation = 'heartBeat 0.5s ease-in-out';
    });
    
    heart.addEventListener('mouseleave', () => {
        heart.style.animation = 'heartBeat 1.5s ease-in-out infinite';
    });
});

// Message Card Hover Effects
document.querySelectorAll('.message-card, .message-box, .quote-card, .thank-you-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Rakhi Decoration Click Effect
document.querySelectorAll('.rakhi-decoration').forEach(rakhi => {
    rakhi.addEventListener('click', () => {
        rakhi.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            rakhi.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
});

// Diya Flicker Effect
const diya = document.querySelector('.diya-decoration');
if (diya) {
    setInterval(() => {
        diya.style.opacity = Math.random() * 0.3 + 0.7;
    }, 200);
}

// Background Music Volume Control
bgMusic.volume = 0.3;

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Confetti Effect on Special Moments
function createConfetti() {
    const colors = ['#ff6b9d', '#ff8e53', '#ffd700', '#ffb6c1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
    }
}

// Trigger confetti on special interactions
document.querySelector('.sister-name').addEventListener('click', createConfetti);
document.querySelector('.thank-you-card').addEventListener('click', createConfetti);

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.querySelectorAll('.message-card, .message-box, .quote-card, .thank-you-card').forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Performance optimization - throttle scroll events
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-rakhi, .floating-flower, .floating-star, .floating-heart');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

console.log('🎀 Happy Raksha Bandhan Gayatri! 💕'); 