// Love quotes in Mongolian and English
const loveQuotes = [
    "💕 Хайр бол амьдралын хамгийн сайхан мэдрэмж",
    "💖 Your love is my favorite kind of magic",
    "💝 Чиний инээмсэглэл миний өдрийг гэрэлтүүлдэг",
    "💓 Every love story is beautiful, but ours is my favorite",
    "💗 Хайр гэдэг бол хоёр зүрхний хамтын дуу хөгжим",
    "💘 You are my today and all of my tomorrows",
    "💞 Чамтай байхад цаг минь зогсдог шиг санагддаг",
    "💟 Love is not just looking at each other, it's looking in the same direction",
    "💌 Чиний хайр миний амьдралын хамгийн сайхан бэлэг",
    "💐 Together is a wonderful place to be"
];

let currentGame = '';
let gameScore = 0;

// Initialize floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 2000);
}

// Game selection functions
function startGame(gameType) {
    document.getElementById('gameMenu').style.display = 'none';
    currentGame = gameType;
    
    switch(gameType) {
        case 'memory':
            showMemoryGame();
            break;
        case 'heart-click':
            showHeartClickGame();
            break;
        case 'love-quiz':
            showLoveQuiz();
            break;
        case 'word-guess':
            showWordGuess();
            break;
    }
}

function backToMenu() {
    document.querySelectorAll('.game-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById('gameMenu').style.display = 'grid';
    currentGame = '';
}

function showLoveQuote() {
    const randomQuote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    document.getElementById('loveQuote').innerHTML = randomQuote;
    document.getElementById('quoteModal').style.display = 'block';
}

function closeQuote() {
    document.getElementById('quoteModal').style.display = 'none';
}

// Memory Game Logic
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryScore = 0;

const memorySymbols = ['💖', '💕', '💓', '💗', '💘', '💝', '💞', '💟'];

function showMemoryGame() {
    document.getElementById('memoryGame').style.display = 'block';
    initMemoryGame();
}

function initMemoryGame() {
    const gameSymbols = [...memorySymbols, ...memorySymbols];
    gameSymbols.sort(() => Math.random() - 0.5);
    
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryScore = 0;
    
    gameSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = '❤️';
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        memoryCards.push(card);
    });
    
    updateMemoryScore();
}

