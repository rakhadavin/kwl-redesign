"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Legend,
} from "recharts";

type ParticipantScore = {
  id: string;
  name: string;
  score: number;
  total_questions: number;
  type: string;
};

type ChoiceResult = {
  id: string;
  choice_text: string;
  vote_count: number;
  percentage: number;
  is_correct?: boolean;
};

type QuestionResult = {
  question: {
    id: string;
    question_text: string;
    number: number;
  };
  results: ChoiceResult[];
  total_votes: number;
};

type PollingResultsFinishProps = {
  participantsScores: ParticipantScore[];
  pollingResults?: any;
  onBackToHome: () => void;
};

const PollingResultsFinish = ({
  participantsScores,
  pollingResults,
  onBackToHome,
}: PollingResultsFinishProps) => {
  const [viewMode, setViewMode] = useState<
    "summary" | "by-question" | "participants"
  >("summary");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0);

  // Handle both single question results and all questions results
  const isAllQuestions = pollingResults?.type === "all_polling_results";
  const questions: QuestionResult[] = isAllQuestions
    ? pollingResults?.questions
    : [];

  // For summary view, aggregate all results
  let pollingSummary: ChoiceResult[] = [];
  let totalVotes = 0;

  if (isAllQuestions && questions.length > 0) {
    // Aggregate data from all questions for summary
    const choiceMap = new Map<string, ChoiceResult>();

    questions.forEach((questionData: QuestionResult) => {
      questionData.results.forEach((choice: ChoiceResult) => {
        const key = choice.choice_text;
        if (choiceMap.has(key)) {
          const existing = choiceMap.get(key)!;
          existing.vote_count += choice.vote_count;
        } else {
          choiceMap.set(key, {
            id: choice.id,
            choice_text: choice.choice_text,
            vote_count: choice.vote_count,
            percentage: 0,
            is_correct: choice.is_correct,
          });
        }
      });
    });

    pollingSummary = Array.from(choiceMap.values());
    totalVotes = pollingSummary.reduce((sum, item) => sum + item.vote_count, 0);

    // Recalculate percentages
    pollingSummary.forEach((choice) => {
      choice.percentage =
        totalVotes > 0
          ? parseFloat(((choice.vote_count / totalVotes) * 100).toFixed(1))
          : 0;
    });
  }

  const totalParticipants =
    participantsScores.length || pollingResults?.session_participants || 0;

  // Bar colors
  const barColors = ["#3B82F6", "#F87171", "#4F46E5", "#10B981", "#F59E0B"];

  // Pie chart colors
  const pieColors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  // Custom label for bar chart
  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#1F2937"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  // Custom label for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="16"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Prepare data for charts (summary)
  const chartData = pollingSummary.map((item) => ({
    name: item.choice_text,
    votes: item.vote_count,
    percentage: item.percentage,
  }));

  // Prepare data for individual question
  const getQuestionChartData = (questionIndex: number) => {
    if (!questions[questionIndex]) return [];
    return questions[questionIndex].results.map((item) => ({
      name: item.choice_text,
      votes: item.vote_count,
      percentage: item.percentage,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="mb-4">
            <span className="text-6xl md:text-8xl">📊</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
            Polling Selesai!
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Terima kasih telah berpartisipasi dalam polling
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6 overflow-x-auto">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setViewMode("summary")}
              className={`px-4 md:px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                viewMode === "summary"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
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
            <p className="text-sm md:text-base text-gray-600">Total Peserta</p>
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
              {questions.length || pollingResults?.total_questions || 0}
            </p>
            <p className="text-sm md:text-base text-gray-600">
              Total Pertanyaan
            </p>
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
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
              {totalVotes}
            </p>
            <p className="text-sm md:text-base text-gray-600">Total Suara</p>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === "summary" && pollingSummary.length > 0 && (
          <>
            {/* Overall Summary Charts */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Hasil Polling Keseluruhan
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#374151", fontSize: 14, fontWeight: 600 }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    label={{
                      value: "Suara",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#374151", fontWeight: 600 },
                    }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="votes"
                    radius={[12, 12, 0, 0]}
                    animationDuration={1500}
                  >
                    <LabelList content={<CustomLabel />} position="top" />
                    {chartData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % barColors.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart and Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                  Distribusi Suara
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="votes"
                      animationDuration={1500}
                    >
                      {chartData.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value, entry: any) => (
                        <span className="text-gray-700 font-medium">
                          {entry.payload.name}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                  Hasil Detail
                </h3>
                <div className="space-y-4">
                  {pollingSummary
                    .sort((a, b) => b.vote_count - a.vote_count)
                    .map((option, index) => (
                      <div
                        key={option.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{
                              backgroundColor:
                                barColors[index % barColors.length],
                            }}
                          >
                            {index + 1}
                          </div>
                          <span className="font-semibold text-gray-800 text-lg">
                            {option.choice_text}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">
                            {option.vote_count}
                          </p>
                          <p className="text-sm text-gray-600">
                            {option.percentage.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {viewMode === "by-question" && questions.length > 0 && (
          <>
            {/* Question Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-3 text-center">
                Pilih pertanyaan untuk melihat hasil:
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

            {/* Selected Question Results */}
            {questions[selectedQuestionIndex] && (
              <>
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
                  <div className="mb-6">
                    <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                      Pertanyaan{" "}
                      {questions[selectedQuestionIndex].question.number}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {questions[selectedQuestionIndex].question.question_text}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Total Suara:{" "}
                      <span className="font-bold">
                        {questions[selectedQuestionIndex].total_votes}
                      </span>
                    </p>
                  </div>

                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={getQuestionChartData(selectedQuestionIndex)}
                      margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="name"
                        tick={{
                          fill: "#374151",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                        angle={-15}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        label={{
                          value: "Suara",
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#374151", fontWeight: 600 },
                        }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="votes"
                        radius={[12, 12, 0, 0]}
                        animationDuration={1500}
                      >
                        <LabelList content={<CustomLabel />} position="top" />
                        {getQuestionChartData(selectedQuestionIndex).map(
                          (entry: any, index: number) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={barColors[index % barColors.length]}
                            />
                          )
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed Results for Selected Question */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    Detail Pilihan
                  </h3>
                  <div className="space-y-3">
                    {questions[selectedQuestionIndex].results
                      .sort((a, b) => b.vote_count - a.vote_count)
                      .map((choice, index) => (
                        <div
                          key={choice.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                              style={{
                                backgroundColor:
                                  barColors[index % barColors.length],
                              }}
                            >
                              {index + 1}
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">
                              {choice.choice_text}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-800">
                              {choice.vote_count}
                            </p>
                            <p className="text-sm text-gray-600">
                              {choice.percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* {viewMode === "participants" && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 mb-6">
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
                      Memilih
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Kembali ke Beranda
          </button>

          {/* <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-gray-50 text-gray-700 text-base md:text-lg font-semibold rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Export Results
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PollingResultsFinish;
