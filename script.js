document.addEventListener('DOMContentLoaded', function() {

    // --- Inisialisasi Tooltip Bootstrap ---
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // --- Logika Dark Mode ---
    const darkModeToggleSidebar = document.getElementById('darkModeToggleSidebar');
    const body = document.body;

    // Fungsi untuk menerapkan tema
    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeToggleSidebar.checked = true;
        } else {
            body.classList.remove('dark');
            darkModeToggleSidebar.checked = false;
        }
    };

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Event listener untuk toggle di sidebar
    darkModeToggleSidebar.addEventListener('change', () => {
        if (darkModeToggleSidebar.checked) {
            localStorage.setItem('theme', 'dark');
            applyTheme(true);
        } else {
            localStorage.setItem('theme', 'light');
            applyTheme(false);
        }
    });

    // --- Logika Audio Howler.js ---
    const sound = new Howl({
        src: ['xiaoxiao.mp3'], // Pastikan path file benar
        loop: true,
        volume: 0.3,
        autoplay: false,
        html5: true, // Penting untuk interaksi di browser modern
        onplayerror: function() {
            // Tampilkan UI untuk meminta user memulai audio
            sound.once('unlock', function() {
                sound.play();
            });
        }
    });

    const musicControl = document.getElementById('musicControl');
    const musicIcon = musicControl.querySelector('i');
    const musicTooltip = bootstrap.Tooltip.getInstance(musicControl);

    musicControl.addEventListener('click', () => {
        if (sound.playing()) {
            sound.pause();
            musicIcon.className = 'fas fa-play';
            musicControl.setAttribute('data-bs-original-title', 'Play Music');
        } else {
            sound.play();
            musicIcon.className = 'fas fa-music';
            musicControl.setAttribute('data-bs-original-title', 'Pause Music');
        }
        // Update tooltip setelah mengubah title
        musicTooltip.hide();
        musicTooltip.show();
    });
    
    // Inisialisasi state ikon saat halaman pertama kali load
    if (sound.playing()) {
        musicIcon.className = 'fas fa-music';
        musicControl.setAttribute('data-bs-original-title', 'Pause Music');
        musicTooltip.update();
    }


    // --- Efek Tombol (tetap sama) ---
    const buttons = document.querySelectorAll('.link-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            button.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 15}deg) rotateY(${(x - 0.5) * -15}deg) translateY(-2px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'none';
        });
    });
    
    // --- Blur efek saat sidebar (offcanvas) dibuka ---
    const mainContent = document.getElementById('mainContent');
    const sidebar = document.getElementById('mySidebar');
    const infoModal = document.getElementById('infoModal');

    sidebar.addEventListener('show.bs.offcanvas', function () {
        mainContent.classList.add('blurred');
    });
    sidebar.addEventListener('hide.bs.offcanvas', function () {
        mainContent.classList.remove('blurred');
    });

    // --- Blur efek saat modal info dibuka ---
    infoModal.addEventListener('show.bs.modal', function () {
        mainContent.classList.add('blurred');
    });
    infoModal.addEventListener('hide.bs.modal', function () {
        mainContent.classList.remove('blurred');
    });

    // --- Kontrol Volume Musik ---
    const volumeControl = document.getElementById('volumeControl');
    volumeControl.addEventListener('input', function() {
        sound.volume(parseFloat(this.value));
    });

    // --- Widget: Aesthetic Clock ---
    function updateClock() {
        const clockDisplay = document.getElementById('clockDisplay');
        const dateDisplay = document.getElementById('dateDisplay');
        
        if (clockDisplay && dateDisplay) {
            const now = new Date();
            
            // Format waktu
            const time = now.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            // Format tanggal
            const date = now.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            });

            // Update displays dengan animasi
            if (clockDisplay.textContent !== time) {
                clockDisplay.classList.add('time-updated');
                setTimeout(() => clockDisplay.classList.remove('time-updated'), 300);
            }
            
            clockDisplay.textContent = time;
            dateDisplay.textContent = date;
        }
    }

    // Update setiap detik
    setInterval(updateClock, 1000);
    updateClock(); // Initial update
});


