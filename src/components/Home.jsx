import React, { useEffect, useState } from "react";

function Home() {
  const [stocks, setStocks] = useState([]);

  const API_KEY = "d3ufbmpr01qil4apqa0gd3ufbmpr01qil4apqa10";
  const stockSymbols = [
    "AAPL", 
    "TSLA", 
    "INFY", 
    "GOOGL", 
    "MSFT", 
    "AMZN", 
    "BABA", 
    "RIO.L", 
    "NIO",
    "NFLX",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const randomStock = stockSymbols
        .sort(() => 0.5 - Math.random())
        .slice(0, 7);

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
    };
    fetchData();
  }, []);

  return (
    <>
      <table className="table table-bordered table-striped text-center align-middle mt-4">
        <thead className="table-success">
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Country</th>
            <th>Industry</th>
            <th>Market Cap (T USD)</th>
            <th>Price</th>
            <th>Change (%)</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index}>
              <td>
                <img
                  src={stock.profile.logo}
                  alt="company logo"
                  style={{ width: "40px", height: "40px" }}
                />
              </td>
              <td>{stock.profile.name}</td>
              <td>{stock.profile.ticker}</td>
              <td>{stock.profile.country}</td>
              <td>{stock.profile.finnhubIndustry}</td>
              <td>
                {(stock.profile.marketCapitalization / 1000000).toFixed(2)}T
              </td>
              <td>{stock.quote.c}</td>
              <td
                style={{
                  color: stock.quote.dp > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {stock.quote.dp}%
              </td>
              <td>{stock.quote.h}</td>
              <td>{stock.quote.l}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
