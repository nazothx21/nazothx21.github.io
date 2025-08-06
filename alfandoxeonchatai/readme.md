# 🚀 AlfandoXeonChatAI v1.5

![Made with Love](https://img.shields.io/badge/Made%20with-Love-red?style=for-the-badge&logo=heart)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<p align="center">
  <img src="https://storage.googleapis.com/agent-tools-prod/images/0d759a29-0830-47b8-b80c-a9603f9b2d23/image_2.png" alt="Demo Aplikasi AlfandoXeonChatAI" width="80%">
</p>

Sebuah aplikasi web Chat AI interaktif yang dibangun dengan HTML, CSS, dan JavaScript murni. Aplikasi ini mensimulasikan percakapan dengan AI yang mampu merespons berbagai skenario berdasarkan kata kunci, menampilkan contoh kode, dan menyimpan riwayat percakapan di browser.

---

## ✨ Fitur Utama

-   **Antarmuka Modern & Responsif**: Didesain dengan estetika modern, dapat diakses dengan baik di perangkat desktop maupun mobile.
-   **Tema Terang & Gelap**: Pengguna dapat memilih antara mode terang (light mode) dan gelap (dark mode) sesuai preferensi.
-   **Respons Berbasis Kata Kunci**: AI dapat memberikan jawaban yang relevan berdasarkan kata kunci yang dimasukkan oleh pengguna, menggunakan data dari file JSON eksternal.
-   **Penyimpanan Riwayat Chat**: Riwayat percakapan secara otomatis disimpan di `localStorage` browser, sehingga tidak akan hilang saat halaman dimuat ulang.
-   **Menampilkan Blok Kode**: Mampu menampilkan cuplikan kode dengan format yang rapi di dalam chat.
-   **Sidebar Menu**: Menu samping yang fungsional untuk pengaturan, seperti mengganti tema dan membersihkan riwayat chat.
-   **Dapat Dikustomisasi**: Respon dan kata kunci AI dapat dengan mudah diubah dan ditambah melalui file `response.json` dan `caseChat.json`.
-   **Efek Ketik & Animasi Halus**: Dilengkapi dengan indikator pengetikan AI dan animasi antarmuka yang halus untuk pengalaman pengguna yang lebih baik.

---

## 🛠️ Teknologi yang Digunakan

-   **HTML5**: Sebagai kerangka utama struktur halaman.
-   **CSS3**: Untuk styling, layouting, tema, dan animasi. Memanfaatkan Flexbox dan variabel CSS untuk desain yang modular.
-   **JavaScript (ES6+)**: Untuk semua logika aplikasi, interaksi DOM, dan manajemen data.
-   **Bootstrap Icons**: Untuk ikon-ikon yang bersih dan modern di seluruh aplikasi.

---

## 📂 Struktur File

Berikut adalah struktur direktori dari proyek ini:

/AlfandoXeonChatAI
├── 📂 asset/
│   └── 🖼️ alfandoXeonlogo.png
├── 📄 index.html         (Struktur utama aplikasi)
├── 🎨 style.css          (Semua gaya dan tema)
├── 📜 script.js          (Logika utama aplikasi)
├── 🗃️ caseChat.json      (Database kata kunci & niat)
├── 🗃️ response.json      (Database semua kemungkinan respon AI)
└── 📖 README.md          (Dokumentasi proyek ini)


---

## 🚀 Cara Menjalankan

Untuk menjalankan aplikasi ini di komputer lokal Anda, ikuti langkah-langkah sederhana berikut:

1.  **Unduh atau Clone Proyek**:
    -   Unduh semua file (`index.html`, `style.css`, `script.js`, `caseChat.json`, `response.json`, dan folder `asset`) dan letakkan dalam satu folder yang sama.

2.  **Buka File HTML**:
    -   Cukup buka file `index.html` menggunakan browser web modern seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge.

3.  **Selesai!**
    -   Aplikasi akan langsung berjalan di browser Anda. Tidak memerlukan instalasi atau server tambahan.

---

## 🔧 Kustomisasi

Salah satu keunggulan utama proyek ini adalah kemudahan kustomisasinya.

### Menambah atau Mengubah Respon AI

-   Buka file `response.json`.
-   Anda bisa mengubah teks di dalam array yang sudah ada atau menambahkan kunci (key) baru.
    ```json
    "nama_kunci_baru": [
        "Ini adalah variasi respon pertama.",
        "Ini adalah variasi respon kedua."
    ]
    ```

### Menambah atau Mengubah Kata Kunci

-   Buka file `caseChat.json`.
-   Tambahkan objek baru ke dalam array untuk mendefinisikan skenario baru.
    ```json
    {
      "keywords": ["kata_kunci_1", "kata_kunci_2"],
      "responseKey": "nama_kunci_baru" // Pastikan ini cocok dengan kunci di response.json
    }
    ```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lebih lanjut (jika ada).

---

## ❤️ Ucapan Terima Kasih

-   Terima kasih kepada semua yang telah memberikan ide dan inspirasi dalam pengembangan proyek ini.
-   Dibuat dan dikembangkan oleh **Tyo (AlfandoXeon)**.
