import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "../components/Visualization.css";
import { Line } from "react-chartjs-2";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Tooltip, Title, Legend);


export const data1 = {
  labels: ["Valid Records", "Invalid Records"],
  datasets: [
    {
      label: "Valid vs Invalid Records",
      data: [12, 19],
      backgroundColor: ["#b5b4ec", "#c586ec"],
    },
  ],
};

export const data2 = {
  labels: ["Invalid Reference Number", "Invalid Transaction Date", "Invalid Payer Name", "Invalid Payer Account", "Invalid Payee Name", "Invalid Payee Account", "Invalid Amount"],
  labels: ["Reason1", "Reason2", "Reason3", "Reason4", "Reason5"],
  datasets: [
    {
      label: "Distribution of Invalid Records",
      data: [12, 19, 3, 14, 5, 2, 0],
      backgroundColor: ["#b5b4ec", "#c586ec", "#9c83db", "#002e7e", "#90c5df"],
    },
  ],
};

const labelIndices = { 
  "Invalid Reference Number" : 0 , 
  "Invalid Transaction Date" : 1 , 
  "Invalid Payer Name": 2 ,
  "Invalid Payer Account" : 3 , 
  "Invalid Payee Name" : 4 , 
  "Invalid Payee Account" : 5 ,
  "Invalid Amount" : 6
};

function Visualization() {

  const [validTransactions, setValidTransactions] = React.useState([]);
  const [invalidTransactions, setInvalidTransactions] = React.useState([]);

  const getValidTransactions = async()=> {
    const result = await axios.get("http://localhost:8080/GetValidTransactions")
    setValidTransactions(result.data);
  }
  const getInValidTransactions = async()=> {
    const result = await axios.get("http://localhost:8080/GetInvalidTransactions")
    setInvalidTransactions(result.data);
  }

  React.useEffect(() => { 
    getInValidTransactions();
    getValidTransactions();
    console.log(invalidTransactions);
    //set invalid records' reason count
    invalidTransactions.forEach((invalidTransaction) => { 
      data2.datasets[0].data[labelIndices[invalidTransaction.reason]] = data2.datasets[0].data[labelIndices[invalidTransaction.reason]] + 1;
    });
    //set valid-invalid records count
    data1.datasets[0].data[0] = validTransactions.length;
    data1.datasets[0].data[1] = invalidTransactions.length;
    console.log(data2.datasets[0].data);
  }, [])

  return (
    <div
      className="visual__main"
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(56, 77, 233, 0.52),
          rgba(117, 19, 93, 0.73)
        ),
        url("https://wallpaperaccess.com/full/1691795.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          height: "50vh",
          width: "35vw",
          display: "flex",
          padding: "1%",
        }}
      >
        <Doughnut
          className="visual__chart"
          data={data1}
          options={{
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Valid vs Invalid Records",
                font: { size: 16 },
              },
            },
          }}
        />
        <Doughnut
          className="visual__chart"
          data={data2}
          options={{
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                font: { size: 16 },
                text: "Invalid Records Distribution",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Visualization;
