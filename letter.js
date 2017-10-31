// Letter is used to determine what to render to the end user based on guesses.
// For example, it will take a letter, check it against a list of guesses
// and either render the Letter if it has been guessed
// and a _ for a letter that has not been guessed.

var Letter = function(guessList) {
    // The guessList param is a list of guesses from the user.
    this.guessList = guessList;
};

Letter.prototype.getLetter = function(validLetter) {
    // The validLetter param is a character from the word trying to be guessed.
    // Check to see if the letter has been guessed.
    var uppercaseLetter = validLetter.toUpperCase();

    if (this.guessList.indexOf(validLetter) > -1) {
        // If yes, return the letter.
        return validLetter;
    } else {
        // If not, return underscore.
        return '_';
    }
};

module.exports = Letter;
