"use client";

import * as React from "react";
import { useEffect, useState } from "react";

type ConsentModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

// Accordion colors per section index (cycling if more than defined)
const ACCENT_COLORS = [
  { border: "border-orange-400", bg: "bg-orange-50", text: "text-orange-800" },
  { border: "border-blue-500",   bg: "bg-indigo-100", text: "text-blue-900" },
  { border: "border-yellow-400", bg: "bg-yellow-50",  text: "text-yellow-800" },
  { border: "border-teal-400",   bg: "bg-teal-50",    text: "text-teal-800" },
  { border: "border-pink-400",   bg: "bg-pink-50",    text: "text-pink-800" },
  { border: "border-green-400",  bg: "bg-green-50",   text: "text-green-800" },
  { border: "border-purple-400", bg: "bg-purple-50",  text: "text-purple-800" },
  { border: "border-red-400",    bg: "bg-red-50",     text: "text-red-800" },
  { border: "border-cyan-400",   bg: "bg-cyan-50",    text: "text-cyan-800" },
];

function getAccent(index: number) {
  return ACCENT_COLORS[index % ACCENT_COLORS.length];
}

type AccordionSectionProps = {
  index: number;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

function AccordionSection({ index, title, children, isOpen, onToggle }: AccordionSectionProps) {
  const color = getAccent(index);
  return (
    <div className={`mb-3 rounded-lg border-l-4 overflow-hidden ${color.border} ${color.bg}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2 px-4 py-3 text-left font-bold text-sm text-blue-900 transition-colors hover:brightness-95 ${color.bg}`}
      >
        <span className="text-base font-bold leading-none w-4 shrink-0">
          {isOpen ? "×" : "+"}
        </span>
        {title}
      </button>
      {isOpen && (
        <div className={`px-5 pb-4 pt-1 text-sm text-blue-900 ${color.bg}`}>
          <div className="space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5 [&_ul_li]:text-blue-700 [&_p]:text-gray-800">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// All sections data
type SectionDef = { title: string; content: React.ReactNode };

const SECTIONS: SectionDef[] = [
  {
    title: "1. Tujuan Penelitian",
    content: (
      <>
        <p>Penelitian ini bertujuan untuk:</p>
        <ul>
          <li>Mengkaji proses refleksi pembelajaran berbasis KWL</li>
          <li>Mengembangkan learning analytics untuk memahami engagement dan pemahaman konsep</li>
          <li>Menghasilkan inovasi pedagogis dan teknologi pendidikan</li>
          <li>Mengembangkan dataset KWL</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Prosedur Partisipasi",
    content: (
      <>
        <p>Jika bersedia berpartisipasi, Anda akan:</p>
        <ul>
          <li>Menggunakan K-OWL dalam aktivitas pembelajaran</li>
          <li>Mengisi refleksi Know–Want to Know–Learned</li>
          <li>Berinteraksi dengan fitur sistem (opsional)</li>
          <li>Menghasilkan data interaksi yang dianalisis untuk penelitian</li>
        </ul>
        <p className="mt-1">Penelitian tidak mengubah proses pembelajaran normal.</p>
      </>
    ),
  },
  {
    title: "3. Jenis Data yang Dikumpulkan",
    content: (
      <>
        <p className="font-medium">A. Data pembelajaran</p>
        <ul>
          <li>Isian Know–Want–Learn</li>
          <li>Jawaban refleksi</li>
          <li>Pertanyaan mahasiswa</li>
          <li>Diskusi dan interaksi pembelajaran</li>
        </ul>
        <p className="font-medium mt-2">B. Data sistem (log)</p>
        <ul>
          <li>Timestamp aktivitas</li>
          <li>Interaksi fitur</li>
          <li>Durasi penggunaan</li>
          <li>Metadata penggunaan</li>
        </ul>
        <p className="font-medium mt-2">C. Data analitik turunan</p>
        <ul>
          <li>Indikator engagement</li>
          <li>Deteksi miskonsepsi</li>
          <li>Clustering pembelajaran</li>
          <li>Analisis refleksi berbasis AI</li>
        </ul>
        <p className="font-medium mt-2">D. Data sensitif — Tidak dikumpulkan:</p>
        <ul>
          <li>Data kesehatan</li>
          <li>Data finansial</li>
          <li>Data biometrik</li>
          <li>NIK atau identitas sensitif lainnya</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Dasar Hukum Pemrosesan Data",
    content: (
      <>
        <p>Pemrosesan data dilakukan berdasarkan:</p>
        <ul>
          <li>Persetujuan partisipan</li>
          <li>Kepentingan penelitian ilmiah</li>
          <li>Kepentingan pendidikan</li>
          <li>Kepatuhan terhadap GDPR dan UU PDP Indonesia</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Prinsip Perlindungan Data",
    content: (
      <>
        <p>Pemrosesan mengikuti prinsip:</p>
        <ul>
          <li>Data minimization</li>
          <li>Purpose limitation</li>
          <li>Storage limitation</li>
          <li>Integrity &amp; confidentiality</li>
          <li>Accountability</li>
          <li>Privacy by design &amp; by default</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Privasi dan Keamanan Data",
    content: (
      <>
        <p>Untuk menjaga keamanan dataset:</p>
        <ul>
          <li>Pseudonimisasi sebelum analisis</li>
          <li>Anonimisasi sebelum publikasi atau berbagi dataset</li>
          <li>Penyimpanan pada server aman</li>
          <li>Akses terbatas peneliti</li>
          <li>Audit akses data</li>
          <li>Enkripsi penyimpanan dan transmisi</li>
        </ul>
      </>
    ),
  },
  // {
  //   title: "7. Penggunaan AI dan Learning Analytics",
  //   content: (
  //     <>
  //       <p>Analisis AI digunakan untuk:</p>
  //       <ul>
  //         <li>Deteksi pola pembelajaran</li>
  //         <li>Analisis refleksi</li>
  //         <li>Deteksi miskonsepsi</li>
  //         <li>Clustering engagement</li>
  //       </ul>
  //       <p className="mt-1">AI tidak digunakan untuk:</p>
  //       <ul>
  //         <li>Penilaian akademik otomatis</li>
  //         <li>Keputusan berdampak tinggi tanpa intervensi manusia</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "8. Risiko Penelitian",
  //   content: (
  //     <>
  //       <p>Risiko minimal:</p>
  //       <ul>
  //         <li>Ketidaknyamanan saat refleksi</li>
  //         <li>Kekhawatiran privasi</li>
  //         <li>Risiko residual re-identifikasi dataset anonim (sangat kecil)</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "9. Manfaat Penelitian",
  //   content: (
  //     <ul>
  //       <li>Peningkatan refleksi belajar</li>
  //       <li>Pengalaman teknologi pembelajaran inovatif</li>
  //       <li>Kontribusi pada peningkatan kualitas pendidikan</li>
  //       <li>Kontribusi pada penelitian AI pendidikan</li>
  //     </ul>
  //   ),
  // },
  // {
  //   title: "10. Penyimpanan dan Retensi Data",
  //   content: (
  //     <>
  //       <p>Data disimpan sampai tujuan penelitian selesai, kemudian:</p>
  //       <ul>
  //         <li>Dihapus</li>
  //         <li>Dianonimkan permanen</li>
  //         <li>Diarsipkan sebagai dataset anonim</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "11. Berbagi Dataset (Open Data / Open Science)",
  //   content: (
  //     <>
  //       <p>Dataset dapat dibagikan untuk:</p>
  //       <ul>
  //         <li>Replikasi penelitian</li>
  //         <li>Pengembangan model AI pendidikan</li>
  //         <li>Penelitian lanjutan</li>
  //       </ul>
  //       <p className="mt-1">Dataset yang dibagikan:</p>
  //       <ul>
  //         <li>Sepenuhnya anonim</li>
  //         <li>Tidak mengandung identitas langsung</li>
  //         <li>Tidak memungkinkan re-identifikasi secara wajar</li>
  //       </ul>
  //       <p className="mt-1">Pengguna dataset wajib:</p>
  //       <ul>
  //         <li>Menggunakan untuk tujuan akademik</li>
  //         <li>Tidak mencoba re-identifikasi</li>
  //         <li>Mengutip sumber dataset</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "12. Transfer Data Internasional",
  //   content: (
  //     <>
  //       <p>Jika terjadi transfer lintas negara:</p>
  //       <ul>
  //         <li>Dataset dalam bentuk anonim</li>
  //         <li>Mengikuti standar perlindungan data internasional</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "13. Hak Partisipan",
  //   content: (
  //     <>
  //       <p>Partisipan berhak:</p>
  //       <ul>
  //         <li>Hak akses data</li>
  //         <li>Hak perbaikan data</li>
  //         <li>Hak penghapusan data sebelum anonimisasi</li>
  //         <li>Hak menarik persetujuan</li>
  //         <li>Hak pembatasan pemrosesan</li>
  //         <li>Hak keberatan</li>
  //         <li>Hak portabilitas data</li>
  //         <li>Hak tidak dikenai keputusan otomatis berdampak signifikan</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "14. Hak Penarikan Partisipasi",
  //   content: (
  //     <>
  //       <p>Partisipan dapat:</p>
  //       <ul>
  //         <li>Menarik diri kapan saja</li>
  //         <li>Meminta penghapusan data sebelum anonimisasi</li>
  //         <li>Tetap mengikuti pembelajaran tanpa konsekuensi akademik</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "15. Batas Penggunaan Data Akademik",
  //   content: (
  //     <>
  //       <p>Data penelitian:</p>
  //       <ul>
  //         <li>Tidak digunakan untuk penilaian akademik tanpa persetujuan terpisah</li>
  //         <li>Tidak memengaruhi nilai mahasiswa</li>
  //       </ul>
  //     </>
  //   ),
  // },
  // {
  //   title: "16. Kontak Peneliti",
  //   content: (
  //     <p>
  //       Jika memiliki pertanyaan terkait penelitian atau data, partisipan dapat
  //       menghubungi peneliti.
  //     </p>
  //   ),
  // },
  // {
  //   title: "17. Persetujuan Partisipan",
  //   content: (
  //     <>
  //       <p>Dengan menyetujui formulir ini, saya menyatakan bahwa:</p>
  //       <ul>
  //         <li>Telah membaca dan memahami informasi penelitian</li>
  //         <li>Bersedia berpartisipasi secara sukarela</li>
  //         <li>Mengizinkan penggunaan data pembelajaran untuk penelitian dalam bentuk anonim</li>
  //       </ul>
  //     </>
  //   ),
  // },
];

export default function ConsentModal({ isOpen, onConfirm, onCancel }: ConsentModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setAgreed(false);
    setOpenIndex(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (agreed) onConfirm();
  };

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 shrink-0 text-center">
          <h2 className="text-lg font-extrabold text-blue-900 uppercase tracking-tight">
            Informed Consent Penelitian
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Penggunaan Sistem K-OWL (Know–Want–Learn Platform)
          </p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex-1">

          {/* Intro */}
          <p className="text-sm text-gray-700 text-justify leading-relaxed mb-6">
            Dengan melanjutkan, Anda <strong>menyetujui</strong> untuk berpartisipasi dalam
            penelitian penggunaan K-OWL sebagai media refleksi pembelajaran. Data yang
            dikumpulkan mencakup aktivitas pembelajaran dan interaksi penggunaan sistem untuk
            kepentingan analisis penelitian dan pengembangan teknologi pendidikan. Seluruh data
            akan dikelola secara aman, digunakan sesuai tujuan penelitian, dan dipublikasikan
            hanya dalam bentuk anonim.
          </p>

          {/* Accordion sections */}
          <div className="mb-6">
            {SECTIONS.map((section, i) => (
              <AccordionSection
                key={i}
                index={i}
                title={section.title}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              >
                {section.content}
              </AccordionSection>
            ))}
          </div>

          {/* Checkbox */}
          <hr className="my-4 border-gray-200" />
          <label className="flex items-start gap-3 cursor-pointer mt-4 select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 shrink-0 accent-blue-900 cursor-pointer border border-gray-400 rounded"
            />
            <span className="text-sm text-gray-700 text-justify leading-relaxed">
              Saya memahami informasi penelitian ini dan bersedia berpartisipasi serta
              mengizinkan penggunaan data saya untuk penelitian.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 shrink-0 flex justify-center">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!agreed}
            className="px-16 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-950 hover:bg-blue-900"
          >
            Kirim
          </button>
        </div>

      </div>
    </div>
  );
}