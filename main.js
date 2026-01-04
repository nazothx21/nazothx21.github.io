// main.js
import { config } from './config.js';

const app = document.getElementById('app');

// --- Fungsi Helper untuk Membuat HTML ---
function render() {
    // 1. Render Header
    const navLinks = config.profile.socialHeader.map(link => 
        `<li><a href="${link.url}">${link.name}</a></li>`
    ).join('');

    const headerHTML = `
        <header class="main-header">
            <div class="header-title"><i>${config.profile.name}</i></div>
            <nav class="main-nav">
                <ul>${navLinks}</ul>
            </nav>
            <button class="menu-toggle" aria-label="Buka Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    `;

    // 2. Render Video Background
    const videoHTML = `
        <video autoplay muted loop id="background-video">
            <source src="${config.background.src}" type="video/mp4">
            ${config.background.fallbackText}
        </video>
    `;

    // 3. Render Kartu-Kartu (Portfolio Links)
    const cardsHTML = config.cards.map(card => `
        <a href="${card.url}" class="portfolio-card">
            <img src="${card.image}" alt="Logo ${card.title}" class="profile-pic">
            <div class="card-text">
                <span class="card-title">${card.isSpecial ? card.specialTitle : card.title}</span>
                <span class="card-subtitle">${card.subtitle}</span>
            </div>
        </a>
    `).join('');

    // 4. Render Gallery Images
    const galleryImagesHTML = config.gallery.images.map(imgSrc => 
        `<img src="${imgSrc}" alt="Galeri NazoTHX" class="fotoProyek">`
    ).join('');

    // Extra card di galeri (Gachaku)
    const extraCardHTML = `
        <a href="${config.gallery.extraCard.url}" class="portfolio-card" style="min-width: 300px;">
            <img src="${config.gallery.extraCard.image}" alt="Topup" class="profile-pic">
            <div class="card-text">
                <span class="card-title">${config.gallery.extraCard.title}</span>
                <span class="card-subtitle">${config.gallery.extraCard.subtitle}</span>
            </div>
        </a>
    `;

    // --- MENYATUKAN SEMUANYA ---
    app.innerHTML = `
        ${headerHTML}
        
        <div class="page-content">
            ${videoHTML}
            
            <main class="content-wrapper">
                <h1 class="main-heading">${config.profile.role}<p></p></h1>
                
                <div class="portfolio-links">
                    ${cardsHTML}
                </div>

                <p class="closing-text">${config.footer.text}</p>
            </main>
        </div>

        <div id="gallery-wrapper">
            <div id="gallery-container">
                ${galleryImagesHTML}
            </div>
            <button id="scroll-left" class="gallery-nav"><</button>
            <button id="scroll-right" class="gallery-nav">></button>
            
            <h2 id="gallery-title">${config.gallery.title}</h2>
            <p style="opacity: 0.7; text-align: center; margin-bottom: 1%;">${config.gallery.subtitle}</p>
            
            <div style="display:flex; justify-content:center; margin-top:10px;">
                 ${extraCardHTML}
            </div>
        </div>
    `;
}

// --- Fungsi Interaksi (Event Listeners) ---
function initInteractions() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const pageContent = document.querySelector('.page-content');
    const body = document.body;

    // Toggle Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');
            pageContent.classList.toggle('is-blurred');
            body.classList.toggle('is-blurred');
        });
    }

    // Video Unmute
    const video = document.getElementById('background-video');
    if (video) {
        const unmuteVideo = () => {
            video.muted = false;
            document.removeEventListener('click', unmuteVideo);
        };
        document.addEventListener('click', unmuteVideo);
    }

    // Gallery Scroll
    const galleryContainer = document.querySelector('#gallery-container');
    const btnLeft = document.querySelector('#scroll-left');
    const btnRight = document.querySelector('#scroll-right');

    if (galleryContainer && btnLeft && btnRight) {
        const scrollAmount = 320;
        btnLeft.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        btnRight.addEventListener('click', () => {
            galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

// --- EKSEKUSI UTAMA ---
document.addEventListener('DOMContentLoaded', () => {
    render();             // 1. Buat HTML-nya
    initInteractions();   // 2. Hidupkan interaksinya
});