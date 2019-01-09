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
var transaction = [];

for (var i = 0; i < cells.length; i++) {
	text = cells[i].innerHTML;
	transaction.push(text);
}

console.log(transaction);