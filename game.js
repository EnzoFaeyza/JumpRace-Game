// Ambil elemen gambar dari HTML
const imgKarakter = document.getElementById("karakter");
const imgBotKarakter = document.getElementById("bot-karakter");

// Masukkan semua jalur file frame Anda ke dalam array ini
// Pastikan nama file dan urutannya sudah benar
const framePaths = [
  "img/karakterkita/urutan1.png",
  "img/karakterkita/urutan2.png",
  "img/karakterkita/urutan3.png",
  "img/karakterkita/urutan4.png",
  "img/karakterkita/urutan5.png",
  "img/karakterkita/urutan6.png",
  "img/karakterkita/urutan1.png",
];

// Frame paths untuk bot
const botFramePaths = [
  "img/musuh/urutan1.png",
  "img/musuh/urutan2.png",
  "img/musuh/urutan3.png",
  "img/musuh/urutan4.png",
  "img/musuh/urutan5.png",
  "img/musuh/urutan6.png",
  "img/musuh/urutan1.png",
];

// Variabble End Game
let isPlayerWin = false;
let isBotWin = false;
let StopBot = false;
let PlayerCheat = true;
let animasiTimer = null;

// Variabel untuk melacak posisi dan frame saat ini
const kecepatanGerak = 20;
let posisiX = 0;
let frameSaatIni = 0;
let isAnimating = false;
const lebarLayar = window.innerWidth;
const pergerakanPersen = 0.05;
const batasPersen = 0.9;
const pergerakanPx = lebarLayar * pergerakanPersen;
const batasPx = lebarLayar * batasPersen;

// Variabel untuk bot
let botFrameSaatIni = 0;
let botIsAnimating = false;
let botAnimasiTimer = null;
let botMoveDelay = 2000; // Delay awal bot 2 detik
let botAutoMoveTimer = null;
function gantiFrame() {
  imgKarakter.src = framePaths[frameSaatIni];

  frameSaatIni++;



  if (frameSaatIni == 3) {
    if (isPlayerWin) return;
    const posisiSaatIni = parseInt(imgKarakter.style.left) || 70;
    const posisiBaru = posisiSaatIni + pergerakanPx;

    console.log("posisiSaatIni %i", posisiSaatIni);
    console.log("posisiBaru %i", posisiBaru);

    console.log("imgKarakter di panggil");

    if (PlayerCheat) imgKarakter.style.left = batasPx + 1 + "px";
    imgKarakter.style.left = posisiBaru + "px";
  }

  console.log("framePaths", framePaths.length);

  if (frameSaatIni >= framePaths.length) {
    // Berhenti setelah frame terakhir ditampilkan
    clearInterval(animasiTimer);

    animasiTimer = null;
    isAnimating = false;

    /*const posisiSaatIni = parseInt(imgKarakter.style.left) || 70;
        const posisiBaru = posisiSaatIni + pergerakanPx;

        console.log("posisiSaatIni %i", posisiSaatIni);
        console.log("posisiBaru %i", posisiBaru);

        console.log("imgKarakter di panggil");*/
    //imgKarakter.style.left = posisiBaru + "px";

    // Opsional: kembali ke frame awal
    frameSaatIni = 0;
  }
  const posisiSaatIni = parseInt(imgKarakter.style.left);
  const botPosisiSaatIni = parseInt(imgBotKarakter.style.left) || 70;

  // Cek apakah player menang
  if (posisiSaatIni >= batasPx && !isBotWin) {
    StopBot = true;
    isPlayerWin = true;
    clearInterval(timer);

    const currentTime = document.getElementById('display-waktu').textContent;
    const playerName = localStorage.getItem('namamu');

    // Tampilkan leaderboard
    showLeaderboard(playerName, currentTime, true);
  }
}



// Fungsi untuk animasi bot
function gantiBotFrame() {
  imgBotKarakter.src = botFramePaths[botFrameSaatIni];

  botFrameSaatIni++;

  if (botFrameSaatIni == 3) {

    if (isBotWin || StopBot) return;

    const posisiSaatIni = parseInt(imgBotKarakter.style.left) || 70;
    const posisiBaru = posisiSaatIni + pergerakanPx;

    console.log("Bot posisiSaatIni %i", posisiSaatIni);
    console.log("Bot posisiBaru %i", posisiBaru);

    imgBotKarakter.style.left = posisiBaru + "px";
  }

  if (botFrameSaatIni >= botFramePaths.length) {
    clearInterval(botAnimasiTimer);
    botAnimasiTimer = null;
    botIsAnimating = false;
    botFrameSaatIni = 0;

    // Cek apakah bot menang
    const botPosisiSaatIni = parseInt(imgBotKarakter.style.left) || 70;
    if (botPosisiSaatIni >= batasPx && !isPlayerWin) {
      isBotWin = true;
      StopBot = true;
      clearInterval(timer);

      const currentTime = document.getElementById('display-waktu').textContent;
      const playerName = localStorage.getItem('namamu');

      // Tampilkan leaderboard
      showLeaderboard(playerName, currentTime, false);
    }
  }
}

