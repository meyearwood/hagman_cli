

function Answer(){

	var wordChoices = ['Pizza','Ravioli','Calzone','Lasagna','Spaghetti'];
	var word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
	return word;
	}


module.exports = Answer;
