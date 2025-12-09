import { Link } from "react-router-dom";

export default function SearchDisplay({ searchResults }) {
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <ul
      className="list-group mx-auto mt-5 "
      style={{ width: "340px", borderRadius: "12px", overflow: "hidden" }}
    >
      {searchResults.map((result, index) => (
        <Link
          key={result.displaySymbol}
          to={`/stock/${result.displaySymbol}`}
          className="text-decoration-none"
        >
          <li
            key={result.symbol}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              cursor: "pointer",
              borderRadius:
                index === 0
                  ? "12px 12px 0 0"
                  : index === searchResults.length - 1
                  ? "0 0 12px 12px"
                  : "0",
            }}
          >
            <span>{result.description}</span>
            <span className="text-muted">{result.displaySymbol}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
