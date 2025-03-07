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
    <section className="mt-10">
      <h1 className="text-3xl font-bold">Search for books</h1>
      <a href="/" className="text-blue-500 block">[Back]</a>
      <input className="border-2 border-gray-300 rounded-md px-2 mt-4" type="text" placeholder="Search" onChange={handleChange} />
      <Results searchResults={searchResults} loading={loading} error={error} />
    </section>
  );
}

function Results(props: { searchResults: Book[], loading: boolean, error: Error | null }) {
  return (
    <section className="mt-5">
      <h2 className="text-2xl font-bold">Results</h2>
      {props.loading && <p>Loading...</p>}
      {props.searchResults.length > 0 && !props.error && (
        <>
          <div className="results" data-testid="results">
            {props.searchResults.map((book) => (
              <ResultItem key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
      {props.error && <p>Something went wrong while loading the search results</p>}
    </section>
  )
}
