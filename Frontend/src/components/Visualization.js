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
      data: [0, 0],
      backgroundColor: ["#b5b4ec", "#c586ec"],
    },
  ],
};

export const data2 = {
  labels: ["R1", "R2", "R3", "R4", "R5", "R6", "R7"],
  datasets: [
    {
      label: "Distribution of Invalid Records",
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        "#4066e0",
        "#b5b4ec",
        "#9c83db",
        "#c586ec",
        "#e090df",
        "#fbbede",
        "#ffc7ba",
      ],
    },
  ],
};

function Visualization() {

  const [transactionCount, setTransactionCount] = React.useState([]);

  React.useEffect(() => { 
    getTransactionCountPerReason();

    for(let i = 0 ; i < transactionCount.length-2; i++) {
      data2.datasets[0].data[i] = transactionCount[i];
    }
    data1.datasets[0].data[0] = transactionCount[7];
    data1.datasets[0].data[1] = transactionCount[8];

  }, [transactionCount]);

  const getTransactionCountPerReason = async()=> {
    const result = await axios.get("http://localhost:8080/GetTransactionCountPerReason")
    setTransactionCount(result.data);
  }
  
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
      <div className="shorthands">
        <h3>Shorthands</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div className="left_part_shorthands">
            <p style={{ color: "#1e4de8" }}>R1 : Invalid Reference Number</p>
            <p style={{ color: "#8280f0" }}>R2 : Invalid Transaction Date</p>
            <p style={{ color: "#9c83db" }}>R3 : Invalid Payer Name</p>
            <p style={{ color: "#bd6cef" }}>R4 : Invalid Payer Account</p>
          </div>
          <div className="right_part_shorthands">
            <p style={{ color: "#ea76e8" }}>R5 : Invalid Payee Name</p>
            <p style={{ color: "#fb93c9" }}>R6 : Invalid Payee Account</p>
            <p style={{ color: "#f79079" }}>R7 : Invalid Amount</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visualization;
