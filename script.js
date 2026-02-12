// --- Ерөнхий тохиргоо болон Хувьсагчид ---
const loveQuotes = [
    "💕 Хайр бол амьдралын хамгийн сайхан мэдрэмж",
    "💖 Your love is my favorite kind of magic",
    "💝 Чиний инээмсэглэл миний өдрийг гэрэлтүүлдэг",
    "💓 Every love story is beautiful, but ours is my favorite",
    "💌 Чиний хайр миний амьдралын хамгийн сайхан бэлэг"
];

// Цэс солих функц
function startGame(gameType) {
    document.getElementById('gameMenu').style.display = 'none';
    document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none');
    
    const target = document.getElementById(gameType);
    if (target) target.style.display = 'block';

    // Тоглоом бүрийг эхлүүлэх
    if (gameType === 'memory') initMemoryGame();
    if (gameType === 'tic-tac-toe') initTicTacToe();
    if (gameType === 'claw-machine') initClawGame();
    if (gameType === 'love-maze') initMaze();
    if (gameType === 'love-quiz') initQuiz();
    if (gameType === 'word-guess') initWordGuess();
    if (gameType === 'cupid-arrow') resetArrowGame();
}

function backToMenu() {
    document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none');
    document.getElementById('gameMenu').style.display = 'grid';
    // Таймеруудыг зогсоох
    clearInterval(heartInterval);
    clearInterval(heartTimer);
}

function showLoveQuote() {
    document.getElementById('loveQuote').innerText = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    document.getElementById('quoteModal').style.display = 'flex';
}

function closeQuote() {
    document.getElementById('quoteModal').style.display = 'none';
}

// 1. Memory Game
let memorySymbols = ['💖','💖','🌹','🌹','🧸','🧸','💎','💎','🍭','🍭','🎁','🎁','🎀','🎀','🎈','🎈'];
let flippedCards = [];
function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    flippedCards = [];
    memorySymbols.sort(() => Math.random() - 0.5);
    memorySymbols.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = s;
        card.dataset.index = i;
        card.innerText = '❤️';
        card.onclick = function() { flipCard(card); };
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.innerText = card.dataset.symbol;
        card.classList.add('flipped');
        card.style.background = 'white';
        flippedCards.push(card);
        if (flippedCards.length === 2) setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
        flippedCards = [];
        if (document.querySelectorAll('.flipped').length === 16) showLoveQuote();
    } else {
        flippedCards.forEach(c => {
            c.innerText = '❤️';
            c.classList.remove('flipped');
            c.style.background = '#ff6b9d';
        });
        flippedCards = [];
    }
}

// 2. Heart Click Game
let hScore = 0, hTime = 30, heartInterval, heartTimer;
function startHeartGame() {
    hScore = 0; hTime = 30;
    document.getElementById('heartScore').innerText = hScore;
    document.getElementById('heartArea').innerHTML = '';
    
    heartTimer = setInterval(() => {
        hTime--;
        document.getElementById('heartTime').innerText = hTime;
        if (hTime <= 0) {
            clearInterval(heartTimer); clearInterval(heartInterval);
            alert("Цаг дууслаа! Оноо: " + hScore);
        }
    }, 1000);

    heartInterval = setInterval(() => {
        const h = document.createElement('div');
        h.className = 'floating-heart';
        h.innerText = '❤️';
        h.style.left = Math.random() * 85 + '%';
        h.style.top = Math.random() * 85 + '%';
        h.onclick = () => { hScore++; document.getElementById('heartScore').innerText = hScore; h.remove(); };
        document.getElementById('heartArea').appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }, 700);
}

