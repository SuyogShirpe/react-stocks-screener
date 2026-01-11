import "../stylesheets/StocksTable.css";
import React, { useMemo } from "react";
import useRandProfQtApi from "../custom_hooks/useRandProfQtApi.jsx";
import { tickers } from "../assets/tickersList.js";
import StockCard from "./StockCard.jsx";

export default function StocksTable() {
  const randomStocks = useMemo(() => {
    return [...tickers].sort(() => 0.5 - Math.random()).slice(0, 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers]);

  const { stocks, isLoading, error } = useRandProfQtApi(randomStocks);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-center text-muted fw-semibold mt-4">
        Unable to load the graph right now.
      </p>
    );
  }
  if (!stocks.length) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <div className="px-4 py-3 border rounded text-secondary">
          No stock data available currently.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3 d-flex justify-content-center">
      <div className="stock-table" style={{ width: "90%" }}>
        <div className="row stock-header text-center align-items-center py-3 px-3 mb-2 shadow-sm">
          <div className="col">Logo</div>
          <div className="col">Name</div>
          <div className="col">Ticker</div>
          <div className="col">
            Market Cap <br /> <small>(T USD)</small>
          </div>
          <div className="col">Price</div>
          <div className="col">Change (%)</div>
          <div className="col">High</div>
          <div className="col">Low</div>
        </div>

        <div
          className="stock-scroll"
          style={{ maxHeight: "500px", overflow: "auto" }}
        >
          {stocks.map((stock) => (
            <StockCard key={stock.profile.ticker} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
}
