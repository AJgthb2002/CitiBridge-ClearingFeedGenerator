import React from "react";
import DataTable from "./DataTable";
import "../components/Invalid_Records.css";
import { BsFillXCircleFill } from "react-icons/bs";
import axios from "axios";

function Invalid_Records() {

  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => { 
    getInvalidTransactions();
  }, []);

  const getInvalidTransactions = async()=> {
    const result = await axios.get("http://localhost:8080/GetInvalidTransactions")
    setTransactions(result.data)
  }

  return (
    <div className="invalid_record__main">
      <div className="header__invalid">
        <BsFillXCircleFill
          size="20px"
          style={{ color: "#ef1620", paddingRight: "5px" }}
        ></BsFillXCircleFill>
        <p style={{ margin: "0px" }}>Invalid Records</p>
      </div>
      <DataTable transactions={transactions}/>
    </div>
  );
}

export default Invalid_Records;