// Fungsi untuk bot melakukan jump otomatis
function botAutoJump() {
  if (!botIsAnimating) {
    if (isBotWin || StopBot) return;
    console.log("Bot melakukan jump!");
    botIsAnimating = true;
    botAnimasiTimer = setInterval(gantiBotFrame, 100);
  }
}

// Fungsi untuk memulai pergerakan otomatis bot
function startBotAutoMovement() {
  if (botAutoMoveTimer && !StopBot) clearInterval(botAutoMoveTimer);
  botAutoMoveTimer = setInterval(botAutoJump, botMoveDelay);
}

// Variabel untuk timing bar
let timingBarActive = false;
let timingIndicatorPosition = 0;
let timingDirection = 1;
let timingBarTimer = null;
let jumpSuccess = false;
let successZonePosition = 40; // Posisi zona putih (akan dirandom)
let successZoneWidth = 30; // Lebar zona putih (mulai lebar)
let gameAttempts = 0; // Jumlah percobaan untuk mengecilkan zona
let shrinkTimer = null; // Timer untuk mengecilkan zona
let isStunned = false; // Status apakah karakter sedang stunt

// Fungsi untuk mengupdate posisi indikator timing
function updateTimingIndicator() {
  const indicator = document.getElementById("timing-indicator");

  // Update posisi dengan kecepatan yang disesuaikan untuk bar kecil
  timingIndicatorPosition += timingDirection * 2;

  // Cek batas dan ubah arah (97% karena indicator width 6px dari 200px bar)
  if (timingIndicatorPosition >= 97) {
    timingIndicatorPosition = 97;
    timingDirection = -1;
  } else if (timingIndicatorPosition <= 0) {
    timingIndicatorPosition = 0;
    timingDirection = 1;
  }

  indicator.style.left = timingIndicatorPosition + "%";
}

// Fungsi untuk mengecilkan zona putih secara bertahap
function shrinkSuccessZone() {
  if (successZoneWidth > 3) {
    // Minimal width 3% (sama dengan lebar timing indicator)
    successZoneWidth -= 0.5; // Mengecil 0.5% setiap interval
    const successZone = document.getElementById("success-zone");
    successZone.style.width = successZoneWidth + "%";

    // Percepat bot saat zona mengecil
    if (successZoneWidth < 15 && botMoveDelay > 800) {
      botMoveDelay -= 50; // Kurangi delay bot
      startBotAutoMovement(); // Restart timer dengan delay baru
    }
  }
}

// Fungsi untuk randomkan posisi zona putih
function randomizeSuccessZone() {
  // Random posisi zona putih (10% - 70% agar tidak terlalu di pinggir)
  successZonePosition = Math.random() * 60 + 10;

  // Tentukan lebar berdasarkan jumlah percobaan
  if (gameAttempts === 0) {
    successZoneWidth = 30; // Awal game: lebar
  } else {
    // Setelah stunt, mulai lebar lagi tapi tidak selebar awal
    successZoneWidth = Math.max(15, 30 - gameAttempts * 2);
  }

  const successZone = document.getElementById("success-zone");
  successZone.style.left = successZonePosition + "%";
  successZone.style.width = successZoneWidth + "%";

  // Mulai timer untuk mengecilkan zona secara bertahap
  if (shrinkTimer) clearInterval(shrinkTimer);
  shrinkTimer = setInterval(shrinkSuccessZone, 200); // Mengecil setiap 200ms
}

// Fungsi untuk memulai timing bar
function startTimingBar() {
  const container = document.getElementById("timing-bar-container");
  container.style.display = "block";
  timingBarActive = true;
  timingIndicatorPosition = 0;
  timingDirection = 1;
  jumpSuccess = false;

  // Randomkan posisi zona hijau setiap kali mulai
  randomizeSuccessZone();

  // Reset posisi indicator ke awal
  const indicator = document.getElementById("timing-indicator");
  indicator.style.left = "0%";

  timingBarTimer = setInterval(updateTimingIndicator, 30);
}

// Fungsi untuk mengecek apakah jump berhasil
function checkJumpTiming() {
  const successZoneStart = successZonePosition;
  const successZoneEnd = successZonePosition + successZoneWidth;

  if (
    timingIndicatorPosition >= successZoneStart &&
    timingIndicatorPosition <= successZoneEnd
  ) {
    successJump();
  } else {
    failJump();
  }
}

// Fungsi untuk jump yang berhasil
function successJump() {
  jumpSuccess = true;
  timingBarActive = false;
  clearInterval(timingBarTimer);
  if (shrinkTimer) clearInterval(shrinkTimer);
  document.getElementById("timing-bar-container").style.display = "none";

  console.log("Jump berhasil!");
  gameAttempts++; // Increment attempts untuk membuat game lebih sulit

  isAnimating = true;
  animasiTimer = setInterval(gantiFrame, 100);
}

