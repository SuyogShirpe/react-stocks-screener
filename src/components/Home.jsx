import React, { useMemo } from "react";
import useRandProfQtApi from "../custom_hooks/useRandProfQtApi";
import "./Home.css";
import { tickers } from "../assets/tickersList.js";
import StockCard from "./StockCard";

export default function Home() {
  const randomStocks = useMemo(() => {
    return [...tickers].sort(() => 0.5 - Math.random()).slice(0, 15);
  }, []);

  const { stocks, isLoading } = useRandProfQtApi(randomStocks);

  if (isLoading) {
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

  return (
    <>
      <div className="container mt-4 d-flex justify-content-center">
        <div className="stock-table " style={{ width: "90%" }}>
          <div className="row stock-header  text-center align-items-center py-3 px-3 mb-2 shadow-sm">
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
    </>
  );
}
