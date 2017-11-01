
var inquirer = require('inquirer');
var LetterUtil = require('./Letter');
var WordUtil = require('./Word');
var gameWords = require('./gameWords');
var validLetters = require('./validLetters');

var HangmanCLI = function() {
    // Array of Words
    this.gameWords = gameWords;
    // Array of letters guessed
    this.lettersGuessed = [];
    // Count of letters guessed Correctly
    this.lettersGuessedCorrectly = 0;
    // Max Guesses
    this.maxGuesses = 7;
    // # of guesses left
    this.remainingGuesses = this.maxGuesses;
    // # of wins
    this.wins = 0;
    // # of losses
    this.losses = 0;
    // Variable for setting word used in a round of hangman
    this.currentWord;
    // Game Message Variable
    this.gameMessage;
    // You Lost Message
    this.correctMessage = 'CORRECT!!!';
    // You Won Message
    this.incorrectMessage = 'INCORRECT!!!';
    // Wins Label
    this.winsLabel = 'Wins: ';
    // Loses Label
    this.losesLabel = 'Losses: ';
    // Play Again Message
    this.playAgainMessage = 'Play Again?';
    // You Lost Message
    this.youLostMessage = 'You Lose!';
    // You Won Message
    this.youWonMessage = 'You\'re a Winner!';
    // Guess Prompt Message
    this.guessPromptMessage = 'Guess a Letter...';
    // Game Start Message
    this.gameStartMessage = 'Welcome to Italian Food Hangman! All these words are an Italian Food of some kind. Good luck, and have fun!';
};

// Method for Initializing the game.
HangmanCLI.prototype.init = function() {
    // Generate Random Word
    this.generateRandomWord();
    // Render Game Start Message
    this.renderGameInitMessage();
    // Prompt for first guess
    this.promptForGuess();
};

HangmanCLI.prototype.renderGameInitMessage = function() {
    console.log('\n');
    console.log(this.gameStartMessage + '\n');
}

// Method for Prompting the user for guess.
HangmanCLI.prototype.promptForGuess = function() {
    // Render the word for the game
    this.renderWord();
    // console.log('Prompting for guess...');
    var question = {
        type: 'input',
        name: 'guess',
        message: this.guessPromptMessage,
        validate: this.validateLetterGuessed.bind(this),
    };

    console.log('Remaining Guesses: ' + this.remainingGuesses + '\n');

    // Prompt for question, bind this context to callback.
    // See this article: https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    inquirer.prompt([question]).then(this.trackLetterGuessed.bind(this));
};

// Prompt for Playing Again?
HangmanCLI.prototype.promptPlayAgain = function() {
    var question = {
        type: 'confirm',
        name: 'playagain',
        message: this.playAgainMessage,
    };

    inquirer.prompt([question]).then(this.handlePlayAgainPrompt.bind(this));
};

// Handle Play Again Prompt
HangmanCLI.prototype.handlePlayAgainPrompt = function(resp) {
    var playagain = resp.playagain;

    if (playagain) {
        this.resetGame();
    }
};

// Reset Game
HangmanCLI.prototype.resetGame = function() {
    // Reset Letters Guessed
    this.lettersGuessed = [];
    // Reset Letters Guessed Correctly
    this.lettersGuessedCorrectly = 0;
    // Reset Remaining Guesses
    this.updateRemainingGuesses(true);
    // Generate Random Word
    this.generateRandomWord();
    // Prompt for first guess
    this.promptForGuess();
};

// Method for rendering word spaces to user.
HangmanCLI.prototype.renderWord = function() {
    var wordArr = this.currentWord.split('');
    var hangmanWord = [];
    var Letter = new LetterUtil(this.lettersGuessed);

    // Loop through each character to determine what to show user per letter.
    for (var i = 0; i < wordArr.length; i++) {
        var character = wordArr[i];

        if (character.trim().length === 0) {
            hangmanWord.push(character);
        } else {
            hangmanWord.push(Letter.getLetter(character));
        }
    }

    console.log(hangmanWord.join('') + '\n');
}

// Method for tracking letters guessed.
HangmanCLI.prototype.trackLetterGuessed = function(letter) {
    // Get letter guessed
    var guess = letter.guess.toUpperCase();
    // Update letters tracked with new letter
    this.lettersGuessed.push(guess);

    var Letter = new LetterUtil(this.lettersGuessed);
    console.log('You Guessed: ', guess + '\n');

    // Check to see if letter is correct.
    var isCorrect = Letter.checkLetterGuessed(guess, this.currentWord);

    if (this.remainingGuesses) {
        // If they still have guesses left, check to see if this guess is correct.
        if (isCorrect) {
            // Render Correct Message
            console.log(this.correctMessage + '\n');

            // Update lettersGuessedCorrectly Count
            for (var i = 0; i < this.currentWord.length; i++) {
                if (this.currentWord[i].toUpperCase() === guess) {
                    this.lettersGuessedCorrectly +=1;
                }
            }

            // Check to see if they've guessed all the letters for the current word
            if (this.lettersGuessedCorrectly === this.currentWord.length) {
                // Handle game over
                this.gameOver(true);
            } else {
                // Prompt for new guess
                this.promptForGuess();
            }
        } else {
            // Update Remaining Guesses
            this.updateRemainingGuesses();
            // Render Incorrect Message
            console.log(this.incorrectMessage + '\n');
            // Prompt for new guess
            if (this.remainingGuesses) {
                this.promptForGuess();
            } else {
                this.gameOver(false);
            }
        }
    } else {
        // Else, end the game
        this.gameOver(false);
    }

};

// Method for validating letter guessed.
HangmanCLI.prototype.validateLetterGuessed = function(letter) {
    var uppercaseLetter = letter.toUpperCase();
    var invalidErrorMsg = 'Your guess is not valid. Please enter a letter of the alphabet (A-Z).';
    var letterAlreadyUsedMsg = 'You already guessed this letter';
    var isValidLetter = uppercaseLetter === validLetters[uppercaseLetter];

    if (isValidLetter) {
        var letterAlreadyUsed = this.lettersGuessed.indexOf(uppercaseLetter) > -1;
        // Check to see if letter has been guessed already;
        return letterAlreadyUsed ? letterAlreadyUsedMsg : true;
    } else {
        return invalidErrorMsg;
    }
    return (uppercaseLetter === validLetters[uppercaseLetter]) ? true : errorMsg;
};

// Method for updating wins.
HangmanCLI.prototype.updateWins = function() {
    this.wins += 1;
};

// Method for updating losses.
HangmanCLI.prototype.updateLosses = function() {
    this.losses += 1;
};

// Method for updating remaining guesses.
HangmanCLI.prototype.updateRemainingGuesses = function(reset) {
    if (reset) {
        this.remainingGuesses = this.maxGuesses;
    } else {
        // Reduce guesses left by 1
        this.remainingGuesses = this.remainingGuesses - 1;
    }
};

// Method for handling when game is over.
HangmanCLI.prototype.gameOver = function(didWin) {
    this.renderWord();

    if (didWin) {
        this.updateWins();
        console.log(this.youWonMessage + '\n');
    } else {
        this.updateLosses();
        console.log(this.youLostMessage + '\n');
    }
    console.log(this.winsLabel + this.wins);
    console.log(this.losesLabel + this.losses + '\n');

    this.promptPlayAgain();
};

// Method for generating a random word.
HangmanCLI.prototype.generateRandomWord = function() {
    var Word = new WordUtil(this.gameWords);
    this.currentWord = Word.generateRandomWord();
};


var HangmanGame = new HangmanCLI();

HangmanGame.init();
