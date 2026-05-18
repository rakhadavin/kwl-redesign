"use client";

import { useCallback, useEffect, useState } from "react";

interface ModalProps {
  label: string;
  close: () => void;
  content: React.ReactElement;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="relative w-[500px] md:w-[80%] lg:w-[500px] mx-auto h-auto max-h-[500px] overflow-y-scroll scrollbar-none">
        {/*  w-[400px] md:w-[500px] lg:w-[500px] */}
        <div
          className={`translate duration-600 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity 10"
          }`}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              <div
                onClick={handleClose}
                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-dark-accent">{label}</h2>
            </header>

            <section className="m-10">{content}</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
