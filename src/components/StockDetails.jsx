import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGraphApi from "../custom_hooks/useGraphApi";
import Chart from "react-apexcharts";
import "../stylesheets/StockDetails.css";
import useSingleProfQtApi from "../custom_hooks/useSingleProfQuote";

export default function StockDetails() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { series, graphLoading , graphError } = useGraphApi(ticker);
  const { stock, isLoading } = useSingleProfQtApi(ticker);

  const options = useMemo(
    () => ({
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
        candlestick: { colors: { upward: "#1c855bff", downward: "#EF5350" } },
      },
      theme: { mode: "light" },
      tooltip: { theme: "light", x: { format: "dd MMM yyyy" } },
    }),
    []
  );

  if (isLoading || graphLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (graphError) {
    return <p style={{color:"red" , textAlign:"center"}}>{graphError}</p>
  }
  if(series.length === 0){
    return <p>No graph data available</p>
  }

  
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="btn d-flex align-items-center justify-content-center backBtn"
      >
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="stockGraphContainer">
        <div className="stockHeader">
          <img
            src={stock.profile.logo}
            alt={`${stock.profile.name} logo`}
            className="img-fluid rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
          <h4 className="col fw-bold">{stock.profile.name}</h4>
        </div>

        <div className="stockData horizontal">
          <h5 className="currentValue">Current Value: ${stock.quote.c}</h5>

          <div className="horizontalItems">
            <div className="rowItem">
              <span className="label">Market Cap:</span>
              <span className="value">
                {(stock.profile.marketCapitalization / 1_000).toFixed(2)}M
              </span>
            </div>

            <div className="rowItem">
              <span className="label">Change:</span>
              <span
                className={`value change ${
                  stock.quote.dp > 0 ? "green" : "red"
                }`}
              >
                {stock.quote.dp}%
              </span>
            </div>

            <div className="rowItem">
              <span className="label">Day High:</span>
              <span className="value">{stock.quote.h}</span>
            </div>

            <div className="rowItem">
              <span className="label">Day Low:</span>
              <span className="value">{stock.quote.l}</span>
            </div>
          </div>
        </div>

        <div className="chartDisplay">
          {graphLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <Chart
              options={options}
              series={series}
              type="candlestick"
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
}
