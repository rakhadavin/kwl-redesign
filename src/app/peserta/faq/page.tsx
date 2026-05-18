"use client";

import FAQCard from "../../components/card/FAQCard";
import { useRouter } from "next/navigation";

export default function FAQPage() {
  const router = useRouter();
  return (
    <main className="py-5">
      <div className="flex items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="hidden sm:block w-6 h-6 ml-5 text-main hover:opacity-80 cursor-pointer"
          onClick={router.back}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <h1 className="flex-1 text-main font-bold text-2xl text-center">
          Frequently Asked Questions
        </h1>
      </div>

      <FAQCard
        pertanyaan="Bagaimana cara membuka halaman mata kuliah?"
        jawaban="Kamu perlu melakukan enroll dalam salah satu course yang tersedia. Saat kamu menekan tombol “enroll”, kamu mendaftarkan diri ke dalam course yang kamu pilih. Course pada aplikasi ini mewakili mata kuliah. Setelah kamu terdaftar dalam course yang disediakan, kamu bisa mengakses topik-topik mata kuliah. "
      />
      <FAQCard
        pertanyaan="Bagaimana proses KWL berjalan di aplikasi ini?"
        jawaban="Pertama-tama, navigasi ke halaman course dan pilih topik yang sedang dibahas. Saat sesi kelas, tim pengajar akan memberi waktu untuk mengisi form Know dan Want To Know. Lalu, pengajar memulai sesi kelas dan menjelaskan materi. Setelah penjelasan selesai, kamu perlu mengisi form Learned yang bisa diakses saat kamu membuka halaman topik"
      />
      <FAQCard
        pertanyaan="Bagaimana cara mengakses feedback dari dosen?"
        jawaban="Kamu bisa melihat feedback yang diberikan oleh dosen setelah mengakses halaman Feedback. Kamu bisa menemukan halaman ini saat menekan tombol “Lihat Feedback” di course yang kamu tentukan. Di halaman Feedback, kamu bisa memilih pesan yang dikitim dari pengajar untuk membacanya dengan detail"
      />
      <FAQCard
        pertanyaan="Bagaimana cara mendapatkan hadiah?"
        jawaban="Setelah mengisi form kwl, kamu akan mendapatkan poin. Poin ini dapat kamu tukar di halaman Rewards yang bisa kamu akses saat menekan “Tukar Poin” di halaman Course. Kamu bisa menukar poin dengan menekan “Tukar” pada objek yang kamu pilih. Kamu bisa melihat instruksi dan informasi tentang hadiah setelah menekan “Detail”"
      />
    </main>
  );
}
