import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullInfoComponent from "../components/full-info";
import { getBookDetails } from "../api/books";

type BookDetails = {
  title: string;
  authors: string[];
  publishDate: string;
  physicalFormat: string;
}

export default function FullInfo() {
  const { isbn } = useParams();

  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const data = await getBookDetails('isbn', isbn!);

        setBookDetails({
          title: data.details.title,
          authors: data.details.authors.map((author: { key: string, name: string }) => author.name),
          publishDate: data.details.publish_date,
          physicalFormat: data.details.physical_format
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [isbn]);

  return (
    <section>
      <h1>Full Info</h1>
      {loading && <p>Loading...</p>}
      {bookDetails && <FullInfoComponent coverImageUrl={coverImageUrl} title={bookDetails.title} authors={bookDetails.authors} publishDate={bookDetails.publishDate} physicalFormat={bookDetails.physicalFormat} />}
    </section>
  );
}