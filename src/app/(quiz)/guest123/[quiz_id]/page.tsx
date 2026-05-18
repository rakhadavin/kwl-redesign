"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuizWebSocket } from "@/app/hooks/Websocket/useQuizWebsocket";
import { useJoinQuiz } from "@/app/hooks/useGuestQuiz";

type FormValues = {
  guest_name: string;
};

type GuestData = {
  id: string;
  guest_name: string;
  quiz_id: string;
  quiz_title: string;
  score: number;
  completed_at: string | null;
  created_at: string;
};

export default function StartQuizGuestPage() {
  const params = useParams();
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  let guest = guestData?.id ? true : false;

  const {
    isConnected,
    socket,
    sendMessage,
    quizStatus,
    questionData,
    questionNumber,
    totalQuestion,
  } = useQuizWebSocket(guestData?.id || "", guest);

  const quizId = Array.isArray(params.quiz_id)
    ? params.quiz_id[0]
    : params.quiz_id;

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const joinQuizMutation = useJoinQuiz(quizId);

  const onSubmit = async (data: FormValues) => {
    joinQuizMutation.mutate(data, {
      onSuccess: (result) => {
        const transformedGuestData: GuestData = {
          id: result.data.id,
          guest_name: result.data.guest_name,
          quiz_id: result.data.quiz,
          quiz_title: result.quiz_info.title,
          score: result.data.score,
          completed_at: result.data.completed_at,
          created_at: result.data.created_at,
        };

        setGuestData(transformedGuestData);
        setIsJoined(true);
        reset();
      },
      onError: (error) => {
        console.error("Join quiz error:", error);
      },
    });
  };

  const handleChoiceClick = (choiceId: string) => {
    if (hasAnswered) return; // Prevent answering after already answered

    setSelectedChoices([choiceId]); // Single choice for now
    setHasAnswered(true);

    // Send answer to backend
    if (sendMessage && questionData) {
      sendMessage({
        action: "submit_answer",
        question_id: questionData.id,
        selected_choice_ids: [choiceId],
      });
    }
  };

  // Reset answer state when new question starts
  // useState(() => {
  //   if (questionData) {
  //     setSelectedChoices([]);
  //     setHasAnswered(false);
  //   }
  // });

  useEffect(() => {
    if (questionData) {
      setSelectedChoices([]); // Reset pilihan jawaban saat soal baru
      setHasAnswered(false); // Reset status submit
    }
  }, [questionData, questionNumber]);

  // Quiz Started View for Guest
  if (quizStatus?.is_started && !quizStatus?.if_finished) {
    const letters = ["A", "B", "C", "D"];
    const colors = [
      "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-300 flex flex-col items-center justify-center p-4">
        {/* Answer Options Grid */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
          {questionData?.choices && questionData.choices.length > 0 ? (
            questionData.choices.map((choice, index) => {
              const isSelected = selectedChoices.includes(choice.id);
              
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice.id)}
                  disabled={hasAnswered}
                  className={`bg-gradient-to-br ${
                    colors[index % colors.length]
                  } rounded-2xl shadow-xl p-12 flex items-center justify-center transform transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                    isSelected ? "ring-4 ring-white" : ""
                  }`}
                >
                  <span className="text-white text-9xl font-bold drop-shadow-lg">
                    {letters[index % letters.length]}
                  </span>
                </button>
              );
            })
          ) : (
            // Loading state
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${
                  colors[index % colors.length]
                } rounded-2xl shadow-xl p-12 flex items-center justify-center animate-pulse`}
              >
                <span className="text-white text-9xl font-bold drop-shadow-lg opacity-50">
                  {letters[index]}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Answer Status */}
        {hasAnswered && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-4">
            <p className="text-gray-800 font-semibold text-center">
              ✓ Answer submitted! Waiting for next question...
            </p>
          </div>
        )}
      </div>
    );
  }

  // Quiz Finished View
  if (quizStatus?.if_finished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-800 to-blue-200 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-white text-5xl font-bold mb-2">Quiz Finished!</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Thank you for participating!
              </h2>
              <p className="text-lg mb-2">
                Good job,{" "}
                <span className="font-bold text-blue-600">
                  {guestData?.guest_name}
                </span>
                !
              </p>
              <p className="text-gray-600 mb-6">
                The quiz has ended. Results will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Waiting in Lobby View
  if (isJoined && guestData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-800 to-blue-200 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-white text-5xl font-bold mb-2">Quiz Joined!</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {guestData.quiz_title}
              </h2>
              <p className="text-lg mb-2">
                Welcome,{" "}
                <span className="font-bold text-blue-600">
                  {guestData.guest_name}
                </span>
                !
              </p>
              <p className="text-gray-600 mb-6">
                Waiting for the quiz to start...
              </p>
              
              {/* Loading animation */}
              <div className="flex justify-center items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Join Quiz Form View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-800 to-purple-200 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-bold mb-2">Join Quiz</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="guest_name"
                className="text-xs font-bold block mb-2"
              >
                Nickname
              </label>
              <input
                id="guest_name"
                {...register("guest_name", {
                  required: {
                    value: true,
                    message: "Nickname is required",
                  },
                  minLength: {
                    value: 2,
                    message: "Nickname must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Nickname must be at most 50 characters",
                  },
                })}
                type="text"
                placeholder="Enter your nickname"
                className="w-full px-4 py-3 text-2xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all shadow appearance-none text-neutral-700 leading-tight focus:shadow-outline"
              />
              {errors.guest_name && (
                <p className="mt-2 text-red-600 text-sm">
                  {errors.guest_name.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={joinQuizMutation.isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="text-xl">
                {joinQuizMutation.isPending ? "Joining..." : "Join Quiz"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}