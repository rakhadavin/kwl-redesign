"use client";

import { useState, useEffect } from "react";
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
} from "recharts";

type Choice = {
  id: string;
  choice_text: string;
  vote_count?: number;
};

type PollingResults = {
  type: string;
  question: {
    id: string;
    question_text: string;
    number: number;
  };
  results: Array<{
    id: string;
    choice_text: string;
    vote_count: number;
    is_correct: boolean;
    percentage: number;
  }>;
  total_votes: number;
  session_id: string;
  session_participants: number;
};

type PollingCardProps = {
  questionData: {
    question_text: string;
  };
  choices: Choice[];
  currentNumber: number;
  totalNumber: number;
  pollingResults?: PollingResults | null;
  onSubmit?: (choiceId: string) => void;
  onNext?: () => void;
  sendMessage?: (message: any) => void;
};

const PollingCard = ({
  questionData,
  choices,
  currentNumber,
  totalNumber,
  pollingResults,
  onSubmit,
  onNext,
  sendMessage,
}: PollingCardProps) => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (pollingResults) {
      console.log("📊 PollingCard received polling results:", pollingResults);
      setLastUpdate(new Date());
    }
  }, [pollingResults]);

  // Prepare data for Recharts
  const choicesWithVotes = choices.map((choice, index) => {
    const pollingResult = pollingResults?.results?.find(
      (result) => result.id === choice.id
    );

    return {
      id: choice.id,
      name: choice.choice_text,
      votes: pollingResult?.vote_count ?? choice.vote_count ?? 0,
      percentage: pollingResult?.percentage ?? 0,
      is_correct: pollingResult?.is_correct ?? false,
    };
  });

  const totalVotes =
    pollingResults?.total_votes ??
    choicesWithVotes.reduce((sum, choice) => sum + choice.votes, 0);

  const isLastQuestion = currentNumber >= totalNumber;

  const handleNext = () => {
    if (sendMessage && currentNumber < totalNumber) {
      const nextQuestionNumber = currentNumber + 1;
      console.log(
        `🔄 Moving to question ${nextQuestionNumber} of ${totalNumber}`
      );

      // Send get_question action to load next question
      sendMessage({
        action: "get_question",
        question_number: nextQuestionNumber,
      });
    } else if (currentNumber >= totalNumber) {
      console.log("📝 Reached last question, finishing quiz");

      if (sendMessage) {
        // Send finish_quiz action
        sendMessage({
          action: "finish_quiz",
        });
      }

      // Handle quiz completion
      if (onNext) {
        onNext();
      }
    }
  };

  // Color palette matching previous design
  const barColors = [
    "#3B82F6", // blue-500
    "#F87171", // red-400
    "#4F46E5", // indigo-600
    "#10B981", // green-500
    "#F59E0B", // yellow-500
  ];

  // Custom label component for displaying votes on top of bars
  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#1F2937"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage =
        totalVotes > 0 ? ((data.votes / totalVotes) * 100).toFixed(1) : 0;

      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-purple-200">
          <p className="font-bold text-gray-800 mb-2">{data.name}</p>
          <p className="text-gray-600">
            Votes:{" "}
            <span className="font-bold text-purple-600">{data.votes}</span>
          </p>
          <p className="text-gray-600">
            Percentage:{" "}
            <span className="font-bold text-blue-600">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
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
          </div>
        </div>

        {/* Question Card with Recharts */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 md:p-8">
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {questionData?.question_text || "What's your favorite option?"}
            </h2>
          </div>

          {/* Bar Chart Area */}
          <div className="p-8 md:p-12 bg-gray-50">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={choicesWithVotes}
                margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#374151", fontSize: 14, fontWeight: 600 }}
                  angle={0}
                  textAnchor="middle"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  label={{
                    value: "Votes",
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#374151", fontWeight: 600 },
                  }}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(139, 92, 246, 0.1)" }}
                />
                <Bar
                  dataKey="votes"
                  radius={[12, 12, 0, 0]}
                  animationDuration={1000}
                  animationBegin={0}
                >
                  <LabelList content={<CustomLabel />} position="top" />
                  {choicesWithVotes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Percentage Display Below Chart */}
            <div className="mt-6 flex justify-center gap-4 md:gap-8 flex-wrap">
              {choicesWithVotes.map((choice, index) => {
                const percentage =
                  totalVotes > 0
                    ? ((choice.votes / totalVotes) * 100).toFixed(1)
                    : 0;
                return (
                  <div key={choice.id} className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-4 h-4 rounded"
                        style={{
                          backgroundColor: barColors[index % barColors.length],
                        }}
                      ></div>
                      <span className="font-semibold text-gray-700">
                        {choice.name}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {percentage}%
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Total Summary */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <div className="flex items-center justify-center gap-8 md:gap-12">
                <div className="text-center">
                  <p className="text-base md:text-lg font-semibold text-gray-700 mb-1">
                    Total Votes
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-600">
                    {totalVotes}
                  </p>
                </div>
                {pollingResults && (
                  <div className="text-center">
                    <p className="text-base md:text-lg font-semibold text-gray-700 mb-1">
                      Participants
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-blue-600">
                      {pollingResults.session_participants}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                pollingResults ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></div>
            <p className="text-gray-700 font-medium text-sm md:text-base">
              {pollingResults && lastUpdate
                ? `Live polling - Updated ${lastUpdate.toLocaleTimeString()}`
                : "Live polling in progress..."}
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

export default PollingCard;