// Fungsi untuk jump yang gagal (stunt)
function failJump() {
  jumpSuccess = false;
  timingBarActive = false;
  clearInterval(timingBarTimer);
  if (shrinkTimer) clearInterval(shrinkTimer);

  console.log("Jump gagal! Terkena stunt!");

  // Set status stunt menjadi true
  isStunned = true;

  // Percepat bot saat player kena stunt
  if (botMoveDelay > 500) {
    botMoveDelay -= 200; // Kurangi delay bot secara signifikan
    startBotAutoMovement(); // Restart timer dengan delay baru
    console.log("Bot dipercepat! Delay sekarang:", botMoveDelay);
  }

  // Reset attempts untuk memberikan zona yang lebih lebar di timing bar berikutnya
  gameAttempts = Math.max(0, gameAttempts - 1);

  // Tambahkan efek stunt (karakter terjatuh atau terhenti sebentar)
  imgKarakter.style.filter = "brightness(0.5)";
  setTimeout(() => {
    imgKarakter.style.filter = "brightness(1)";
    // Sembunyikan timing bar setelah efek stunt selesai
    document.getElementById("timing-bar-container").style.display = "none";
    // Reset status stunt setelah efek selesai
    isStunned = false;
  }, 1000);

  // Tidak ada pergerakan karakter
  isAnimating = false;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();

    // Cek apakah karakter sedang stunt
    if (isStunned) {
      console.log("Karakter sedang stunt, tidak bisa jump!");
      return; // Keluar dari fungsi, tidak melakukan apapun
    }

    //return / ga ngapa ngapain kalo udh menang
    if (isBotWin || isPlayerWin) return;

    if (!isAnimating && !timingBarActive) {
      // Mulai timing bar
      console.log("Timing bar dimulai");
      startTimingBar();
    } else if (timingBarActive) {
      // Cek timing untuk jump
      console.log("Mengecek timing jump");
      checkJumpTiming();
    }
  }
});
let timer = null;
let totalMilidetik = 0;

// Fungsi untuk memperbarui waktu
function updateTimer() {
  totalMilidetik += 10;
  const menit = Math.floor(totalMilidetik / 60000);
  const sisaDetik = Math.floor((totalMilidetik % 60000) / 1000);
  const sisaMilidetik = totalMilidetik % 1000;

  const formatMenit = String(menit).padStart(2, "0");
  const formatDetik = String(sisaDetik).padStart(2, "0");
  const formatMilidetik = String(sisaMilidetik).padStart(3, "0");

  document.getElementById(
    "display-waktu"
  ).innerText = `${formatMenit}:${formatDetik}:${formatMilidetik}`;
}

// Fungsi untuk menampilkan hasil race
function showLeaderboard(playerName, playerTime, isPlayerWin) {
  const container = document.querySelector('.container-leaderboard');
  const gameResult = document.getElementById('game-result');
  const playerNameSpan = document.getElementById('player-name');
  const playerTimeSpan = document.getElementById('player-time');
  const botTimeSpan = document.getElementById('bot-time');
  const playerResult = document.getElementById('player-result');
  const botResult = document.getElementById('bot-result');
  const playerPosition = document.getElementById('player-position');
  const botPosition = document.getElementById('bot-position');
   const audio = document.getElementById("main-sound");
    audio.pause()

  // Update nama player
  playerNameSpan.textContent = playerName;
  playerTimeSpan.textContent = playerTime;

  // Update hasil berdasarkan pemenang
  if (isPlayerWin) {
    // Player menang
    gameResult.textContent = '🎉 YOU WIN! 🎉';
    gameResult.style.color = '#FFD700';

    playerPosition.textContent = '🥇';
    botPosition.textContent = '🥈';
    botTimeSpan.textContent = 'DNF'; // Did Not Finish

    playerResult.classList.add('winner');
    botResult.classList.remove('winner');
    let soundPlayer = new Audio('music/win.mp3');
    soundPlayer.play();
  } else {
    // Bot menang
    gameResult.textContent = '😢 BOT WINS! 😢';
    gameResult.style.color = '#FF6B6B';

    playerPosition.textContent = '🥈';
    botPosition.textContent = '🥇';
    botTimeSpan.textContent = playerTime; // Bot menang dengan waktu yang sama atau lebih cepat

    botResult.classList.add('winner');
    playerResult.classList.remove('winner');
    let soundPlayer = new Audio('music/lose.mp3');
    soundPlayer.play();
  }

  // Tampilkan leaderboard
  container.style.display = 'flex';
}

// Event listeners untuk tombol leaderboard
document.addEventListener('DOMContentLoaded', function () {
  const playAgainBtn = document.getElementById('play-again-btn');
  const homeBtn = document.getElementById('home-btn');

  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', function () {
      localStorage.setItem('mulaiTimer', 'true');
      window.location.reload();
    });
  }

  if (homeBtn) {
    homeBtn.addEventListener('click', function () {
      window.location.href = 'home.html';
    });
  }
});

// Saat halaman dimuat
window.addEventListener("load", function () {
  const mulaiTimer = localStorage.getItem("mulaiTimer");

  if (mulaiTimer === "true") {
    localStorage.removeItem("mulaiTimer");
    timer = setInterval(updateTimer, 10);

    // Mulai pergerakan otomatis bot
    startBotAutoMovement();
  }
});
