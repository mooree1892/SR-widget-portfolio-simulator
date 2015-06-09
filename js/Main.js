'use strict';
var validTicker = 0
var currentPrice;
var lastPrice;
var change;
var amount;

//////////////////////////////////////MAIN////////////////////////////////////////////

StockRender.AppRender.register({
	id: "49e90eee6ce1942a94136fc8db19319c",
	name: "Tables",
	version: "1.0.0",
	defaults: {
		terminal: {
			x: 0,
			y: 0,
			w: 100,
			h: 100
		}
	},
	beforeRender: function () {
		console.log('running beforeRender!');
	},
	ready: function(AppMemory, AppData) {
		/*Defining Variables*/
		var last_input;

		/*Reading User-Data*/
		AppMemory.read('last_input')
			.success(function(data) {
				if(!data) {
					AppMemory.write('last_input','A');
					last_input = 'A';
				} else {
					last_input = data;
				}
			})
			.error(function(err, data) {
				if(err) {
					console.log('AppMemory not retrieved',data);
					AppMemory.write('last_input','A');
					last_input = 'A';
				}
			})

		/*Running Program*/
		
	$('#autocomplete').keypress(function(e) {
		if( e.which === 13 ) {

			//Local variable "input"
			var input = document.getElementById("autocomplete");

			//Call function again -- function in EnterStock.js
			validTicker = determineTicker(input.value.toUpperCase());

			if (validTicker == 1) {
				Runner.loadData(AppData, $('#autocomplete')[0].value.toUpperCase());
				return;
			};	
		}
	})

	///////////////////////////////////////////////*Settings*//////////////////////////////////////////////

	var isChanged;
	var changeSize; 
	
	$( "#inpText" ).change(function() {
		var newTextSize = document.getElementById('inpText').value;
 		console.log(newTextSize);
 		changeSize = newTextSize + 'px';
 		isChanged = true; //Don't know what it does yet
	})

	//this is the function for opening and closing the settings
	var settingsShown = false;
	var fundChanged;
	$( "#opener" ).click(function() {
		
		if (settingsShown == false) {
			settingsShown = true;
			$("#settings").show();
			$("#body").hide();
			//$("#table1").hide();
			} else {
			settingsShown = false;
			$("#settings").hide();
			$("#body").show();
			//$("#table1").show();
			
			//Change of text size
			if(isChanged == true) {
				console.log(changeSize);
				var pLength = document.getElementsByTagName('tr').length;
				for(var x = 0; x < pLength; x++) {
			 		document.getElementsByTagName('tr')[x].style.fontSize = changeSize;
				}
				var emLength = document.getElementsByTagName('tr').length;
				for(var x = 0; x < emLength; x++) {
					document.getElementsByTagName('tr')[x].style.fontSize = changeSize;
				}
				isChanged = false;
			}
			if(fundChanged == true) {
		 		var rowNum = document.getElementById("table1").rows.length; 
				
				while(rowNum > 4) {
					 document.getElementById("table1").deleteRow(rowNum - 2);
					 rowNum = document.getElementById("table1").rows.length; 
					 stockLength = 0;
					 numAddedStocks = 0;
				}
				fundChanged = false;
			}

			//Upon confirming settings changes
			Settings_all();
		}
	})
	}
})

/////////////////////////////////////RUNNER///////////////////////////////////////////

function Runner () {}																											
Runner.loadData = function loadData(AppData, stockId) {
	//-----------------------------------------
	// /v1/fundamentals
	//-----------------------------------------
	var checks = 0;

    AppData.v1.pricedata.GET(stockId)
    .then(function(data){

    	console.log(data)

        currentPrice = data.response.data.slice(0,1)[0][1];
        lastPrice = data.response.data.slice(1,2)[0][1];

        console.log(currentPrice)
        console.log(lastPrice)

        change = ((currentPrice - lastPrice) / currentPrice ) * 100;
        change = change.toFixed(2) + "%";

        console.log(change)

    }, function(jqXHR){
        throw new Error('Failed to load data!',jqXHR);
    }).then(function(){
            checks ++;
        if(checks === 2){
            Runner.toggleOverhead();
        }
    });
	
};

