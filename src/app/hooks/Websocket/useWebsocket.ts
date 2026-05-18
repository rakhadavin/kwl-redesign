// hooks/useWebSocket.ts
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ActiveStudent,
  StudentActivity,
  WebSocketMessage,
  WebSocketSendMessage,
  UseWebSocketReturn,
} from "./websocket";

export const useWebSocket = (
  courseId: number | string | undefined,
  topicId: number | string | undefined
): UseWebSocketReturn => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [activeStudents, setActiveStudents] = useState<ActiveStudent[]>([]);
  const [studentActivities, setStudentActivities] = useState<StudentActivity[]>(
    []
  );
  const { data: session } = useSession();
  const accessToken = session?.access;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!courseId || !accessToken) return;

    const connectWebSocket = (): void => {
      const baseWsUrl =
        process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8000/ws/";
      const wsUrl = `${baseWsUrl}course/${courseId}/${topicId}/?token=${accessToken}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = (): void => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setSocket(ws);

        // Request current active students (for lecturers)
        const message: WebSocketSendMessage = {
          action: "get_active_students",
        };
        ws.send(JSON.stringify(message));
      };

      ws.onmessage = (event: MessageEvent): void => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);

          switch (data.type) {
            case "student_activity":
              handleStudentActivity(data);
              break;
            case "active_students_list":
              if (data.active_students) {
                setActiveStudents(data.active_students);
              }
              break;
            default:
              console.log("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = (event: CloseEvent): void => {
        console.log("WebSocket disconnected", event);
        setIsConnected(false);
        setSocket(null);

        // Reconnect after 3 seconds if not manually closed
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
        }
      };

      ws.onerror = (error: Event): void => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };
    };

    connectWebSocket();

    return (): void => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close(1000);
      }
    };
  }, [courseId, accessToken]);

  const handleStudentActivity = (data: WebSocketMessage): void => {
    if (
      !data.student_id ||
      !data.student_name ||
      !data.action ||
      !data.timestamp
    ) {
      console.error("Invalid student activity data:", data);
      return;
    }

    setStudentActivities((prev) => {
      const newActivity: StudentActivity = {
        id: `${data.student_id}-${Date.now()}`,
        studentId: data.student_id!,
        studentName: data.student_name!,
        action: data.action!,
        topicId: data.topic_id || null,
        topicName: data.topic_name || null,
        timestamp: data.timestamp!,
      };

      const updated = [newActivity, ...prev].slice(0, 50);

      updateActiveStudents(data);

      return updated;
    });
  };

  const updateActiveStudents = (data: WebSocketMessage): void => {
    if (!data.student_id || !data.student_name || !data.action) return;

    setActiveStudents((prev) => {
      const studentId = data.student_id!;
      const filtered = prev.filter(
        (student) => student.studentId !== studentId
      );

      if (data.action === "viewing_topic") {
        const newStudent: ActiveStudent = {
          studentId: data.student_id!,
          studentName: data.student_name!,
          currentTopicId: data.topic_id || null,
          currentTopicName: data.topic_name || null,
          lastActivity: data.timestamp!,
        };
        return [...filtered, newStudent];
      } else if (
        data.action === "left_topic" ||
        data.action === "left_course"
      ) {
        return filtered;
      }

      return prev;
    });
  };

  const notifyTopicView = (): void => {
    if (socket && isConnected) {
      const message: WebSocketSendMessage = {
        action: "topic_view",
      };
      socket.send(JSON.stringify(message));
    }
  };

  const getActiveStudents = (topicId: number): void => {
    if (socket && isConnected) {
      const message: WebSocketSendMessage = {
        action: "get_active_students",
        topic_id: topicId,
      };
      socket.send(JSON.stringify(message));
    }
  };

  // const notifyTopicLeave = (topicId: number): void => {
  //   if (socket && isConnected) {
  //     const message: WebSocketSendMessage = {
  //       action: 'topic_leave',
  //       topic_id: topicId
  //     };
  //     socket.send(JSON.stringify(message));
  //   }
  // };

  return {
    socket,
    isConnected,
    activeStudents,
    studentActivities,
    notifyTopicView,
    // notifyTopicLeave
  };
};
