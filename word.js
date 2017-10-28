
var guessCheckcheck = function(userGuess, response, guessList){
		this.userGuess = userGuess;
		this.response= response;
		this.guessList = guessList;
		this.guessStatus = false;
		this.check = function(){

			var icon = this.guessList.indexOf(this.userGuess);

			if(this.guessList.indexOf(this.userGuess) === -1){


				if(this.response.indexOf(this.userGuess) !== -1){
					console.log("Your guess is correct!" + this.userGuess + " Keep going!");
					this.guessStatus = true;
				}else{
					console.log('Your guess is incorrect! '+ this.userGuess + ' is not in the word.')
					this.guessStatus = false;
			}
			}else{
					console.log('You already guessed: '+ this.userGuess + ' . Try again!');
					this.guessStatus =	true;
					}
		}
	}

module.exports = guessCheck;
