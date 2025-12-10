import React from "react";
import StocksTable from "./StocksTable.jsx";
import SearchDisplay from "./SearchDisplay.jsx";
import { useState } from "react";
import useTickerApi from "../custom_hooks/useTickerApi.jsx";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const { searchOutput, isLoading } = useTickerApi(searchInput);

  return (
    <>
      <div className="flex-grow-1 d-flex justify-content-center m-3">
        <div
          className="position-relative"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <i
            className="bi bi-search position-absolute"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#6c757d",
              pointerEvents: "none",
            }}
          ></i>
          <input
            type="text"
            className="form-control ps-5 bg-white"
            placeholder="Search Stock"
            style={{ borderRadius: "50px" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        {searchInput ? (
          isLoading ? (
            <p>Loading...</p>
          ) : (
            <SearchDisplay searchResults={searchOutput} />
          )
        ) : (
          <StocksTable />
        )}
      </div>
    </>
  );
}
