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
      <p>Title: {props.title}</p>
      <p>Authors: {props.authors}</p>
      <p>Publish Date: {props.publishDate}</p>
      <p>Physical Format: {props.physicalFormat}</p>
    </div>
  )
}