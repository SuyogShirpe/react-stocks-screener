import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEYS } from "../config/apiKeys";
import Chart from "react-apexcharts";

function StockDetails() {
  const { stockSymbol } = useParams();
  const API_KEY = API_KEYS.TWELVE_DATA;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
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
        colors: { upward: "#26a69a", downward: "#ef5350" },
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
