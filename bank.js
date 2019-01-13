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