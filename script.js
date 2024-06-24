const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const deck = [...letters, ...letters];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the deck
function shuffleDeck(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board
function createBoard() {
    const shuffledDeck = shuffleDeck(deck);
    for (let i = 0; i < shuffledDeck.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = shuffledDeck[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}

// Flip a card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.letter;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.letter === card2.dataset.letter) {
        matchedPairs++;
        if (matchedPairs === letters.length) {
            message.textContent = 'Congratulations! You won the game!';
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

// Initialize the game
createBoard();