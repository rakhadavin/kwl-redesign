"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  gamePin: string;
};

export default function GuestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    try {
      const response = await fetch(`${BASE_URL}/api/quiz/quiz-by-pin/${data.gamePin}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        window.location.href = `/guest/${result.data.id}/`;
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-purple-600 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-bold mb-2">Join Quiz</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="gamePin" className="text-xs font-bold block mb-2">
                Game PIN
              </label>
              <input
                id="gamePin"
                {...register("gamePin", {
                  required: {
                    value: true,
                    message: "Game PIN is required",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Game PIN must contain only numbers",
                  },
                  minLength: {
                    value: 4,
                    message: "Game PIN must be at least 4 digits",
                  },
                  maxLength: {
                    value: 8,
                    message: "Game PIN must be at most 8 digits",
                  },
                })}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter game PIN"
                className="w-full px-4 py-3 text-2xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all shadow appearance-none text-neutral-700 leading-tight focus:shadow-outline"
              />
              {errors.gamePin && (
                <p className="mt-2 text-red-600 text-sm">
                  {errors.gamePin.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="text-xl">
                {isSubmitting ? "Joining..." : "Enter"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
