var inquirer = require('inquirer');

var game  =  require('./game.js');

var Word = require('./word.js');

var Letter = require('./letter.js');

var wordChoices = ['Pizza','Ravioli','Calzone','Lasagna','Spaghetti', 'Calamari', 'Tiramisu', 'Chicken Marsala','Rigatoni'];



var guessList = [];
var guess;


 var response =  game();

 var guessList =[];

var counter = 9;
var responseLength = 0;


var spaces = new Letter(answer, guessList, guess);

function switchDisplay(array, guess, answer){
	var position = answer.indexOf(guess);
	array[position] = guess;
	return array;
}


function displayAnswerSpaces(array){
	var string = "";
	for(var i = 0; i < array.length; i++){
		string = string + array[i] +" ";
	}
}
function displayGuesses(){
	var string = "";
	for(var i = 0; i < guessList.length; i++){
		string = string + guessList[i] +", ";


var getLetter = function(){
	inquirer.prompt([{
		type:'input',
		message: "Enter a letter: ",
		name: "letter",
		validate: function(value){
						if(isNaN(value) == true){
							return true;
						}else{
							return false;
						}
					}
	}]).then(function(responses){
		if(response.length === responseLength){

			}else{

					var guess = response.letter;


					displayGusses(guessList);


					if(counter > 0){

						var checkGuess = new Word(guess, response, guessList);



						checkGuess.check();

						if(checkGuess.guessStatus === true){

							guessList.push(guess);

							displayGusses(guessList);

							switchDisplay(spaces.display, guess ,answer);

							displayAnswerSpaces(spaces.display);
							console.log("");

							console.log(counter + " guesses remaining");

							answerLength++;

						}else{

							guessList.push(guess);

							displayGusses(guessList);

							displayAnswerSpaces(spaces.display);

							counter--;
						}

							getLetter();
				}else{
			
					displayAnswerSpaces(spaces.display);

					console.log("Game Over: The correct answer is " + answer);
				}
			}
	})
};



spaces.displaySpaces();

displayAnswerSpaces(spaces.display);
console.log("");

getLetter();
