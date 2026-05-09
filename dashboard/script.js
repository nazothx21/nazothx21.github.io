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

    // Unmute video on first interaction
    const video = document.getElementById('background-video');
    if (video) {
        const unmuteVideo = () => {
            video.muted = false;
            document.removeEventListener('click', unmuteVideo);
        };
        document.addEventListener('click', unmuteVideo);
    }

    // WhatsApp message sender
    const sendButton = document.getElementById('send-whatsapp-message');
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            const messageInput = document.getElementById('whatsapp-message');
            if (messageInput) {
                const message = encodeURIComponent(messageInput.value);
                const phoneNumber = '6285764175824';
                const url = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(url, '_blank');
            }
        });
    }
});