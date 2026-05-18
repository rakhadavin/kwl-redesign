"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type JoinQuizData = {
  guest_name: string;
};

type JoinQuizResponse = {
  message: string;
  data: {
    id: string;
    guest_name: string;
    quiz: string;
    score: number;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
  };
  quiz_info: {
    title: string;
    description: string;
    quiz_pin: number;
  };
};

// Hook untuk join quiz tanpa authorization
export const useJoinQuiz = (id: string) => {
  return useMutation<JoinQuizResponse, any, JoinQuizData>({
    mutationFn: async (data: JoinQuizData) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/quiz/quizzes/${id}/join/`;

      const response = await axios.post(
        url,
        {
          guest_name: data.guest_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
  });
};
