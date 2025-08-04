
        document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var loader = document.querySelector(".loader-wrapper");
        loader.style.opacity = "0";
        setTimeout(function() {
            loader.style.display = "none";
            // Panggil fungsi untuk memuat video setelah loader hilang
            loadVideoWithProgress();
            loadProfileVideoWithProgress(); // Panggil fungsi untuk video profil
        }, 500); // Match this with the transition duration in CSS
    }, 2000); // 2 seconds
});

const video = document.getElementById('profileVideo');
const profileImage = document.getElementById('profileImage');
const profileVideoContainer = document.querySelector('.profile-video-container');
const backgroundVideoContainer = document.getElementById('background-video-container');
const volumeButton = document.getElementById('volume-toggle');
const volumeIcon = volumeButton.querySelector('i');
const body = document.body;
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

let isVideoBackground = false;

profileVideoContainer.addEventListener('click', () => {
    if (isVideoBackground) {
        // Move video back to profile
        video.classList.remove('background-video');
        video.classList.add('profile-pic');
        profileImage.style.display = 'none';
        volumeButton.style.display = 'flex';
        isVideoBackground = false;
    } else {
        // Move video to background
        video.classList.remove('profile-pic');
        video.classList.add('background-video');
        profileImage.style.display = 'block';
        volumeButton.style.display = 'none';
        isVideoBackground = true;
    }
});

volumeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    // Mengganti status muted pada video
    video.muted = !video.muted;

    // Mengganti ikon berdasarkan status muted
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

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Ganti ikon hamburger dengan ikon close (X)
    const icon = navToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Logic for video download progress for "My Video"
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
                videoDownloadProgress.style.display = 'none'; // Hide progress after download
            }
        });

        const blob = await new Response(stream).blob();
        myVideoPlayer.src = URL.createObjectURL(blob);
        myVideoPlayer.load(); // Start loading the video data into the player
        // myVideoPlayer.play(); // Uncomment if you want it to play automatically after download
    } catch (error) {
        console.error('Error loading video:', error);
        videoDownloadProgress.innerHTML = '<p style="color: red;">Gagal memuat video. Coba refresh halaman.</p>';
    }
}

// Logic for video download progress for "Profile Video"
const profileVideoLoader = document.getElementById('profile-video-loader');
const profileDownloadPercentage = document.getElementById('profile-download-percentage');
const profileVideoUrl = 'https://files.catbox.moe/yu891i.mp4'; // URL video profil Anda

async function loadProfileVideoWithProgress() {
    try {
        profileVideoLoader.style.display = 'flex'; // Show loader
        const response = await fetch(profileVideoUrl);
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
                        profileDownloadPercentage.textContent = `${percent}%`;
                    }
                    controller.enqueue(value);
                }
                controller.close();
                profileVideoLoader.style.display = 'none'; // Hide loader after download
            }
        });

        const blob = await new Response(stream).blob();
        video.src = URL.createObjectURL(blob);
        video.load(); // Start loading the video data into the player
        // video.play(); // It has autoplay attribute, so it should play automatically
    } catch (error) {
        console.error('Error loading profile video:', error);
        profileVideoLoader.innerHTML = '<p style="color: red;">Gagal memuat video profil.</p>';
    }
}

// Clock function
function updateClock() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(now.getFullYear()).slice(-2); // Get last two digits of year
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-date').textContent = dateTimeString;
}

// Update clock every second
setInterval(updateClock, 1000);

// Initial call to display clock immediately
updateClock();
    