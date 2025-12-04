export default function SearchDisplay({ searchResults }) {
  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }
  return (
    <ul>
      {searchResults.map((result) => (
        <li key={result.symbol} className="list-group-item">
          {result.description} - ({result.displaySymbol})
        </li>
      ))}
    </ul>
  );
}
