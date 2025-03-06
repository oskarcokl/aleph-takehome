import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullInfoComponent from "../components/full-info";

export default function FullInfo() {
  const { isbn } = useParams();

  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
  const [title, setTitle] = useState<any>(null);
  const [authors, setAuthors] = useState<any>(null);
  const [publishDate, setPublishDate] = useState<any>(null);
  const [physicalFormat, setPhysicalFormat] = useState<any>(null);

  useEffect(() => {
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
      .then(response => response.json())
      .then(data => {
        setTitle(data[`ISBN:${isbn}`].details.title);
        setAuthors(data[`ISBN:${isbn}`].details.authors.map((author: { key: string, name: string }) => author.name));
        setPublishDate(data[`ISBN:${isbn}`].details.publish_date);
        setPhysicalFormat(data[`ISBN:${isbn}`].details.physical_format);
      });
  }, [isbn]);

  return (
    <section>
      <h1>Full Info</h1>
      <FullInfoComponent coverImageUrl={coverImageUrl} title={title} authors={authors} publishDate={publishDate} physicalFormat={physicalFormat} />
    </section>
  );
}