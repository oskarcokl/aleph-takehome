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
    <div className="relative" data-testid="result-item" key={props.book.key} onMouseEnter={() => displayAdditionalInfo(props.book)} onMouseLeave={() => hideAdditionalInfo()}>
      <div className="flex items-start gap-10 bg-gray-50 p-4 rounded-md">
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
          <ThumbnailImage coverUrl={props.book.coverUrl} title={props.book.title} />
        </div>
        <h4 className="text-lg font-bold">{props.book.title}</h4>
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
    <div className="border-2 border-gray-300 rounded-md p-4 w-fit absolute top-[-50px] left-[300px] z-10 bg-white" data-testid="additional-info">
      <CoverImage coverUrl={additionalInfo.coverUrl} title={additionalInfo.title} authors={additionalInfo.authors} />
      <h4 className="font-bold text-md">Title: {additionalInfo.title}</h4>
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
    return <div className="w-[300px] h-[500px] bg-gray-200 flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <h2 className="text-sm">{props.authors.join(', ')}</h2>
    </div>;
  }

  return <img className="w-[300px]" src={props.coverUrl} alt="Book Cover" />;
}

function ThumbnailImage(props: { coverUrl: string, title: string }) {
  if (props.coverUrl === '') {
    return <div className="w-full h-full bg-gray-200 flex items-center justify-center flex-col">
      <h1 className="font-bold">{props.title}</h1>
    </div>;
  }

  return <img className="w-full" src={props.coverUrl} alt="Book Cover" />;
}