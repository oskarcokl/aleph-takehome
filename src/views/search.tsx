// TODO: Split up the css file
import "./search.css";
import { Book } from "../types";
import ResultItem from "../components/result-item";
import { useBookSearchByTitle } from "../hooks/books";

export default function Search() {
  const { searchResults, loading, error, search } = useBookSearchByTitle();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.replace(/\s+/g, '+').toLowerCase();;
    search(searchQuery);
  }

  return (
    <section>
      <h1>Search for books</h1>
      <input type="text" placeholder="Search" onChange={handleChange} />
      <Results searchResults={searchResults} loading={loading} error={error} />
    </section>
  );
}

function Results(props: { searchResults: Book[], loading: boolean, error: Error | null }) {
  return (
    <>
      <h2>Results</h2>
      {props.searchResults.length > 0 && !props.error && (
        <>
          {props.loading && <p>Loading...</p>}
          <div className="results" data-testid="results">
            {props.searchResults.map((book) => (
              <ResultItem key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
      {props.error && <p>Something went wrong while loading the search results</p>}
    </>
  )
}
