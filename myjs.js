var idList = [];

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
jsnData = JSON.stringify(jsnData);
console.log(jsnData);

///////// Transaction Object Constructor /////////
function transaction( date, amount, payee ) {

    var amountInt = ( Number( amount.substr(1) ) * 1000);
    var tempId;
    var idCount = 0;

    tempId = ("YNAB:" + amountInt.toString() + ":" + date + ":");

    idList.push(tempId);

    for( var i = 0; i < idList.length; i++ )
    {
    	if ( idList[i] === tempId )
    	{
    		idCount++;
    	}
    }

    this.account_id = "1234";
    this.date = date;
    this.amount = amountInt;
    this.payee_id = null;
    this.payee_name = payee;
    this.category_id = null;
    this.memo = null;
    this.cleared = "cleared";
    this.approved = false;
    this.flag_color = null;
    this.import_id = ( tempId + idCount.toString() );
}