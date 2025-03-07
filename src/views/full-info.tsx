import { useParams } from "react-router-dom";
import FullInfoComponent from "../components/full-info";
import { useBookDetails } from "../hooks/books";

export default function FullInfo() {
  const { isbn } = useParams();
  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const { bookDetails, loading, error } = useBookDetails(isbn!);

  return (
    <section className="mt-10">
      <h1 className="text-3xl font-bold">Full Info</h1>
      <a href="/" className="text-blue-500">[Back]</a>
      <div className="flex flex-col gap-2 mt-4">
        {loading && <p>Loading...</p>}
        {bookDetails && !error && <FullInfoComponent coverImageUrl={coverImageUrl} title={bookDetails.title} authors={bookDetails.authors} publishDate={bookDetails.publishDate} physicalFormat={bookDetails.physicalFormat} />}
        {error && <p>Something went wrong while loading the book details</p>}
      </div>
    </section>
  );
}
