import { RiCloseLine } from 'react-icons/ri';

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
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Dialog(props: Props) {
  return (
    <div className={`max-w-full h-full bg-black/50 flex items-center justify-center fixed z-50 top-0 left-0 right-0 bottom-0 px-4 ${props.className}`}>
      <div className="bg-white rounded-lg p-5 text-center max-w-4xl">
        <div onClick={props.onClose} className="text-2xl flex justify-end cursor-pointer">
          <RiCloseLine />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            {props.icon} {props.title}
          </h3>
          <p className="mt-2">{props.subtitle}</p>
        </div>
        <div>{props.children}</div>
        <div className="mt-6 flex gap-6 items-center justify-center">
          <button onClick={props.onCancel} type="button" className="border border-primary text-primary font-medium rounded-full px-4 py-2 w-28">
            {props.cancelText}
          </button>
          <button onClick={props.onSubmit} className="bg-red-600 rounded-full px-4 py-2 w-28 text-white">
            {props.isLoading ? <div className="custom-loader mx-auto"></div> : props.submitText}
          </button>
        </div>
      </div>
    </div>
  );
}
