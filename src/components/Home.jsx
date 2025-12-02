import SearchResult from "./searchResult.jsx";
import StocksTable from "./StocksTable.jsx";
import { useState } from "react";

export default function Home() {
  const [isFocused, setIsFocused] = useState(false);

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
            className="form-control ps-5 shadow-sm bg-white"
            placeholder="Search Stock"
            style={{ borderRadius: "50px" }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3">
        {isFocused ? <SearchResult /> : <StocksTable />}
      </div>
    </>
  );
}
