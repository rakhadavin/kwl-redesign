"use client";

import { useState, useEffect } from "react";

type Choice = {
  id: string;
  choice_text: string;
  vote_count?: number;
};

type PollingCardGuestProps = {
  questionData: {
    id: string;
    question_text: string;
  };
  choices: Choice[];
  currentNumber: number;
  totalNumber: number;
  onSubmit?: (choiceId: string) => void;
  sendMessage?: (message: any) => void;
  showResults?: boolean;
};

const PollingCardGuest = ({
  questionData,
  choices,
  currentNumber,
  totalNumber,
  onSubmit,
  sendMessage,
  showResults = false,
}: PollingCardGuestProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(showResults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null
  );

  // Reset voting state when question changes
  useEffect(() => {
    if (questionData?.id && questionData.id !== currentQuestionId) {
      console.log("📝 New question detected, resetting voting state");
      setCurrentQuestionId(questionData.id);
      setHasVoted(false);
      setSelectedChoice(null);
      setIsSubmitting(false);
    }
  }, [questionData?.id, currentQuestionId]);

  // Remove dummy data - use actual data only
  const choicesWithVotes = choices.map((choice) => ({
    ...choice,
    vote_count: choice.vote_count ?? 0,
  }));

  const totalVotes = choicesWithVotes.reduce(
    (sum, choice) => sum + (choice.vote_count || 0),
    0
  );

  const handleChoiceClick = (choiceId: string) => {
    if (!hasVoted) {
      setSelectedChoice(choiceId);
    }
  };

  const handleSubmit = () => {
    if (selectedChoice && !isSubmitting) {
      setIsSubmitting(true);

      if (sendMessage && questionData?.id) {
        const answerData = {
          type: "submit_answer",
          question_id: questionData.id,
          selected_choices: [selectedChoice],
          text_answer: "",
        };

        console.log("Submitting polling answer:", answerData);
        sendMessage(answerData);
      }
      setHasVoted(true);
      if (onSubmit) {
        onSubmit(selectedChoice);
      }
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const barColors = [
    "from-blue-500 to-blue-600",
    "from-red-500 to-red-600",
    "from-purple-500 to-purple-600",
    "from-green-500 to-green-600",
    "from-yellow-500 to-yellow-600",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500 font-medium">
                  Polling Question
                </p>
                <p className="text-sm md:text-base font-bold text-gray-800">
                  Question {currentNumber} of {totalNumber}
                </p>
              </div>
            </div>

            {hasVoted && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 md:px-4 py-2 rounded-full">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-sm md:text-base font-bold text-blue-600">
                  {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-4 md:mb-6">
          <div className="p-4 md:p-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-4 inline-block">
              <p className="text-white text-xs md:text-sm font-medium">
                Share your opinion!
              </p>
            </div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {questionData?.question_text || "What's your favorite option?"}
            </h2>
          </div>

          <div className="bg-white p-4 md:p-8">
            {!hasVoted ? (
              <div className="space-y-3 md:space-y-4">
                {choicesWithVotes.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceClick(choice.id)}
                    className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 transition-all text-left active:scale-95 ${
                      selectedChoice === choice.id
                        ? "border-purple-500 bg-purple-50 shadow-md scale-[1.02]"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedChoice === choice.id
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedChoice === choice.id && (
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-base md:text-xl font-semibold text-gray-800">
                        {choice.choice_text}
                      </span>
                    </div>
                  </button>
                ))}

                <button
                  onClick={handleSubmit}
                  disabled={!selectedChoice || isSubmitting}
                  className="w-full mt-4 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:to-blue-500 active:scale-95"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Vote"
                  )}
                </button>
              </div>
            ) : (
              // After voting - show disabled choices and waiting message
              <div className="space-y-3 md:space-y-4">
                {choicesWithVotes.map((choice) => (
                  <div
                    key={choice.id}
                    className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 opacity-60 ${
                      selectedChoice === choice.id
                        ? "border-purple-300 bg-purple-25"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedChoice === choice.id
                            ? "border-purple-400 bg-purple-400"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedChoice === choice.id && (
                          <svg
                            className="w-3 h-3 md:w-4 md:h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-base md:text-xl font-semibold text-gray-600">
                        {choice.choice_text}
                      </span>
                      {selectedChoice === choice.id && (
                        <span className="ml-auto px-3 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full">
                          Your Choice
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 md:p-6 bg-green-50 border-2 border-green-200 rounded-xl md:rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-800 font-bold text-lg">
                      Vote Submitted!
                    </span>
                  </div>
                  <p className="text-green-700 text-sm md:text-base">
                    Thank you for participating. Please wait for the next
                    question.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasVoted && (
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-gray-700 font-medium">
                Waiting for teacher to continue...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollingCardGuest;
