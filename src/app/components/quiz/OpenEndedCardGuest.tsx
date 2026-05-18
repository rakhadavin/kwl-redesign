"use client";

import { useState, useEffect } from "react";

type OpenEndedCardGuestProps = {
  questionData: {
    id: string;
    question_text: string;
  };
  currentNumber: number;
  totalNumber: number;
  sendMessage?: (message: any) => void;
  onSubmit?: (answer: string) => void;
};

const OpenEndedCardGuest = ({
  questionData,
  currentNumber,
  totalNumber,
  sendMessage,
  onSubmit,
}: OpenEndedCardGuestProps) => {
  const [answer, setAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(answer.length);
  }, [answer]);

  useEffect(() => {
    setAnswer("");
    setHasSubmitted(false);
    setIsSubmitting(false);
    setCharCount(0);
  }, [questionData?.id, currentNumber]);

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Mohon tulis jawaban sebelum mengirim");
      return;
    }

    setIsSubmitting(true);

    // Send answer via WebSocket
    if (sendMessage) {
      sendMessage({
        action: "submit_answer",
        type: "Open Ended",
        question_id: questionData.id,
        answer: answer.trim(),
      });
    }

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit(answer.trim());
    }

    // Set submitted state
    setTimeout(() => {
      setHasSubmitted(true);
      setIsSubmitting(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Info */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  Pertanyaan Terbuka
                </p>
                <p className="text-sm md:text-base font-bold text-gray-800">
                  Pertanyaan {currentNumber} dari {totalNumber}
                </p>
              </div>
            </div>

            {hasSubmitted && (
              <div className="flex items-center gap-2 bg-green-50 px-3 md:px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm md:text-base font-bold text-green-600">
                  Terkirim
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 md:p-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-4 inline-block">
              <p className="text-white text-xs md:text-sm font-medium">
                Bagikan pemikiran dan wawasan Anda
              </p>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {questionData?.question_text ||
                "Apa pendapat Anda tentang topik ini?"}
            </h2>
          </div>

          {/* Answer Area */}
          <div className="p-6 md:p-8">
            {!hasSubmitted ? (
              <>
                {/* Text Input */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Jawaban Anda:
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => {
                      if (e.target.value.length <= maxChars) {
                        setAnswer(e.target.value);
                      }
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik jawaban Anda di sini... "
                    className="w-full h-48 md:h-64 p-4 md:p-5 text-base md:text-lg border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all resize-none"
                    disabled={isSubmitting}
                  />

                  {/* Character Count */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs md:text-sm text-gray-500">
                      {charCount === 0 ? (
                        "Mulai menulis jawaban Anda..."
                      ) : (
                        <span>
                          {/* Tekan{" "}
                          <kbd className="px-2 py-1 bg-gray-100 rounded">
                            Ctrl
                          </kbd>{" "}
                          +{" "}
                          <kbd className="px-2 py-1 bg-gray-100 rounded">
                            Enter
                          </kbd>{" "}
                          untuk mengirim */}
                        </span>
                      )}
                    </p>
                    <span
                      className={`text-sm font-medium ${
                        charCount >= maxChars
                          ? "text-red-600"
                          : charCount >= maxChars * 0.9
                          ? "text-yellow-600"
                          : "text-gray-500"
                      }`}
                    >
                      {charCount} / {maxChars}
                    </span>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-800 mb-1">
                        Tips Menulis:
                      </p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Jelas dan spesifik dalam respons Anda</li>
                        {/* <li>• Berikan contoh jika relevan</li> */}
                        <li>• Periksa ejaan sebelum mengirim</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || isSubmitting}
                  className="w-full py-4 md:py-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg md:text-xl font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:to-blue-500 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Jawaban
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Submitted State */
              <div className="text-center py-12 md:py-16">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Jawaban Terkirim! ✓
                </h3>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  Terima kasih telah membagikan pemikiran Anda
                </p>

                {/* Submitted Answer Display */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 mb-6 text-left">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Jawaban Anda:
                  </p>
                  <p className="text-base text-gray-800 leading-relaxed italic">
                    "{answer}"
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
                  <svg
                    className="w-5 h-5 text-yellow-600 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-yellow-800">
                    Menunggu pertanyaan selanjutnya...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        {!hasSubmitted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Luangkan waktu untuk menulis respons
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenEndedCardGuest;
