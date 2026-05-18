"use client";

import { useQuizWebSocket } from "@/app/hooks/Websocket/useQuizWebsocket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from 'react-qr-code';

type Participant = {
  id: string;
  guest_name: string;
};

const StartQuizPage = () => {
  const params = useParams();
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);

  const quizId = Array.isArray(params.quiz_id)
    ? params.quiz_id[0]
    : params.quiz_id;

  const {
    gamePIN,
    participantJoined,
    sendMessage,
    quizStatus,
    questionData,
    questionNumber,
    totalQuestion,
    participantsScores,
    isQuizFinished,
  } = useQuizWebSocket(quizId || "");

  useEffect(() => {
    if (participantJoined && Array.isArray(participantJoined)) {
      setParticipants(participantJoined);
    }
  }, [participantJoined]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "Apakah Anda yakin ingin meninggalkan halaman? Quiz yang sedang berlangsung akan terganggu.";
    };

    const handlePopState = () => {
      const confirmLeave = window.confirm(
        "Apakah Anda yakin ingin meninggalkan halaman quiz ini?"
      );
      if (!confirmLeave) {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (quizStatus?.is_started && !quizStatus?.if_finished) {
      setCountdown(30); // Reset countdown when new question starts
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 30; // Reset for next question
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStatus?.is_started, questionNumber]);

  const handleStartQuiz = () => {
    if (!sendMessage) {
      console.error("WebSocket not available");
      return;
    }
    setIsStarting(true);
    sendMessage({ action: "start_quiz" });
    setTimeout(() => {
      setIsStarting(false);
    }, 3000);
  };

  const handleSkipQuestion = () => {
    console.log("Skip question");
  };

  if (isQuizFinished && participantsScores.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-blue-600 flex flex-col items-center p-8">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
              🎉 Quiz Completed! 🎉
            </h1>
            <p className="text-xl text-center text-gray-700 mb-8">
              Final Results - {participantsScores.length} Participants
            </p>

            <div className="grid gap-4">
              {participantsScores
                .sort((a, b) => b.score - a.score)
                .map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`p-6 rounded-lg shadow-md flex items-center justify-between ${
                      index === 0
                        ? "bg-yellow-100 border-2 border-yellow-400"
                        : index === 1
                        ? "bg-gray-100 border-2 border-gray-400"
                        : index === 2
                        ? "bg-orange-100 border-2 border-orange-400"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                            ? "bg-gray-500"
                            : index === 2
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {participant.name}
                        </h3>
                        <p className="text-gray-600 capitalize">
                          {participant.type}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {participant.score} pts
                      </div>
                      <div className="text-gray-600">
                        {participant.total_questions} questions
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="ml-4">
                        <span className="text-2xl">👑</span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => router.push("/quiz")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
              >
                Back to Quiz List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Started View
  if (quizStatus?.is_started && !quizStatus?.if_finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col p-4">
        {/* Header Section */}
        <div className="w-full flex items-start justify-between mb-4">
          {/* Timer/Counter Left */}
          <div className="bg-blue-950 rounded-full px-6 py-4">
            <span className="text-white text-4xl font-bold">{countdown}</span>
          </div>

          {/* Skip Button Right */}
          {/* <button 
            onClick={handleSkipQuestion}
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors"
          >
            <span className="text-xl">Skip</span>
          </button> */}
        </div>

        {/* Question Section */}
        <div className="w-full max-w-5xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
              {questionData?.question_text || "Loading question..."}
            </h2>
          </div>
        </div>

        {/* Answer Counter Right */}
        {/* <div className="absolute top-20 right-8 text-right">
          <div className="text-white text-6xl font-bold mb-2">0</div>
          <div className="text-white text-xl">Answers</div>
        </div> */}

        {/* Answer Options Grid */}
        <div
          className={`w-full max-w-7xl mx-auto gap-4 flex-1 ${
            questionData?.choices?.length === 2
              ? "grid grid-cols-2"
              : questionData?.choices?.length === 3
              ? "grid grid-cols-3"
              : "grid grid-cols-2"
          }`}
        >
          {questionData?.choices && questionData.choices.length > 0 ? (
            questionData.choices.map((choice, index) => {
              const colors = [
                "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
                "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
                "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
                "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
              ];

              const letters = ["A", "B", "C", "D"];

              return (
                <div
                  key={choice.id}
                  className={`bg-gradient-to-br ${
                    colors[index % colors.length]
                  } rounded-2xl shadow-xl p-8 flex items-center gap-6 transition-all`}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-30 rounded-lg">
                    {letters[index % letters.length]}
                  </div>
                  <span className="text-white text-4xl font-bold">
                    {choice.choice_text}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex items-center justify-center">
              <div className="text-white text-2xl">Loading choices...</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full flex items-center justify-between mt-4 px-8 py-4">
          {/* Question Counter */}
          <div className="text-white text-2xl font-bold">
            {questionNumber || 1}/{totalQuestion || 0}
          </div>

          {/* Game PIN */}
          {/* <div className="flex items-center gap-4 text-white text-xl">
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              kwl-dev.cs.ui.ac.id
            </span>
            <span className="font-bold">Game PIN: {gamePIN || "------"}</span>
          </div> */}

          {/* Control Icons */}
          {/* <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    );
  }

  // Lobby View (Waiting for participants)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-purple-600 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-700 text-sm mb-1 me-4">
              Join at <span className="font-bold">kwl-dev.cs.ui.ac.id/guest</span>
            </p>
          </div>
          <div className="border-l-4 border-blue-600 pl-6 ml-6 flex justify-start flex-row items-center">
            <p className="text-gray-700 text-sm mb-1">Game PIN:</p>
            <p className="text-5xl font-bold text-gray-900 me-5">{gamePIN || "------"}</p>
            <QRCode
              title="GeeksForGeeks"
              value={`kwl-dev.cs.ui.ac.id/guest/${quizId}`}
              size={100}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between my-6">
        <div></div>
        <div className="flex flex-col items-center">
          <p className="text-white text-3xl font-light">
            Waiting for participants
          </p>
          <p className="text-white text-xl mt-2">
            {participantJoined?.length || 0} participants joined
          </p>
        </div>
        <button
          onClick={handleStartQuiz}
          disabled={isStarting || (participantJoined?.length || 0) === 0}
          className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg shadow-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-xl">
            {isStarting ? "Starting..." : "Start"}
          </span>
        </button>
      </div>

      <div className="w-full max-w-6xl mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {participants && participants.length > 0 ? (
            participants.map((participant) => (
              <div
                key={participant.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-2xl font-bold">
                    {participant.guest_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-800 font-semibold text-center break-words w-full">
                  {participant.guest_name}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white text-xl py-8">
              {/* No participants yet */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartQuizPage;