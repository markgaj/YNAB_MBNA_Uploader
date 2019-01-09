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
const amount = 4;

//Find the table with transactions
var tableRows = document.getElementById("transactionTable").rows;

//Initialize an array to hold transaction data
var transactions = [["Date", "Payee", "Outflow", "Inflow"]];

//Only extract data if there is a valid posting date
for(var i = 1; i < tableRows.length; i++) {

	var transaction = [];

	if ( tableRows[i].cells[postingDate].innerText ){
		//Get 3 relevant cells from table row
		text = tableRows[i].cells[postingDate].innerText;
		transaction.push(text);

		text = tableRows[i].cells[description].innerText;
		transaction.push(text);

		text = tableRows[i].cells[amount].innerText;

		//Place +/- in the correct position for outflow/inflow
		if( text.includes("-") )
		{
			//Add an empty entry for inflow followed by the outflow
			transaction.push("");
			transaction.push( text.substr(1) );
		}
		else {
			//Add the inflow followed by an empty string for outflow
			transaction.push(text);
			transaction.push("");		
		}

		transactions.push(transaction);
	}
}

console.log(transactions);