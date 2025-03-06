export default function FullInfo(props: {
  coverImageUrl: string;
  title: string;
  authors: string[];
  publishDate: string;
  physicalFormat: string;
}) {
  return (
    <div>
      <img src={props.coverImageUrl} alt="Cover" />
      <p>Title: <span>{props.title}</span></p>
      <p>Authors: <span>{props.authors}</span></p>
      <p>Publish Date: <span>{props.publishDate}</span></p>
      <p>Physical Format: <span>{props.physicalFormat}</span></p>
    </div>
  )
}