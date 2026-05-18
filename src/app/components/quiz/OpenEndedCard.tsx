"use client";

import { useState, useEffect } from "react";

// Types for visx wordcloud (when libraries are installed)
type WordData = {
  text: string;
  value: number;
};

type CloudWord = {
  text: string;
  value: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  font: string;
};

type OpenEndedResponse = {
  id: string;
  participant_name: string;
  participant_id: string;
  answer: string;
  submitted_at: string;
};

type OpenEndedCardProps = {
  questionData: {
    id: string;
    question_text: string;
  };
  currentNumber: number;
  totalNumber: number;
  openEndedResponses?: any; // From websocket
  onNext?: () => void;
  sendMessage?: (message: any) => void;
  requestOpenEndedResponses?: (questionId: string) => void;
};

const OpenEndedCard = ({
  questionData,
  currentNumber,
  totalNumber,
  openEndedResponses,
  onNext,
  sendMessage,
  requestOpenEndedResponses,
}: OpenEndedCardProps) => {
  const [viewMode, setViewMode] = useState<"wordcloud" | "list">("wordcloud");
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Extract responses from websocket data
  const responses: OpenEndedResponse[] = openEndedResponses?.responses || [];

  useEffect(() => {
    if (openEndedResponses && openEndedResponses.responses) {
      setLastUpdate(new Date());
    }
  }, [openEndedResponses]);

  // Auto-request responses when component mounts or question changes
  // useEffect(() => {
  //   if (requestOpenEndedResponses && questionData?.id) {
  //     requestOpenEndedResponses(questionData.id);
  //   }
  // }, [requestOpenEndedResponses, questionData?.id]);

  const isLastQuestion = currentNumber >= totalNumber;

  const handleNext = () => {
    if (sendMessage && currentNumber < totalNumber) {
      const nextQuestionNumber = currentNumber + 1;
      sendMessage({
        action: "get_question",
        question_number: nextQuestionNumber,
      });
    } else if (currentNumber >= totalNumber) {
      if (sendMessage) {
        sendMessage({
          action: "finish_quiz",
        });
      }
      if (onNext) {
        onNext();
      }
    }
  };

  // Process responses for word cloud
  const generateWordCloudData = (): WordData[] => {
    const wordFrequency: { [key: string]: number } = {};

    // Common words to filter out
    const stopWords = new Set([
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "is",
      "was",
      "are",
      "were",
      "be",
      "been",
      "being",
      "have",
      "has",
      "had",
      "do",
      "does",
      "did",
      "will",
      "would",
      "should",
      "could",
      "may",
      "might",
      "must",
      "can",
      "this",
      "that",
      "these",
      "those",
      "i",
      "you",
      "he",
      "she",
      "it",
      "we",
      "they",
      "me",
      "him",
      "her",
      "us",
      "them",
    ]);

    responses.forEach((response: OpenEndedResponse) => {
      const words = response.answer
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word: string) => word.length > 3 && !stopWords.has(word));

      words.forEach((word: string) => {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      });
    });

    return Object.entries(wordFrequency).map(([text, value]) => ({
      text,
      value,
    }));
  };

  const wordCloudData = generateWordCloudData();

  // Color palette for wordcloud
  const colors = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  // Simple CSS-based wordcloud component
  const SimpleWordcloud = () => {
    const maxValue = Math.max(...wordCloudData.map((w) => w.value));
    const minValue = Math.min(...wordCloudData.map((w) => w.value));

    return (
      <div className="flex flex-wrap justify-center items-center gap-2 p-8 min-h-[400px]">
        {wordCloudData.map((word, index) => {
          const fontSize = Math.max(
            16,
            Math.min(48, (word.value / maxValue) * 48 + 16)
          );
          const color = colors[index % colors.length];

          return (
            <span
              key={word.text}
              className="font-bold transition-all hover:scale-110 cursor-pointer px-2 py-1 rounded"
              style={{
                fontSize: `${fontSize}px`,
                color: color,
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              title={`${word.text}: ${word.value} occurrences`}
            >
              {word.text}
            </span>
          );
        })}
      </div>
    );
  };

  // Advanced VISX Wordcloud Component (requires @visx libraries)
  const VisxWordcloud = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    // This is a template for when @visx libraries are properly installed
    // Uncomment and use this after running: npm install @visx/wordcloud @visx/responsive @visx/scale @visx/text

    /*
    const fontScale = scaleLog({
      domain: [Math.min(...wordCloudData.map(w => w.value)), Math.max(...wordCloudData.map(w => w.value))],
      range: [20, 80],
    });

    const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
    const fixedValueGenerator = () => 0.5;

    return (
      <Wordcloud
        words={wordCloudData}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={'archimedean'}
        rotate={0}
        random={fixedValueGenerator}
      >
        {(cloudWords: CloudWord[]) =>
          cloudWords.map((w: CloudWord, i: number) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor="middle"
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    );
    */

    // Fallback to simple wordcloud
    return <SimpleWordcloud />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
                  Open Ended Question
                </p>
                <p className="text-sm md:text-base font-bold text-gray-800">
                  Question {currentNumber} of {totalNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 px-3 md:px-4 py-2 rounded-full">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm md:text-base font-bold text-blue-600">
                {responses.length}{" "}
                {responses.length === 1 ? "response" : "responses"}
              </span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-4 md:mb-6">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 md:p-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {questionData?.question_text ||
                "What are your thoughts on this topic?"}
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-md p-1 inline-flex gap-1">
                <button
                  onClick={() => setViewMode("wordcloud")}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    viewMode === "wordcloud"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Word Cloud
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  List View
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8 bg-white">
            {viewMode === "wordcloud" ? (
              /* Word Cloud View */
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                  Response Word Cloud
                </h3>
                <div className="bg-white rounded-xl p-4 min-h-[400px] md:min-h-[500px] flex items-center justify-center">
                  {wordCloudData.length > 0 ? (
                    <SimpleWordcloud />
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg font-medium">No responses yet</p>
                      <p className="text-sm">
                        Waiting for participants to submit their answers...
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Words appear larger based on frequency in responses
                </p>
              </div>
            ) : (
              /* List View */
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  All Responses ({responses.length})
                </h3>
                <div className="space-y-4">
                  {responses.length > 0 ? (
                    responses.map(
                      (response: OpenEndedResponse, index: number) => (
                        <div
                          key={response.id}
                          className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 md:p-6 border border-purple-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-4">
                            {/* Participant Avatar */}
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg md:text-xl font-bold">
                                {response.participant_name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>
                            </div>

                            {/* Response Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-gray-800 text-lg">
                                  {response.participant_name}
                                </h4>
                                <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                                  #{index + 1}
                                </span>
                              </div>
                              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                "{response.answer}"
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                Submitted:{" "}
                                {new Date(
                                  response.submitted_at
                                ).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <svg
                        className="w-16 h-16 mx-auto mb-4 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg font-medium">No responses yet</p>
                      <p className="text-sm">
                        Waiting for participants to submit their answers...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Summary Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Total Responses
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {responses.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium mb-1">
                  Unique Words
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {wordCloudData.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {lastUpdate
                ? `Live responses - Updated ${lastUpdate.toLocaleTimeString()}`
                : "Waiting for responses..."}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <span>{isLastQuestion ? "Finish Quiz" : "Next Question"}</span>
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenEndedCard;
