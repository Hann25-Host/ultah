// =========================================
// 1. EFEK BACKGROUND PARTIKEL PINK (CANVAS)
// =========================================
const canvas = document.getElementById('starlightCanvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    // Bikin titik-titik partikel
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        // Memantul kalau kena pinggir layar
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        // Efek kedap-kedip
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0.2) star.opacity = 0.2;
        if (star.opacity > 0.8) star.opacity = 0.8;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 143, 163, ${star.opacity})`; // Warna Pink Soft
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateStars();

// =========================================
// 2. LOGIKA NAVIGASI & ANIMASI
// =========================================
const introScreen = document.getElementById('introScreen');
const mainScreen = document.getElementById('mainScreen');
const flowerScreen = document.getElementById('flowerScreen');
const giftContainer = document.getElementById('giftContainer');
const loveLetter = document.getElementById('loveLetter');

// Tombol "Lihat Sekarang" diklik
document.getElementById('startBtn').addEventListener('click', () => {
    introScreen.classList.remove('active');
    introScreen.classList.add('hidden');
    
    setTimeout(() => {
        mainScreen.classList.remove('hidden');
        mainScreen.classList.add('active');
        playSong(); // Lagu otomatis play pas layar kado muncul
    }, 800);
});

// Interaksi Kado
let giftOpened = false;
giftContainer.addEventListener('click', () => {
    if (giftOpened) return;
    giftOpened = true;
    
    giftContainer.classList.add('open'); // Animasi kado meledak
    
    setTimeout(() => {
        giftContainer.style.display = 'none';
        loveLetter.classList.add('show'); // Surat muncul
    }, 1200);
});

// Tombol "Lihat Bunga" diklik
document.getElementById('showFlowersBtn').addEventListener('click', () => {
    mainScreen.classList.remove('active');
    mainScreen.classList.add('hidden');
    
    setTimeout(() => {
        flowerScreen.classList.remove('hidden');
        flowerScreen.classList.add('active');
        
        // KUNCI PENTING: Class 'not-loaded' dihapus di sini
        // Biar animasi bunga mekarnya benar-benar jalan dari awal pas layar dibuka
        document.body.classList.remove("not-loaded");

        // Mini player saat flower screen aktif
        musicPlayer.classList.add('mini');

        // Start gombalan typewriter
        startTypewriter();
    }, 800);
});

// Mini player logic
const musicPlayer = document.getElementById('musicPlayer');
const miniNote = document.getElementById('miniNote');
const collapseBtn = document.getElementById('collapseBtn');
let miniTimer = null;

function expandPlayer() {
    musicPlayer.classList.remove('mini');
    // Auto collapse lagi setelah 5 detik nggak ada interaksi
    clearTimeout(miniTimer);
    miniTimer = setTimeout(() => {
        if (flowerScreen.classList.contains('active')) {
            musicPlayer.classList.add('mini');
        }
    }, 5000);
}

miniNote.addEventListener('click', (e) => {
    e.stopPropagation();
    expandPlayer();
});

collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    clearTimeout(miniTimer);
    if (flowerScreen.classList.contains('active')) {
        musicPlayer.classList.add('mini');
    }
});

// =========================================
// 3. SISTEM MUSIK DINAMIS (audio1.mp3, dst)
// =========================================
const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const trackName = document.getElementById('trackName');

// Daftar Lagu (Tinggal tambah kalau ada audio3.mp3, dst)
const playlist = [
    { file: 'audio1.mp3', title: 'monokrom🎂' }
];

let currentTrack = 0;

function loadSong(index) {
    if (playlist[index]) {
        bgMusic.src = playlist[index].file;
        trackName.innerText = playlist[index].title;
    }
}

function playSong() {
    bgMusic.play().catch(() => console.log("Browser menahan autoplay, tunggu interaksi user."));
    playBtn.innerText = '⏸';
}

function pauseSong() {
    bgMusic.pause();
    playBtn.innerText = '▶';
}

// Tombol Play/Pause Music Player
playBtn.addEventListener('click', () => {
    if (bgMusic.paused) playSong();
    else pauseSong();
});

// Tombol Next Song
document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadSong(currentTrack);
    playSong();
});

// Tombol Prev Song
document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadSong(currentTrack);
    playSong();
});

// Kalau lagu habis, otomatis putar lagu berikutnya
bgMusic.addEventListener('ended', () => {
    document.getElementById('nextBtn').click();
});

// Siapkan lagu pertama pas web dimuat
loadSong(currentTrack);

// =========================================
// 4. TYPEWRITER GOMBALAN - FLOWER SCREEN
// =========================================
const gombalanList = [
    "kamu itu kayak bunga yang paling aku sayang, mau aku rawat setiap hari 💕",
    "makasiii yaa udah hadir dan mekar indah di hidupku, abill 🌸",
    "bisa nemenin kamu terus bertumbuh itu hal yang paling aku syukurin 🫶",
    "senyum kamu itu ibarat matahari di taman ini, bikin hangat terus 🌻",
    "aku bakal terus nyiramin kamu pakai kasih sayang, selamanya ❤️",
    "buat jojo, kamu bukan cuma sekadar bunga... tapi seluruh tamannya 🌺",
    "happy 18th sayanggg, semoga makin mekar dan selalu bahagia yaa 🎂✨",
];


let typewriterRunning = false;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function startTypewriter() {
    if (typewriterRunning) return;
    typewriterRunning = true;
    const el = document.getElementById('typewriterText');
    let i = 0;

    async function typeLine(text) {
        el.textContent = '';
        for (let c = 0; c < text.length; c++) {
            el.textContent += text[c];
            await sleep(42);
        }
        await sleep(2800);
        for (let c = text.length; c >= 0; c--) {
            el.textContent = text.substring(0, c);
            await sleep(22);
        }
        await sleep(500);
    }

    while (true) {
        await typeLine(gombalanList[i % gombalanList.length]);
        i++;
    }
}
