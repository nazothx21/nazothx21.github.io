document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var loader = document.querySelector(".loader-wrapper");
        loader.style.opacity = "0";
        setTimeout(function() {
            loader.style.display = "none";
            loadVideoWithProgress();
        }, 500);
    }, 2000);
});

const video = document.getElementById('profileVideo');
const profileImage = document.getElementById('profileImage');
const profileVideoContainer = document.querySelector('.profile-video-container');
const volumeButton = document.getElementById('volume-toggle');
const volumeIcon = volumeButton.querySelector('i');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

let isVideoBackground = false;

profileVideoContainer.addEventListener('click', () => {
    if (isVideoBackground) {
        video.classList.remove('background-video');
        video.classList.add('profile-pic');
        profileImage.style.display = 'none';
        volumeButton.style.display = 'flex';
        isVideoBackground = false;
    } else {
        video.classList.remove('profile-pic');
        video.classList.add('background-video');
        profileImage.style.display = 'block';
        volumeButton.style.display = 'none';
        isVideoBackground = true;
    }
});

volumeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;

    if (video.muted) {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
        searchInput.value = '';
    }
});

const myVideoPlayer = document.getElementById('myVideoPlayer');
const videoDownloadProgress = document.getElementById('video-download-progress');
const downloadPercentage = document.getElementById('download-percentage');
const videoUrl = 'https://files.catbox.moe/uwth3h.mp4';

async function loadVideoWithProgress() {
    try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentLength = response.headers.get('content-length');
        let loaded = 0;

        const reader = response.body.getReader();
        const stream = new ReadableStream({
            async start(controller) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    loaded += value.byteLength;
                    if (contentLength) {
                        const percent = Math.round((loaded / contentLength) * 100);
                        downloadPercentage.textContent = `${percent}%`;
                    }
                    controller.enqueue(value);
                }
                controller.close();
                videoDownloadProgress.style.display = 'none';
            }
        });

        const blob = await new Response(stream).blob();
        myVideoPlayer.src = URL.createObjectURL(blob);
        myVideoPlayer.load();
    } catch (error) {
        console.error('Error loading video:', error);
        videoDownloadProgress.innerHTML = '<p style="color: red;">Gagal memuat video. Coba refresh halaman.</p>';
    }
}

const profileVideoUrl = 'https://files.catbox.moe/yu891i.mp4';
video.src = profileVideoUrl;

function updateClock() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-date').textContent = dateTimeString;

    // Greeting logic
    const greetingElement = document.getElementById('greeting');
    const currentHour = now.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greetingElement.textContent = 'Selamat Pagi';
    } else if (currentHour >= 12 && currentHour < 15) {
        greetingElement.textContent = 'Selamat Siang';
    } else if (currentHour >= 15 && currentHour < 18) {
        greetingElement.textContent = 'Selamat Sore';
    } else {
        greetingElement.textContent = 'Selamat Malam';
    }
}

setInterval(updateClock, 1000);

updateClock();

// Calculator Logic
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#calculator .btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(display.value.replace(/[^0-9+\-*/.]/g, ''));
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            display.value += value;
        }
    });
});