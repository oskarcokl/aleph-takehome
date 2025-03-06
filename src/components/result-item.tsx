import { useState } from "react";
import { Book } from "../types";
import { getBookDetails } from "../api/books";
import './result-item.css';

type AdditionalInfo = {
  coverUrl: string,
  title: string,
  authors: string[],
  publishDate: string,
  physicalFormat: string,
  numberOfPages: number,
  weight: string
}

export default function ResultItem(props: { book: Book }) {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [additionalInfoId, setAdditionalInfoId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(null);

  const displayAdditionalInfo = async (book: Book) => {
    setShowAdditionalInfo(true);
    const data = await getBookDetails('olid', book.key);

    if (!data) {
      // TODO: Show some sort of error state.
      setShowAdditionalInfo(false)
      return
    }

    // assuming all data is available
    setAdditionalInfo({
      coverUrl: book.coverUrl,
      title: book.title,
      authors: data.details.authors?.map((author: any) => author.name),
      publishDate: data.details.publish_date,
      physicalFormat: data.details.physical_format,
      numberOfPages: data.details.number_of_pages,
      weight: data.details.weight
    })
    setAdditionalInfoId(book.key);
  }

  const hideAdditionalInfo = () => {
    setShowAdditionalInfo(false);
    setAdditionalInfoId('')
    setAdditionalInfo(null);
  }

  return (
    <div className="result-item" key={props.book.key} onMouseEnter={() => displayAdditionalInfo(props.book)} onMouseLeave={() => hideAdditionalInfo()}>
      <h4>{props.book.title}</h4>
      <div className="book-thumbnail">
        <CoverImage coverUrl={props.book.coverUrl} title={props.book.title} authors={[]} />
      </div>
      {showAdditionalInfo && additionalInfoId == props.book.key && < AdditionalInfo additionalInfo={additionalInfo} />}
    </div>
  )
}

function AdditionalInfo({ additionalInfo }: { additionalInfo: AdditionalInfo | null }) {
  if (!additionalInfo) {
    return null;
  }

  return (
    <div className="additional-info" data-testid="additional-info">
      <CoverImage coverUrl={additionalInfo.coverUrl} title={additionalInfo.title} authors={additionalInfo.authors} />
      <h4>Title: {additionalInfo.title}</h4>
      <p>Authors: {additionalInfo.authors?.join(', ')}</p>
      <p>Publish Date: {additionalInfo.publishDate}</p>
      <p>Physical Format: {additionalInfo.physicalFormat}</p>
      <p>Number of Pages: {additionalInfo.numberOfPages}</p>
      <p>Weight: {additionalInfo.weight}</p>
    </div>
  );
}

function CoverImage(props: { coverUrl: string, title: string, authors: string[] }) {
  if (props.coverUrl === '') {
    return <div className="default-cover-image">
      {/* h2 bigger than h1 for some reason? Just change this when adding tailwindcss */}
      <h2>{props.title}</h2>
      <h1>{props.authors.join(', ')}</h1>
    </div>;
  }

  return <img src={props.coverUrl} alt="Book Cover" />;
}