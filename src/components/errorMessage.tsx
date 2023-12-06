import { RiErrorWarningFill } from 'react-icons/ri';

interface Props {
  title: string;
}
export default function ErrorMessage(props: Props) {
  return (
    <p className="text-red-600 bg-red-100 p-2 px-4 rounded-md flex gap-4 items-center">
      <RiErrorWarningFill /> {props.title}
    </p>
  );
}