function flipCard(e) {
    const card = e.target;
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.symbol;
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        memoryScore += 10;
        flippedCards = [];
        
        if (matchedPairs === memorySymbols.length) {
            setTimeout(() => {
                showLoveQuote();
                memoryScore += 50; // Bonus points
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '❤️';
        card2.innerHTML = '❤️';
        flippedCards = [];
    }
    
    updateMemoryScore();
}

function updateMemoryScore() {
    document.getElementById('memoryScore').textContent = memoryScore;
}

function resetMemoryGame() {
    initMemoryGame();
}

// Heart Click Game Logic
let heartClickScore = 0;
let heartTime = 30;
let heartGameActive = false;
let heartInterval;
let heartTimer;

function showHeartClickGame() {
    document.getElementById('heartClickGame').style.display = 'block';
    resetHeartGame();
}

function startHeartGame() {
    if (heartGameActive) return;
    
    heartGameActive = true;
    heartClickScore = 0;
    heartTime = 30;
    updateHeartScore();
    
    heartTimer = setInterval(() => {
        heartTime--;
        updateHeartTime();
        
        if (heartTime <= 0) {
            endHeartGame();
        }
    }, 1000);
    
    heartInterval = setInterval(createClickableHeart, 800);
}

function createClickableHeart() {
    if (!heartGameActive) return;
    
    const heartArea = document.getElementById('heartArea');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = ['💖', '💕', '💓', '💗', '💘'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * (heartArea.clientWidth - 50) + 'px';
    heart.style.top = Math.random() * (heartArea.clientHeight - 50) + 'px';
    
    heart.addEventListener('click', () => {
        heartClickScore++;
        updateHeartScore();
        heart.remove();
    });
    
    heartArea.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

function updateHeartScore() {
    document.getElementById('heartScore').textContent = heartClickScore;
}

function updateHeartTime() {
    document.getElementById('heartTime').textContent = heartTime;
}

function endHeartGame() {
    heartGameActive = false;
    clearInterval(heartTimer);
    clearInterval(heartInterval);
    
    document.getElementById('heartArea').innerHTML = '';
    
    if (heartClickScore >= 20) {
        setTimeout(showLoveQuote, 500);
    }
}

function resetHeartGame() {
    heartGameActive = false;
    heartClickScore = 0;
    heartTime = 30;
    clearInterval(heartTimer);
    clearInterval(heartInterval);
    document.getElementById('heartArea').innerHTML = '';
    updateHeartScore();
    updateHeartTime();
}

// Love Quiz Logic
const quizQuestions = [
    {
        question: "Валентины өдөр хэзээ тэмдэглэдэг вэ?",
        options: ["Хоёрдугаар сарын 14", "Гуравдугаар сарын 14", "Дөрөвдүгээр сарын 14", "Тавдугаар сарын 14"],
        correct: 0
    },
    {
        question: "Хайрын бурхан хэн бэ?",
        options: ["Аполло", "Купидон", "Зевс", "Марс"],
        correct: 1
    },
    {
        question: "Анхны хайрын захидал хэзээ бичигдсэн бэ?",
        options: ["1415 он", "1500 он", "1600 он", "1700 он"],
        correct: 0
    },
    {
        question: "Улаан сарнай ямар утгатай вэ?",
        options: ["Найрамдал", "Хүндэтгэл", "Хайр", "Баяр баясгалан"],
        correct: 2
    },
    {
        question: "Зүрх хэлбэрийн тэмдэг хаанаас гарал үүссэн бэ?",
        options: ["Египет", "Грек", "Ром", "Энэтхэг"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;

function showLoveQuiz() {
    document.getElementById('loveQuiz').style.display = 'block';
    initQuiz();
}

function initQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    showQuestion();
    updateQuizScore();
}

function showQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        if (quizScore >= 4) {
            setTimeout(showLoveQuote, 500);
        }
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    
    if (selectedIndex === question.correct) {
        quizScore++;
    }
    
    currentQuestionIndex++;
    updateQuizScore();
    
    setTimeout(() => {
        showQuestion();
    }, 1000);
}

function updateQuizScore() {
    document.getElementById('quizScore').textContent = `${quizScore}/${quizQuestions.length}`;
}

// Word Guess Game Logic
const romanticWords = [
    'ХАЙР', 'СЭТГЭЛ', 'ДУРЛАЛ', 'ИНЭЭМСЭГЛЭЛ', 'БАЯР', 
    'ГЭРЭЛ', 'МӨРӨӨДӨЛ', 'ЗҮРХ', 'АМЬДРАЛ', 'АЯЛГУУ'
];

let currentWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
let maxWrongGuesses = 6;

function showWordGuess() {
    document.getElementById('wordGuess').style.display = 'block';
    initWordGame();
}

function initWordGame() {
    currentWord = romanticWords[Math.floor(Math.random() * romanticWords.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    createAlphabet();
    updateWordDisplay();
    updateGuessesLeft();
}

function createAlphabet() {
    const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ';
    const alphabetContainer = document.getElementById('alphabet');
    alphabetContainer.innerHTML = '';
    
    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.className = 'letter-btn';
        button.textContent = letter;
        button.addEventListener('click', () => guessLetter(letter, button));
        alphabetContainer.appendChild(button);
    }
}

function guessLetter(letter, button) {
    button.disabled = true;
    guessedLetters.push(letter);
    
    if (currentWord.includes(letter)) {
        button.style.background = '#27ae60';
        updateWordDisplay();
        
        if (currentWord.split('').every(char => guessedLetters.includes(char))) {
            setTimeout(showLoveQuote, 500);
        }
    } else {
        button.style.background = '#e74c3c';
        wrongGuesses++;
        updateGuessesLeft();
        
        if (wrongGuesses >= maxWrongGuesses) {
            setTimeout(() => {
                alert('Дуусав! Үг нь: ' + currentWord);
                resetWordGame();
            }, 500);
        }
    }
}

function updateWordDisplay() {
    const display = currentWord.split('').map(char => 
        guessedLetters.includes(char) ? char : '_'
    ).join(' ');
    document.getElementById('wordDisplay').textContent = display;
}

function updateGuessesLeft() {
    document.getElementById('guessesLeft').textContent = maxWrongGuesses - wrongGuesses;
}

function resetWordGame() {
    initWordGame();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
        closeQuote();
    }
};

// New games logic addition to the existing script.js

// Add to the startGame function
function startGame(gameType) {
    document.getElementById('gameMenu').style.display = 'none';
    currentGame = gameType;
    
    // ... existing cases ...
    
    switch(gameType) {
        // ... existing cases ...
        case 'love-tictactoe':
            showTicTacToe();
            break;
        case 'claw-machine':
            showClawMachine();
            break;
        case 'love-maze':
            showLoveMaze();
            break;
        case 'cupid-arrow':
            showCupidArrow();
            break;
        case 'love-pairs':
            showLovePairs();
            break;
    }
}

// Love Tic-Tac-Toe Game Logic
let ticBoard = Array(9).fill('');
let currentTicPlayer = '💖';
let heartsWins = 0;
let cupidarrowsWins = 0;

function showTicTacToe() {
    document.getElementById('loveTicTacToe').style.display = 'block';
    initTicTacGame();
}

function initTicTacGame() {
    ticBoard = Array(9).fill('');
    currentTicPlayer = '💖';
    const board = document.getElementById('ticTacBoard');
    board.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'tic-cell';
        cell.addEventListener('click', () => makeTicMove(i));
        board.appendChild(cell);
    }
    
    updateTicDisplay();
}

function makeTicMove(index) {
    if (ticBoard[index] === '') {
        ticBoard[index] = currentTicPlayer;
        document.querySelectorAll('.tic-cell')[index].textContent = currentTicPlayer;
        
        if (checkTicWin()) {
            setTimeout(() => {
                alert(`${currentTicPlayer} ялалт байлаа! 💕`);
                if (currentTicPlayer === '💖') heartsWins++;
                else cupidarrowsWins++;
                showLoveQuote();
                updateTicWins();
                initTicTacGame();
            }, 300);
        } else if (ticBoard.every(cell => cell !== '')) {
            setTimeout(() => {
                alert('Тэнцээ! 💫');
                initTicTacGame();
            }, 300);
        } else {
            currentTicPlayer = currentTicPlayer === '💖' ? '💘' : '💖';
            updateTicDisplay();
        }
    }
}

function checkTicWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // columns
        [0,4,8], [2,4,6] // diagonals
    ];
    
    return winPatterns.some(pattern => 
        pattern.every(index => ticBoard[index] === currentTicPlayer)
    );
}

function updateTicDisplay() {
    document.getElementById('currentPlayer').textContent = `💖 Player: ${currentTicPlayer}`;
}

function updateTicWins() {
    document.getElementById('heartsWins').textContent = heartsWins;
    document.getElementById('cupidarrowsWins').textContent = cupidarrowsWins;
}

function resetTicTacGame() {
    initTicTacGame();
}

// Claw Machine Game Logic
let clawPosition = 50;
let clawScore = 0;
let clawAttempts = 10;
let prizes = [];

function showClawMachine() {
    document.getElementById('clawMachine').style.display = 'block';
    initClawGame();
}

function initClawGame() {
    clawPosition = 50;
    clawScore = 0;
    clawAttempts = 10;
    prizes = [];
    
    createPrizes();
    updateClawScore();
    updateClawPosition();
}

function createPrizes() {
    const prizeSymbols = ['🎁', '💝', '🌹', '🧸', '💍', '🍫', '💖', '🦋'];
    const prizesContainer = document.getElementById('clawPrizes');
    prizesContainer.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const prize = document.createElement('div');
        prize.className = 'prize';
        prize.textContent = prizeSymbols[Math.floor(Math.random() * prizeSymbols.length)];
        prize.style.left = (i * 10 + 15) + '%';
        prizesContainer.appendChild(prize);
        prizes.push(prize);
    }
}

function moveClaw(direction) {
    if (direction === 'left' && clawPosition > 10) {
        clawPosition -= 10;
    } else if (direction === 'right' && clawPosition < 90) {
        clawPosition += 10;
    }
    updateClawPosition();
}

function updateClawPosition() {
    document.getElementById('claw').style.left = clawPosition + '%';
}

function dropClaw() {
    if (clawAttempts <= 0) return;
    
    clawAttempts--;
    const claw = document.getElementById('claw');
    
    // Animate claw drop
    claw.style.top = '300px';
    
    setTimeout(() => {
        // Check if claw caught a prize
        prizes.forEach((prize, index) => {
            const prizeLeft = parseInt(prize.style.left);
            if (Math.abs(prizeLeft - clawPosition) < 8) {
                prize.classList.add('caught');
                clawScore++;
                setTimeout(() => {
                    prize.remove();
                    prizes.splice(index, 1);
                }, 500);
            }
        });
        
        // Reset claw position
        claw.style.top = '10px';
        updateClawScore();
        
        if (clawAttempts === 0 || prizes.length === 0) {
            if (clawScore >= 3) {
                setTimeout(showLoveQuote, 1000);
            }
        }
    }, 1000);
}

function updateClawScore() {
    document.getElementById('clawScore').textContent = clawScore;
    document.getElementById('clawAttempts').textContent = clawAttempts;
}

function resetClawGame() {
    initClawGame();
}

// Love Maze Game Logic
let mazeGrid = [];
let playerPos = {x: 1, y: 1};
let goalPos = {x: 14, y: 14};
let mazeSteps = 0;
let mazeStartTime = 0;
let mazeTimer = null;

function showLoveMaze() {
    document.getElementById('loveMaze').style.display = 'block';
    initMazeGame();
}

function initMazeGame() {
    generateMaze();
    playerPos = {x: 1, y: 1};
    mazeSteps = 0;
    mazeStartTime = Date.now();
    
    if (mazeTimer) clearInterval(mazeTimer);
    mazeTimer = setInterval(updateMazeTime, 1000);
    
    renderMaze();
    updateMazeStats();
}

function generateMaze() {
    const size = 16;
    mazeGrid = [];
    
    // Initialize with walls
    for (let y = 0; y < size; y++) {
        mazeGrid[y] = [];
        for (let x = 0; x < size; x++) {
            mazeGrid[y][x] = (x % 2 === 1 && y % 2 === 1) ? 0 : 1; // 0 = path, 1 = wall
        }
    }
    
    // Simple maze generation - create paths
    const paths = [
        [1,3], [3,1], [3,3], [5,1], [5,3], [5,5], [7,3], [7,5], [9,1], [9,3], [9,5],
        [11,3], [11,5], [13,1], [13,3], [13,5], [1,7], [3,7], [5,7], [7,7], [9,7],
        [11,7], [13,7], [1,11], [3,11], [5,11], [7,11], [9,11], [11,11], [13,11],
        [1,13], [3,13], [5,13], [7,13], [9,13], [11,13], [13,13]
    ];
    
    paths.forEach(([x, y]) => {
        if (x < size && y < size) mazeGrid[y][x] = 0;
    });
    
    // Connect some paths
    for (let i = 1; i < size - 1; i += 2) {
        for (let j = 1; j < size - 1; j += 2) {
            if (Math.random() < 0.3) {
                if (i + 1 < size - 1) mazeGrid[j][i + 1] = 0;
                if (j + 1 < size - 1) mazeGrid[j + 1][i] = 0;
            }
        }
    }
}

function renderMaze() {
    const mazeArea = document.getElementById('mazeArea');
    mazeArea.innerHTML = '';
    
    mazeGrid.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'maze-cell';
            cellDiv.style.left = (x * 25) + 'px';
            cellDiv.style.top = (y * 25) + 'px';
            
            if (cell === 1) {
                cellDiv.classList.add('maze-wall');
            } else {
                cellDiv.classList.add('maze-path');
            }
            
            if (x === playerPos.x && y === playerPos.y) {
                cellDiv.classList.add('maze-player');
                cellDiv.textContent = '💖';
            }
            
            if (x === goalPos.x && y === goalPos.y) {
                cellDiv.classList.add('maze-goal');
                cellDiv.textContent = '💍';
            }
            
            mazeArea.appendChild(cellDiv);
        });
    });
}

