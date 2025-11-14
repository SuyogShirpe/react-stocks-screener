import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEYS } from "../config/apiKeys";
import Chart from "react-apexcharts";
import "./StockDetails.css";

function StockDetails() {
  const { ticker } = useParams();
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
    console.log("Fetching data for:", ticker);

    const fetchData = async () => {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&outputsize=500&apikey=${API_KEY}`
      );
      const data = await response.json();
      console.log("Fetched data:", data);

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
  }, [ticker, API_KEY]);
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="btn d-flex align-items-center justify-content-center backBtn"
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#aeaeae44";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = "#ffffff";
        }}
      >
        <i className="bi bi-arrow-left"></i>
      </button>
      <div className="stockGraphContainer">
        <h3>{ticker}</h3>

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
    </div>
  );
}

export default StockDetails;