// 3. Tic Tac Toe
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttPlayer = '💖';
function initTicTacToe() {
    const b = document.getElementById('ticTacBoard'); b.innerHTML = '';
    tttBoard = Array(9).fill('');
    tttPlayer = '💖';
    document.getElementById('gameStatus').innerText = "💖-ийн ээлж";
    for(let i=0; i<9; i++) {
        const c = document.createElement('div');
        c.className = 'tic-cell';
        c.onclick = () => {
            if(tttBoard[i] === '') {
                tttBoard[i] = tttPlayer;
                c.innerText = tttPlayer;
                if(checkWin()) { alert(tttPlayer + " яллаа!"); showLoveQuote(); }
                tttPlayer = tttPlayer === '💖' ? '💝' : '💖';
                document.getElementById('gameStatus').innerText = tttPlayer + "-ийн ээлж";
            }
        };
        b.appendChild(c);
    }
}
function checkWin() {
    const w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return w.some(p => tttBoard[p[0]] && tttBoard[p[0]] === tttBoard[p[1]] && tttBoard[p[0]] === tttBoard[p[2]]);
}

// 4. Claw Machine
let clawPos = 50;
function initClawGame() {
    clawPos = 50; drawClaw();
    document.getElementById('prizesArea').innerHTML = '🎁 🧸 🌹 💍 🍫 🎁';
}
function drawClaw() { document.getElementById('claw').style.left = clawPos + '%'; }
// Утасны товчлуурт зориулсан хөдөлгөөн
document.getElementById('moveLeftBtn').onclick = () => { if(clawPos > 10) clawPos -= 10; drawClaw(); };
document.getElementById('moveRightBtn').onclick = () => { if(clawPos < 90) clawPos += 10; drawClaw(); };
function grabPrize() {
    const c = document.getElementById('claw');
    c.classList.add('grabbing');
    setTimeout(() => {
        c.classList.remove('grabbing');
        if(Math.random() > 0.5) { alert("Бэлэг авлаа! 🎉"); showLoveQuote(); }
    }, 600);
}

// 5. Maze
let pPos = {x:0, y:0};
function initMaze() {
    const g = document.getElementById('mazeGrid');
    g.innerHTML = '<div id="mPlayer" class="maze-cell" style="left:0;top:0">🏹</div><div class="maze-cell" style="right:0;bottom:0">💖</div>';
    pPos = {x:0, y:0};
}
function moveMaze(dir) {
    const step = 30; // 300px grid-д 30px алхам
    if(dir === 'right' && pPos.x < 270) pPos.x += step;
    if(dir === 'left' && pPos.x > 0) pPos.x -= step;
    if(dir === 'down' && pPos.y < 270) pPos.y += step;
    if(dir === 'up' && pPos.y > 0) pPos.y -= step;
    const p = document.getElementById('mPlayer');
    p.style.left = pPos.x + 'px'; p.style.top = pPos.y + 'px';
    if(pPos.x === 270 && pPos.y === 270) { alert("Барианд орлоо!"); showLoveQuote(); }
}

// 6. Cupid Arrow
let power = 0, pInt, arrows = 10;
function chargePower() {
    if(arrows <= 0) return;
    power = 0; 
    pInt = setInterval(() => { 
        if(power < 100) power += 5; 
        document.getElementById('powerFill').style.width = power + '%'; 
    }, 50);
}
function shootArrow() {
    clearInterval(pInt);
    arrows--; document.getElementById('arrowsLeft').innerText = arrows;
    if(power > 60 && power < 90) { alert("Онолоо! 🎯"); showLoveQuote(); }
    document.getElementById('powerFill').style.width = '0%';
}
function resetArrowGame() { arrows = 10; document.getElementById('arrowsLeft').innerText = arrows; }

// 7. Love Calculator
function calculateLove() {
    const n1 = document.getElementById('name1').value;
    const n2 = document.getElementById('name2').value;
    if(!n1 || !n2) return alert("Нэрсээ оруулна уу!");
    const p = Math.floor(Math.random() * 51) + 50;
    document.getElementById('loveResult').innerHTML = `<h1 style="color:#e91e63">${p}% ❤️</h1><p>Төгс зохицол!</p>`;
}

// 8