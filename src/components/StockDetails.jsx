import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEYS } from "../config/apiKeys";
import Chart from "react-apexcharts";

function StockDetails() {
  const { stockSymbol } = useParams();
  const API_KEY = API_KEYS.TWELVE_DATA;
  const navigate = useNavigate();

  const [series, setSeries] = useState([]);
  const [options] = useState({
    chart: {
      id: "candlestick-chart",
      type: "candlestick",
      toolbar: { show: true },
      background: "#0e1116",
    },
    grid: { borderColor: "#1f2937" },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#9CA3AF" } },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#9CA3AF" } },
    },
    plotOptions: {
      candlestick: {
        colors: { upward: "#1c855bff", downward: "#EF5350" },
      },
    },
    theme: { mode: "dark" },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM yyyy" },
    },
  });

  useEffect(() => {
    console.log("Fetching data for:", stockSymbol);

    const fetchData = async () => {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=1day&outputsize=500&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.values) {
        const ohlc = data.values
          .map((item) => ({
            x: new Date(item.datetime),
            y: [
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close),
            ],
          }))
          .reverse();

        setSeries([{ data: ohlc }]);
      }
    };

    fetchData();
  }, [stockSymbol, API_KEY]);
  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          width: "35px",
          height: "35px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "50%",
          fontWeight: "bold",
          border:"2px solid black",
          transition: "0.3s ease",
        }}
        
        className="btn d-flex  align-items-center justify-content-center"
      >
        {" "}
        <i className="bi bi-arrow-left"></i>
      </button>
      <h3>{stockSymbol}</h3>

      {series.length > 0 ? (
        <Chart
          options={options}
          series={series}
          type="candlestick"
          height={400}
        />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockDetails;
