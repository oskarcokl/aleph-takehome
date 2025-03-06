import { useState } from "react";
import { Book } from "../types";
import { getBookDetails } from "../api/books";

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
      <img className="book-thumbnail" src={props.book.coverUrl} alt="Book Cover" />
      {showAdditionalInfo && additionalInfoId == props.book.key && < AdditionalInfo additionalInfo={additionalInfo} />}
    </div>
  )
}

function AdditionalInfo({ additionalInfo }: { additionalInfo: AdditionalInfo | null }) {
  if (!additionalInfo) {
    return null;
  }

  return (
    <div className="additional-info">
      <img src={additionalInfo.coverUrl} alt="Book Cover" />
      <h4>Title: {additionalInfo.title}</h4>
      <p>Authors: {additionalInfo.authors?.join(', ')}</p>
      <p>Publish Date: {additionalInfo.publishDate}</p>
      <p>Physical Format: {additionalInfo.physicalFormat}</p>
      <p>Number of Pages: {additionalInfo.numberOfPages}</p>
      <p>Weight: {additionalInfo.weight}</p>
    </div>
  );
}