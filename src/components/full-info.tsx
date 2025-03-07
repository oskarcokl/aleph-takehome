export default function FullInfo(props: {
  coverImageUrl: string;
  title: string;
  authors: string[];
  publishDate: string;
  physicalFormat: string;
}) {
  return (
    <div className="border-2 border-gray-300 rounded-md p-4 w-fit">
      <img src={props.coverImageUrl} alt="Cover" className="min-h-[450px] min-w-[300px]" />
      <h4 className="text-lg font-bold">Title: {props.title}</h4>
      <h5 className="text-md">Authors: {props.authors}</h5>
      <p className="text-sm">Publish Date: {props.publishDate}</p>
      <p className="text-sm">Physical Format: {props.physicalFormat}</p>
    </div>
  )
}