import { useParams } from "react-router-dom";
import FullInfoComponent from "../components/full-info";
import { useBookDetails } from "../hooks/books";

export default function FullInfo() {
  const { isbn } = useParams();
  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const { bookDetails, loading } = useBookDetails(isbn!);

  return (
    <section>
      <h1>Full Info</h1>
      {loading && <p>Loading...</p>}
      {bookDetails && <FullInfoComponent coverImageUrl={coverImageUrl} title={bookDetails.title} authors={bookDetails.authors} publishDate={bookDetails.publishDate} physicalFormat={bookDetails.physicalFormat} />}
    </section>
  );
}
