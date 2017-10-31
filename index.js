
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
    this.incorrectMessage = 'INCORRECT';
    // You Lost Message
    this.youLostMessage = 'You Lose! Play Again? (Y/N).';
    // You Won Message
    this.youWonMessage = 'You\'re a Winner! Play Again? (Y/N).';
    // Guess Prompt Message
    this.guessPromptMessage = 'Guess a Letter...';
};

// Method for Initializing the game.
HangmanCLI.prototype.init = function() {
    // Generate Random Word
    this.generateRandomWord();
    this.renderWord();
    this.promptForGuess();
};

// Method for Prompting the user for guess.
HangmanCLI.prototype.promptForGuess = function() {
    // console.log('Prompting for guess...');
    var question = {
        type: 'input',
        name: 'guess',
        message: this.guessPromptMessage,
        validate: this.validateLetterGuessed.bind(this),
    };

    inquirer.prompt([question]).then(this.trackLetterGuessed);
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
    console.log('letter guessed: ', letter);
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

// Method for generating dashes.
HangmanCLI.prototype.generateDashes = function() {};

// Method for updating wins.
HangmanCLI.prototype.updateWins = function() {};

// Method for updating losses.
HangmanCLI.prototype.updateLosses = function() {};

// Method for updating remaining guesses.
HangmanCLI.prototype.updateRemainingGuesses = function(reset) {};

// Method for handling when game is over.
HangmanCLI.prototype.gameOver = function(didWin) {};

// Method for generating a random word.
HangmanCLI.prototype.generateRandomWord = function() {
    var Word = new WordUtil(this.gameWords);
    this.currentWord = Word.generateRandomWord();
    // console.log('Generated Random Word: ', this.currentWord);
};

// Method for resetting letters guessed.
HangmanCLI.prototype.resetLettersGuessed = function() {};

// Method for setting game over message.
HangmanCLI.prototype.setGameOverMessage = function(didWin) {};

// Method for rendering guess response message.
HangmanCLI.prototype.renderGuessResponseMessage = function() {};


var HangmanGame = new HangmanCLI();

HangmanGame.init();
