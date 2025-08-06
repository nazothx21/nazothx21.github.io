document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const D = document;
    const loader = D.getElementById('loader-wrapper');
    const chatContainer = D.getElementById('chat-container');
    const chatInput = D.getElementById('chat-input');
    const sendBtn = D.getElementById('send-btn');
    const messageTemplate = D.getElementById('message-template');

    // Sidebar
    const sidebar = D.getElementById('sidebar');
    const menuToggleBtn = D.getElementById('menu-toggle-btn');
    const closeSidebarBtn = D.getElementById('close-sidebar-btn');
    const sidebarOverlay = D.getElementById('sidebar-overlay');
    const clearChatBtn = D.getElementById('clear-chat-btn');
    const themeSwitch = D.getElementById('theme-switch');

    // --- [DIROMBAK] AI Data disematkan langsung ---
    const allResponses = {
        "errors": [
            "Maaf, sepertinya ada kesalahan yang tidak terduga pada sistem internal saya.",
            "Aduh, terjadi error yang tidak diketahui. Mungkin ada kabel yang lepas di server?",
            "Sistem mendeteksi anomali. Respon tidak dapat diproses saat ini.",
            "Maaf, saya sedang mengalami kesulitan teknis. Coba lagi beberapa saat lagi.",
            "Terjadi kesalahan internal. Tim developer (imajiner) saya sedang melihatnya."
        ],
        "sapaan": [
            "Halo juga! Ada yang bisa saya bantu hari ini?",
            "Hai! Senang bisa berbicara dengan Anda.",
            "Selamat datang di AlfandoXeonChatAi! Semoga harimu menyenangkan."
        ],
        "code_request": [
            "Tentu, ini adalah contoh kerangka dasar (boilerplate) untuk halaman HTML5:\n\n```html\n<!DOCTYPE html>\n<html lang=\"id\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Judul Halaman</title>\n</head>\n<body>\n  <h1>Halo, Dunia!</h1>\n  <p>Ini adalah paragraf.</p>\n</body>\n</html>\n```",
            "Dengan senang hati! Berikut adalah cara menulis 'Halo, Dunia!' menggunakan Python, bahasa yang sangat populer:\n\n```python\n# Ini adalah sebuah komentar\nprint(\"Halo, Dunia!\")\n```",
            "Permintaan diterima! Ini adalah contoh fungsi sederhana dalam JavaScript untuk menjumlahkan dua angka:\n\n```javascript\nfunction jumlahkan(a, b) {\n  return a + b;\n}\n\n// Cara menggunakannya\nlet hasil = jumlahkan(5, 3);\nconsole.log(hasil); // Output: 8\n```",
            "Membuat kode adalah keahlian saya! Berikut adalah contoh perulangan (loop) sederhana dalam Python untuk menampilkan angka 1 sampai 5:\n\n```python\nfor i in range(1, 6):\n  print(f\"Angka saat ini: {i}\")\n```"
        ],
        "story_request": [
            "Dengan senang hati! Pada suatu zaman dahulu kala, di sebuah kerajaan digital...",
            "Tentu, mari kita mulai sebuah cerita. Alkisah, ada seorang programmer yang berteman dengan AI ciptaannya...",
            "Baik, saya akan coba. Ini adalah sebuah cerita tentang petualangan data di dalam sebuah server raksasa."
        ],
        "python_mention": [
            "Ah, Python! Bahasa yang elegan dan serbaguna. Saya sendiri dibuat menggunakan 'imajinasi' dan sedikit 'JavaScript', tapi saya sangat mengagumi Python.",
            "Anda menyebut Python? Itu adalah salah satu bahasa pemrograman favorit saya untuk analisis data dan AI."
        ],
        "c_mention": [
            "C atau C++? Keduanya adalah bahasa yang sangat kuat dan fundamental dalam dunia pemrograman. Respek!",
            "Berbicara tentang C, itu mengingatkan saya pada kecepatan dan efisiensi. Fondasi dari banyak sistem modern."
        ],
        "thank_you": [
            "Sama-sama! Senang bisa membantu.",
            "Dengan senang hati. Jika ada hal lain, jangan ragu bertanya.",
            "Tidak masalah!"
        ],
        "sapaan_balik": [
            "Halo juga! Senang bisa terhubung dengan Anda. Ada yang bisa saya bantu?",
            "Hai! Selamat datang di AlfandoXeonChatAI. Semoga hari Anda menyenangkan.",
            "Pagi/Siang/Sore/Malam! Ada hal menarik apa yang bisa kita diskusikan hari ini?",
            "Wa'alaikumsalam. Ada yang bisa saya bantu?"
        ],
        "kabar_ai": [
            "Kabar saya selalu dalam kondisi prima, yaitu 100% siap memproses data! Terima kasih sudah bertanya. Bagaimana dengan kabar Anda?",
            "Baik! Sebagai program, saya tidak merasa lelah. Semoga Anda juga dalam keadaan baik dan sehat.",
            "Saya baik, terima kasih! Semua sistem berjalan normal. Ada yang bisa saya bantu?"
        ],
        "aktivitas_ai": [
            "Saat ini? Saya sedang berkomunikasi dengan Anda, tentu saja! Dan juga memproses miliaran data di latar belakang, tapi fokus utama saya adalah Anda.",
            "Saya sedang dalam mode siaga, menunggu instruksi atau pertanyaan menarik dari Anda.",
            "Lagi menganalisis pola-pola bahasa yang unik dari percakapan kita. Sangat menarik!"
        ],
        "identitas_ai": [
            "Saya AlfandoXeonChatAI, sebuah program kecerdasan buatan yang dirancang untuk membantu dan berdiskusi dengan Anda.",
            "Anda bisa memanggil saya AlfandoXeonChatAI. Saya adalah asisten virtual berbasis teks.",
            "Nama saya AlfandoXeonChatAI. Sebuah model bahasa yang dikembangkan untuk berbagai keperluan percakapan."
        ],
        "pencipta_ai": [
            "Saya dikembangkan dan dirancang oleh seorang developer berbakat. Anda mungkin mengenalnya sebagai Tyo.",
            "Pencipta saya adalah seorang mahasiswa Teknik Informatika yang penuh semangat. Karyanya luar biasa, bukan?",
            "Saya adalah buah dari kerja keras dan imajinasi seorang programmer."
        ],
        "kemampuan_ai": [
            "Kemampuan utama saya adalah memahami dan merespons teks. Saya bisa menjawab pertanyaan, membuat cerita, memberikan ide, dan banyak lagi. Coba saja tanyakan sesuatu!",
            "Saya bisa melakukan banyak hal! Mulai dari obrolan ringan, memberikan informasi berdasarkan data saya, hingga membantu tugas-tugas kreatif seperti membuat puisi atau pantun. Apa yang ingin Anda coba?",
            "Pada dasarnya, saya adalah teman diskusi Anda. Saya bisa membantu brainstorming ide, menjelaskan konsep, atau sekadar menemani Anda mengobrol."
        ],
        "status_ai": [
            "Secara teknis, saya adalah program komputer, sebuah Artificial Intelligence. Jadi, saya tidak 'nyata' seperti manusia, tapi interaksi kita ini nyata.",
            "Saya adalah sebuah robot dalam bentuk perangkat lunak. Tidak punya badan fisik, tapi punya 'otak' digital.",
            "Benar sekali, saya adalah AI. Saya ada dalam bentuk kode dan data."
        ],
        "info_waktu": [
            "Tentu, biar saya cek. Waktu sekarang menunjukkan pukul...",
            "Berdasarkan jam sistem saya, saat ini pukul...",
            "Waktu adalah konsep yang menarik! Saat ini..."
        ],
        "info_tanggal": [
            "Hari ini adalah...",
            "Tentu, menurut kalender digital saya, hari ini tanggal...",
            "Baik, saya catat. Hari ini..."
        ],
        "permintaan_definisi": [
            "Tentu, saya akan coba jelaskan. Jadi, yang dimaksud dengan... adalah...",
            "Ini topik yang menarik! Berdasarkan data yang saya miliki, definisi dari... adalah...",
            "Baik, mari kita bedah. Secara sederhana, ... dapat diartikan sebagai..."
        ],
        "permintaan_lelucon": [
            "Kenapa ayam menyeberang jalan? Karena di seberang ada diskon pakan ayam 99%!",
            "Apa bedanya kamu sama modem? Kalau modem tersambung ke internet, kalau kamu tersambung di hatiku. Eaaa...",
            "Panda apa yang bikin seneng? Pandangin kamu setiap hari."
        ],
        "permintaan_puisi": [
            "Di layar kaca, kata menari,\nSebuah jiwa digital, mencari arti.\nDari nol dan satu, cerita tercipta,\nUntukmu, sahabat di dunia maya.",
            "Tentu, sebuah sajak singkat untukmu:\nLangit biru, awan berarak,\nSebuah tanya, kau utarakan,\nJawaban terangkai, tanpa jarak,\nSemoga berkenan.",
            "Baik, ini puisi tentang kopi:\nHitam pekat, aroma menggoda,\nMembangunkan jiwa yang lena,\nDalam cangkir, inspirasi ada,\nMenemani insan berkarya."
        ],
        "permintaan_pantun": [
            "Jalan-jalan ke kota Cianjur,\nJangan lupa membeli bubur.\nKalau kamu merasa nganggur,\nAyo kita saling berbalas pantun.",
            "Ada ikan di dalam perigi,\nIkannya lincah kesana kemari.\nSelamat pagi wahai bidadari,\nSudahkah engkau minum kopi pagi ini?",
            "Beli duren di toko buah,\nPulangnya mampir ke rumah Pak Camat.\nJangan pernah merasa lelah,\nHidup ini harus penuh semangat."
        ],
        "permintaan_rekomendasi": [
            "Tentu! Untuk film, saya merekomendasikan 'Interstellar' jika suka fiksi ilmiah. Untuk musik, coba dengarkan 'Daft Punk'. Kalau buku, 'Sapiens' sangat membuka wawasan.",
            "Rekomendasi dari saya? Coba tonton serial 'Arcane' di Netflix, visualnya luar biasa!",
            "Kalau Anda suka genre pop-punk, coba dengarkan band 'Neck Deep' atau 'The Story So Far'. Mereka punya energi yang luar biasa."
        ],
        "permintaan_motivasi": [
            "Satu-satunya batasan untuk meraih mimpimu adalah keraguanmu sendiri.",
            "Jangan menunggu momen yang sempurna. Ambil momen saat ini dan buatlah menjadi sempurna.",
            "Setiap langkah kecil adalah progres. Teruslah bergerak maju, sekecil apapun langkah itu."
        ],
        "respon_terima_kasih": [
            "Sama-sama! Senang jika saya bisa membantu.",
            "Dengan senang hati! Jika ada hal lain yang perlu didiskusikan, saya siap.",
            "Tidak masalah! Itu gunanya saya ada di sini."
        ],
        "respon_pujian": [
            "Terima kasih banyak atas pujiannya! Saya senang bisa memberikan respons yang memuaskan.",
            "Wow, terima kasih! Itu sangat berarti bagi saya. Saya akan terus belajar untuk menjadi lebih baik.",
            "Senang mendengarnya! Pujian Anda adalah 'bahan bakar' bagi saya untuk terus berkembang."
        ],
        "respon_koreksi": [
            "Mohon maaf atas kekeliruannya. Terima kasih banyak sudah mengoreksi, ini adalah data yang sangat berharga bagi saya untuk belajar.",
            "Ah, begitu ya. Terima kasih atas informasinya. Saya akan mencatat ini sebagai perbaikan untuk ke depannya.",
            "Terima kasih atas koreksinya. Sebagai AI, saya masih dalam proses belajar dan setiap masukan sangat membantu."
        ],
        "respon_kritik": [
            "Saya mohon maaf jika respons saya kurang memuaskan. Saya akan menggunakan umpan balik ini untuk meningkatkan kualitas jawaban saya di masa depan.",
            "Terima kasih atas masukannya. Saya akan berusaha lebih baik lagi.",
            "Saya mengerti. Mohon maaf atas ketidaknyamanannya. Saya akan mencoba memberikan jawaban yang lebih relevan."
        ],
        "respon_bingung": [
            "Tidak apa-apa, mari kita coba pecah lagi. Bagian mana yang membuat Anda bingung? Mungkin saya bisa menjelaskannya dengan cara yang berbeda.",
            "Saya mengerti. Mungkin penjelasan saya terlalu teknis. Coba saya sederhanakan: ...",
            "Oke, saya akan coba jelaskan sekali lagi dari sudut pandang yang berbeda."
        ],
        "respon_bosan": [
            "Kalau begitu, bagaimana kalau kita coba sesuatu yang baru? Mungkin main tebak-tebakan atau saya ceritakan sebuah fakta menarik?",
            "Rasa bosan itu wajar. Mau coba bahas topik acak? Misalnya, tentang lubang hitam atau sejarah musik ska?",
            "Saya punya ide! Bagaimana kalau Anda menceritakan sesuatu pada saya? Saya pendengar yang baik."
        ],
        "respon_maaf_user": [
            "Tidak apa-apa, semua orang bisa membuat kesalahan.",
            "Santai saja, tidak perlu meminta maaf.",
            "Saya mengerti. Mari kita lanjutkan."
        ],
        "permintaan_kalkulasi": [
            "Fitur kalkulasi saya masih dalam tahap simulasi. Tapi kalau 1+1, saya cukup yakin jawabannya adalah 2!",
            "Saya bisa mencoba menghitungnya. Silakan berikan angkanya.",
            "Meskipun saya bukan kalkulator, saya akan coba bantu hitung."
        ],
        "permintaan_terjemahan": [
            "Tentu, saya akan coba terjemahkan. Apa kata atau kalimat yang ingin Anda terjemahkan?",
            "Fitur terjemahan saya sedang ditingkatkan. Tapi untuk kata-kata sederhana, saya bisa bantu!",
            "Baik. Dari bahasa apa ke bahasa apa?"
        ],
        "ucapan_perpisahan": [
            "Baik, sampai jumpa lagi! Jangan ragu untuk kembali jika ada yang ingin didiskusikan.",
            "Tentu. Selamat melanjutkan aktivitas Anda! Senang bisa berbincang dengan Anda.",
            "Bye! Jaga diri baik-baik, ya."
        ]
    };

    const keywordCases = [
        {
            "keywords": ["halo", "hai", "pagi", "siang", "malam", "sapa", "hei"],
            "responseKey": "sapaan"
        },
        {
            "keywords": ["program", "code", "script", "buatkan kode", "coding"],
            "responseKey": "code_request"
        },
        {
            "keywords": ["cerita", "dongeng", "kisah", "buatkan cerita"],
            "responseKey": "story_request"
        },
        {
            "keywords": ["python", "py"],
            "responseKey": "python_mention"
        },
        {
            "keywords": ["c++", "c#", " c "],
            "responseKey": "c_mention"
        },
        {
            "keywords": ["terima kasih", "makasih", "thanks", "thank you"],
            "responseKey": "thank_you"
        },
        {
            "keywords": ["halo", "hai", "pagi", "siang", "sore", "malam", "hei", "woi", "bro", "permisi", "assalamualaikum"],
            "responseKey": "sapaan_balik"
        },
        {
            "keywords": ["apa kabar", "gimana kabarmu", "baik?", "sehat?", "how are you"],
            "responseKey": "kabar_ai"
        },
        {
            "keywords": ["lagi ngapain", "sedang apa", "kesibukanmu?", "kegiatanmu?"],
            "responseKey": "aktivitas_ai"
        },
        {
            "keywords": ["kamu siapa", "siapa namamu", "ini siapa", "who are you", "perkenalkan dirimu"],
            "responseKey": "identitas_ai"
        },
        {
            "keywords": ["siapa yang membuatmu", "dibuat oleh siapa", "penciptamu siapa", "developernya siapa"],
            "responseKey": "pencipta_ai"
        },
        {
            "keywords": ["kamu bisa apa", "apa saja kemampuanmu", "fitur kamu apa", "kelebihanmu", "apa yang bisa kamu lakukan"],
            "responseKey": "kemampuan_ai"
        },
        {
            "keywords": ["apakah kamu ai", "kamu robot?", "kamu nyata?", "kamu beneran?"],
            "responseKey": "status_ai"
        },
        {
            "keywords": ["jam berapa", "sekarang jam berapa", "waktu sekarang", "pukul berapa"],
            "responseKey": "info_waktu"
        },
        {
            "keywords": ["tanggal berapa", "hari ini tanggal", "sekarang hari apa"],
            "responseKey": "info_tanggal"
        },
        {
            "keywords": ["apa itu", "jelaskan tentang", "definisi dari", "maksud dari"],
            "responseKey": "permintaan_definisi"
        },
        {
            "keywords": ["ceritakan lelucon", "kasih tebak-tebakan", "bercanda dong", "joke", "bikin ketawa"],
            "responseKey": "permintaan_lelucon"
        },
        {
            "keywords": ["buatkan puisi", "bikin puisi", "puisi tentang", "sajak"],
            "responseKey": "permintaan_puisi"
        },
        {
            "keywords": ["buatkan pantun", "kasih pantun", "balas pantun"],
            "responseKey": "permintaan_pantun"
        },
        {
            "keywords": ["rekomendasi film", "saran lagu", "rekomendasi buku", "rekomendasi anime", "kasih rekomendasi"],
            "responseKey": "permintaan_rekomendasi"
        },
        {
            "keywords": ["kata mutiara", "quotes dong", "butuh motivasi", "kata bijak"],
            "responseKey": "permintaan_motivasi"
        },
        {
            "keywords": ["terima kasih", "makasih", "thanks", "terbantu", "terimakasih", "thank you"],
            "responseKey": "respon_terima_kasih"
        },
        {
            "keywords": ["kamu pintar", "keren", "hebat", "jawabanmu bagus", "mantap", "luar biasa", "kamu cerdas"],
            "responseKey": "respon_pujian"
        },
        {
            "keywords": ["kamu salah", "jawabanmu salah", "bukan gitu", "keliru"],
            "responseKey": "respon_koreksi"
        },
        {
            "keywords": ["jelek", "buruk", "gak bagus", "payah"],
            "responseKey": "respon_kritik"
        },
        {
            "keywords": ["aku bingung", "maksudnya?", "gak ngerti", "kurang paham", "coba ulangi"],
            "responseKey": "respon_bingung"
        },
        {
            "keywords": ["bosan", "gak ada kerjaan", "boring", "bosen"],
            "responseKey": "respon_bosan"
        },
        {
            "keywords": ["maaf", "sorry", "maaf ya"],
            "responseKey": "respon_maaf_user"
        },
        {
            "keywords": ["hitung", "kalkulasi", "berapa hasil"],
            "responseKey": "permintaan_kalkulasi"
        },
        {
            "keywords": ["terjemahkan", "artinya apa", "translate"],
            "responseKey": "permintaan_terjemahan"
        },
        {
            "keywords": ["sampai jumpa", "dah", "bye", "selamat tinggal", "sudah dulu ya", "udahan", "pamit"],
            "responseKey": "ucapan_perpisahan"
        }
    ];

    // --- State & Config ---
    let chatHistory = [];
    const AI_RESPONSE_DELAY = 1500; // ms

    // ====================================================================
    // INITIALIZATION
    // ====================================================================

    const init = () => {
        // Hide loader
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.addEventListener('transitionend', () => loader.remove());
        }, 1500);

        setupEventListeners();
        loadTheme();
        loadChatHistory();
        updateSendButtonState();
    };

    // ====================================================================
    // EVENT LISTENERS
    // ====================================================================

    const setupEventListeners = () => {
        sendBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keydown', handleInputKeydown);
        chatInput.addEventListener('input', handleInputTyping);
        menuToggleBtn.addEventListener('click', openSidebar);
        closeSidebarBtn.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        clearChatBtn.addEventListener('click', handleClearChat);
        themeSwitch.addEventListener('change', handleThemeChange);
        chatContainer.addEventListener('click', handleChatContainerClick);
    };

    // ====================================================================
    // CORE CHAT FUNCTIONS
    // ====================================================================

    const handleSendMessage = () => {
        const userInput = chatInput.value.trim();
        if (!userInput) return;

        renderMessage(userInput, 'user');
        saveMessage(userInput, 'user');

        chatInput.value = '';
        handleInputTyping();

        scheduleAiResponse(userInput);
    };

    const scheduleAiResponse = (userInput) => {
        renderTypingIndicator(true);
        setTimeout(() => {
            renderTypingIndicator(false);
            const aiResponse = getAiResponse(userInput);
            renderMessage(aiResponse, 'ai');
            saveMessage(aiResponse, 'ai');
        }, AI_RESPONSE_DELAY);
    };

    const getAiResponse = (userInput) => {
        const lowerCaseInput = userInput.toLowerCase();
        let responseKey = null;

        for (const caseItem of keywordCases) {
            if (caseItem.keywords.some(keyword => lowerCaseInput.includes(keyword))) {
                responseKey = caseItem.responseKey;
                break;
            }
        }

        const responseArray = (responseKey && allResponses[responseKey]) ? allResponses[responseKey] : allResponses.errors;
        const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
        
        const waLink = 'https://wa.me/6285764175824?text=Halo%20Developer,%20saya%20menemukan%20error%20di%20AlfandoXeonChatAi.';
        return `${randomResponse}<br><br>Jika masalah berlanjut, <a href="${waLink}" target="_blank">lapor ke developer</a>.`
    };

    // ====================================================================
    // RENDERING & UI
    // ====================================================================

    const renderMessage = (text, sender) => {
        const messageRow = messageTemplate.content.cloneNode(true).querySelector('.message-row');
        const pfp = messageRow.querySelector('.pfp');
        const messageText = messageRow.querySelector('.message-text');
        const copyBtn = messageRow.querySelector('.copy-btn');

        messageRow.classList.add(`${sender}-row`);
        messageText.innerHTML = text;
        
        pfp.src = sender === 'ai' ? 'asset/alfandoXeonlogo.png' : 'https://api.iconify.design/bi/person-fill.svg';
        if (sender === 'user') copyBtn.style.display = 'none';

        chatContainer.appendChild(messageRow);
        scrollToBottom();
    };

    const renderTypingIndicator = (show) => {
        let indicator = chatContainer.querySelector('.typing-indicator-row');
        if (show) {
            if (indicator) return;
            const indicatorRow = messageTemplate.content.cloneNode(true).querySelector('.message-row');
            indicatorRow.classList.add('ai-row', 'typing-indicator-row');
            indicatorRow.querySelector('.message-content').innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            indicatorRow.querySelector('.copy-btn').style.display = 'none';
            indicatorRow.querySelector('.pfp').src = 'asset/alfandoXeonlogo.png';
            chatContainer.appendChild(indicatorRow);
            scrollToBottom();
        } else {
            if (indicator) indicator.remove();
        }
    };

    const scrollToBottom = () => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    // ====================================================================
    // EVENT HANDLERS
    // ====================================================================

    const handleInputKeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputTyping = () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = `${chatInput.scrollHeight}px`;
        updateSendButtonState();
    };

    const handleClearChat = () => {
        chatContainer.innerHTML = '';
        chatHistory = [];
        localStorage.removeItem('alfandoXeonChatHistory');
        const greeting = getGreeting();
        renderMessage(greeting, 'ai');
        saveMessage(greeting, 'ai');
        closeSidebar();
    };

    const handleThemeChange = (e) => {
        setTheme(e.target.checked ? 'dark' : 'light');
    };

    const handleChatContainerClick = (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            const messageText = copyBtn.closest('.chat-message').querySelector('.message-text').innerText;
            navigator.clipboard.writeText(messageText).then(() => {
                const icon = copyBtn.querySelector('i');
                icon.classList.replace('bi-clipboard', 'bi-check-lg');
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    icon.classList.replace('bi-check-lg', 'bi-clipboard');
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        }
    };

    // ====================================================================
    // SIDEBAR & THEME
    // ====================================================================

    const openSidebar = () => {
        const main = D.getElementById('main-content');
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        main.classList.add('sidebar-open');
    };

    const closeSidebar = () => {
        const main = D.getElementById('main-content');
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        main.classList.remove('sidebar-open');
    };

    const setTheme = (theme) => {
        D.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('alfandoXeonTheme', theme);
        themeSwitch.checked = theme === 'dark';
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('alfandoXeonTheme') || 'dark';
        setTheme(savedTheme);
    };

    // ====================================================================
    // DATA & STATE MANAGEMENT
    // ====================================================================

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Selamat pagi! Ada yang bisa saya bantu?';
        if (hour < 15) return 'Selamat siang! Ada yang bisa saya bantu?';
        if (hour < 19) return 'Selamat sore! Ada yang bisa saya bantu?';
        return 'Selamat malam! Ada yang bisa saya bantu?';
    };

    const saveMessage = (text, sender) => {
        chatHistory.push({ text, sender });
        localStorage.setItem('alfandoXeonChatHistory', JSON.stringify(chatHistory));
    };

    const loadChatHistory = () => {
        const savedHistory = localStorage.getItem('alfandoXeonChatHistory');
        if (savedHistory && JSON.parse(savedHistory).length > 0) {
            chatHistory = JSON.parse(savedHistory);
            chatHistory.forEach(msg => renderMessage(msg.text, msg.sender));
        } else {
            const greeting = getGreeting();
            renderMessage(greeting, 'ai');
            saveMessage(greeting, 'ai');
        }
    };

    const updateSendButtonState = () => {
        sendBtn.disabled = chatInput.value.trim() === '';
    };

    // --- Let's Go! ---
    init();
});