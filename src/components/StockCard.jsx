import React from "react";
import { Link } from "react-router-dom";

const StockCard = ({ stock }) => {
  const {
    profile: { logo, name, ticker, marketCapitalization },
    quote: { c, dp, h, l },
  } = stock;

  return (
    <Link
      to={`/stock/${ticker}`}
      className="d-flex text-center align-items-center justify-content-between stock-row">
      <div className="col">
        <img
          src={logo}
          alt={`${name} logo`}
          className="img-fluid rounded-circle"
          style={{ width: "40px", height: "40px" }}
        />
      </div>
      <div className="col fw-bold">{name}</div>
      <div className="col">{ticker}</div>
      <div className="col">{(marketCapitalization / 1_000).toFixed(2)}M</div>
      <div className="col">${c}</div>
      <div className="col fw-bold" style={{ color: dp > 0 ? "green" : "red" }}>
        {dp}%
      </div>
      <div className="col">{h}</div>
      <div className="col">{l}</div>
    </Link>
  );
};

export default StockCard;
