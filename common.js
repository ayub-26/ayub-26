// ===== Supabase কানেকশন =====
const SUPABASE_URL = 'https://oiluawfhquhmwksstrij.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_KBPJcPugJfyaOOVbKg9TUQ_2kgNfKxj';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== থিম =====
const THEME_KEY = 'app_theme';

function applyTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const cur = localStorage.getItem(THEME_KEY) || 'light';
    localStorage.setItem(THEME_KEY, cur === 'dark' ? 'light' : 'dark');
    applyTheme();
}

// ===== পিন লক (Supabase Auth-এর সাথে) =====
const PIN_KEY = 'userPin';

function setPin(pin) {
    localStorage.setItem(PIN_KEY, btoa(pin)); // base64 (শুধু লুকানোর জন্য, আসল সিকিউরিটি Auth)
}

function verifyPin(pin) {
    const saved = localStorage.getItem(PIN_KEY);
    if (!saved) return true;
    return atob(saved) === pin;
}

function hasPin() {
    return !!localStorage.getItem(PIN_KEY);
}

// ===== ফরম্যাট =====
function formatBDT(num) {
    return '৳ ' + Number(num || 0).toLocaleString('bn-BD', { maximumFractionDigits: 2 });
}

function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ===== তারিখ =====
function todayISO() {
    return new Date().toISOString().split('T')[0];
}

// ===== নেভিগেশন হাইলাইট =====
function highlightNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active-nav');
    });
}

// ===== লগআউট =====
async function logout() {
    if (!confirm('লগআউট করবেন?')) return;
    await supabaseClient.auth.signOut();
    sessionStorage.clear();
    location.href = 'index.html';
}

// ===== চেক লগইন =====
async function requireAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        location.href = 'index.html';
        return null;
    }
    return session.user;
}

// ===== শুরু =====
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    highlightNav();
});
