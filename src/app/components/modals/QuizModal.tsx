"use client";

import { useCallback, useEffect, useState } from "react";
import ImageButton from "../button/ImageButton";

interface QuizModalProps {
  messageHeader: string;
  message: string;
  label1: string;
  sublabel1?: string;
  imageFile1: string;
  next1: string;
  label2: string;
  sublabel2?: string;
  imageFile2: string;
  next2: string;
  label3?: string;
  sublabel3?: string;
  imageFile3?: string;
  next3?: string;
  cls: string;
  close: () => void;
  isOpen: boolean;
  knowId?: number;
  wtkId?: number;
  learnedId?: number;
  topicId?: number;
}

const QuizModal: React.FC<QuizModalProps> = ({
  messageHeader,
  message,
  label1,
  sublabel1,
  imageFile1,
  next1,
  label2,
  sublabel2,
  imageFile2,
  next2,
  label3,
  sublabel3,
  imageFile3,
  next3,
  cls,
  isOpen,
  close,
  knowId,
  wtkId,
  learnedId,
  topicId,
}) => {
  const [showMessageModal, setShowMessageModal] = useState(isOpen);

  useEffect(() => {
    setShowMessageModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowMessageModal(false);

    setTimeout(() => {
      close();
    }, 300);
  }, [close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
      <div className="relative my-6 w-72 h-56">
        <div
          className={`translate duration-600 h-full ${
            showMessageModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity 10"
          }`}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            <header className="flex items-center p-6 rounded-t justify-center relative">
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
            </header>

            <div className="flex justify-center flex-col items-center pb-8">
              <h2 className="text-l font-bold">{messageHeader}</h2>
              <p className="text-xs pb-4 text-center">{message}</p>

              <ImageButton
                label={label1}
                sublabel={sublabel1}
                imageFile={imageFile1}
                next={next1}
                close={cls}
                id={knowId}
                topicId={topicId}
              />

              <ImageButton
                label={label2}
                sublabel={sublabel2}
                imageFile={imageFile2}
                next={next2}
                close={cls}
                id={wtkId}
                topicId={topicId}
              />

              {label3 && (
                <>
                  <ImageButton
                    label={label3}
                    sublabel={sublabel3}
                    imageFile={imageFile3}
                    next={next3}
                    close={cls}
                    id={learnedId}
                    topicId={topicId}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
