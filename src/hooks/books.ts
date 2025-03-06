import { useState, useEffect } from 'react';
import { getBookDetails } from '../api/books';

type BookDetails = {
    title: string;
    authors: string[];
    publishDate: string;
    physicalFormat: string;
};

export function useBookDetails(isbn: string) {
    const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(true);

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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [isbn]);

    return { bookDetails, loading };
}
