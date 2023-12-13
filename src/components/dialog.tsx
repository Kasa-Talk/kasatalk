import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri';

interface Props {
  title: string;
  subtitle: string;
  submitText: string;
  cancelText: string;
  onSubmit: (e: any) => Promise<void>;
  onCancel: () => void;
  onClose: () => void;
  isLoading: boolean;
  className?: string;
}

export default function Dialog(props: Props) {
  return (
    <div className={`w-full h-full bg-black/50 flex items-center justify-center fixed z-50 top-0 left-0 right-0 bottom-0 overflow-hidden transition-all duration-300 ${props.className}`}>
      <div className="bg-white rounded-lg  p-5 text-center">
        <div onClick={props.onClose} className="text-2xl flex justify-end cursor-pointer">
          <RiCloseLine />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <RiErrorWarningFill className="text-red-500" /> {props.title}
          </h3>
          <p className="mt-2">{props.subtitle}</p>
        </div>
        <div className="mt-6 flex gap-6 items-center justify-center">
          <button onClick={props.onCancel} type="button" className="border border-primary text-primary font-medium rounded-full px-4 py-2 w-28">
            {props.cancelText}
          </button>
          <button onClick={props.onSubmit} type="button" className="bg-red-600 rounded-full px-4 py-2 w-28 text-white">
            {props.isLoading ? <div className="custom-loader mx-auto"></div> : props.submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
