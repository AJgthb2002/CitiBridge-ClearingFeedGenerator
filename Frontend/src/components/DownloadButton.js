import "../components/DownloadButton.css";
import React from "react";
import axios from "axios";

const DownloadButton = props => { 
    
	const [transactions, setTransactions] = React.useState([]);
	const [transactionCSV, setTransactionCSV] = React.useState("");

	React.useEffect(() => { 
		getValidTransactions();
	}, []);

	const getValidTransactions = async()=> {
		const result = await axios.get("http://localhost:8080/GetValidTransactions")
		// console.log(result)
		setTransactions(result.data)
	}

	const convertToCSVfile = (data) => {
		let res = "Ref No,Date,Payer,Payer AccNo.,Payee,Payee AccNo.,Amount\n";
		data.forEach((transaction) => {
 		  let row_csv = transaction.refNo + "," + transaction.date + "," + transaction.payee.name + "," + transaction.payee.account + "," + transaction.payer.name + "," + transaction.payer.account + "," + transaction.amount; 
		  res += row_csv + "\n";
		});
		let file = new Blob([res], { type: "text/plain" });
		return URL.createObjectURL(file);
	};

    return ( <a href={transactionCSV} download={`validRecords.csv`} style = {{alignSelf : "flex-end", width : "100%"}}><button className="download__records" onClick={(e) => setTransactionCSV(convertToCSVfile(transactions))} >  Download Valid Records </button> </a>) 
} 
export default DownloadButton;