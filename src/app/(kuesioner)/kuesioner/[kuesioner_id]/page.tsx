"use client";

import LobbyRoom from "@/app/components/quiz/LobbyRoom";
// import MultipleChoiceCard from "@/app/components/quiz/MultipleChoiceCard";
import PollingCard from "@/app/components/quiz/PollingCard";
import OpenEndedCard from "@/app/components/quiz/OpenEndedCard";
import PollingResultsFinish from "@/app/components/quiz/PollingResultsFinish";
import { useKuesionerWebsocket } from "@/app/hooks/Websocket/useKuesionerWebsocket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OpenEndedResultsFinish from "@/app/components/quiz/OpenEndedResultsFinish";

const KuesionerStartPage = () => {
  const params = useParams();
  const router = useRouter();

  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [totalCountdown, setTotalCountdown] = useState<number>(0);

  const kuesionerId = Array.isArray(params.kuesioner_id)
    ? params.kuesioner_id[0]
    : params.kuesioner_id;

  const {
    socket,
    isConnected,
    connectionStatus,
    connectionError,
    pin,
    kuesionerStatus,
    questionType,
    participants,
    questionData,
    choices,
    questionNumber,
    totalQuestion,
    timeLeft,
    totalTime,
    pollingResults,
    openEndedResponses,
    sendMessage,
    requestPollingResults,
    requestOpenEndedResponses,
    isKuesionerFinished,
  } = useKuesionerWebsocket(kuesionerId || "");

  useEffect(() => {
    if (timeLeft) {
      setCountdown(timeLeft);
    }
    if (totalTime) {
      setTotalCountdown(totalTime);
    }
  }, [timeLeft, totalTime]);

  const handleStartKuesioner = () => {
    if (!sendMessage) {
      console.error("WebSocket not available");
      return;
    }
    setIsStarting(true);
    sendMessage({ action: "start_kuesioner" });
    setTimeout(() => {
      setIsStarting(false);
    }, 3000);
  };

  const handleSubmitAnswer = (answerId: string) => {
    // Logic to submit answer will be implemented later
    console.log("Answer submitted:", answerId);
  };

  // Quiz Finished View - Show Final Results
  if (isKuesionerFinished) {
    const participantsScores = (participants || []).map((participant: any) => ({
      id:
        participant.id || participant.user_id || `participant-${Math.random()}`,
      name: participant.name || participant.username || "Anonymous",
      score: participant.score || 0,
      total_questions: totalQuestion || 0,
      type: participant.type || "guest",
    }));

    // Check if it's Open Ended results
    const hasOpenEndedResults =
      openEndedResponses &&
      openEndedResponses.type === "all_openended_responses";

    if (hasOpenEndedResults) {
      return (
        <OpenEndedResultsFinish
          participantsScores={participantsScores}
          openEndedResults={openEndedResponses}
          onBackToHome={() => router.push("/kuesioner")}
        />
      );
    }

    // Otherwise show Polling results
    return (
      <PollingResultsFinish
        participantsScores={participantsScores}
        pollingResults={pollingResults}
        onBackToHome={() => router.push("/kuesioner")}
      />
    );
  }

  // Quiz Started View
  if (kuesionerStatus?.is_started && !kuesionerStatus?.if_finished) {
    // Multiple Choice Question
    // if (questionType === "Multiple Choice") {
    //   return (
    //     <MultipleChoiceCard
    //       countdown={countdown}
    //       totalCountdown={totalCountdown}
    //       currentNumber={questionNumber}
    //       totalNumber={totalQuestion}
    //       questionData={questionData}
    //       choices={choices}
    //       sendMessage={sendMessage}
    //     />
    //   );
    // }
    // Open Ended Question
    if (questionType === "Open Ended") {
      return (
        <OpenEndedCard
          questionData={questionData}
          currentNumber={questionNumber}
          totalNumber={totalQuestion}
          openEndedResponses={openEndedResponses}
          sendMessage={sendMessage}
          requestOpenEndedResponses={requestOpenEndedResponses}
          onNext={() => {
            console.log("Moving to next question");
          }}
        />
      );
    }

    // Polling Question
    if (questionType === "Polling") {
      return (
        <PollingCard
          questionData={questionData}
          choices={choices}
          currentNumber={questionNumber}
          totalNumber={totalQuestion}
          pollingResults={pollingResults}
          sendMessage={sendMessage}
          onSubmit={handleSubmitAnswer}
          onNext={() => {
            // Handle next question logic
            console.log("Moving to next question");
          }}
        />
      );
    }
  }

  // Lobby View
  if (kuesionerStatus?.is_lobby) {
    return (
      <LobbyRoom
        gamePIN={pin || ""}
        participantJoined={participants || []}
        handleStartKuesioner={handleStartKuesioner}
        isStarting={isStarting}
      />
    );
  }

  // Loading View
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Memuat...</h2>
        <p className="text-gray-600">
          Silakan tunggu sementara kami menyiapkan kuesioner
        </p>
      </div>
    </div>
  );
};

export default KuesionerStartPage;
