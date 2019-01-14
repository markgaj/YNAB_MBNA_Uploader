var idList = [];

//Function to send transactions to ynab
function sendToYnab( transactionsToUpload )
{
    var duplicateCount;
    var successCount;


    //get user specific ynab IDs
    var config = getConfig();
    config.budgetURL = "https://api.youneedabudget.com/v1/budgets/";

    fetch( config.budgetURL + config.budgetId + '/transactions', 
        {
            method: 'POST',
            body: JSON.stringify(transactionsToUpload),
            headers: {
                "Authorization": ( "Bearer " + config.apiKey ),
                "Content-Type": "application/json"
            }
        } )
            .then((res) => { return res.json() })
            .then((response) => {
                console.log(response);

                //Notify user of results
                duplicateCount = response.data.duplicate_import_ids;
                duplicateCount = duplicateCount.length.toString();
                successCount = response.data.transactions;
                successCount = successCount.length.toString();
                alert( successCount + " transactions were succesfully uploaded!\n" +
                       duplicateCount + " duplicate transactions were skipped." );
            });
}

///////// Transaction Object Constructor /////////
function transaction( date, amount, payee ) {

    var id;
    var config = getConfig();

    amount = convertAmount( amount );
    date = convertDate( date );
    id = getTransactionId( date, amount, payee );

    this.account_id = config.accountId;
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