function moveMaze(direction) {
    let newX = playerPos.x;
    let newY = playerPos.y;
    
    switch(direction) {
        case 'up': newY--; break;
        case 'down': newY++; break;
        case 'left': newX--; break;
        case 'right': newX++; break;
    }
    
    if (newX >= 0 && newX < 16 && newY >= 0 && newY < 16 && mazeGrid[newY][newX] === 0) {
        playerPos.x = newX;
        playerPos.y = newY;
        mazeSteps++;
        
        if (newX === goalPos.x && newY === goalPos.y) {
            clearInterval(mazeTimer);
            setTimeout(() => {
                showLoveQuote();
                alert('Баяр хүргэе! Та хайраа олсон байна! 💕');
            }, 500);
        }
        
        renderMaze();
        updateMazeStats();
    }
}

function updateMazeStats() {
    document.getElementById('mazeSteps').textContent = mazeSteps;
}

function updateMazeTime() {
    const elapsed = Math.floor((Date.now() - mazeStartTime) / 1000);
    document.getElementById('mazeTime').textContent = elapsed;
}

function resetMazeGame() {
    if (mazeTimer) clearInterval(mazeTimer);
    initMazeGame();
}

// Cupid Arrow Game Logic
let arrowScore = 0;
let arrowsLeft = 15;
let movingHearts = [];
let arrowInterval = null;

