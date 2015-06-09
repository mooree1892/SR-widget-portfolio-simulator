//'use strict';

window.onload = function() {

	//inputs in trade window
	input = document.getElementById("autocomplete");
	input2 = document.getElementById("amount");
	input3 = document.getElementById("amountSell");
	
	input.onkeypress = function(event) {
		
		if (event.keyCode == 13) {
			
			validTicker = determineTicker(input.value.toUpperCase());

			// If input is empty
			if (validTicker == 0) {

				document.getElementById("alertStock").innerHTML = "Please enter a valid stock ticker.";
			}
			// If input is valid
			if (validTicker == 1) {	

				document.getElementById("autocomplete").blur();
				input.value = input.value.toUpperCase();
				document.getElementById("alertStock").innerHTML = "";
			}
			// If input is invalid
			if (validTicker == 2) {

				document.getElementById("alertStock").innerHTML = "Please enter a valid stock ticker.";
				//This shows up when it's empty or invalid stock ticker
			}
		}
	}

	input2.onkeypress = function(event) {
		
		if (event.keyCode == 13) {

			// If input is is a number
			if (input2.value/1 == input2.value) {

				document.getElementById("amount").blur();
				document.getElementById("alertStock").innerHTML = "";

			} else { //If input is NAN

				document.getElementById("alertStock").innerHTML = "Please enter a number.";
			}
		}
	}

	input3.onkeypress = function(event) {
		
		if (event.keyCode == 13) {

			// If input is is a number
			if (input3.value/1 == input3.value) {

				document.getElementById("amountSell").blur();
				document.getElementById("alertStock").innerHTML = "";

			}else{ //If input is NAN

				document.getElementById("alertStock").innerHTML = "Please enter a number.";
			}
		}
	}
}

function determineTicker (input) {
	var output = 2;
	
	if (input.length == 0 || input == "Enter Ticker") {
		output = 0;
	} else {	
		for (i = 0; i < lengthOfResponse ; i++) {
			
			if (input == response[i].Ticker) {
				output = 1;
			}
		}
	}

	return output;
}