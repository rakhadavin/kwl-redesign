import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

type Participant = {
  id: string;
  guest_name: string;
};

type LobbyRoomProps = {
  gamePIN: string;
  participantJoined: Participant[];
  handleStartKuesioner: () => void;
  isStarting?: boolean;
};

const LobbyRoom = ({
  gamePIN,
  participantJoined,
  handleStartKuesioner,
  isStarting = false,
}: LobbyRoomProps) => {
  const router = useRouter();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const joinUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/guest/`;

  useEffect(() => {
    if (participantJoined && Array.isArray(participantJoined)) {
      setParticipants(participantJoined);
    }
  }, [participantJoined]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (participants.length > 0) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (participants.length > 0) {
        e.preventDefault();
        const confirmLeave = window.confirm(
          "Anda yakin ingin meninggalkan halaman? Sesi yang sedang berlangsung akan terhenti dan semua peserta akan keluar."
        );
        if (!confirmLeave) {
          window.history.pushState(null, "", window.location.href);
          return false;
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [participants.length]);

  const participantsPerPage = 10;
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const totalPages = Math.ceil(participants.length / participantsPerPage);
  const currentParticipants = participants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCancelGame = () => {
    if (participants.length > 0) {
      const confirmCancel = window.confirm(
        "Anda yakin ingin membatalkan? Semua peserta akan keluar dari lobby."
      );
      if (confirmCancel) {
        // Hapus event listeners sebelum navigasi untuk mencegah peringatan
        window.removeEventListener("beforeunload", () => {});
        window.removeEventListener("popstate", () => {});
        router.push("/kuesioner");
      }
    } else {
      router.push("/kuesioner");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-4">
            Kuesioner Siap!
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            Pemain dapat bergabung menggunakan PIN di bawah ini
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 mb-6 md:mb-8">
          {/* Game PIN Section */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-sm md:text-lg text-gray-500 mb-3 md:mb-4">
              PIN
            </p>
            <h2 className="text-4xl md:text-7xl font-bold text-purple-600 tracking-wider mb-6 md:mb-8">
              {gamePIN || "------"}
            </h2>

            <div className="flex justify-center mb-6 md:mb-8">
              <div className="bg-white p-3 md:p-4 rounded-lg border-2 border-gray-200">
                <QRCode
                  value={joinUrl}
                  size={150}
                  className="w-full h-auto md:w-[200px] md:h-[200px]"
                />
              </div>
            </div>
          </div>

          {/* Players Count */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-6">
            <div className="flex items-center gap-2 text-blue-600">
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-lg md:text-2xl font-bold">
                {participantJoined?.length || 0} Peserta
                {(participantJoined?.length || 0) !== 1 ? "" : ""} Bergabung
              </span>
            </div>
            <span className="px-3 py-1 md:px-4 md:py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium">
              Menunggu...
            </span>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartKuesioner}
            disabled={isStarting || (participantJoined?.length || 0) === 0}
            className="w-full py-3 md:py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-lg md:text-xl font-bold rounded-xl md:rounded-2xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-500 disabled:hover:to-blue-500 active:scale-95"
          >
            {isStarting
              ? "Memulai..."
              : `Mulai (${participantJoined?.length || 0} pemain)`}
          </button>

          {/* Join URL */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs md:text-sm text-gray-500 mb-2">
              Bergabung di:
            </p>
            <p className="text-purple-600 font-mono text-xs md:text-sm break-all">
              {joinUrl}
            </p>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center mb-6 md:mb-8">
          <button
            onClick={handleCancelGame}
            className="px-6 md:px-8 py-2 md:py-3 bg-white text-gray-700 text-sm md:text-base font-medium rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200"
          >
            Batalkan
          </button>
        </div>

        {/* Joined Players List */}
        {participants && participants.length > 0 && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              Peserta yang Bergabung
            </h2>

            <div className="space-y-2 md:space-y-3">
              {currentParticipants.map((participant, index) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-purple-50 rounded-lg md:rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-base md:text-xl font-bold">
                      {indexOfFirstParticipant + index + 1}
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold text-base md:text-lg">
                    {participant.guest_name}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination Controls - Mobile Optimized */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-gray-100 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-1 md:gap-2">
                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400">
                    ({indexOfFirstParticipant + 1}-
                    {Math.min(indexOfLastParticipant, participants.length)} dari{" "}
                    {participants.length})
                  </span>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-gray-100 text-gray-700 text-sm md:text-base rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LobbyRoom;
