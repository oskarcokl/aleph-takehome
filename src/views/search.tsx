import { useCallback, useState } from "react";
import { debounce } from "lodash";
// TODO: Split up the css file
import "./search.css";
import { Book } from "../types";
import ResultItem from "../components/result-item";
import { getBooksByTitle } from "../api/books";


export default function Search() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const debouncedSearch = useCallback(debounce((searchQuery: string) => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const fetchBookCoverUrls = async () => {
      if (searchQuery) {
        setLoading(true);
        try {
          const data = await getBooksByTitle(searchQuery);
          setSearchResults(data.docs.map((doc: any): Book | null => {
            // NOTE: Currently not displaying books without a cover. Ask a
            // clarifying question for this
            if (doc.editions.docs.length === 0 || !doc.cover_i) {
              return null;
            }

            return {
              title: doc.title,
              coverUrl: `https://covers.openlibrary.org/b/id/${doc.editions.docs[0].cover_i}-L.jpg`,
              key: doc.editions.docs[0].key.replace('/books/', '')
            }
          }).filter(Boolean));
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchBookCoverUrls();

  }, 300),
    []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.replace(/\s+/g, '+').toLowerCase();;
    debouncedSearch(searchQuery);
  }


  return (
    <section>
      <h1>Search for books</h1>

      <input type="text" placeholder="Search" onChange={handleChange} />
      <Results searchResults={searchResults} loading={loading} />

    </section>
  );
}


function Results(props: { searchResults: Book[], loading: boolean }) {
  return (
    <>
      <h2>Results</h2>
      {props.searchResults.length > 0 && (
        <>
          {props.loading && <p>Loading...</p>}
          <div className="results" data-testid="results">
            {props.searchResults.map((book) => (
              <ResultItem key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
