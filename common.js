// ===== শেয়ার্ড ডেটা ও ফাংশন =====
const STORAGE_KEY = 'transactions';
const THEME_KEY = 'theme';
const PIN_KEY = 'userPin';

function getTransactions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTransactions(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function formatBDT(num) {
    return '৳ ' + Number(num).toLocaleString('bn-BD', { maximumFractionDigits: 2 });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== ডার্ক মোড =====
function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY) || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme();
}

// ===== পিন লক =====
function checkPin() {
    const savedPin = localStorage.getItem(PIN_KEY);
    if (!savedPin) return true;
    if (sessionStorage.getItem('unlocked') === 'yes') return true;
    window.location.href = 'lock.html';
    return false;
}

// ===== নেভিগেশন হাইলাইট =====
function highlightNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active-nav');
    });
}

// অটো রান
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    highlightNav();
});
