// types/websocket.ts

export interface ActiveStudent {
  studentId: number;
  studentName: string;
  currentTopicId: number | null;
  currentTopicName: string | null;
  lastActivity: string;
}

export interface StudentActivity {
  id: string;
  studentId: number;
  studentName: string;
  action: 'viewing_topic' | 'left_topic' | 'left_course';
  topicId: number | null;
  topicName: string | null;
  timestamp: string;
}

export interface WebSocketMessage {
  type: 'student_activity' | 'active_students_list';
  action?: 'viewing_topic' | 'left_topic' | 'left_course';
  student_id?: number;
  student_name?: string;
  topic_id?: number;
  topic_name?: string;
  timestamp?: string;
  active_students?: ActiveStudent[];
}

export interface WebSocketSendMessage {
  action: 'topic_view' | 'topic_leave' | 'get_active_students';
  topic_id?: number;
}

export interface UseWebSocketReturn {
  socket: WebSocket | null;
  isConnected: boolean;
  activeStudents: ActiveStudent[];
  studentActivities: StudentActivity[];
  notifyTopicView: (topicId: number) => void;
  // notifyTopicLeave: (topicId: number) => void;
}