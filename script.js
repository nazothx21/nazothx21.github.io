        // SIDEBAR MENU
        const sidebar = document.getElementById("mySidebar");
        const openBtn = document.getElementById("openBtn");
        const closeBtn = document.getElementById("closeBtn");

        // Buka sidebar saat tombol open diklik
        openBtn.addEventListener("click", () => {
            sidebar.style.width = "250px";
        });

        // Tutup sidebar saat tombol close diklik
        closeBtn.addEventListener("click", () => {
            sidebar.style.width = "0";
        });

        // BUTTON EFFECTS
        const buttons = document.querySelectorAll(".link-button");

        buttons.forEach(button => {
            // Efek saat hover
            button.addEventListener("mouseenter", () => {
                button.style.transform = "scale(1.05)";
                button.style.boxShadow = "0 0 20px var(--primary)";
            });

            button.addEventListener("mouseleave", () => {
                button.style.transform = "scale(1)";
                button.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)";
            });

            // Efek saat diklik
            button.addEventListener("mousedown", () => {
                button.style.transform = "scale(0.95)";
            });

            button.addEventListener("mouseup", () => {
                button.style.transform = "scale(1.05)";
            });
        });

        // DARK MODE TOGGLE
        const darkModeToggle = document.getElementById("dark-mode-toggle");
        const body = document.body;

        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            // Simpan preferensi dark mode di localStorage
            const isDarkMode = body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDarkMode);
            // Update teks tombol
            darkModeToggle.querySelector('i').className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            darkModeToggle.innerHTML = `<i class="${isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}"></i> ${isDarkMode ? 'Light Mode' : 'Dark Mode'}`;
        });

        // Cek localStorage untuk mode gelap
        const savedDarkMode = localStorage.getItem("darkMode");
        if (savedDarkMode === "true") {
            body.classList.add("dark-mode");
            // Update ikon tombol
            darkModeToggle.innerHTML = `<i class="fas fa-sun"></i> Light Mode`;
        }

        // SETTINGS BUTTON
        document.getElementById("settings-btn").addEventListener("click", () => {
            alert("Pengaturan tambahan akan dikembangkan lebih lanjut!");
        });

        // INFO BUTTON
        document.querySelector('.info-btn').addEventListener('click', () => {
            alert('NazoTHX 2025!\nJangan Lupa Follow Semua Media Sosial NazoTHX yaa ^_^');
        });

        // Animasi saat halaman dimuat
        window.addEventListener('load', () => {
            document.querySelector('.profile').classList.add('fade-in');
        });
        // script.js
// Efek khusus saat tombol donasi diklik
document.querySelector('.donate-button').addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    // Bisa tambahkan efek confetti di sini
                }, 200);
            });