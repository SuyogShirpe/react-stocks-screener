import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("watchlist");
    if (storedList) {
      setWatchlist(JSON.parse(storedList));
    }
  }, []);

  function removeFromWatchlist(removeStock) {
    setWatchlist((prev) => {
      const updatedList = prev.filter((stock) => stock !== removeStock);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
      return updatedList;
    });
  }
  console.log(watchlist);

  if (watchlist.length === 0) {
    return <p className="text-center mt-5">Your watchlist is empty.</p>;
  }
  return (
    <ul
      className="list-group mx-auto mt-5"
      style={{ width: "340px", borderRadius: "12px", overflow: "hidden" }}
    >
      {watchlist.map((stock, index) => (
        <li
          key={index}
          className="list-group-item d-flex align-items-center justify-content-between"
          style={{
            cursor: "pointer",
            borderRadius:
              index === 0
                ? "12px 12px 0 0"
                : index === watchlist.length - 1
                ? "0 0 12px 12px"
                : "0",
          }}
        >
          <Link
            key={index}
            to={`/stock/${stock.ticker}`}
            className="text-decoration-none "
            style={{ color: "#000" }}
          >
            <img
              src={stock.logo}
              alt={stock.name}
              className="img-fluid rounded-circle me-4"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="fw-medium">{stock.name}</span>
          </Link>
          <button
            className="btn p-0"
            style={{ border: "none", borderRadius: "50%" }}
            onClick={() => removeFromWatchlist(stock)}
          >
            <i className="bi bi-trash-fill text-danger"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Watchlist;
