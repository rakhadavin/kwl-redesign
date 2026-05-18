"use client";

import { useCallback, useEffect, useState } from "react";

interface MessageModalProps {
  message: string;
  labelButton1: string;
  buttonColor1: string;
  labelButton2?: string;
  buttonColor2?: string;
  close: () => void;
  isOpen: boolean;
  handleNext?: () => void;
  handleReload?: boolean;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  buttonColor1,
  buttonColor2,
  labelButton1,
  labelButton2,
  isOpen,
  close,
  handleNext,
  handleReload,
}) => {
  const [showMessageModal, setShowMessageModal] = useState(isOpen);

  useEffect(() => {
    setShowMessageModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowMessageModal(false);

    if (handleReload) {
      window.location.reload();
    }

    setTimeout(() => {
      close();
    }, 50);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  const handleButton2 = () => {
    handleClose();
    handleNext && handleNext();
  };

  const outlinedClass: Record<string, string> = {
    "yellow-accent": "border-yellow-accent text-yellow-accent hover:bg-yellow-accent/20",
    "green-accent": "border-green-accent text-green-accent hover:bg-green-accent/20",
    "red-accent": "border-red-accent text-red-accent hover:bg-red-accent/20",
    "dark-accent": "border-dark-accent text-dark-accent hover:bg-dark-accent/20",
  };

  const filledClass: Record<string, string> = {
    "yellow-accent": "bg-yellow-accent border-yellow-accent text-white hover:brightness-90",
    "green-accent": "bg-green-accent border-green-accent text-white hover:brightness-90",
    "red-accent": "bg-red-accent border-red-accent text-white hover:brightness-90",
    "dark-accent": "bg-dark-accent border-dark-accent text-white hover:brightness-90",
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="w-64 h-22 p-2 bg-white rounded-2xl shadow flex-col justify-end items-center gap-3 inline-flex ">
        <div className="w-44 pt-2 text-center text-black text-xs font-normal">
          {message}
        </div>
        <div className="btn-group flex flex-row gap-4 items-center justify-center w-full">
          <button
            onClick={handleClose}
            className={`mb-2 w-24 h-[30px] border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors ${outlinedClass[buttonColor1] ?? ""}`}
          >
            {labelButton1}
          </button>
          {labelButton2 && (
            <button
              onClick={handleButton2}
              className={`mb-2 w-24 h-[30px] border-2 font-bold text-xs py-2 px-2 rounded-xl transition-colors ${filledClass[buttonColor2 ?? ""] ?? ""}`}
            >
              {labelButton2}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
