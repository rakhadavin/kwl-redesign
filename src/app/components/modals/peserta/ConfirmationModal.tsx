interface ConfirmationModalProps {
  open: boolean;
  description: string;
  closeText: string;
  url?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  description,
  closeText,
  url,
}) => {
  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
        `}
    >
      <div className="w-64 h-22 pt-6 p-4 text-xs bg-white rounded flex flex-col flex-wrap rounded-2xl shadow">
        {description}

        <div>
          <button
            className={`mb-2 w-24 h-7 h-[30px] bg-green-accent border-2 hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2 rounded-xl`}
          >
            <a href={url}>{closeText}</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
