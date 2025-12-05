export default function SearchDisplay({ searchResults }) {
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <ul className="list-group mx-auto mt-3" style={{ width: '30%' }}>
      {searchResults.map((result) => (
        <li key={result.symbol} className="list-group-item d-flex justify-content-between align-items-center"
          style={{cursor:"pointer"}}>
          <span>{result.description}</span>
          <span className="text-muted">{result.displaySymbol}</span>
        </li>
      ))}
    </ul>
  );
}
