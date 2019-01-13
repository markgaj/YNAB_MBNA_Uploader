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
//jsnData = JSON.stringify(jsnData);
console.log(jsnData);

///////// Transaction Object Constructor /////////
function transaction( date, amount, payee ) {

    var amount;
    var id;

    amount = convertAmount( amount );
    date = convertDate( date );
    id = getTransactionId( date, amount, payee );

    this.account_id = "1234";
    this.date = date;
    this.amount = amount;
    this.payee_id = null;
    this.payee_name = payee;
    this.category_id = null;
    this.memo = null;
    this.cleared = "cleared";
    this.approved = false;
    this.flag_color = null;
    this.import_id = id;
}

//Function to convert MBNA amounts to YNAB Compatible integers
function convertAmount( amount ) {

	//If the amount is negative
	if ( amount.charAt(0) == "-" )
	{
		//Remove -$
		amount =  amount.substr(2);
		//Remove any commas
		amount = amount.replace(/,/g,"");
		//convert to an integer in "milli format"
		amount = ( Number( amount ) * 1000);
	}
	else
	//If amount is positive
	{
		//Remove $
		amount = amount.substr(1);
		//Remove any commas
		amount = amount.replace(/,/g,"");
		//convert to an integer in "milli format" (negative for outflow)
		amount = ( Number( amount ) * -1000);
	}
	
	return amount;
}

//Function to convert MBNA dates to YNAB Compatible format
function convertDate( date ){
	var day;
	var month;
	var year;

	//Extract year, month and day
	month = date.substr(0,2);
	day = date.substr(3,2);
	year = date.substr(6);

	//compile the ynab compatible format
	date = (year + "-" + month + "-" + day);
	
	return date;
}

//Function to assemble YNAB compatible Transaction IDs
function getTransactionId( date, amount, payee ){
	
	var id;
	var idCount = 0;

	//Assemble the main part of the id string
	id = ("YNAB:" + amount.toString() + ":" + date + ":");

	//Add the partial id string to the list of ids
    idList.push(id);

    //count how many identical ids already exist
    for( var i = 0; i < idList.length; i++ )
    {
    	if ( idList[i] === id )
    	{
    		idCount++;
    	}
    }

    //Add the unique suffix to the id string 
    id = ( id + idCount.toString() );
    return id;
}