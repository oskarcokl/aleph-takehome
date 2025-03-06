import { useState, useEffect, useCallback } from 'react';
import { getBookDetails, getBooksByTitle } from '../api/books';
import { Book } from '../types';
import { debounce } from 'lodash';

type BookDetails = {
    title: string;
    authors: string[];
    publishDate: string;
    physicalFormat: string;
};

export function useBookDetails(isbn: string) {
    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true);
            try {
                const data = await getBookDetails('isbn', isbn!);

                setBookDetails({
                    title: data.details.title,
                    authors: data.details.authors.map(
                        (author: { key: string; name: string }) => author.name
                    ),
                    publishDate: data.details.publish_date,
                    physicalFormat: data.details.physical_format,
                });
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [isbn]);

    return { bookDetails, loading, error };
}

export function useBookSearchByTitle(debounceMs = 300) {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const debouncedSearch = useCallback(
        debounce((searchQuery: string) => {
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }

            const fetchBookCoverUrls = async () => {
                setLoading(true);
                try {
                    const data = await getBooksByTitle(searchQuery);
                    setSearchResults(
                        data.docs.map((doc: any): Book | null => {
                            // NOTE: Currently not displaying books without a cover. Ask a
                            // clarifying question for this
                            if (doc.editions.docs.length === 0) {
                                return null;
                            }

                            return {
                                title: doc.title,
                                coverUrl: doc.editions.docs[0].cover_i
                                    ? `https://covers.openlibrary.org/b/id/${doc.editions.docs[0].cover_i}-L.jpg`
                                    : '',
                                key: doc.editions.docs[0].key.replace('/books/', ''),
                            };
                        })
                    );
                } catch (e) {
                    console.error(e);
                    setError(e as Error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBookCoverUrls();
        }, debounceMs),
        []
    );

    const clearSearchResults = useCallback(() => {
        setSearchResults([]);
        setError(null);
    }, []);

    return { searchResults, loading, error, clearSearchResults, search: debouncedSearch };
}
