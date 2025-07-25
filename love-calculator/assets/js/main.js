// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mendapatkan Elemen-Elemen DOM ---
    const maleNameInput = document.getElementById('male-name');
    const maleDobInput = document.getElementById('male-dob');
    const femaleNameInput = document.getElementById('female-name');
    const femaleDobInput = document.getElementById('female-dob');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');

    const lovePercentageDisplay = document.getElementById('love-percentage');
    const resultDescription = document.getElementById('result-description');
    const loveChartCanvas = document.getElementById('love-chart');
    let loveChart; // Variabel untuk menyimpan instance Chart.js

    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    const shareFacebookBtn = document.getElementById('share-facebook');

    const historySection = document.getElementById('history-section');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    const themeSwitch = document.getElementById('checkbox');
    const body = document.body;

    const backgroundMusic = document.getElementById('background-music');
    const musicToggleButton = document.getElementById('music-toggle-btn');
    const musicIcon = musicToggleButton.querySelector('i');

    // --- Sound Effects (Opsional) ---
    const clickSound = new Audio('assets/sounds/click.mp3'); // Pastikan ada file sounds/click.mp3
    const resultSound = new Audio('assets/sounds/chime.mp3'); // Pastikan ada file sounds/chime.mp3
    // ... kode yang sudah ada ...

    // Tambahkan ini untuk overlay
    const openAboutOverlayLink = document.getElementById('open-about-overlay-link');
    const aboutOverlay = document.getElementById('about-overlay');
    const closeAboutOverlayBtn = document.getElementById('close-about-overlay-btn');
    const mainContentContainer = document.querySelector('.container'); // Kontainer utama yang akan diblur

    // Pastikan ID contact-btn ada di dalam overlay sekarang, bukan di halaman about terpisah
    const contactBtn = document.getElementById('contact-btn'); // Ini akan mengambil tombol di dalam overlay
    
   const shootingStarsContainer = document.querySelector('.shooting-stars-container');
    let starInterval; // Untuk menyimpan referensi interval bintang

    // Konfigurasi bintang jatuh
    const STAR_COUNT = 20; // Jumlah bintang yang akan muncul secara bersamaan/berurutan
    const STAR_DURATION_MIN = 5; // Durasi animasi bintang min (detik)
    const STAR_DURATION_MAX = 20; // Durasi animasi bintang max (detik)
    const STAR_DELAY_MIN = 1; // Jeda antar bintang min (detik)
    const STAR_DELAY_MAX = 2; // Jeda antar bintang max (detik)


    // Fungsi untuk memutar suara
    function playSound(audioElement) {
        if (audioElement) {
            audioElement.play().catch(e => console.error("Error playing sound:", e));
        }
    }


    function initializeApp() {
        // Load theme preference from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeSwitch.checked = true;
            startShootingStars();
        } else {
            body.classList.remove('dark-mode');
            themeSwitch.checked = false;
            stopShootingStars()
        }

        // --- Inisialisasi Musik ---
        const savedMusicState = localStorage.getItem('backgroundMusicEnabled');
        if (savedMusicState === null || savedMusicState === 'true') {
            // Jika belum ada preferensi atau preferensi adalah 'true' (default: aktif)
            // Mengatasi Autoplay Policy: Browser modern sering memblokir autoplay.
            // Kita akan mencoba memutar, tapi mungkin perlu interaksi pengguna pertama.
            // Kita set muted dulu agar tidak ada suara tiba-tiba, lalu atur state.
            backgroundMusic.muted = false; // Asumsikan aktif secara default
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-music');
            backgroundMusic.volume = 0.7; // Atur volume default (0.0 - 1.0)
            // Coba play. Play() mengembalikan Promise yang bisa kita tangkap
            backgroundMusic.play().catch(e => {
                console.warn("Autoplay was prevented. User interaction needed to play music.", e);
                // Jika autoplay diblokir, kita bisa menunggu interaksi pengguna
                // Atau, untuk kasus ini, biarkan saja muted jika tidak bisa play
                // atau tampilkan indikator bahwa musik perlu diaktifkan manual.
                // Untuk kesederhanaan, kita biarkan saja dan user bisa klik tombolnya.
            });
        } else {
            // Jika preferensi adalah 'false', matikan musik dan ubah ikon
            backgroundMusic.muted = true;
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-volume-mute');
        }


        // Load and display history
        loadHistory();

        // Set max date for date pickers to today
        const today = new Date().toISOString().split('T')[0];
        maleDobInput.setAttribute('max', today);
        femaleDobInput.setAttribute('max', today);

               if (themeSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            startShootingStars(); // Mulai bintang saat beralih ke dark mode
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            stopShootingStars(); // Hentikan bintang saat beralih ke light mode
        }
    }

    // --- 3. Fungsi Validasi Input ---
    function validateInput(inputElement, errorMessageId) {
        const errorSpan = document.getElementById(errorMessageId);
        if (inputElement.value.trim() === '') {
            errorSpan.textContent = 'Mohon isi bidang ini.';
            errorSpan.classList.add('active');
            // GSAP shake animation for error
            gsap.to(inputElement, { x: 0, duration: 0.1, ease: "power1.out", overwrite: true, onComplete: () => {
                gsap.fromTo(inputElement, {x: -5}, {x: 5, repeat: 3, yoyo: true, duration: 0.05, ease: "power1.inOut"});
            }});
            return false;
        } else if (inputElement.type === 'text' && !isValidName(inputElement.value)) {
            errorSpan.textContent = 'Nama hanya boleh mengandung huruf dan spasi.';
            errorSpan.classList.add('active');
            gsap.to(inputElement, { x: 0, duration: 0.1, ease: "power1.out", overwrite: true, onComplete: () => {
                gsap.fromTo(inputElement, {x: -5}, {x: 5, repeat: 3, yoyo: true, duration: 0.05, ease: "power1.inOut"});
            }});
            return false;
        } else if (inputElement.type === 'date' && !isValidDate(inputElement.value)) {
            errorSpan.textContent = 'Format tanggal tidak valid (YYYY-MM-DD).';
            errorSpan.classList.add('active');
            gsap.to(inputElement, { x: 0, duration: 0.1, ease: "power1.out", overwrite: true, onComplete: () => {
                gsap.fromTo(inputElement, {x: -5}, {x: 5, repeat: 3, yoyo: true, duration: 0.05, ease: "power1.inOut"});
            }});
            return false;
        } else {
            errorSpan.textContent = '';
            errorSpan.classList.remove('active');
            return true;
        }
    }

    function clearError(inputElement, errorMessageId) {
        const errorSpan = document.getElementById(errorMessageId);
        errorSpan.textContent = '';
        errorSpan.classList.remove('active');
    }

    // Attach input event listeners for real-time validation feedback
    maleNameInput.addEventListener('input', () => clearError(maleNameInput, 'male-name-error'));
    maleDobInput.addEventListener('input', () => clearError(maleDobInput, 'male-dob-error'));
    femaleNameInput.addEventListener('input', () => clearError(femaleNameInput, 'female-name-error'));
    femaleDobInput.addEventListener('input', () => clearError(femaleDobInput, 'female-dob-error'));

    // --- 4. Fungsi Perhitungan Kecocokan Utama ---
    function calculateOverallMatch(name1, dob1, name2, dob2) {
        let totalScore = 0;
        let factorCount = 0;

        // Faktor 1: Numerologi
        const numScore = calculateNumerology(name1, name2);
        totalScore += numScore * 0.4; // Bobot 40%
        factorCount += 0.4;

        // Faktor 2: Zodiak
        const zodiac1 = getZodiacSign(dob1);
        const zodiac2 = getZodiacSign(dob2);
        const zodiacScore = calculateZodiacCompatibility(zodiac1, zodiac2);
        totalScore += zodiacScore * 0.3; // Bobot 30%
        factorCount += 0.3;

        // Faktor 3: Selisih Usia
        const ageScore = calculateAgeCompatibility(dob1, dob2);
        totalScore += ageScore * 0.2; // Bobot 20%
        factorCount += 0.2;

        // Faktor 4: Randomizer dengan Bobot
        // Randomizer menambahkan variasi, tapi tetap dipengaruhi skor lainnya
        const baseRandom = Math.random() * 100; // 0-100
        // Jadikan randomizer memiliki bobot lebih rendah, dan cenderung mendekati totalScore
        const randomWeighted = (baseRandom * 0.1) + (totalScore / factorCount * 0.9);
        totalScore += randomWeighted * 0.1; // Bobot 10%
        factorCount += 0.1;


        let finalPercentage = Math.round(totalScore / factorCount);

        // Pastikan hasil tidak kurang dari 30% untuk menjaga semangat
        if (finalPercentage < 30) {
            finalPercentage += (30 - finalPercentage) / 2; // Naikkan sedikit agar tidak terlalu rendah
        }
        if (finalPercentage > 100) finalPercentage = 100; // Pastikan tidak lebih dari 100

        // Deskripsi hasil berdasarkan persentase
        const description = getLoveDescription(finalPercentage, zodiac1, zodiac2);

        return { percentage: Math.round(finalPercentage), description: description };
    }

    // Fungsi untuk mendapatkan deskripsi berdasarkan persentase
    function getLoveDescription(percentage, zodiac1, zodiac2) {
        let desc = "";
        if (percentage >= 85) {
            desc = "Selamat! Kalian adalah pasangan yang sangat serasi. Ikatan kalian kuat dan penuh kebahagiaan. Terus jaga percikan cinta ini!";
            triggerConfetti(); // Trigger confetti for high scores
        } else if (percentage >= 70) {
            desc = "Kecocokan yang luar biasa! Kalian memiliki banyak kesamaan dan saling mendukung. Potensi hubungan jangka panjang yang harmonis sangat besar.";
        } else if (percentage >= 50) {
            desc = "Cukup cocok! Ada dasar yang baik untuk hubungan kalian. Dengan komunikasi yang terbuka dan saling pengertian, kalian bisa menjadi lebih kuat.";
        } else if (percentage >= 30) {
            desc = "Hubungan kalian memiliki tantangan unik. Namun, dengan usaha ekstra, kesabaran, dan kemauan untuk berkompromi, kalian bisa mengatasi perbedaan.";
        } else {
            desc = "Setiap hubungan butuh perjuangan, dan kalian memiliki kesempatan untuk membangun fondasi yang lebih kuat. Cinta sejati seringkali ditemukan dalam proses belajar dan tumbuh bersama.";
        }

        const zodiacCompDesc = getZodiacCompatibilityDescription(zodiac1, zodiac2);
        if (zodiacCompDesc) {
            desc += ` ${zodiacCompDesc}`;
        }
        return desc;
    }


    // --- 5. Event Listener untuk Tombol "Hitung Kecocokan" ---
    calculateBtn.addEventListener('click', () => {
        playSound(clickSound); // Play click sound

        // Clear previous error messages
        clearError(maleNameInput, 'male-name-error');
        clearError(maleDobInput, 'male-dob-error');
        clearError(femaleNameInput, 'female-name-error');
        clearError(femaleDobInput, 'female-dob-error');

        // Validate all inputs
        const isMaleNameValid = validateInput(maleNameInput, 'male-name-error');
        const isMaleDobValid = validateInput(maleDobInput, 'male-dob-error');
        const isFemaleNameValid = validateInput(femaleNameInput, 'female-name-error');
        const isFemaleDobValid = validateInput(femaleDobInput, 'female-dob-error');

        if (!isMaleNameValid || !isMaleDobValid || !isFemaleNameValid || !isFemaleDobValid) {
            return; // Hentikan proses jika ada input yang tidak valid
        }

        const maleName = maleNameInput.value;
        const maleDob = maleDobInput.value; // Format YYYY-MM-DD
        const femaleName = femaleNameInput.value;
        const femaleDob = femaleDobInput.value; // Format YYYY-MM-DD

        // Tampilkan loading section
        gsap.to(inputSection, { opacity: 0, duration: 0.5, onComplete: () => {
            inputSection.classList.add('hidden');
            loadingSection.classList.remove('hidden');
            gsap.fromTo(loadingSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });
        }});

        // Simulasi delay perhitungan
        setTimeout(() => {
            const { percentage, description } = calculateOverallMatch(maleName, maleDob, femaleName, femaleDob);

            // Tampilkan hasil
            lovePercentageDisplay.textContent = '0%'; // Reset for animation
            resultDescription.textContent = description;

            // Animasi angka persentase
            gsap.to(lovePercentageDisplay, {
                duration: 1.5,
                innerText: percentage,
                snap: "innerText",
                ease: "power2.out",
                onComplete: () => {
                    playSound(resultSound); // Play result sound after number animation
                    // Animasi confetti jika persentase tinggi sudah dihandle di getLoveDescription
                }
            });

            // Update Chart.js
            updateChart(percentage);

            // Sembunyikan loading, tampilkan result
            gsap.to(loadingSection, { opacity: 0, duration: 0.5, onComplete: () => {
                loadingSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
                gsap.fromTo(resultSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });
                shareWhatsappBtn.style.display = 'inline-flex'; // Pastikan tombol share terlihat
                shareFacebookBtn.style.display = 'inline-flex';
            }});

            // Simpan ke riwayat
            saveHistoryItem({
                maleName,
                maleDob,
                femaleName,
                femaleDob,
                percentage,
                date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
            });
            loadHistory(); // Reload history after saving
        }, 2000); // Simulasi delay 2 detik
    });

    // --- 6. Event Listener untuk Tombol "Hitung Ulang" ---
    resetBtn.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        gsap.to(resultSection, { opacity: 0, duration: 0.5, onComplete: () => {
            resultSection.classList.add('hidden');
            inputSection.classList.remove('hidden');
            gsap.fromTo(inputSection, { opacity: 0 }, { opacity: 1, duration: 0.5 });

            // Clear inputs
            maleNameInput.value = '';
            maleDobInput.value = '';
            femaleNameInput.value = '';
            femaleDobInput.value = '';

            // Clear errors
            clearError(maleNameInput, 'male-name-error');
            clearError(maleDobInput, 'male-dob-error');
            clearError(femaleNameInput, 'female-name-error');
            clearError(femaleDobInput, 'female-dob-error');

            // Reset chart (opsional, bisa juga dibuat ulang saat hasil baru)
            if (loveChart) {
                loveChart.destroy();
                loveChart = null;
            }
        }});
    });


    // --- 7. Inisialisasi Chart.js ---
    function initChart(percentage) {
        const ctx = loveChartCanvas.getContext('2d');
        if (loveChart) {
            loveChart.destroy(); // Hancurkan instance chart yang lama jika ada
        }
        loveChart = new Chart(ctx, {
            type: 'pie', // Atau 'doughnut' untuk tampilan lebih menarik
            data: {
                labels: ['Kecocokan', 'Perbedaan'],
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [
                        'rgba(233, 30, 99, 0.8)', // Pink for match
                        'rgba(108, 117, 125, 0.6)' // Grey for difference
                    ],
                    borderColor: [
                        'rgba(233, 30, 99, 1)',
                        'rgba(108, 117, 125, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: body.classList.contains('dark-mode') ? '#f7fafc' : '#333' // Dynamic color
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                            }
                        }
                    }
                },
                cutout: '60%', // Membuat pie chart menjadi doughnut chart
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }

    // Fungsi untuk mengupdate chart yang sudah ada
    function updateChart(percentage) {
        if (!loveChart) {
            initChart(percentage);
        } else {
            loveChart.data.datasets[0].data = [percentage, 100 - percentage];
            loveChart.options.plugins.legend.labels.color = body.classList.contains('dark-mode') ? '#f7fafc' : '#333';
            loveChart.update();
        }
    }


    // --- 8. Fitur Dark/Light Mode ---
    themeSwitch.addEventListener('change', () => {
        playSound(clickSound); // Play click sound
        if (themeSwitch.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            startShootingStars();
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            stopShootingStars();
        }
        // Update chart colors if chart exists
        if (loveChart) {
            updateChart(loveChart.data.datasets[0].data[0]);
        }
    });

    // --- 9. Fitur Share (WhatsApp & Facebook) ---
    shareWhatsappBtn.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        const maleName = maleNameInput.value;
        const femaleName = femaleNameInput.value;
        const percentage = lovePercentageDisplay.textContent;
        const message = `🎉 Wow! Kecocokan ${maleName} & ${femaleName} adalah ${percentage} dengan Kalkulator Cinta Sejati! Cek kecocokanmu juga di sini: ${window.location.href}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    shareFacebookBtn.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        const maleName = maleNameInput.value;
        const femaleName = femaleNameInput.value;
        const percentage = lovePercentageDisplay.textContent;
        const message = `🎉 Wow! Kecocokan ${maleName} & ${femaleName} adalah ${percentage} dengan Kalkulator Cinta Sejati!`;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
        window.open(facebookShareUrl, '_blank');
    });

    // --- 10. Fitur Riwayat Perhitungan ---
    function loadHistory() {
        const history = getHistory(); // Fungsi getHistory dari storage.js
        historyList.innerHTML = ''; // Bersihkan daftar yang ada

        if (history.length === 0) {
            historyList.innerHTML = '<li class="empty-history-message">Belum ada riwayat perhitungan.</li>';
            clearHistoryBtn.classList.add('hidden');
            return;
        } else {
            clearHistoryBtn.classList.remove('hidden');
        }

        history.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.maleName} & ${item.femaleName}</span>
                <span><i class="fas fa-heart"></i> ${item.percentage}%</span>
                <span class="date">${item.date}</span>
                <button class="delete-history-item" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
            `;
            historyList.appendChild(li);
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-history-item').forEach(button => {
            button.addEventListener('click', (event) => {
                playSound(clickSound); // Play click sound
                const indexToDelete = parseInt(event.target.closest('button').dataset.index);
                deleteHistoryItem(indexToDelete); // Fungsi deleteHistoryItem dari storage.js
                loadHistory(); // Reload history after deletion
            });
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        playSound(clickSound); // Play click sound
        if (confirm('Apakah Anda yakin ingin menghapus semua riwayat perhitungan?')) {
            clearHistory(); // Fungsi clearHistory dari storage.js
            loadHistory(); // Reload history (akan menampilkan pesan kosong)
        }
    });

    // --- 11. Efek Confetti (Menggunakan Library canvas-confetti) ---
    // Pastikan Mas Tyo sudah menginstal atau menyertakan script canvas-confetti
    // Misalnya, tambahkan script ini di index.html (setelah GSAP dan Chart.js):
    // <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
    function triggerConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            console.warn("canvas-confetti library not loaded. Confetti effect will not play.");
        }
    }


    // --- Panggil Fungsi Inisialisasi Saat DOM Selesai Dimuat ---