function showCupidArrow() {
    document.getElementById('cupidArrow').style.display = 'block';
    initArrowGame();
}

function initArrowGame() {
    arrowScore = 0;
    arrowsLeft = 15;
    movingHearts = [];
    
    updateArrowScore();
    startMovingHearts();
}

function startMovingHearts() {
    arrowInterval = setInterval(() => {
        createMovingHeart();
    }, 2000);
}

function createMovingHeart() {
    const heartsSymbols = ['💖', '💕', '💗', '💓', '💘'];
    const heart = document.createElement('div');
    heart.className = 'moving-heart';
    heart.textContent = heartsSymbols[Math.floor(Math.random() * heartsSymbols.length)];
    heart.style.top = Math.random() * 300 + 'px';
    
    document.getElementById('arrowTargets').appendChild(heart);
    movingHearts.push(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
            movingHearts = movingHearts.filter(h => h !== heart);
        }
    }, 4000);
}

function shootArrow() {
    if (arrowsLeft <= 0) return;
    
    arrowsLeft--;
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    document.getElementById('arrowArea').appendChild(arrow);
    
    // Check for hits
    setTimeout(() => {
        movingHearts.forEach((heart, index) => {
            const heartRect = heart.getBoundingClientRect();
            const arrowRect = arrow.getBoundingClientRect();
            
            if (heartRect.left < arrowRect.left + 10 && 
                heartRect.right > arrowRect.left &&
                heartRect.top < arrowRect.bottom &&
                heartRect.bottom > arrowRect.top) {
                
                arrowScore++;
                heart.style.animation = 'none';
                heart.style.color = '#ff6b6b';
                heart.textContent = '💥';
                
                setTimeout(() => {
                    heart.remove();
                    movingHearts.splice(index, 1);
                }, 300);
            }
        });
        
        arrow.remove();
        updateArrowScore();
        
        if (arrowsLeft === 0) {
            clearInterval(arrowInterval);
            if (arrowScore >= 8) {
                setTimeout(showLoveQuote, 1000);
            }
        }
    }, 1000);
}

function updateArrowScore() {
    document.getElementById('arrowScore').textContent = arrowScore;
    document.getElementById('arrowsLeft').textContent = arrowsLeft;
}

function resetArrowGame() {
    if (arrowInterval)

