document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const pageContent = document.querySelector('.page-content');
    const body = document.body;

    if (menuToggle && mainNav && pageContent) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');
            pageContent.classList.toggle('is-blurred');
            body.classList.toggle('is-blurred');
        });
    }

    // Gallery scroll functionality
    const galleryContainer = document.querySelector('#gallery-container');
    const scrollLeftButton = document.querySelector('#scroll-left');
    const scrollRightButton = document.querySelector('#scroll-right');

    if (galleryContainer && scrollLeftButton && scrollRightButton) {
        const scrollAmount = 320; // Width of one image + gap

        scrollLeftButton.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightButton.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});