// ... kode yang sudah ada ...

    // --- 12. Fitur Kontrol Musik Background ---
    musicToggleButton.addEventListener('click', () => {
        playSound(clickSound); // Play click sound untuk feedback

        if (backgroundMusic.muted) {
            // Jika musik sedang mute, unmute dan play
            backgroundMusic.muted = false;
            musicIcon.classList.remove('fa-volume-mute');
            musicIcon.classList.add('fa-music');
            localStorage.setItem('backgroundMusicEnabled', 'true');
            // Coba play lagi, mungkin sebelumnya diblokir autoplay
            backgroundMusic.play().catch(e => {
                console.error("Failed to play music after user interaction:", e);
            });
        } else {
            // Jika musik sedang play, mute
            backgroundMusic.muted = true;
            musicIcon.classList.remove('fa-music');
            musicIcon.classList.add('fa-volume-mute');
            localStorage.setItem('backgroundMusicEnabled', 'false');
        }
    });

        function openAboutOverlay() {
        playSound(clickSound); // Efek suara saat membuka

        // Tampilkan overlay
        aboutOverlay.classList.add('visible');
        aboutOverlay.classList.remove('hidden'); // Memastikan transisi opacity bekerja

        // Tambahkan efek blur pada konten utama
        mainContentContainer.classList.add('blur-effect'); // Blur pada kontainer utama
        body.style.overflow = 'hidden'; // Mencegah scrolling halaman utama

        // Fokus pada tombol tutup untuk aksesibilitas (opsional)
        closeAboutOverlayBtn.focus();
    }

    function closeAboutOverlay() {
        playSound(clickSound); // Efek suara saat menutup

        // Sembunyikan overlay
        aboutOverlay.classList.remove('visible');
        // Gunakan timeout agar transisi opacity selesai sebelum display: none
        setTimeout(() => {
            aboutOverlay.classList.add('hidden');
        }, 400); // Sesuaikan dengan durasi transisi CSS (0.4s)

        // Hapus efek blur dan aktifkan scrolling kembali
        mainContentContainer.classList.remove('blur-effect');
        body.style.overflow = ''; // Mengizinkan scrolling kembali
    }

    // --- 13. Event Listeners untuk About Overlay ---
    openAboutOverlayLink.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah link pindah halaman
        openAboutOverlay();
    });

    closeAboutOverlayBtn.addEventListener('click', () => {
        closeAboutOverlay();
    });

    // Menutup overlay saat mengklik area di luar konten overlay
    aboutOverlay.addEventListener('click', (event) => {
        if (event.target === aboutOverlay) { // Hanya jika klik tepat di background overlay
            closeAboutOverlay();
        }
    });

    // Menutup overlay saat tombol ESC ditekan
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && aboutOverlay.classList.contains('visible')) {
            closeAboutOverlay();
        }
    });

    // --- 14. Event Listener untuk Tombol Kontak di Overlay ---
    // Pindahkan logika mailto dari about.html ke main.js
    contactBtn.addEventListener('click', function() {
        playSound(clickSound); // Efek suara
        window.location.href = 'mailto:grateoalfando@gmail.com?subject=Pertanyaan dari Aplikasi Kalkulator Cinta';
    });



     function createShootingStar() {
        // Hanya buat bintang jika dalam mode gelap
        if (!body.classList.contains('dark-mode')) {
            return;
        }

        const star = document.createElement('div');
        star.classList.add('shooting-star');
        shootingStarsContainer.appendChild(star);

        // Posisi awal bintang (di luar layar atas-kiri, dengan variasi)
        const startX = Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.5; // Dari -0.5x hingga 1.5x lebar layar
        const startY = Math.random() * window.innerHeight * 0.2 - window.innerHeight * 0.1; // Dari -0.1x hingga 0.2x tinggi layar

        // Posisi akhir bintang (di luar layar bawah-kanan, dengan variasi)
        const endX = startX + window.innerWidth * (0.5 + Math.random()); // Bergerak ke kanan bawah
        const endY = startY + window.innerHeight * (0.8 + Math.random() * 0.5); // Bergerak ke kanan bawah

        // Rotasi bintang (agar terlihat jatuh miring)
        const rotation = 45 + (Math.random() * 30 - 15); // Antara 30 hingga 60 derajat

        // Durasi animasi
        const duration = getRandomNumber(STAR_DURATION_MIN, STAR_DURATION_MAX);

        // Atur posisi awal dan rotasi
        gsap.set(star, {
            x: startX,
            y: startY,
            rotation: rotation,
            opacity: 1 // Buat terlihat saat mulai animasi
        });

        // Animasi pergerakan bintang menggunakan GSAP
        gsap.to(star, {
            x: endX,
            y: endY,
            opacity: 0, // Memudar saat bergerak
            duration: duration,
            ease: "power1.in", // Kurva yang mempercepat di awal dan melambat di akhir
            onComplete: () => {
                star.remove(); // Hapus elemen bintang setelah animasi selesai
            }
        });
    }

    function startShootingStars() {
        // Hentikan interval sebelumnya jika ada
        stopShootingStars();

        // Hanya mulai jika dalam mode gelap
        if (body.classList.contains('dark-mode')) {
            // Panggil bintang pertama segera
            createShootingStar();

            // Atur interval untuk bintang-bintang berikutnya
            starInterval = setInterval(() => {
                createShootingStar();
            }, getRandomNumber(STAR_DELAY_MIN * 1000, STAR_DELAY_MAX * 1000)); // Konversi ke milidetik
        }
    }

    function stopShootingStars() {
        clearInterval(starInterval); // Hentikan interval
        // Hapus semua bintang yang ada di layar
        shootingStarsContainer.innerHTML = '';
    }

    // --- Panggil Fungsi Inisialisasi Saat DOM Selesai Dimuat ---
    initializeApp();
});
