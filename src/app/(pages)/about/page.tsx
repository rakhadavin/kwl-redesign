"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiBookOpen, HiUserGroup, HiChartBar, HiLightBulb, HiAcademicCap, HiOfficeBuilding, HiBeaker, HiUserCircle, HiBriefcase } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";
import BenefitsList, { SimpleList } from "@/components/ui/BenefitsList";

export default function AboutPage() {
  const [activeAudience, setActiveAudience] = useState<string>("pelajar");

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Tentang K-OWL"
        description="K-OWL adalah sebuah AI-powered educational technology platform yang dirancang untuk meningkatkan keterlibatan, pemahaman, dan refleksi belajar mahasiswa melalui pendekatan KWL (Know–Want–Learned) yang diperkaya dengan kecerdasan buatan. Platform ini mengintegrasikan AI Question Bank, AI Forum Assistant, AI Mind Map Generator, AI-Metacognitive Coach, dan AI Misconception Detector untuk membantu dosen dan mahasiswa membangun pengalaman belajar yang lebih aktif, personal, dan berbasis data."
        logoSrc="/logo.png"
        logoAlt="K-OWL Logo"
        logoSize={120}
        primaryButton={{ text: "Mulai Belajar", href: "/auth/signin" }}
        secondaryButton={{ text: "Lihat Fitur", href: "/feature" }}
      />

      <SectionContainer
        className="py-16 bg-white"
        title="Apa itu Metode KWL?"
        subtitle="KWL (Know, Want to Learn, Learned) adalah strategi pembelajaran yang membantu siswa mengorganisir pengetahuan mereka dan memfasilitasi pembelajaran aktif."
        centered
      >
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="KNOW"
            description="Mengidentifikasi apa yang sudah diketahui siswa tentang topik pembelajaran. Membantu membangun fondasi pengetahuan yang kuat."
            icon={HiBookOpen}
            categoryColor="teal"
          />
          <FeatureCard
            title="WANT TO LEARN"
            description="Merumuskan pertanyaan dan tujuan pembelajaran yang ingin dicapai. Meningkatkan motivasi dan fokus belajar siswa."
            icon={HiLightBulb}
            categoryColor="pink"
          />
          <FeatureCard
            title="LEARNED"
            description="Merefleksikan dan mendokumentasikan apa yang telah dipelajari. Mengukur pencapaian tujuan pembelajaran."
            icon={HiChartBar}
            categoryColor="orange"
          />
        </div>
      </SectionContainer>

      {/* Untuk Siapa K-OWL Dibuat Section with Tabs */}
      <SectionContainer className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Untuk Siapa K-OWL Dibuat?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            K-OWL dirancang untuk berbagai kalangan pendidikan, dari pelajar hingga profesional
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveAudience("pelajar")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "pelajar"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pelajar & Mahasiswa
          </button>
          <button
            onClick={() => setActiveAudience("dosen")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "dosen"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Dosen & Instruktur
          </button>
          <button
            onClick={() => setActiveAudience("sekolah")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "sekolah"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Sekolah & Kampus
          </button>
          <button
            onClick={() => setActiveAudience("lembaga")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "lembaga"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Lembaga Pelatihan
          </button>
          <button
            onClick={() => setActiveAudience("peneliti")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "peneliti"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Peneliti
          </button>
          <button
            onClick={() => setActiveAudience("orangtua")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "orangtua"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Orang Tua
          </button>
          <button
            onClick={() => setActiveAudience("industri")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeAudience === "industri"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Industri & Corporate
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {activeAudience === "pelajar" && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Pelajar & Mahasiswa</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Belajar lebih terarah dan personal dengan AI yang membantu mengorganisasi pengetahuan dan menjawab rasa ingin tahu secara langsung.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">Kesulitan memahami materi bisa diatasi dengan penjelasan otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">Cocok untuk belajar mandiri, persiapan ujian, hingga project-based learning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">Meningkatkan motivasi melalui visual progress & refleksi.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Pelajar:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">AI Explain This: penjelasan otomatis dari konsep yang belum dipahami.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">AI Mind Map: membuat peta konsep instan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">KWL Journal Tracker: memantau perkembangan belajar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-gray-700">Question Expansion: memperluas "Want to Know" jadi pertanyaan berkualitas.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Pemahaman lebih cepat, lebih percaya diri, dan pembelajaran jadi lebih bermakna.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
                <p className="text-gray-800 italic mb-2">
                  "K-OWL bikin aku ngerti materi yang tadinya susah. Setiap bingung, aku tinggal klik Explain This."
                </p>
                <p className="text-gray-600 font-semibold">— Adit, Mahasiswa Informatika</p>
              </div>
            </div>
          )}

          {activeAudience === "dosen" && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Dosen & Instruktur</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Meningkatkan kualitas pengajaran dengan insight real-time tentang pemahaman mahasiswa dan pola miskonsepsi.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">Kelas lebih aktif tanpa harus menambah beban persiapan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">AI membantu membaca dinamika diskusi dan engagement secara otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">Waktu pengajaran lebih efisien, fokus pada interaksi bermakna.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Dosen:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">AI Misconception Detector: menemukan miskonsepsi dari KWL & diskusi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">Question Clustering: mengelompokkan pertanyaan untuk prioritas pengajaran.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">Discussion Summary: merangkum diskusi kelas secara otomatis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span className="text-gray-700">K-OWL Studio: generator slide, worksheet, flashcard.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Pengajaran lebih efektif, kelas lebih hidup, keputusan mengajar berbasis data.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-purple-600">
                <p className="text-gray-800 italic mb-2">
                  "Saya bisa langsung melihat miskonsepsi mahasiswa dan memperbaikinya saat itu juga. K-OWL mengubah cara saya mengajar."
                </p>
                <p className="text-gray-600 font-semibold">— Dr. Hana, Dosen HCI</p>
              </div>
            </div>
          )}

          {activeAudience === "sekolah" && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Sekolah & Kampus</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Solusi transformasi pembelajaran modern untuk meningkatkan kualitas, keterlibatan, dan akreditasi secara terukur.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Mendukung implementasi kurikulum inovatif seperti PBL & Merdeka Belajar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Konsisten di seluruh kelas tanpa membebani guru/dosen.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Memberikan bukti pembelajaran untuk audit, asesmen, dan akreditasi.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Institusi:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Insight Dashboard: analisis pembelajaran seluruh kelas atau program studi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Institutional Learning Analytics: heatmap kompetensi & engagement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">LMS Integration (Moodle, Google Classroom, dll.).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-gray-700">Portfolio otomatis untuk akreditasi.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Kualitas pembelajaran meningkat, dokumentasi lebih rapi, dan institusi lebih siap digital.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-green-600">
                <p className="text-gray-800 italic mb-2">
                  "K-OWL memberi kami data yang selama ini tidak pernah terlihat. Sangat membantu untuk evaluasi dan akreditasi."
                </p>
                <p className="text-gray-600 font-semibold">— Wakil Dekan Bidang Akademik</p>
              </div>
            </div>
          )}

          {activeAudience === "lembaga" && (
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Lembaga Pelatihan, Bootcamp, & Kursus Profesional</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Meningkatkan efektivitas pelatihan bagi peserta dewasa melalui pembelajaran adaptif berbasis kebutuhan real.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Peserta datang dengan latar belakang beragam—K-OWL memetakan semuanya.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Cocok untuk cohort-based learning dan pelatihan intensif.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Mempercepat peralihan dari teori ke skill nyata.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Lembaga Pelatihan:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Learning Need Mapping: memetakan apa yang peserta sudah tahu & butuh.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">AI Explanation & Task Guide: penjelasan otomatis untuk skill teknis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Activity Designer: membuat latihan profesional dalam hitungan detik.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span className="text-gray-700">Cohort Insight: melihat kebutuhan tiap batch pelatihan.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Pelatihan lebih engaging, relevan, dan hasilnya lebih terukur.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-orange-600">
                <p className="text-gray-800 italic mb-2">
                  "Peserta bootcamp kami jadi lebih cepat paham. Trainer juga terbantu dengan insight real-time."
                </p>
                <p className="text-gray-600 font-semibold">— Head of Learning, Coding Bootcamp</p>
              </div>
            </div>
          )}

          {activeAudience === "peneliti" && (
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Peneliti & Inovator Pendidikan</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Platform riset untuk metakognisi, SRL, AI in Education, dan interaksi manusia–AI, dengan dataset autentik yang kaya.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Data KWL, pertanyaan, refleksi, dan diskusi sangat berharga untuk riset.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Mendukung eksperimen AI seperti clustering, summarization, dan feedback engine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Bisa dipakai untuk paper HCI, LAK, AIED, hingga jurnal pendidikan.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Peneliti:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">KOWL Dataset Export (KWL logs, discussion logs, misconception labels).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Experimental Analytics Mode: akses lanjutan untuk pola belajar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Model Benchmarking: menguji model AI pada dataset K-OWL.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span className="text-gray-700">Annotation Workspace.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Riset lebih cepat, dataset lebih kaya, dan mudah dipublikasikan.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-indigo-600">
                <p className="text-gray-800 italic mb-2">
                  "Dataset K-OWL sangat kaya dan natural. Ideal untuk riset metakognisi modern."
                </p>
                <p className="text-gray-600 font-semibold">— Peneliti Learning Analytics</p>
              </div>
            </div>
          )}

          {activeAudience === "orangtua" && (
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Orang Tua</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Membantu orang tua memahami pola belajar anak dan menyediakan alat bantu belajar otomatis.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Mudah digunakan, bahkan oleh orang tua non-teknis.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Insight disajikan secara sederhana dan actionable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Bisa mendukung belajar di rumah tanpa menambah beban orang tua.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Orang Tua:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Parent Dashboard: perkembangan minat dan tantangan anak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Automatic Worksheet & Flashcard Generator.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Learning Recommendation Engine: aktivitas belajar di rumah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 font-bold">•</span>
                    <span className="text-gray-700">Behavioral Insight: fokus, kebiasaan bertanya, dan minat topik.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Orang tua dapat mendampingi anak dengan lebih efektif, ringan, dan terarah.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-pink-600">
                <p className="text-gray-800 italic mb-2">
                  "Saya merasa lebih paham apa yang anak saya butuhkan. Worksheet otomatisnya sangat membantu."
                </p>
                <p className="text-gray-600 font-semibold">— Rani, Orang Tua Murid SMP</p>
              </div>
            </div>
          )}

          {activeAudience === "industri" && (
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Dunia Industri & Corporate Training</h3>
              <p className="text-lg text-gray-700 mb-6 font-semibold">
                Mendukung peningkatan kompetensi karyawan melalui pelatihan yang adaptif dan berbasis data.
              </p>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Mengapa cocok:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Membantu HRD memahami gap kompetensi secara jelas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Pelatihan jadi personal, bukan lagi one-size-fits-all.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Mendukung onboarding, technical training, leadership, dan reskilling.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Contoh fitur untuk Industri:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Competency Gap Dashboard.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Adaptive Learning Path: jalur belajar otomatis berdasarkan KWL.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">AI Knowledge Base: menjawab pertanyaan karyawan secara instan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span className="text-gray-700">Corporate Report Suite: laporan performa dan ROI training.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-900 mb-2">Hasilnya:</p>
                <p className="text-gray-700">Pelatihan lebih efisien, tepat sasaran, dan berdampak pada kinerja.</p>
              </div>

              <div className="bg-white rounded-xl p-6 border-l-4 border-cyan-600">
                <p className="text-gray-800 italic mb-2">
                  "Kami akhirnya bisa melihat data nyata tentang skill karyawan, bukan asumsi. Dampaknya terasa sekali."
                </p>
                <p className="text-gray-600 font-semibold">— HR Manager, Perusahaan Teknologi</p>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      <SectionContainer className="py-16 bg-white">
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Video Tutorial Platform K-OWL</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Tonton video tutorial untuk memahami lebih dalam tentang platform K-Owl dan cara mengimplementasikan metode KWL dalam pembelajaran.
          </p>
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/U0blMF8eZXQ?si=t-i53xpjWqoNZdMh"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Platform Pembelajaran Berbasis AI</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
            Dengan memanfaatkan generative AI, learning analytics, dan desain interaksi modern, K-OWL berfungsi sebagai Intelligent Engagement Agent yang mendukung proses pembelajaran sebelum kelas, selama kelas, dan setelah kelas. K-OWL meningkatkan kualitas tanya-jawab, diskusi, refleksi, serta menyediakan rekomendasi pembelajaran yang adaptif.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Nilai Strategis K-OWL</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">AI-Augmented Learning</h4>
                  <p className="text-gray-600">memberikan bantuan otomatis untuk pertanyaan, diskusi, mind map, dan deteksi miskonsepsi.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Active & Reflective Learning</h4>
                  <p className="text-gray-600">mengaktifkan siklus KWL untuk memunculkan pengetahuan awal, rasa ingin tahu, dan refleksi setelah belajar.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Intelligent Feedback & Analytics</h4>
                  <p className="text-gray-600">memahami pola belajar, miskonsepsi, dan keterlibatan mahasiswa.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Instructor Productivity</h4>
                  <p className="text-gray-600">mengurangi beban dosen lewat otomatisasi pembuatan soal, rangkuman, dan moderasi diskusi.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Scalable Ecosystem</h4>
                  <p className="text-gray-600">dapat diintegrasikan dengan LMS seperti Moodle/SCeLE, serta memperluas fitur berbasis AI untuk berbagai mata kuliah.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="py-16 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Misi & Visi Kami</h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform pembelajaran digital terdepan yang menerapkan metode KWL
                untuk menciptakan pengalaman belajar yang lebih efektif, interaktif, dan bermakna
                di era pendidikan 4.0.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Misi</h3>
              <SimpleList
                items={[
                  "Memfasilitasi pembelajaran aktif melalui pendekatan KWL yang terstruktur",
                  "Menyediakan tools analisis pembelajaran yang komprehensif bagi pendidik",
                  "Meningkatkan kolaborasi dan interaksi antara dosen dan mahasiswa",
                  "Mendorong penggunaan teknologi dalam pendidikan yang inovatif dan berkelanjutan"
                ]}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/kowl-home.png"
              alt="K-Owl Platform Interface"
              width={500}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer
        className="py-16 bg-white"
        title="Mengapa Memilih K-Owl?"
        subtitle="Platform kami dirancang khusus untuk memenuhi kebutuhan pendidikan modern dengan fokus pada pembelajaran yang efektif dan terukur."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="Pembelajaran Kolaboratif"
            description="Memfasilitasi interaksi real-time antara dosen dan mahasiswa dalam proses pembelajaran."
            icon={HiUserGroup}
            iconBgColor="bg-gradient-to-br from-blue-500 to-purple-600"
          />
          <IconCard
            title="Analisis Mendalam"
            description="Dashboard analisis komprehensif untuk memantau progress dan performa pembelajaran."
            icon={HiChartBar}
            iconBgColor="bg-gradient-to-br from-green-500 to-teal-600"
          />
          <IconCard
            title="Pembelajaran Adaptif"
            description="Menyesuaikan konten dan pendekatan pembelajaran berdasarkan kebutuhan individual."
            icon={HiLightBulb}
            iconBgColor="bg-gradient-to-br from-yellow-500 to-orange-600"
          />
          <IconCard
            title="Konten Terstruktur"
            description="Materi pembelajaran yang tersusun sistematis mengikuti metodologi KWL yang terbukti efektif."
            icon={HiBookOpen}
            iconBgColor="bg-gradient-to-br from-red-500 to-pink-600"
          />
        </div>
      </SectionContainer>

      {/* Technology Stack Section */}
      {/* <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Teknologi yang Kami Gunakan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              K-Owl dibangun dengan teknologi modern dan terdepan untuk memastikan performa,
              keamanan, dan pengalaman pengguna yang optimal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Frontend</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Next.js 14 with TypeScript</p>
                <p>• React with Modern Hooks</p>
                <p>• TailwindCSS for Styling</p>
                <p>• Zustand for State Management</p>
                <p>• React Query for Data Fetching</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Backend</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Django 5.0 with Python</p>
                <p>• Django REST Framework</p>
                <p>• PostgreSQL Database</p>
                <p>• Redis for Caching</p>
                <p>• Django Channels for WebSocket</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Infrastructure</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Docker Containerization</p>
                <p>• Kubernetes Orchestration</p>
                <p>• GitLab CI/CD Pipeline</p>
                <p>• MinIO Object Storage</p>
                <p>• Keycloak Authentication</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <CallToActionSection
        title="Siap Memulai Pembelajaran yang Lebih Efektif?"
        description="Bergabunglah dengan K-Owl dan rasakan pengalaman pembelajaran KWL yang interaktif dan berdasarkan data untuk meningkatkan hasil belajar Anda."
        primaryButton={{ text: "Mulai Sekarang", href: "/auth/signin" }}
        secondaryButton={{ text: "Pelajari Fitur", href: "/feature" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}