/*'use strict';*/

var x;
var shortSellPrice;

function buyStock () { //when buying stock in the trade window

	var amount = Number(document.getElementById("amount").value); //get amount input

	//Transaction calculations
	if(amount == 0 || isNaN(amount)){
		alert("Please enter the number of Stock you would like to buy")
	}else{
		if (checked == 1) { //for fixed commission
			var buyPrice = (currentPrice * amount) + Port0.commis;
		}else{					//for percent commission
			var buyPrice = (currentPrice * amount) + (Port0.commis*(currentPrice * amount));
		};
		
		console.log("Buy Price: " + buyPrice)  //Total amount spent

		if((Port0.cash - buyPrice) >=0){
			Port0.cash = Port0.cash - buyPrice;

			console.log("Total Cash: " + Port0.cash) //Cash left

			x = 1; //1 is a buy transaction

			//Add transaction to table
			addRow(2, (document.getElementById("autocomplete").value).toUpperCase(), Math.floor(currentPrice * amount*100)/100, amount);
			//Update remaining cash
			updateCash();
		}else{
			alert("You do not have enough money")
		}
	}
}

function selling(me){
	var numberOfRows = document.getElementById("sim1").getElementsByTagName("tr").length;
	var rowNUmber;
	for (var i = 0; i < numberOfRows; i++) {
		if( document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4] != undefined){
			if(document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].id != undefined){
				if( document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].id == me.id){
					rowNUmber = i;
				};
			};
		};
	};
	document.getElementById("rowIndex").innerHTML = rowNUmber;
	document.getElementById("stockBeingSold").innerHTML = "Stock: " + document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[0].innerHTML;
	document.getElementById("amountSell").value = document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[2].innerHTML;
	document.getElementById("currentValue").innerHTML = "Current Value: " + document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[1].innerHTML; 
}

function sellAmount () { 
	//function for selling stocks
	var rowIndex = Number(document.getElementById("rowIndex").innerHTML)
	var tempTicker = document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[0].innerHTML
	var priceAllStocks = document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[1].innerHTML 
	var amount =document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[2].innerHTML; //get amount input
	priceAllStocks = Number(priceAllStocks.slice(1,priceAllStocks.length-1))
	var priceOfSingleStock = priceAllStocks / amount
	var amountSelling = document.getElementById("amountSell").value

	if( amount - amountSelling >= 0){

		if (checked == 1) {
			var sellPrice = (priceOfSingleStock * amountSelling) - Port0.commis;
		}else{
			var sellPrice = (priceOfSingleStock * amountSelling) - (Port0.commis*(priceOfSingleStock * amountSelling));
		};

		console.log("Sell Price: " + sellPrice)

		Port0.cash = Port0.cash + sellPrice;

		console.log("Total Cash: " + Port0.cash)

		document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[2].innerHTML = amount - amountSelling
		document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[1].innerHTML = '$' + Math.floor(priceOfSingleStock * (amount - amountSelling)*100)/100;

		if(amount - amountSelling ===0){
			document.getElementById("sim1").deleteRow(rowIndex)
		}

		updateCash();

	}else{
		alert("You can not sell more stocks then you own")
	}
}

function sellingShort(me){

	var numberOfRows = document.getElementById("sim1").getElementsByTagName("tr").length;
	var rowNUmber;
	for (var i = 0; i < numberOfRows; i++) {
		if( document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4] != undefined){
			if(document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].id != undefined){
				if( document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].id == me.id){
					rowNUmber = i;
				};
			};
		};
	};

	document.getElementById("rowIndex").innerHTML = rowNUmber;
	document.getElementById("stockBeingSold2").innerHTML = "Stock: " + document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[0].innerHTML;
	document.getElementById("amountShort").innerHTML = "Amount: " + document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[2].innerHTML;
	document.getElementById("newValue").innerHTML = "Current Value: " + document.getElementById("sim1").getElementsByTagName("tr")[rowNUmber].getElementsByTagName("td")[1].innerHTML; 
	//document.getElementById("netDiff").innerHTML = "Net Gain/Loss: $" + (initialBuyValue - document.getElementById("sim1").getElementsByTagName("tr")[me.id].getElementsByTagName("td")[1].innerHTML);
	
}

function shortSell () { //when using short sell 
	
	var amount = Number(document.getElementById("amount").value); //get amount input

	//Transaction calculations

	var shortBuyPrice = (currentPrice * amount)

	//buyPrice must be stored at this point for access later (in intialBuyPrice), feauture will be added
	//when the capabilities exist
	
	console.log("Buy Price: " + shortBuyPrice)  //Total amount spent

	x = 0; //0 is a short sell transaction

	//Add transaction to table
	addRow(2, (document.getElementById("autocomplete").value).toUpperCase(), shortBuyPrice, amount);
}

function shortBuy () {

	var rowIndex = Number(document.getElementById("rowIndex").innerHTML);
	var tempTicker = document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[0].innerHTML;
	var priceAllStocks = document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[1].innerHTML; 
	var amount =document.getElementById("sim1").getElementsByTagName("tr")[rowIndex].getElementsByTagName("td")[2].innerHTML; //get amount input
	priceAllStocks = Number(priceAllStocks.slice(1,priceAllStocks.length-1));
	var priceOfSingleStock = priceAllStocks / amount;

	var intialBuyPrice; //needs to be pulled from stored data, not yet possible
	
	shortSellPrice = intialBuyValue - priceAllStocks //difference between value when bought and current value

	console.log("Short Sell Value: " + shortSellPrice)

	Port0.cash = Port0.cash + shortSellPrice; //adds the difference to total cash

	console.log("Total Cash: " + Port0.cash)

	//delete transaction from table
	document.getElementById("sim1").deleteRow(rowIndex)

	updateCash();

}

function updateCash () {
	
	//Update available cash
	var table = document.getElementById("sim1");
	var rowLength = table.rows.length;
	table.rows[rowLength-2].cells[1].innerHTML = "$" + Math.floor(Port0.cash*100)/100;
}

function updatePrice(){
	
	var tableData = new Array()
	var tablerows = document.getElementById("sim1").getElementsByTagName("tr")

	for (var i = 1; i <= tablerows.length-3; i++) {
		(function(i){
	 var temp =  document.getElementById("sim1").getElementsByTagName("tr")[i]
	 var temptick = document.getElementById("sim1").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML

	
	var ek


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

			AppData.v1.pricedata.GET(temptick)
	    	.then(function(data){

	    

	         ek = data.response.data.slice(0,1)[0][1];
	         tableData.push({"label": temptick, "val": ek})
	       
	        console.log(tableData)

	    })
		} 
	})
})(i);

function fillinginvalue(){
	alert("working")
	for (var z = 1; z <= tableData.length; z++) {
		var amount = document.getElementById("sim1").getElementsByTagName("tr")[z].getElementsByTagName("td")[2].innerHTML
		document.getElementById("sim1").getElementsByTagName("tr")[z].getElementsByTagName("td")[1].innerHTML = "$" + (tableData[z-1].val*amount)
		};
	}
	setTimeout( function(){fillinginvalue()}, 5000)
	}
}