const CORRECT_PASSWORD = "071108"; // Sesuaikan tanggal lahir (DDMMYY)
let inputPass = "";
const dots = document.querySelectorAll('.dot');

// 1. Logika Password
function pressNum(num) {
    if (inputPass.length < 6) {
        inputPass += num;
        updateDots();
        if (inputPass.length === 6) {
            setTimeout(checkPassword, 250);
        }
    }
}

function deleteNum() {
    if (inputPass.length > 0) {
        inputPass = inputPass.slice(0, -1);
        updateDots();
    }
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < inputPass.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function checkPassword() {
    if (inputPass === CORRECT_PASSWORD) {
        playMusic();
        
        if (typeof confetti === "function") {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        nextPage('page-2');
    } else {
        alert("Yah passwordnya salah! Coba ingat tanggal lahir kamu lagi 😜");
        inputPass = "";
        updateDots();
    }
}

// 2. Navigasi Halaman
function nextPage(pageId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('section-active');
    });
    document.getElementById(pageId).classList.add('section-active');
    
    // Reset posisi tombol "Biasa Aja" ke tempat semula kalau balik halaman
    const btnNo = document.getElementById('btn-no');
    if (btnNo) {
        btnNo.style.position = 'static';
    }
}

// 3. Tombol "Biasa Aja" Kabur Jauh HANYA PAS MAU DITEKAN
function moveNoButton() {
    const btn = document.getElementById('btn-no');
    
    // Ubah jadi fixed agar posisinya bebas melompat ke seluruh penjuru layar
    btn.style.position = 'fixed';
    
    // Hitung batas layar agar tombol tidak keluar dari layar HP/Laptop
    const maxX = window.innerWidth - btn.clientWidth - 30;
    const maxY = window.innerHeight - btn.clientHeight - 30;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.zIndex = '9999';
}

// Konfeti Khusus Kuis
function triggerLoveConfetti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 80,
            spread: 100,
            colors: ['#ff0000', '#ff69b4', '#ff1493']
        });
    }
    nextPage('page-3');
}

// 4. Logika Game Kado Misteri (Bisa Jalankan Video MP4 & Gambar)
function openGift(num) {
    const modal = document.getElementById('gift-modal');
    const videoElement = document.getElementById('gift-video'); // Mengambil elemen video
    const text = document.getElementById('gift-text');

    const rewards = {
        1: {
            // Masukkan file video mp4 kamu di sini (atau link online)
            video: "gif1.mp4", 
            text: "Yeyyy, Selamatt kamu Bebas minta PAP dari aku berapapun!"
        },
        2: {
            video: "gif2.mp4", 
            text: "Selamatt, Kamu bisa tanya 1 pertanyaan apa aja tentang aku yang bikin kamu penasaran, nanti aku jawab jujur."
        },
        3: {
            video: "gif3.mp4", 
            text: "Woahhh, kamu dapet kupon 1 permintaan, kamu bebas minta apapun ke akuu nanti aku kabulinn janjii!"
        }
    };

    if (rewards[num]) {
        // Masukkan sumber video dan muat ulang video agar otomatis berputar
        videoElement.src = rewards[num].video;
        videoElement.load(); 
        
        text.innerText = rewards[num].text;
        
        // Efek konfeti saat kado dibuka
        if (typeof confetti === "function") {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }

        // Tampilkan Pop-up Modal
        modal.classList.remove('hidden');
    }
}
// 5. Kontrol Musik
const music = document.getElementById('bg-music');
let isPlaying = false;

function toggleMusic() {
    const musicBtn = document.getElementById('music-btn');
    if (isPlaying) {
        music.pause();
        musicBtn.innerHTML = "🎵 Putar Musik";
        isPlaying = false;
    } else {
        music.play();
        musicBtn.innerHTML = "🔇 Matikan Musik";
        isPlaying = true;
    }
}

function playMusic() {
    if (!isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            document.getElementById('music-btn').innerHTML = "🔇 Matikan Musik";
        }).catch(e => console.log("Autoplay blocked"));
    }
}

// Konfeti Perayaan Spesial Sertifikat
function triggerPartyConfetti() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#ff69b4', '#4299e1', '#ffd700', '#25d366']
        });
    }
}

// 6. Efek Hati Melayang di Background
function createFloatingHeart() {
    const heartContainer = document.getElementById('floating-hearts');
    if (!heartContainer) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createFloatingHeart, 400);