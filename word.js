// Word is used to generate a random word for playing the game.

var Word = function(words) {
    this.words = words;
};

Word.prototype.generateRandomWord = function() {
    var numberOfWords = this.words.length;
    var randomIdx = Math.floor(Math.random() * numberOfWords);

    return this.words[randomIdx];
};

module.exports = Word;
