interface SuccessModalProps {
    open: boolean;
    description: string;
    closeText: string;
    handleConfirm?: () => void;
  }
  
  const SuccessModal: React.FC<SuccessModalProps> = ({
    open,
    description,
    closeText,
    handleConfirm,
  }) => {
    return (
      <div
        className={`
          fixed inset-0 flex justify-center items-center transition-colors text-center
          ${open ? "visible bg-black/20" : "invisible"}
          `}
      >
        <div className="content-center w-64 h-22 pt-6 p-4 text-xs bg-white rounded flex flex-col flex-wrap rounded-2xl shadow">
          {description}
  
          <div>
          <button onClick={handleConfirm}
              className={`mb-2 w-24 h-7 h-[30px] bg-green-accent border-2 hover:bg-transparent hover:text-green-accent hover:border-green-accent text-white font-bold text-xs py-2 px-2 rounded-xl`}
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default SuccessModal;


  