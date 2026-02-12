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
