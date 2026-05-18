"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  gamePin: string;
  yourName: string;
};

const GuestPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  useEffect(() => {
    const guestId = localStorage.getItem("guestId");
    if (guestId) {
      // Validate that the guest session is still valid
      // If not, it will be cleared by the WebSocket hook
      window.location.href = `/guest/${guestId}/`;
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const BASE_URL = process.env.NEXT_PUBLIC_SERVER_SIDE_URL;

    try {
      const response = await fetch(
        `${BASE_URL}/api/kuesioner/kuesioner-by-pin/${data.gamePin}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guest_name: data.yourName }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        localStorage.setItem("guestName", result.data.guest_name);
        localStorage.setItem("guestId", result.data.id);
        localStorage.setItem("kuesionerId", result.data.kuesioner_id);

        window.location.href = `/guest/${result.data.id}/`;
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(errorData.error || "Gagal bergabung ke kuesioner");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Bergabung
            </h1>
            <p className="text-xl text-gray-600">
              Masukkan PIN dan nama Anda untuk bergabung
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Game PIN Field */}
            <div>
              <label
                htmlFor="gamePin"
                className="text-lg font-semibold text-gray-700 block mb-3"
              >
                PIN
              </label>
              <input
                id="gamePin"
                {...register("gamePin", {
                  required: {
                    value: true,
                    message: "PIN wajib diisi",
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "PIN harus tepat 6 digit",
                  },
                })}
                type="text"
                placeholder="Masukkan PIN 6 digit"
                className="w-full px-6 py-4 text-xl text-center font-semibold border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all bg-gray-50 text-gray-600 placeholder:text-gray-400"
                style={{ letterSpacing: "0.1em" }}
              />
              {errors.gamePin && (
                <p className="mt-2 text-red-600 text-sm">
                  {errors.gamePin.message}
                </p>
              )}
            </div>

            {/* Your Name Field */}
            <div>
              <label
                htmlFor="yourName"
                className="text-lg font-semibold text-gray-700 block mb-3"
              >
                Nama Anda
              </label>
              <input
                id="yourName"
                {...register("yourName", {
                  required: {
                    value: true,
                    message: "Nama wajib diisi",
                  },
                  minLength: {
                    value: 2,
                    message: "Nama minimal 2 karakter",
                  },
                  maxLength: {
                    value: 50,
                    message: "Nama maksimal 50 karakter",
                  },
                })}
                type="text"
                placeholder="Masukkan nama Anda"
                className="w-full px-6 py-4 text-xl border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all bg-gray-50 text-gray-700 placeholder:text-gray-400"
              />
              {errors.yourName && (
                <p className="mt-2 text-red-600 text-sm">
                  {errors.yourName.message}
                </p>
              )}
            </div>

            {/* Join Game Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              <span>{isSubmitting ? "Bergabung..." : "Bergabung"}</span>
              {!isSubmitting && (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              )}
            </button>

            {/* Back to Menu Button */}
            {/* <button
              type="button"
              onClick={handleBackToMenu}
              className="w-full py-5 bg-white text-gray-700 text-xl font-semibold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Back to Menu
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
