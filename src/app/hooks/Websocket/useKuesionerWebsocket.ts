import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export const useKuesionerWebsocket = (id: string, guest: boolean = false) => {
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [sessionEndedMessage, setSessionEndedMessage] = useState<string | null>(
    null
  );

  const [pin, setPin] = useState<string | null>(null);
  const [kuesionerStatus, setKuesionerStatus] = useState<any | null>(null);
  const [questionType, setQuestionType] = useState<string | null>(null);

  const [participants, setParticipants] = useState<any[]>([]);

  const [questionData, setQuestionData] = useState<any | null>(null);
  const [choices, setChoices] = useState<any[]>([]);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [totalQuestion, setTotalQuestion] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isKuesionerFinished, setIsKuesionerFinished] =
    useState<boolean>(false);

  const [pollingResults, setPollingResults] = useState<any | null>(null);
  const [openEndedResponses, setOpenEndedResponses] = useState<any | null>(
    null
  );

  // Multiple Choice specific states
  const [multipleChoiceResults, setMultipleChoiceResults] = useState<
    any | null
  >(null);
  const [multipleChoiceScores, setMultipleChoiceScores] = useState<any | null>(
    null
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);
  const [correctChoiceIds, setCorrectChoiceIds] = useState<string[]>([]);

  const { data: session } = useSession();
  const accessToken = session?.access;

  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const cleanupRef = useRef<boolean>(false);

  useEffect(() => {
    if (!id) {
      console.log("❌ No ID provided to WebSocket hook");
      return;
    }

    if (!guest && !accessToken) {
      console.log("❌ Teacher mode but no access token");
      return;
    }

    // Prevent double connection in StrictMode
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log("✅ WebSocket already connected, skipping new connection");
      return;
    }

    console.log(
      `🔌 Starting WebSocket connection for ${
        guest ? "guest" : "teacher"
      }: ${id}`
    );

    cleanupRef.current = false;

    setConnectionStatus("connecting");
    setConnectionError(null);

    const baseWsUrl =
      process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL || "ws://localhost:8000/ws";
    const wsUrlTeacher = `${baseWsUrl}/kuesioner/${id}/?token=${accessToken}`;
    const wsUrlGuest = `${baseWsUrl}/kuesioner/guest/${id}/`;
    const url = guest ? wsUrlGuest : wsUrlTeacher;

    console.log("Connecting to WebSocket:", url);

    const ws = new WebSocket(url);

    const currentReconnectTimeout = reconnectTimeoutRef.current;

    ws.onopen = () => {
      if (cleanupRef.current) {
        console.log("⚠️ Connection opened after cleanup, closing immediately");
        ws.close(1000);
        return;
      }

      console.log("✅ WebSocket connected successfully");
      wsRef.current = ws;
      setIsConnected(true);
      setSocket(ws);
      setConnectionStatus("connected");
      setConnectionError(null);
    };

    ws.onclose = (event: CloseEvent): void => {
      console.log("WebSocket closed:", event.code, event.reason);

      if (wsRef.current === ws) {
        wsRef.current = null;
      }

      setIsConnected(false);
      setSocket(null);
      setConnectionStatus("disconnected");

      if (guest) {
        if (event.code === 4404) {
          console.log(
            "Guest attempt not found or kuesioner not found - redirecting to /guest/"
          );
          // Clear localStorage
          localStorage.removeItem("guestId");
          localStorage.removeItem("guestName");
          localStorage.removeItem("kuesionerId");

          // Redirect to guest page
          setTimeout(() => {
            window.location.href = "/guest/";
          }, 1000);
        } else if (event.code === 4403) {
          console.log("Lobby not active - redirecting to /guest/");
          localStorage.removeItem("guestId");
          localStorage.removeItem("guestName");
          localStorage.removeItem("kuesionerId");

          setTimeout(() => {
            window.location.href = "/guest/";
          }, 1000);
        }
      }
    };

    ws.onerror = (error: Event): void => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
      setConnectionError(
        "Failed to connect to kuesioner. Please check your connection and try again."
      );
      setIsConnected(false);
      setSocket(null);

      if (guest) {
        console.log("Guest WebSocket error - checking if should redirect");
        setTimeout(() => {
          if (!isConnected) {
            console.log("Redirecting guest to /guest/ due to connection error");
            localStorage.removeItem("guestId");
            localStorage.removeItem("guestName");
            localStorage.removeItem("kuesionerId");
            window.location.href = "/guest/";
          }
        }, 3000);
      }
    };

    ws.onmessage = (event: MessageEvent): void => {
      try {
        const data = JSON.parse(event.data);
        console.log("📡 WebSocket message received:", data);
        console.log("📡 Message type:", data.type);

        if (data.type === "kuesioner_status") {
          setPin(data.pin);
          setKuesionerStatus(data.kuesioner_status);
          setQuestionType(data.question_type);
          setSessionEnded(data.session_ended || false);

          if (data.session_ended && data.reason === "teacher_disconnect") {
            console.log("Session ended due to teacher disconnect");
            setSessionEnded(true);
            setSessionEndedMessage(
              data.message || "Session ended because teacher disconnected"
            );

            if (guest) {
              localStorage.removeItem("guestId");
              localStorage.removeItem("guestName");
              localStorage.removeItem("kuesionerId");

              setTimeout(() => {
                window.location.href = "/guest/";
              }, 3000);
            }
          }
        }

        if (data.type === "participant") {
          setParticipants(data.participants);
        }

        if (data.type === "question") {
          console.log("📝 New question received, resetting polling results");
          setQuestionData(data.question);
          setChoices(data.choices);
          setQuestionNumber(data.question_number);
          setTotalQuestion(data.total_questions);
          // Reset results for new question
          setPollingResults(null);
          setOpenEndedResponses(null);
          if (data.question?.time_limit) {
            setTimeLeft(data.question.time_limit);
            setTotalTime(data.question.time_limit);
          }
        }

        if (data.type === "question_update") {
          console.log("📝 Question update received:", data);
          setQuestionData(data.question);
          setChoices(data.choices);
          setQuestionNumber(data.question_number);
          setTotalQuestion(data.total_questions);
          // Reset results for new question
          setPollingResults(null);
          setOpenEndedResponses(null);
          setShowCorrectAnswers(false); // Reset show answer state
          setCorrectChoiceIds([]); // Reset correct choices
          if (data.question?.time_limit) {
            setTimeLeft(data.question.time_limit);
            setTotalTime(data.question.time_limit);
          }
        }

        if (data.type === "answer_submitted") {
          console.log("Answer submission result:", data);
          if (data.success) {
            console.log("✅ Answer submitted successfully:", data.data);
          } else {
            console.log("❌ Answer submission failed");
          }
        }

        if (data.type === "polling_results") {
          console.log("📊 Polling results received:", data);
          setPollingResults(data);
        }

        if (data.type === "openended_responses") {
          console.log("📝 Open Ended responses received:", data);
          setOpenEndedResponses(data);
        }

        if (data.type === "question_status") {
          console.log("📊 Question status received:", data);
          setTimeLeft(data.time_left || 0);
          setTotalTime(data.total_time || 0);
          setQuestionNumber(data.question_number || 0);
          setTotalQuestion(data.total_question || 0);

          // Handle show answer state
          if (data.show_answer && data.correct_choice_ids) {
            setShowCorrectAnswers(true);
            setCorrectChoiceIds(data.correct_choice_ids);
            console.log(
              "💡 Show answer activated with correct choices:",
              data.correct_choice_ids
            );
          }
        }

        if (data.type === "quiz_finished") {
          console.log("🎉 Quiz finished received:", data);
          setIsKuesionerFinished(true);

          // If quiz finished message contains results, save them
          if (data.polling_results) {
            console.log(
              "📊 Final polling results received:",
              data.polling_results
            );
            setPollingResults(data.polling_results);
          }

          if (data.openended_responses) {
            console.log(
              "📝 Final Open Ended results received:",
              data.openended_responses
            );
            setOpenEndedResponses(data.openended_responses);
          }
        }

        if (data.type === "start_multiple_choice_response") {
          console.log("🚀 Start Multiple Choice response received:", data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    const connectionTimeout = setTimeout(() => {
      if (ws.readyState === WebSocket.CONNECTING) {
        console.log("⏰ WebSocket connection timeout");
        ws.close();
        setConnectionError("Connection timeout. Please try again.");
        setConnectionStatus("error");
      }
    }, 10000); // 10 second timeout

    return (): void => {
      cleanupRef.current = true;
      console.log(
        `🧹 Cleanup function called for ${guest ? "guest" : "teacher"}: ${id}`
      );

      if (currentReconnectTimeout) {
        clearTimeout(currentReconnectTimeout);
      }
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
      }

      if (ws && wsRef.current === ws) {
        console.log("🔌 Closing WebSocket connection in cleanup");
        ws.close(1000);
        wsRef.current = null;
      } else {
        console.log("⚠️ WebSocket already closed or different instance");
      }
    };
  }, [id, guest, accessToken]);

  const sendMessage = (message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      console.log("Message sent:", message);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  const requestPollingResults = (questionId: string) => {
    sendMessage({
      action: "get_polling_results",
      question_id: questionId,
    });
  };

  const requestOpenEndedResponses = (questionId: string) => {
    sendMessage({
      action: "get_openended_responses",
      question_id: questionId,
    });
  };

  return {
    socket,
    isConnected,
    connectionStatus,
    connectionError,
    pin,
    kuesionerStatus,
    questionType,
    participants,
    sessionEnded,
    sessionEndedMessage,
    questionData,
    choices,
    questionNumber,
    totalQuestion,
    timeLeft,
    totalTime,
    isKuesionerFinished,
    pollingResults,
    openEndedResponses,
    multipleChoiceResults,
    multipleChoiceScores,
    showCorrectAnswers,
    correctChoiceIds,
    sendMessage,
    requestPollingResults,
    requestOpenEndedResponses,
  };
};
