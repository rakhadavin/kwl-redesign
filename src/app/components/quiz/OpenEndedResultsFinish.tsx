"use client";

import { useState } from "react";

type ParticipantScore = {
  id: string;
  name: string;
  score: number;
  total_questions: number;
  type: string;
};

type OpenEndedResponse = {
  id: string;
  participant_name: string;
  participant_id: string;
  answer: string;
  submitted_at: string;
  question_text?: string;
  question_number?: number;
};

type QuestionResponses = {
  question: {
    id: string;
    question_text: string;
    number: number;
  };
  responses: OpenEndedResponse[];
};

type OpenEndedResultsFinishProps = {
  participantsScores: ParticipantScore[];
  openEndedResults?: any;
  onBackToHome: () => void;
};

const OpenEndedResultsFinish = ({
  participantsScores,
  openEndedResults,
  onBackToHome,
}: OpenEndedResultsFinishProps) => {
  const [viewMode, setViewMode] = useState<
    "overview" | "by-question" | "word-analysis" | "participants"
  >("overview");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Process open ended results
  const isAllQuestions = openEndedResults?.type === "all_openended_responses";
  const questions: QuestionResponses[] = isAllQuestions
    ? openEndedResults?.questions
    : [];

  // Calculate statistics
  const totalResponses = questions.reduce(
    (sum, q) => sum + q.responses.length,
    0
  );
  const avgResponseLength =
    questions.length > 0
      ? Math.round(
          questions.reduce(
            (sum, q) =>
              sum + q.responses.reduce((rSum, r) => rSum + r.answer.length, 0),
            0
          ) / totalResponses
        )
      : 0;

  // Word frequency analysis across all responses
  const generateWordFrequency = () => {
    const wordFrequency: { [key: string]: number } = {};
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

    questions.forEach((question) => {
      question.responses.forEach((response) => {
        const words = response.answer
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .split(/\s+/)
          .filter((word) => word.length > 3 && !stopWords.has(word));

        words.forEach((word) => {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
      });
    });

    return Object.entries(wordFrequency)
      .map(([text, value]) => ({ text, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 50);
  };

  const wordFrequencyData = generateWordFrequency();
  const maxFrequency = Math.max(...wordFrequencyData.map((w) => w.value), 1);
  const colors = [
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ];

  const totalParticipants =
    participantsScores.length || openEndedResults?.session_participants || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
            Selesai!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Terima kasih telah membagikan wawasan berharga Anda
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6 overflow-x-auto">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setViewMode("overview")}
              className={`px-4 md:px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                viewMode === "overview"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Ringkasan
            </button>
            <button
              onClick={() => setViewMode("by-question")}
              className={`px-4 md:px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                viewMode === "by-question"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Per Pertanyaan
            </button>
            <button
              onClick={() => setViewMode("word-analysis")}
              className={`px-4 md:px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                viewMode === "word-analysis"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Analisis Kata
            </button>
            {/* <button
              onClick={() => setViewMode("participants")}
              className={`px-4 md:px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                viewMode === "participants"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Peserta
            </button> */}
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {totalParticipants}
            </p>
            <p className="text-sm md:text-base text-gray-600">Peserta</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {questions.length}
            </p>
            <p className="text-sm md:text-base text-gray-600">Pertanyaan</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-green-600"
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
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {totalResponses}
            </p>
            <p className="text-sm md:text-base text-gray-600">Total Respons</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {avgResponseLength}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Rata-rata Karakter
            </p>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === "overview" && (
          <div className="space-y-6">
            {/* Quick Summary */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Ringkasan Respons
              </h2>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div
                    key={question.question.id}
                    className="border-l-4 border-purple-500 pl-4 py-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        P{question.question.number}:{" "}
                        {question.question.question_text}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {question.responses.length} respons
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Keywords */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                10 Kata Kunci Teratas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {wordFrequencyData.slice(0, 10).map((word, index) => (
                  <div
                    key={word.text}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 text-center border border-purple-200"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-purple-600">
                      {word.value}
                    </p>
                    <p className="text-sm text-gray-700 font-medium capitalize mt-1">
                      {word.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === "by-question" && questions.length > 0 && (
          <>
            {/* Question Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3 text-center">
                Pilih pertanyaan untuk melihat respons:
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {questions.map((q, index) => (
                  <button
                    key={q.question.id}
                    onClick={() => setSelectedQuestionIndex(index)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      selectedQuestionIndex === index
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pertanyaan {q.question.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Question Responses */}
            {questions[selectedQuestionIndex] && (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
                <div className="mb-6">
                  <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                    Pertanyaan{" "}
                    {questions[selectedQuestionIndex].question.number}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {questions[selectedQuestionIndex].question.question_text}
                  </h2>
                  <p className="text-gray-600">
                    {questions[selectedQuestionIndex].responses.length} respons
                    diterima
                  </p>
                </div>

                <div className="space-y-4">
                  {questions[selectedQuestionIndex].responses.map(
                    (response, index) => (
                      <div
                        key={response.id}
                        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg font-bold">
                              {response.participant_name
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-gray-800">
                                {response.participant_name}
                              </h4>
                              <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                                #{index + 1}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              "{response.answer}"
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(response.submitted_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {viewMode === "word-analysis" && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Analisis Frekuensi Kata
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 min-h-[500px]">
              <div className="flex flex-wrap gap-3 justify-center items-center">
                {wordFrequencyData.map((word, index) => {
                  const size = Math.max(
                    16,
                    Math.min(64, (word.value / maxFrequency) * 64)
                  );
                  const color = colors[index % colors.length];

                  return (
                    <div
                      key={word.text}
                      className="inline-block px-3 py-2 rounded-lg hover:scale-110 transition-transform cursor-default"
                      style={{
                        fontSize: `${size}px`,
                        color: color,
                        fontWeight: "bold",
                        opacity: 0.7 + (word.value / maxFrequency) * 0.3,
                      }}
                      title={`${word.text}: appears ${word.value} times`}
                    >
                      {word.text}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Menampilkan 50 kata paling sering muncul (tidak termasuk kata-kata
              umum)
            </p>
          </div>
        )}

        {/* {viewMode === "participants" && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Daftar Peserta
            </h2>
            <div className="grid gap-3">
              {participantsScores.map((participant, index) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-gray-800">
                        {participant.name}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {participant.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-600 font-semibold">
                      Merespons
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Kembali ke Kuesioner
          </button>

          {/* <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-gray-50 text-gray-700 text-base md:text-lg font-semibold rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 flex items-center justify-center gap-2"
          >
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Ekspor Hasil
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default OpenEndedResultsFinish;
