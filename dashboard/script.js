document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const pageContent = document.querySelector('.page-content');

    if (menuToggle && mainNav && pageContent) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active');
            pageContent.classList.toggle('is-blurred');
        });
    }
});
