"use client";
import LobbyGuest from "@/app/components/quiz/LobbyGuest";
import PollingCardGuest from "@/app/components/quiz/PollingCardGuest";
import OpenEndedCardGuest from "@/app/components/quiz/OpenEndedCardGuest";
import { useKuesionerWebsocket } from "@/app/hooks/Websocket/useKuesionerWebsocket";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KuesionerStartGuestPage() {
  const params = useParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(0);
  const [totalCountdown, setTotalCountdown] = useState<number>(0);

  const guestId = Array.isArray(params.guest_id)
    ? params.guest_id[0]
    : params.guest_id;

  const {
    isConnected,
    kuesionerStatus,
    sessionEnded,
    sessionEndedMessage,
    questionType,
    questionData,
    choices,
    questionNumber,
    totalQuestion,
    timeLeft,
    totalTime,
    sendMessage,
    isKuesionerFinished,
  } = useKuesionerWebsocket(guestId, true);

  useEffect(() => {
    if (timeLeft) {
      setCountdown(timeLeft);
    }
    if (totalTime) {
      setTotalCountdown(totalTime);
    }
  }, [timeLeft, totalTime]);


  // Add beforeunload warning when guest tries to refresh or leave page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Only show warning if connected and not in finished state
      if (
        isConnected &&
        !sessionEnded &&
        !kuesionerStatus?.if_finished &&
        !isKuesionerFinished
      ) {
        e.preventDefault();
        e.returnValue = "Anda akan keluar. Apakah Anda yakin?";
        return "Anda akan keluar. Apakah Anda yakin?";
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      // Only show warning if connected and not in finished state
      if (
        isConnected &&
        !sessionEnded &&
        !kuesionerStatus?.if_finished &&
        !isKuesionerFinished
      ) {
        e.preventDefault();
        const confirmLeave = window.confirm(
          "Anda akan keluar dan data Anda akan dihapus. Apakah Anda yakin ingin keluar?"
        );
        if (!confirmLeave) {
          window.history.pushState(null, "", window.location.href);
          return false;
        } else {
          // If user confirms, redirect to guest page
          window.location.href = "/guest/";
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Push a new state to handle back button
    if (
      isConnected &&
      !sessionEnded &&
      !kuesionerStatus?.if_finished &&
      !isKuesionerFinished
    ) {
      window.history.pushState(null, "", window.location.href);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [
    isConnected,
    sessionEnded,
    kuesionerStatus?.if_finished,
    isKuesionerFinished,
  ]);

  const handleSubmitAnswer = (answerId: string) => {
    console.log("Answer submitted:", answerId);
  };

  const handleSubmitOpenEnded = (answer: string) => {
    console.log("Open ended answer submitted:", answer);
  };

  // Session Ended
  if (sessionEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-pink-600 to-red-700 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Sesi Berakhir
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            {sessionEndedMessage || "Sesi telah berakhir."}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mb-6">
            Mengarahkan Anda kembali dalam beberapa saat...
          </p>
          <button
            onClick={() => (window.location.href = "/guest/")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold w-full sm:w-auto"
          >
            Bergabung ke Sesi Baru Sekarang
          </button>
        </div>
      </div>
    );
  }

  // Quiz Finished
  if (kuesionerStatus?.if_finished || isKuesionerFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Selesai!
          </h1>
          <p className="text-gray-600 mb-8">
            Terima kasih telah berpartisipasi. Guru sedang meninjau
            hasil.
          </p>
          <button
            onClick={() => router.push("/guest")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 transform hover:scale-105"
          >
            Bergabung ke Kuesioner Lain
          </button>
        </div>
      </div>
    );
  }

  // Quiz Started
  if (kuesionerStatus?.is_started && !kuesionerStatus?.if_finished) {
    // Polling Question
    if (questionType === "Polling") {
      return (
        <PollingCardGuest
          questionData={questionData}
          choices={choices}
          currentNumber={questionNumber}
          totalNumber={totalQuestion}
          onSubmit={handleSubmitAnswer}
          sendMessage={sendMessage}
        />
      );
    }

    // Open Ended Question
    if (questionType === "Open Ended") {
      return (
        <OpenEndedCardGuest
          questionData={questionData}
          currentNumber={questionNumber}
          totalNumber={totalQuestion}
          sendMessage={sendMessage}
          onSubmit={handleSubmitOpenEnded}
        />
      );
    }
  }

  // Lobby
  if (kuesionerStatus?.is_lobby && !kuesionerStatus?.is_started) {
    return <LobbyGuest isConnected={isConnected} />;
  }

  // Loading
  if (!isConnected || kuesionerStatus === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 md:mb-6"></div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Menghubungkan...
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Mohon tunggu saat kami menghubungkan Anda
          </p>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Mohon Tunggu...
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Memuat status kuesioner
        </p>
      </div>
    </div>
  );
}
