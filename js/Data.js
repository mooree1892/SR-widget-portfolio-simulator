'use strict';

var Port0 = new Object();
var checked = 0;

//Create a new portfolio, used in "<!-- Set Parameters -->"
function newPort () {
	var portName = document.getElementById('portfolioName').value.trim();
	var portCash = Number(document.getElementById('cash').value);
	var portCommis =Number(document.getElementById('commission').value);


	if(isNaN(portCash)|| isNaN(portCommis) || portCommis==0||portCash==0||portName=="" ){

		if(portCommis==0 && portCash==0 && portName==""){
			alert("Please fill out the form")
		}else if(isNaN(portCash) && isNaN(portCommis)){
			alert("Please input a numerical value for Cash and Commission")
		}else if (isNaN(portCash)){
			alert("Please input a numerical value for Cash")
		}else if (isNaN(portCommis)){
			alert("Please input a numerical value for Commission")
		} else if(portName==""){
			alert("Please input a Portfolio Name")
		}else if(portCommis == 0){
			alert("Please input a value for Commission")
		}else if(portCash == 0){
			alert("Please input a value for Cash")
		}
		
	}else if( document.getElementById('fixed').checked== false && document.getElementById('percent').checked==false){
		alert("Please select a form of commission")
	}else{

		if (portName !== "" && portCash >= 0 && portCommis >= 0) {
			
			Port0.name = portName;
			Port0.cash = portCash;

			//Radio button selection
			if (document.getElementById('fixed').checked) {
				Port0.commis = portCommis;
				checked = 1
			} 
			if (document.getElementById('percent').checked) {
				Port0.commis = (portCommis / 100);
				checked = 2
			}

			addRow(0, Port0.name);
			addRow(1, Port0.cash);

			showWindow(2);	
		}

		console.log (Port0.name);
		console.log (Port0.cash);
		console.log (Port0.commis);
	}
}


