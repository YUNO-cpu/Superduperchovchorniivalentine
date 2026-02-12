// --- Ерөнхий тохиргоо болон Хувьсагчид ---
const loveQuotes = [
    "💕 Хайр бол амьдралын хамгийн сайхан мэдрэмж",
    "💖 Your love is my favorite kind of magic",
    "💝 Чиний инээмсэглэл миний өдрийг гэрэлтүүлдэг",
    "💓 Every love story is beautiful, but ours is my favorite",
    "💌 Чиний хайр миний амьдралын хамгийн сайхан бэлэг"
];

let heartInterval, heartTimer;

// Цэс солих функц
function startGame(gameType) {
    document.getElementById('gameMenu').style.display = 'none';
    document.querySelectorAll('.game-container').forEach(c => c.style.display = 'none');
    
    // HTML дээрх ID-нуудтай тааруулж засах
    let targetId = gameType;
    if (gameType === 'tic-tac-toe') targetId = 'ticTacToe';
    if (gameType === 'claw-machine') targetId = 'clawMachine';
    if (gameType === 'love-maze') targetId = 'loveMaze';
    if (gameType === 'love-calculator') targetId = 'loveCalculator';
    if (gameType === 'cupid-arrow') targetId = 'cupidArrow';

    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
    } else {
        console.error("Game ID олдсонгүй:", targetId);
    }

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
            c.style.background = 'linear-gradient(45deg, #ff9a9e, #fecfef)';
        });
        flippedCards = [];
    }
}

// 2. Heart Click Game
let hScore = 0, hTime = 30;
function startHeartGame() {
    hScore = 0; hTime = 30;
    document.getElementById('heartScore').innerText = hScore;
    document.getElementById('heartArea').innerHTML = '';
    
    clearInterval(heartTimer);
    clearInterval(heartInterval);

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
        setTimeout(() => { if(h) h.remove(); }, 2000);
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
                if(checkTTTWin()) { alert(tttPlayer + " яллаа!"); showLoveQuote(); return; }
                tttPlayer = tttPlayer === '💖' ? '💝' : '💖';
                document.getElementById('gameStatus').innerText = tttPlayer + "-ийн ээлж";
            }
        };
        b.appendChild(c);
    }
}
function checkTTTWin() {
    const w = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return w.some(p => tttBoard[p[0]] && tttBoard[p[0]] === tttBoard[p[1]] && tttBoard[p[0]] === tttBoard[p[2]]);
}
function resetTicTacToe() { initTicTacToe(); }

// 4. Claw Machine
let clawPos = 50;
function initClawGame() {
    clawPos = 50; drawClaw();
    document.getElementById('prizesArea').innerHTML = '<span class="prize">🎁</span><span class="prize">🧸</span><span class="prize">🌹</span><span class="prize">💍</span><span class="prize">🍫</span>';
}
function drawClaw() { document.getElementById('claw').style.left = clawPos + '%'; }
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
let mPos = {x:0, y:0};
function initMaze() {
    const g = document.getElementById('mazeGrid');
    g.innerHTML = '<div id="mPlayer" class="maze-cell maze-player" style="left:0;top:0">🏹</div><div class="maze-cell maze-goal" style="right:0;bottom:0">💖</div>';
    mPos = {x:0, y:0};
}
function moveMaze(dir) {
    const step = 25; 
    if(dir === 'right' && mPos.x < 475) mPos.x += step;
    if(dir === 'left' && mPos.x > 0) mPos.x -= step;
    if(dir === 'down' && mPos.y < 475) mPos.y += step;
    if(dir === 'up' && mPos.y > 0) mPos.y -= step;
    const p = document.getElementById('mPlayer');
    p.style.left = mPos.x + 'px'; p.style.top = mPos.y + 'px';
    if(mPos.x === 475 && mPos.y === 475) { alert("Барианд орлоо!"); showLoveQuote(); }
}
function resetMaze() { initMaze(); }

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
    if(arrows <= 0) return;
    arrows--; document.getElementById('arrowsLeft').innerText = arrows;
    if(power > 60 && power < 90) { 
        alert("Онолоо! 🎯"); 
        showLoveQuote(); 
    } else {
        alert("Алдлаа! Дахиад хичээгээрэй.");
    }
    document.getElementById('powerFill').style.width = '0%';
}
function resetArrowGame() { arrows = 10; document.getElementById('arrowsLeft').innerText = arrows; power = 0; document.getElementById('powerFill').style.width = '0%'; }

