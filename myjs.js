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

//Find the table with transactions
var table = document.getElementById("transactionTable");

//Determine how many rows there are
var rowLength = table.rows.length;

//Print the number of rows
console.log(rowLength);

//Filter on the second row (ignore header)
var tableRow = table.rows[2];

//Filter on the first cell on the second row
var cells = tableRow.cells;

//Initialize an array
var transactions = [];
var transaction = [];

//Get 3 relevant cells from table row
text = table.rows[3].cells[1].innerText;
transaction.push(text);

text = table.rows[3].cells[2].innerText;
transaction.push(text);

text = table.rows[3].cells[4].innerText;
transaction.push(text);

transactions.push(transaction);
transactions.push(transaction);
console.log(transactions);