// ============================================
// NAZOTHX LINKTREE - MAIN SCRIPT
// ============================================

import { config } from './config.js';

// ============================================
// PARTICLES.JS CONFIGURATION
// ============================================

function initParticles() {
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
                value: ['#ff006e', '#8338ec', '#3a86ff']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8338ec',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
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
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ============================================
// SIDEBER / HAMBURGER MENU LOGIC
// ============================================

function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

// ============================================
// SOCIAL ICONS MAPPER
// ============================================

const iconMap = {
    'TikTok': 'fa-brands fa-tiktok',
    'Instagram': 'fa-brands fa-instagram',
    'YouTube': 'fa-brands fa-youtube',
    'Facebook': 'fa-brands fa-facebook',
    'Twitter': 'fa-brands fa-twitter',
    'Discord': 'fa-brands fa-discord',
    'WhatsApp': 'fa-brands fa-whatsapp',
    'Telegram': 'fa-brands fa-telegram',
    'LinkedIn': 'fa-brands fa-linkedin',
    'GitHub': 'fa-brands fa-github',
    'Website': 'fa-solid fa-globe',
    'Email': 'fa-solid fa-envelope'
};

// ============================================
// RENDER FUNCTIONS
// ============================================

/**
 * Render Profile Section
 */
function renderProfile() {
    document.getElementById('profile-name').textContent = config.profile.name;
    document.getElementById('profile-role').textContent = config.profile.role;
    
    const profileImg = document.getElementById('profile-img');
    profileImg.src = '/Asset/PP/pp1.png';
    profileImg.onerror = () => {
        profileImg.src = 'https://via.placeholder.com/120/0a0a0a/ff006e?text=N';
    };

    const socialHeader = document.getElementById('social-header');
    socialHeader.innerHTML = '';
    
    config.profile.socialHeader.forEach(social => {
        const iconClass = iconMap[social.name] || 'fa-solid fa-link';
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'social-icon';
        link.innerHTML = `<i class="${iconClass}"></i>`;
        link.title = social.name;
        link.setAttribute('aria-label', social.name);
        socialHeader.appendChild(link);
    });
}

/**
 * Render Link Cards
 */
function renderCards() {
    const container = document.getElementById('links-section');
    container.innerHTML = '';
    
    config.cards.forEach((card, index) => {
        const cardEl = document.createElement('a');
        cardEl.href = card.url;
        cardEl.target = '_blank';
        cardEl.rel = 'noopener noreferrer';
        cardEl.className = `link-card ${card.isSpecial ? 'special' : ''}`;
        
        const titleDisplay = card.specialTitle || card.title;
        
        cardEl.innerHTML = `
            <img src="${card.image}" 
                 alt="${card.title}" 
                 class="link-image" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/50/1a1a2e/ff006e?text=Link'">
            <div class="link-content">
                <div class="link-title">${titleDisplay}</div>
                <div class="link-subtitle">${card.subtitle}</div>
            </div>
            <i class="fa-solid fa-arrow-right link-arrow"></i>
        `;
        
        container.appendChild(cardEl);
    });
}

/**
 * Render Gallery in Sidebar (Pinterest Style Horizontal Scroll)
 */
function renderGallerySidebar() {
    // Set titles in sidebar
    document.getElementById('gallery-title-sidebar').innerHTML = config.gallery.title;
    document.getElementById('gallery-subtitle-sidebar').textContent = config.gallery.subtitle;
    
    // Render horizontal scroll gallery
    const scrollContainer = document.getElementById('gallery-scroll');
    scrollContainer.innerHTML = '';
    
    config.gallery.images.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-scroll-item';
        item.setAttribute('data-index', index + 1);
        
        // Create image with natural aspect ratio
        const image = document.createElement('img');
        image.src = img;
        image.alt = `Gallery ${index + 1}`;
        image.loading = 'lazy';
        
        // Error handling with placeholder
        image.onerror = function() {
            this.src = 'https://via.placeholder.com/180/1a1a2e/ff006e?text=Photo';
        };
        
        // Optional: Add load event to handle different aspect ratios gracefully
        image.onload = function() {
            // If image is very tall, limit it
            if (this.naturalHeight > this.naturalWidth * 1.5) {
                item.style.maxHeight = '280px';
            }
            // If image is very wide, adjust width
            if (this.naturalWidth > this.naturalHeight * 1.5) {
                item.style.width = '220px';
            }
        };
        
        item.appendChild(image);
        
        // Click to open
        item.onclick = () => window.open(img, '_blank');
        
        scrollContainer.appendChild(item);
    });

    // Add scroll hint with better spacing
    // Remove existing hint if any
    const existingHint = scrollContainer.parentNode.querySelector('.scroll-hint');
    if (existingHint) {
        existingHint.remove();
    }
    
    const hint = document.createElement('div');
    hint.className = 'scroll-hint';
    hint.innerHTML = '<i class="fa-solid fa-hand-pointer"></i> Geser untuk melihat lebih banyak <i class="fa-solid fa-arrow-right"></i>';
    
    // Insert after the scroll container with proper spacing
    scrollContainer.parentNode.insertBefore(hint, scrollContainer.nextSibling);

    // Render Extra Card (Top Up) in Sidebar
    const extraContainer = document.getElementById('extra-card-sidebar');
    const extra = config.gallery.extraCard;
    
    extraContainer.innerHTML = `
        <a href="${extra.url}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="link-card">
            <img src="${extra.image}" 
                 alt="${extra.title}" 
                 class="link-image" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/50/1a1a2e/ff006e?text=Top+Up'">
            <div class="link-content">
                <div class="link-title">${extra.title}</div>
                <div class="link-subtitle">${extra.subtitle}</div>
            </div>
            <i class="fa-solid fa-arrow-right link-arrow"></i>
        </a>
    `;
}

/**
 * Render Footer
 */
function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        ${config.footer.text}
        <br><br>
        
    `;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

function showError(message) {
    const loading = document.getElementById('loading');
    loading.innerHTML = `
        <div style="color: #ff006e; margin-bottom: 15px;">
            <i class="fa-solid fa-circle-exclamation fa-2x"></i>
        </div>
        <p>${message}</p>
        <button onclick="location.reload()" 
                style="margin-top: 15px; padding: 10px 20px; 
                       background: linear-gradient(45deg, #ff006e, #8338ec);
                       border: none; border-radius: 25px; color: white;
                       cursor: pointer;">
            <i class="fa-solid fa-rotate-right"></i> Refresh
        </button>
    `;
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    try {
        initParticles();
        initSidebar(); // Initialize hamburger menu
        renderProfile();
        renderCards();
        renderGallerySidebar(); // Render gallery in sidebar
        renderFooter();
        
        hideLoading();
        
        console.log('✅ NazoTHX Linktree loaded successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        showError('Error loading content. Please refresh the page.');
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.vendors.repulse();
        }
    }, 250);
});