// 7. Love Calculator
function calculateLove() {
    const n1 = document.getElementById('name1').value;
    const n2 = document.getElementById('name2').value;
    if(!n1 || !n2) return alert("Нэрсээ оруулна уу!");
    const p = Math.floor(Math.random() * 51) + 50;
    document.getElementById('loveResult').innerHTML = `<h1 style="color:#e91e63">${p}% ❤️</h1><p>${n1} ба ${n2} хоёр төгс зохицож байна!</p>`;
}

// 8. Quiz
const quizData = [
    { q: "Валентин хэдэн сард болдог вэ?", a: ["2-р сард", "3-р сард", "1-р сард"], c: 0 },
    { q: "Хайрын бурхан Купидон юугаар харвадаг вэ?", a: ["Буугаар", "Сумаар", "Чулуугаар"], c: 1 },
    { q: "Сарнай цэцэг юуг илэрхийлдэг вэ?", a: ["Хайр", "Уур", "Найз"], c: 0 }
];
let qIdx = 0;
function initQuiz() {
    qIdx = 0;
    document.getElementById('quizScore').innerText = 0;
    showQuestion();
}
function showQuestion() {
    if(qIdx >= quizData.length) { showLoveQuote(); return; }
    const d = quizData[qIdx];
    document.getElementById('quizQuestion').innerText = d.q;
    const opt = document.getElementById('quizOptions'); opt.innerHTML = '';
    d.a.forEach((s, i) => {
        const b = document.createElement('button');
        b.className = 'quiz-option';
        b.innerText = s; 
        b.onclick = () => { 
            if(i === d.c) {
                qIdx++; 
                document.getElementById('quizScore').innerText = qIdx;
                showQuestion(); 
            } else {
                alert("Буруу байна, дахиад бодоорой!");
            }
        };
        opt.appendChild(b);
    });
}

// 9. Word Guess
const wordsList = ["ХАЙР", "СЭТГЭЛ", "ЗҮРХ", "САРНАЙ", "БЭЛЭГ"];
let selectedWord = "", guessedLetters = [], attempts = 6;
function initWordGuess() {
    selectedWord = wordsList[Math.floor(Math.random()*wordsList.length)];
    guessedLetters = [];
    attempts = 6;
    document.getElementById('guessesLeft').innerText = attempts;
    updateWordDisplay();
    createAlphabet();
}
function updateWordDisplay() {
    let display = selectedWord.split('').map(l => guessedLetters.includes(l) ? l : "_").join(" ");
    document.getElementById('wordDisplay').innerText = display;
    if(!display.includes("_")) { alert("Баяр хүргэе! Та үгийг таалаа."); showLoveQuote(); }
}
function createAlphabet() {
    const alpha = document.getElementById('alphabet'); alpha.innerHTML = '';
    "АБВГДЕЁЖЗИЙКЛМНОПРСТУҮФХЦЧШЩЪЫЬЭЮЯ".split('').forEach(l => {
        const b = document.createElement('button');
        b.className = 'letter-btn'; b.innerText = l;
        b.onclick = () => {
            b.disabled = true;
            if(selectedWord.includes(l)) {
                guessedLetters.push(l);
            } else {
                attempts--;
                document.getElementById('guessesLeft').innerText = attempts;
            }
            updateWordDisplay();
            if(attempts <= 0) { alert("Та ялагдлаа! Үг нь: " + selectedWord); initWordGuess(); }
        };
        alpha.appendChild(b);
    });
}
function resetWordGame() { initWordGuess(); }
