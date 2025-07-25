// assets/js/storage.js

const HISTORY_KEY = 'loveCalculatorHistory';

// Mengambil semua riwayat
function getHistory() {
    try {
        const historyString = localStorage.getItem(HISTORY_KEY);
        return historyString ? JSON.parse(historyString) : [];
    } catch (e) {
        console.error("Error retrieving history from localStorage:", e);
        return [];
    }
}

// Menyimpan item baru ke riwayat
function saveHistoryItem(item) {
    try {
        const history = getHistory();
        // Batasi jumlah item di riwayat (misal, 10 item terakhir)
        if (history.length >= 10) {
            history.shift(); // Hapus item terlama
        }
        history.push(item);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        console.error("Error saving history to localStorage:", e);
    }
}

// Menghapus item riwayat berdasarkan indeks
function deleteHistoryItem(index) {
    try {
        const history = getHistory();
        if (index > -1 && index < history.length) {
            history.splice(index, 1); // Hapus 1 item pada indeks tersebut
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    } catch (e) {
        console.error("Error deleting history item from localStorage:", e);
    }
}

// Menghapus semua riwayat
function clearHistory() {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
        console.error("Error clearing history from localStorage:", e);
    }
}