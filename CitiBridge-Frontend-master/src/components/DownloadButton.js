import "../components/DownloadButton.css";

const DownloadButton = props => { 
    
    const downloadFile = () => { 
        console.log("Downloading")
        fetch('http://localhost:8080/validTransactions.csv', { mode: 'no-cors'})
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'validTransactions.csv';
					a.click();
				});
			
		});
        // window.location.href = "C:/Users/ishas/CitiBridge2/FeedGeneratorNew/src/main/resources/downloadedFiles/validTransactions.csv" 
    } 
    return ( <button className="download__records" onClick={downloadFile} > Download Valid Records </button> ) 
} 
export default DownloadButton;