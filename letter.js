var Spaces = function(response,guess, guessList){
	this.response = response;
	this.guessList = guessList;
	this.guessList = guess;
	this.display = [];

	this.displaySpaces = function(){
		for(var i = 0; i < response.length; i++){
		this.display.push("_");
		};
		var string = "";
		for(var i = 0; i < this.guessList.length; i++){
			string = string + this.guessList[i] +", ";
		}
		

	};
	this.adjustDisplay = function(){
		var position = this.response.indexOf(this.guess);

	}
}



module.exports = Spaces;
