//Create a new element to insert
var div = document.createElement("div");

//Style this new element so we can see it.
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
//Add some text
div.innerHTML = "Upload to YNAB";

//Insert the new element into the bank page
insertElement( div );

//Make the new element clickable
div.addEventListener("click", function() {
    
    var bankTransactions = getBankTransactions();

    //Create a Ynab compatible wraper for transactions
    bankTransactions = { "transactions": bankTransactions };
    console.log(bankTransactions);
});