'use strict';
// For all settings fucntions ------------>

// Global variables
var textColor;
var rowColor1, rowColor2;


function Settings_textSize () {
	//This changes the size of text
	var newTextSize = document.getElementById('inpText').value;
	var changeSize = newTextSize + "px";
	var emLength;

	emLength = document.getElementsByTagName('tr').length;
	for(var x = 0; x < emLength; x++) {
		document.getElementsByTagName('tr')[x].style.fontSize = changeSize;
	}
	
	emLength = document.getElementsByTagName('button').length;
	for(var x = 0; x < emLength; x++) {
		document.getElementsByTagName('button')[x].style.fontSize = changeSize;
	}

}

function Settings_textColor () {
	
	textColor = "#" + document.getElementById('inpTextColor').value;

	//You can only change "getElementsByTagName" this way, don't attempt to change the following code. 1--
	var pLength

	pLength = document.getElementsByTagName('tr').length;
	for(var x = 0; x < pLength; x++) {
		document.getElementsByTagName('tr')[x].style.color = textColor;
	}
	pLength = document.getElementsByTagName('button').length;
	for(var x = 0; x < pLength; x++) {
		document.getElementsByTagName('button')[x].style.color = textColor;
	}
	pLength = document.getElementsByTagName('text').length;
	for(var x = 0; x < pLength; x++) {
		document.getElementsByTagName('text')[x].style.color = textColor;
	}
}

function Settings_backgroundColor () {
	
	var rowColor1 = "#" + document.getElementById('inpColorScheme1').value;
	var rowColor2 = "#" + document.getElementById('inpColorScheme2').value;

	var table;
	var rowLength;

	//For div "stem1"
	table = document.getElementById("stem1");
	rowLength = table.rows.length;

	/*	Change the background color for all the ODD rows	*/
	for(var x = 0; x < rowLength; x += 2) {
		table.rows[x].style.background = rowColor1;
	}
	/*	Change the background color for all the EVEN rows	*/
	for(var x = 1; x < rowLength; x += 2) {
		table.rows[x].style.background = rowColor2;
	}
	/*document.getElementById('table1').rows[0].style.background = rowColor1;
	document.getElementById('table1').rows[(rowLength - 1)].style.background = rowColor1;*/

	//For div "sim1"
	table = document.getElementById("sim1");
	rowLength = table.rows.length;

	/*	Change the background color for all the ODD rows	*/
	for(var x = 0; x < rowLength; x += 2) {
		table.rows[x].style.background = rowColor1;
	}
	/*	Change the background color for all the EVEN rows	*/
	for(var x = 1; x < rowLength; x += 2) {
		table.rows[x].style.background = rowColor2;
	}

	//For all other divs
	document.getElementById("Parameters").style.background = rowColor1;
	document.getElementById("Trade").style.background = rowColor1;
	document.getElementById("Sell").style.background = rowColor1;
	document.getElementById("ShortSell").style.background = rowColor1;
	document.getElementById("Market").style.background = rowColor1;

}

function Settings_all () {
	Settings_textSize();
	Settings_textColor();
	Settings_backgroundColor();
}