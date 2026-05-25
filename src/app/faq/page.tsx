"use client";

import { useState } from "react";

type FAQItem = {
  pertanyaan: string;
  jawaban: string;
};

const FAQ_DATA: FAQItem[] = [
  {
    pertanyaan: "Bagaimana cara membuka halaman mata kuliah?",
    jawaban:
      'Kamu perlu melakukan enroll dalam salah satu course yang tersedia. Saat kamu menekan tombol "enroll", kamu mendaftarkan diri ke dalam course yang kamu pilih. Course pada aplikasi ini mewakili mata kuliah. Setelah kamu terdaftar dalam course yang disediakan, kamu bisa mengakses topik-topik mata kuliah.',
  },
  {
    pertanyaan: "Bagaimana proses KWL berjalan di aplikasi ini?",
    jawaban:
      "Pertama-tama, navigasi ke halaman course dan pilih topik yang sedang dibahas. Saat sesi kelas, tim pengajar akan memberi waktu untuk mengisi form Know dan Want To Know. Lalu, pengajar memulai sesi kelas dan menjelaskan materi. Setelah penjelasan selesai, kamu perlu mengisi form Learned yang bisa diakses saat kamu membuka halaman topik.",
  },
  {
    pertanyaan: "Bagaimana cara mengakses feedback dari dosen?",
    jawaban:
      'Kamu bisa melihat feedback yang diberikan oleh dosen setelah mengakses halaman Feedback. Kamu bisa menemukan halaman ini saat menekan tombol "Lihat Feedback" di course yang kamu tentukan. Di halaman Feedback, kamu bisa memilih pesan yang dikirim dari pengajar untuk membacanya dengan detail.',
  },
  {
    pertanyaan: "Bagaimana cara mendapatkan hadiah?",
    jawaban:
      'Setelah mengisi form KWL, kamu akan mendapatkan poin. Poin ini dapat kamu tukar di halaman Rewards yang bisa kamu akses saat menekan "Tukar Poin" di halaman Course. Kamu bisa menukar poin dengan menekan "Tukar" pada objek yang kamu pilih. Kamu bisa melihat instruksi dan informasi tentang hadiah setelah menekan "Detail".',
  },
  {
    pertanyaan: "Apakah data saya aman di K-OWL?",
    jawaban:
      "Ya, data kamu disimpan dengan aman dan hanya digunakan untuk keperluan pembelajaran. Kami mengikuti standar keamanan data yang ketat dan data kamu tidak akan dibagikan ke pihak ketiga tanpa persetujuanmu.",
  },
  {
    pertanyaan: "Bagaimana jika saya lupa password?",
    jawaban:
      'Kamu bisa mereset password melalui halaman login dengan menekan "Lupa Password". Instruksi reset akan dikirimkan ke email yang terdaftar. Jika kamu login menggunakan SSO Universitas, silakan hubungi administrator kampus.',
  },
  {
    pertanyaan: "Apakah K-OWL bisa diakses lewat HP?",
    jawaban:
      "Ya, K-OWL dapat diakses melalui browser di perangkat mobile. Pastikan kamu menggunakan browser terbaru untuk pengalaman terbaik. Kami terus berupaya mengoptimalkan tampilan untuk berbagai ukuran layar.",
  },
  {
    pertanyaan: "Bagaimana cara menghubungi tim support?",
    jawaban:
      "Kamu bisa menggunakan fitur chat di halaman FAQ ini untuk mengirimkan pertanyaanmu langsung. Selain itu, kamu juga bisa menghubungi kami melalui email support yang tersedia di halaman Kontak.",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
    item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${
          isOpen
            ? "bg-blue-900 text-white rounded-b-none"
          : "bg-blue-700 text-white hover:bg-blue-800"
        }`}
      >
        <span className="text-lg font-bold leading-none w-5 shrink-0 text-center">
          {isOpen ? "×" : "+"}
        </span>
        <span>{item.pertanyaan}</span>
      </button>
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-b-xl px-5 py-4 text-sm text-gray-700 leading-relaxed">
          {item.jawaban}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));
  const [question, setQuestion] = useState("");

  const handleToggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleSend = () => {
    if (!question.trim()) return;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=kwl@cs.ui.ac.id&su=Pertanyaan%20KWL&body=${encodeURIComponent(question)}`;
    window.open(gmailUrl, "_blank");
    setQuestion("");
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Back button */}
      <div className="px-8 pt-6">
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
        >
          ← Kembali
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left side */}
        <div className="flex flex-col gap-8">
          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src="/birdies.png"
              alt="K-OWL mascots"
              className="w-64 sm:w-80 object-contain"
            />
          </div>

          {/* Heading */}
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Temukan solusi cepat untuk kendala penggunaan K-OWL.
            </p>
            <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
              FREQUENTLY ASKED
            </h1>
            <h1 className="text-4xl font-extrabold text-orange-400 leading-tight">
              QUESTION
            </h1>
          </div>

          {/* Chat input */}
          <div>
            <p className="text-sm text-gray-600 mb-2 font-medium">
              Masih punya pertanyaan ? Chat Disini
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tulis pertanyaan anda"
              rows={4}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSend}
                disabled={!question.trim()}
                className="px-6 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>

        {/* Right side — FAQ accordion */}
        <div>
          {FAQ_DATA.map((item, i) => (
            <FAQAccordionItem
              key={i}
              item={item}
              isOpen={openIndices.has(i)}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>

      </div>
    </main>
  );
}