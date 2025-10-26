import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading , setLoading]  = useState(true);

  const API_KEY = "d3ufbmpr01qil4apqa0gd3ufbmpr01qil4apqa10";
  const stockSymbols = [
    "AAPL","TSLA","INFY","GOOGL","MSFT","AMZN","BABA",
    "RIO.L","NIO","NFLX","FB","NVDA","JPM","V","DIS",
    "ADBE","PYPL","INTC",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const randomStock = stockSymbols
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      const stockData = await Promise.all(
        randomStock.map(async (symbol) => {
          const [profileRes, quoteRes] = await Promise.all([
            fetch(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
            ),
            fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            ),
          ]);
          const profileData = await profileRes.json();
          const quoteData = await quoteRes.json();
          return { profile: profileData, quote: quoteData };
        })
      );
      setStocks(stockData);
      setLoading(false);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(loading){
    return <div className="d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }

  return (
    <>
      <div className="container mt-4 d-flex justify-content-center">
        <div className="stock-table" style={{ width: "65%" }}>
          <div className="row stock-header text-center align-items-center py-3 px-2 mb-2 shadow-sm">
            <div className="col">Logo</div>
            <div className="col">Name</div>
            <div className="col">Ticker</div>
            <div className="col">Market Cap <br /> <small>(T USD)</small></div>
            <div className="col">Price</div>
            <div className="col">Change (%)</div>
            <div className="col">High</div>
            <div className="col">Low</div>
          </div>

          {stocks.map((stock, index) => (
            <div
              key={index}
              className={`row text-center align-items-center py-3 px-2 my-2 shadow-sm rounded bg-white stock-row`}
            >
              <div className="col">
                <img
                  src={stock.profile.logo}
                  alt="company logo"
                  className="img-fluid rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
              </div>
              <div className="col fw-bold">{stock.profile.name}</div>
              <div className="col">{stock.profile.ticker}</div>
              <div className="col">
                {(stock.profile.marketCapitalization / 1000000).toFixed(2)}T
              </div>
              <div className="col">${stock.quote.c}</div>
              <div
                className="col fw-bold"
                style={{ color: stock.quote.dp > 0 ? "green" : "red" }}
              >
                {stock.quote.dp}%
              </div>
              <div className="col">{stock.quote.h}</div>
              <div className="col">{stock.quote.l}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}