// assets/js/zodiac.js

// Data Zodiak (Rentang Tanggal, Karakteristik, Kompatibilitas)
const zodiacData = {
    'Aries': { start: '03-21', end: '04-19', compatible: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'] },
    'Taurus': { start: '04-20', end: '05-20', compatible: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'] },
    'Gemini': { start: '05-21', end: '06-20', compatible: ['Libra', 'Aquarius', 'Aries', 'Leo'] },
    'Cancer': { start: '06-21', end: '07-22', compatible: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'] },
    'Leo': { start: '07-23', end: '08-22', compatible: ['Aries', 'Sagittarius', 'Gemini', 'Libra'] },
    'Virgo': { start: '08-23', end: '09-22', compatible: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'] },
    'Libra': { start: '09-23', end: '10-22', compatible: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'] },
    'Scorpio': { start: '10-23', end: '11-21', compatible: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'] },
    'Sagittarius': { start: '11-22', end: '12-21', compatible: ['Aries', 'Leo', 'Libra', 'Aquarius'] },
    'Capricorn': { start: '12-22', end: '01-19', compatible: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'] },
    'Aquarius': { start: '01-20', end: '02-18', compatible: ['Gemini', 'Libra', 'Aries', 'Sagittarius'] },
    'Pisces': { start: '02-19', end: '03-20', compatible: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'] }
};

// Deskripsi Kompatibilitas Zodiak
const zodiacCompatibilityDescriptions = {
    'Aries-Leo': "Kalian berdua adalah zodiak api yang penuh gairah! Hubungan ini akan penuh semangat dan petualangan.",
    'Taurus-Virgo': "Kalian berdua adalah zodiak bumi yang praktis. Hubungan ini akan stabil dan saling mendukung, fokus pada kenyamanan dan keamanan.",
    'Gemini-Libra': "Kalian berdua zodiak udara yang cerdas dan sosial. Komunikasi akan mengalir lancar dan kalian akan menikmati pertukaran ide.",
    'Cancer-Scorpio': "Kalian berdua zodiak air yang emosional dan intuitif. Ikatan emosional kalian akan sangat dalam dan penuh pengertian.",
    // Tambahkan deskripsi untuk pasangan zodiak lainnya
    'Aries-Libra': "Aries yang bersemangat dan Libra yang seimbang bisa menciptakan dinamika yang menarik. Kalian bisa saling melengkapi, tapi butuh kompromi.",
    'Cancer-Capricorn': "Kalian adalah zodiak yang berlawanan di lingkaran zodiak. Bisa sangat cocok karena saling melengkapi, atau butuh banyak usaha untuk memahami perbedaan.",
    'Pisces-Virgo': "Pisces yang intuitif dan Virgo yang analitis. Kalian bisa saling menyeimbangkan, di mana satu membawa imajinasi dan yang lain membawa realitas.",
    // Default jika tidak ada deskripsi spesifik
    'default-highly-compatible': "Secara zodiak, kalian sangat serasi dan memiliki banyak kesamaan yang mendukung keharmonisan hubungan.",
    'default-moderately-compatible': "Ada potensi kecocokan zodiak yang baik. Dengan sedikit usaha, kalian bisa saling memahami dan tumbuh bersama.",
    'default-low-compatible': "Kecocokan zodiak kalian mungkin membutuhkan lebih banyak pengertian dan kompromi. Pelajari perbedaan satu sama lain sebagai kekuatan."
};


// Fungsi untuk mendapatkan tanda zodiak dari tanggal lahir
function getZodiacSign(dobString) {
    const date = new Date(dobString);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';

    return 'Unknown'; // Should not happen with valid date input
}

// Fungsi untuk menghitung kompatibilitas zodiak (skor 1-100)
function calculateZodiacCompatibility(zodiac1, zodiac2) {
    if (!zodiacData[zodiac1] || !zodiacData[zodiac2]) {
        return 50; // Default jika zodiak tidak ditemukan
    }

    const comp1 = zodiacData[zodiac1].compatible;
    const comp2 = zodiacData[zodiac2].compatible;

    let score = 0;
    if (comp1.includes(zodiac2) && comp2.includes(zodiac1)) {
        score = 90; // Sangat cocok (double compatibility)
    } else if (comp1.includes(zodiac2) || comp2.includes(zodiac1)) {
        score = 70; // Cukup cocok (one-way compatibility)
    } else if (
        (zodiac1 === 'Aries' && zodiac2 === 'Libra') ||
        (zodiac1 === 'Libra' && zodiac2 === 'Aries') ||
        (zodiac1 === 'Cancer' && zodiac2 === 'Capricorn') ||
        (zodiac1 === 'Capricorn' && zodiac2 === 'Cancer') ||
        (zodiac1 === 'Leo' && zodiac2 === 'Aquarius') ||
        (zodiac1 === 'Aquarius' && zodiac2 === 'Leo') ||
        (zodiac1 === 'Taurus' && zodiac2 === 'Scorpio') ||
        (zodiac1 === 'Scorpio' && zodiac2 === 'Taurus') ||
        (zodiac1 === 'Gemini' && zodiac2 === 'Sagittarius') ||
        (zodiac1 === 'Sagittarius' && zodiac2 === 'Gemini') ||
        (zodiac1 === 'Virgo' && zodiac2 === 'Pisces') ||
        (zodiac1 === 'Pisces' && zodiac2 === 'Virgo')
    ) {
        score = 80; // Zodiak berlawanan bisa sangat cocok karena saling melengkapi
    }
    else {
        score = 40; // Kurang cocok, perlu usaha
    }

    return score;
}

// Fungsi untuk mendapatkan deskripsi kompatibilitas zodiak yang lebih spesifik
function getZodiacCompatibilityDescription(zodiac1, zodiac2) {
    const pair1 = `${zodiac1}-${zodiac2}`;
    const pair2 = `${zodiac2}-${zodiac1}`; // Periksa juga urutan terbalik

    if (zodiacCompatibilityDescriptions[pair1]) {
        return zodiacCompatibilityDescriptions[pair1];
    }
    if (zodiacCompatibilityDescriptions[pair2]) {
        return zodiacCompatibilityDescriptions[pair2];
    }

    // Default descriptions based on general compatibility score
    const score = calculateZodiacCompatibility(zodiac1, zodiac2);
    if (score >= 80) return zodiacCompatibilityDescriptions['default-highly-compatible'];
    if (score >= 60) return zodiacCompatibilityDescriptions['default-moderately-compatible'];
    if (score < 60) return zodiacCompatibilityDescriptions['default-low-compatible'];

    return ""; // Fallback jika tidak ada deskripsi
}