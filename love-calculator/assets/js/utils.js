// assets/js/utils.js

// Fungsi untuk mengonversi nama menjadi nilai numerik sederhana
function nameToNumber(name) {
    // Menghapus spasi dan mengubah ke huruf kecil
    const cleanedName = name.toLowerCase().replace(/\s/g, '');
    let sum = 0;
    for (let i = 0; i < cleanedName.length; i++) {
        // Mengonversi karakter ke nilai ASCII dan menguranginya agar 'a' = 1, 'b' = 2, dst.
        sum += (cleanedName.charCodeAt(i) - 96);
    }
    // Sederhanakan sum menjadi satu digit atau master number (opsional, untuk numerologi lebih dalam)
    // Untuk saat ini, kita akan biarkan sum sebagai nilai total.
    return sum;
}

// Fungsi perhitungan numerologi
function calculateNumerology(name1, name2) {
    const num1 = nameToNumber(name1);
    const num2 = nameToNumber(name2);

    // Metode sederhana: rata-rata atau persentase kesamaan
    // Kita bisa improvisasi di sini. Misalnya, persentase kecocokan
    // berdasarkan kedekatan angka atau rasio.
    // Untuk demo awal, kita gunakan rata-rata dan normalisasi.
    const average = (num1 + num2) / 2;
    let score = Math.round((average % 100) + 1); // Normalisasi ke 1-100

    // Tambahkan logika jika ingin nilai tertentu selalu tinggi/rendah
    if (score < 20) score += 20; // Agar tidak terlalu rendah

    return score; // Mengembalikan skor 1-100
}


// Fungsi Validasi Nama (hanya huruf dan spasi)
function isValidName(name) {
    // Regex: hanya huruf (a-z, A-Z), spasi, dan beberapa karakter khusus seperti apostrof atau hyphen
    return /^[a-zA-Z\s'-]+$/.test(name);
}

// Fungsi Validasi Tanggal (YYYY-MM-DD)
function isValidDate(dateString) {
    // Memastikan format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const timestamp = date.getTime();

    // Memastikan tanggal valid dan tidak NaN
    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }

    // Memastikan tanggal yang dimasukkan tidak di masa depan
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    const inputDate = new Date(dateString);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate <= today;
}

// Fungsi untuk menghitung kompatibilitas usia
function calculateAgeCompatibility(dob1, dob2) {
    const date1 = new Date(dob1);
    const date2 = new Date(dob2);

    const diffYears = Math.abs(date1.getFullYear() - date2.getFullYear());

    let score = 0;
    if (diffYears <= 3) {
        score = 100; // Sangat cocok
    } else if (diffYears <= 7) {
        score = 80; // Cukup cocok
    } else if (diffYears <= 15) {
        score = 50; // Perlu penyesuaian
    } else {
        score = 30; // Tantangan besar
    }
    return score;
}


function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}