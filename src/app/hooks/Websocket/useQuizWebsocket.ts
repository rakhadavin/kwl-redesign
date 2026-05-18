import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

type Participant = {
  id: string;
  guest_name: string;
};

type Choice = {
  id: string;
  choice_text: string;
};

type Question = {
  id: string;
  question_text: string;
  score: string;
  choices: Choice[];
};

type ParticipantScore = {
  id: string;
  name: string;
  type: string;
  score: number;
  total_questions: number;
  completed_at: string | null;
};

export const useQuizWebSocket = (id: string, guest = false) => {
  const [gamePIN, setGamePIN] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [quizStatus, setQuizStatus] = useState<any>(null);
  const [participantJoined, setParticipantJoined] = useState<Participant[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string[] | null>(null);
  const [participantsScores, setParticipantsScores] = useState<ParticipantScore[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const { data: session } = useSession();
  const accessToken = session?.access;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!id) return;

    if (accessToken || guest) {
      const connectWebSocket = (): void => {
        const baseWsUrl =
          process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8000/ws/";
        const wsUrlTeacher = `${baseWsUrl}quiz/${id}/?token=${accessToken}`;
        const wsUrlGuest = `${baseWsUrl}quiz/guest/${id}/`;

        const url = guest ? wsUrlGuest : wsUrlTeacher;
        console.log("Connecting to WebSocket:", url);
        
        const ws = new WebSocket(url);

        ws.onopen = (): void => {
          console.log("WebSocket connected successfully");
          setIsConnected(true);
          setSocket(ws);
        };

        ws.onmessage = (event: MessageEvent): void => {
          try {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);

            if (data.type === "lobby_activated") {
              setGamePIN(data.quiz_pin);
              setQuizStatus(data.quiz_status);
              if (data.participants) {
                setParticipantJoined(data.participants);
              }
            }

            if (data.type === "participant") {
              setParticipantJoined(data.participants);
              setQuizStatus(data.quiz_status);
            }

            if (data.type === "quiz_status") {
              setQuizStatus(data.quiz_status);
            }

            if (data.type === "quiz_started") {
              console.log("Quiz has started!");
              setQuizStatus(data.quiz_status);
            }

            if (data.type === "question_start") {
              console.log("New question started:", data.question_number);
              setQuestionNumber(data.question_number);
              setTotalQuestion(data.total_questions);
              setQuestionData(data.question);
              setCorrectAnswer(null); // Reset correct answer for new question
            }

            if (data.type === "question_end") {
              console.log("Question ended, correct answers:", data.correct_choice_ids);
              setCorrectAnswer(data.correct_choice_ids);
            }

            if (data.type === "quiz_finished") {
              console.log("Quiz has finished!", data);
              setQuizStatus(data.quiz_status);
              setIsQuizFinished(true);
              if (data.participants_scores) {
                setParticipantsScores(data.participants_scores);
              }
            }

            if (data.type === "error") {
              console.error("WebSocket error:", data.message);
              alert(data.message);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onclose = (event: CloseEvent): void => {
          console.log("WebSocket disconnected:", event.reason);
          setIsConnected(false);
          setSocket(null);
        };

        ws.onerror = (error: Event): void => {
          console.error("WebSocket error:", error);
          ws.close();
          setIsConnected(false);
          setSocket(null);
        };
      };

      connectWebSocket();
    }

    return (): void => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        console.log("Closing WebSocket connection");
        socket.close(1000);
      }
    };
  }, [id, accessToken, guest]);

  const sendMessage = (message: any) => {
    if (socket && isConnected) {
      console.log("Sending WebSocket message:", message);
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket not connected");
    }
  };

  return {
    socket,
    isConnected,
    gamePIN,
    participantJoined,
    quizStatus,
    sendMessage,
    questionNumber,
    totalQuestion,
    questionData,
    correctAnswer,
    participantsScores,
    isQuizFinished,
  };
};