import React, { useEffect, useState } from "react";
import "./Home.css";
import { API_KEYS } from "../config/apiKeys";
import StockCard from "./StockCard";

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading , setLoading]  = useState(true);

  const API_KEY = API_KEYS.FINNHUB;
  
  const stockSymbols = [
  "AAPL","ABG","ABNB","ADI","ADBE","AI","ALGN","AMGN","AMD","AMZN",
  "ASML","AVGO","BABA","BIDU","BIIB","BMRN","BYDDF","CDNS",
  "CRM","CRWD","CSCO","CTSH","DDOG","DIS","DOCU","DXC",
  "ETSY","META","FSLY","FTNT","GILD","GOOGL","HIMX","HPE","ILMN","INFY",
  "INTC","JD","JPM","KLAC","LI","LITE","LRCX","LYFT","MCHP","MELI",
  "MPWR","MSFT","MTSI","MU","NET","NFLX","NIO","NTES","NVDA","NXPI",
  "OKTA","ON","ORCL","PANW","PDD","PLTR","PYPL","QCOM","REGN",
  "ROKU","SAP","SE","SHOP","SNAP","SNOW","SPOT",
  "STX","TEAM","TCEHY","TER","TSLA","TSM","TWLO","U","UBER",
  "V","WDC","WB","WIT","XPEV","ZS"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const randomStock = stockSymbols
        .sort(() => 0.5 - Math.random())
        .slice(0,  15);

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

          <div className="stock-scroll" style={{maxHeight:"500px", overflow:"auto"}}>
            {stocks.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}