//Create a new element to insert
var div = document.createElement("div");
//Style this new element so we can see it.
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
//Add some text
div.innerHTML = "Upload to YNAB";

//Make it clickable
div.addEventListener("click", function() {
    alert("You Clicked");
});

//Find an existing element to attach new element to
var element = document.getElementById("accountSnapshotPageSection1");

//Append the new element to the existing one
element.appendChild(div);

//////EXTRACTING TRANSACTION DATA//////

const postingDate = 1;
const description = 2;
const value = 4;

var allTransactions = [];
var jsnData;

//Find the table with transactions
var tableRows = document.getElementById("transactionTable").rows;

//Check all rows of the table excluding header
for(var i = 1; i < tableRows.length; i++) {

	//define variables
	var date;
	var amount;
	var payee;

	//Only extract data if there is a valid posting date
	if ( tableRows[i].cells[postingDate].innerText ){
		//Get 3 relevant cells from table row
		date = tableRows[i].cells[postingDate].innerText;
		payee = tableRows[i].cells[description].innerText;
		amount = tableRows[i].cells[value].innerText;

		var newTransaction = new transaction( date, amount, payee );

		allTransactions.push( newTransaction );
	}
}

jsnData = { transactions:allTransactions };
//jsnData = JSON.stringify(jsnData);
console.log(jsnData);