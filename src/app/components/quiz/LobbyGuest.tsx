const LobbyGuest = ({ isConnected }: any) => {
  const guestName = localStorage.getItem("guestName") || "Guest";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          {/* Avatar/Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Selamat datang, {guestName || "Tamu"}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Anda berada di ruang tunggu
          </p>

          {/* Status Message */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex gap-1">
                <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">
              Menunggu host untuk memulai...
            </p>
            <p className="text-gray-600">
              Bersiap-siap! akan dimulai sebentar lagi
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              } animate-pulse`}
            ></div>
            <span>{isConnected ? "Terhubung" : "Menghubungkan..."}</span>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Tips
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 mt-0.5">•</span>
              <span>Tetap di halaman ini sampai dimulai</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-300 mt-0.5">•</span>
              <span>Pastikan Anda memiliki koneksi internet yang stabil</span>
            </li>
            {/* <li className="flex items-start gap-2">
              <span className="text-yellow-300 mt-0.5">•</span>
              <span>Jawab dengan cepat untuk mendapat poin lebih banyak!</span>
            </li> */}
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default LobbyGuest;
