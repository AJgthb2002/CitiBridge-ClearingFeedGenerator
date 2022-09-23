import React from "react";
import DataTable from "./DataTable";
import "../components/Valid_Records.css";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import DownloadButton from "./DownloadButton";

function Valid_Records() {

  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => { 
    getValidTransactions();
  }, []);

  const getValidTransactions = async()=> {
    const result = await axios.get("http://localhost:8080/GetValidTransactions")
    setTransactions(result.data)
  }

  return (
    <div className="valid_record__main">
      <div className="header__valid">
        <FaCheckCircle
          size="20px"
          style={{ color: "#43a047", paddingRight: "5px" }}
        ></FaCheckCircle>
        <p style={{ margin: "0px" }}>Valid Records</p>
      </div>
      <DataTable transactions={transactions}></DataTable>
  
      <DownloadButton></DownloadButton>
    </div>
  );
}

export default Valid_Records;
