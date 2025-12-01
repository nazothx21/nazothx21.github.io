// config.js

export const config = {
    // Konfigurasi Header & Sosmed Utama
    profile: {
        name: "NAzoTHX Roblox",
        role: "Roblox Content Creator ^_^",
        socialHeader: [
            { name: "TikTok", url: "https://www.tiktok.com/@nazothx_21?_t=ZS-8xGsfreThk0&_r=1" },
            { name: "Instagram", url: "https://www.instagram.com/nazothx_21?igsh=MWt6bTg1ZWdkcjQ3dA==" },
            { name: "YouTube", url: "https://youtube.com/@nazo_thx?si=QpCAbDNNPc_wpB46" }
        ]
    },

    // Konfigurasi Background
    background: {
        type: "video",
        src: "/Background/peter.mp4", // Pastikan path ini benar ya Mas Tyo
        fallbackText: "minimal browser anda mendukung play video dekk"
    },

    // Konfigurasi Kartu Link (Button Cards)
    // Mas Tyo bisa tambah/hapus array ini sesuka hati
    cards: [
        {
            title: "KOMUNITAS ROBLOX NAZOTHX",
            subtitle: "Join Marga NazoTHX",
            url: "https://chat.whatsapp.com/BrFZHxf4Xry6qiTiHNIWiY",
            image: "https://files.catbox.moe/q5umxt.png"
        },
        {
            title: "DONASI",
            subtitle: "Donasi NazoTHX Saweria",
            url: "https://sociabuzz.com/nazothx/tribe",
            image: "https://play-lh.googleusercontent.com/OYaEM1pE7YfjqogMH-2G_6h4yNCVB306SCgctXCsMwzPUTAn_69VA_tKb2QbpiDzv5w=w240-h480-rw"
        },
        {
            title: "INSTAGRAM",
            subtitle: "Follow instagram NazoTHX juga yaa...",
            url: "https://www.instagram.com/nazothx_21?igsh=MWt6bTg1ZWdkcjQ3dA==",
            image: "/Logo/instagram.webp"
        },
        {
            title: "YOUTUBE",
            subtitle: "Subscribe Youtube NAzoTHX",
            url: "https://youtube.com/@nazo_thx?si=QpCAbDNNPc_wpB46",
            image: "/Logo/yt.jpg"
        },
        {
            title: "TIKTOK",
            subtitle: "Follow tiktok Nazo Roblox",
            url: "https://www.tiktok.com/@nazothxroblox?is_from_webapp=1&sender_device=pc",
            image: "/Logo/tiktok.png"
        },
        {
            title: "MY FACEBOOK",
            subtitle: "Jan lupa follow Facebook mimin ganteng yaah hihihi",
            url: "https://www.facebook.com/share/19woivSQTB/",
            image: "/Logo/facebook.png"
        },
        {
            title: "NazoTHX Community",
            subtitle: "Keluarga Besar NazoTHX",
            url: "https://chat.whatsapp.com/IEXLKlOQcN4BQ0PFOx4qzh",
            image: "/Logo/com.jpg"
        },
        {
            title: "VIP INDO 21",
            subtitle: "Sebatas Mengagumi<br>Soal Memiliki <i><del>Aku Sadar Diri</del></i>",
            url: "bokeff.html",
            image: "bkf.jpeg",
            isSpecial: true, // Penanda kalau mau styling khusus (misal bold/italic title)
            specialTitle: "<b><i> <del>VIP INDO 21</del> </i></b>" 
        },
        {
            title: "Endorse/Bussines?",
            subtitle: "<i class='fas fa-whatsapp'></i> Chat WhatsApp Here!",
            url: "https://wa.me/6285764175824?text=Endorse%20NazoTHX",
            image: "nazothx.png"
        }
    ],

    // Konfigurasi Gallery
    gallery: {
        title: "Makasih Udah Mampirr ^_-",
        subtitle: "PowerdBy: AlfandoXeon FullStackDeveloper",
        images: [
           // "foto/1.png",
            //"foto/2.png",
            //"foto/3.png",
            //"foto/4.png",
            //"foto/5.png",
            //"foto/6.png"
        ],
        extraCard: {
            title: "<b><i>TOP UP INSTANT</i></b>",
            subtitle: "Tempat top up Robux Tercepat<br><b>gachaku.com</b>",
            url: "https://gachaku.com/id",
            image: "https://admin.gachaku.com/storage/banner/4266c6ca-ca52-4f42-9974-701cea21b698.jpeg"
        }
    },
    
    // Teks Penutup
    footer: {
        text: "Halo guysss... jangan lupa follow semua media sosial NazoTHX yaa...<br><br>Admin sayang kalian semua.. By @NazoTHX"
    }

};
