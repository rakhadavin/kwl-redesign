"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiBookOpen,
  HiUserGroup,
  HiChartBar,
  HiLightBulb,
  HiStar,
  HiPlay,
  HiAcademicCap,
  HiDocumentText,
  HiEye,
  HiCollection,
  HiSparkles,
  HiPuzzle,
  HiCube,
} from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";
import CategoryFilter from "@/components/ui/CategoryFilter";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  benefits: string[];
  category: "kwl" | "analytics" | "interaktif" | "kolaborasi" | "ai" | "studio";
}

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const features: Feature[] = [
    {
      id: "kwl-framework",
      title: "Framework KWL Terstruktur",
      description:
        "Implementasi lengkap metode Know, Want to Know, dan Learned dengan tipe pertanyaan beragam untuk setiap fase pembelajaran.",
      icon: HiBookOpen,
      image: "/feature/framework_kwl_terstruktur.PNG",
      benefits: [
        "Know: Essay dan Multiple Choice untuk menilai pengetahuan awal",
        "Want to Know: Checkbox untuk eksplorasi topik yang ingin dipelajari",
        "Learned: Essay dan Multiple Choice untuk refleksi pembelajaran",
        "Skor otomatis untuk setiap fase KWL",
      ],
      category: "kwl",
    },
    {
      id: "real-time-quiz",
      title: "Quiz Real-time Interaktif",
      description:
        "Sistem quiz multiplayer dengan WebSocket yang memungkinkan partisipasi real-time menggunakan PIN quiz, mendukung peserta tamu tanpa registrasi.",
      icon: HiPlay,
      image: "/feature/kolaborasi_real_time.PNG",
      benefits: [
        "Quiz PIN untuk akses cepat",
        "Partisipasi guest tanpa login",
        "Live quiz session dengan WebSocket",
        "Scoring otomatis dan leaderboard real-time",
      ],
      category: "interaktif",
    },
    {
      id: "real-time-polling",
      title: "Real-time Polling",
      description:
        "Sistem polling interaktif yang memungkinkan dosen untuk mengumpulkan feedback instan dari mahasiswa. Polling dapat digunakan untuk quick assessment, mengukur pemahaman, atau mengumpulkan opini mahasiswa secara real-time dengan visualisasi hasil yang langsung terlihat.",
      icon: HiChartBar,
      image: "/feature/polling.PNG",
      benefits: [
        "Polling real-time dengan hasil instan",
        "Multiple choice dan rating scale",
        "Visualisasi hasil dengan chart interaktif",
        "Anonymous atau identified responses",
      ],
      category: "interaktif",
    },
    {
      id: "interactive-qna",
      title: "Interactive Q&A Session",
      description:
        "Fitur tanya jawab interaktif yang memfasilitasi komunikasi dua arah antara dosen dan mahasiswa. Mahasiswa dapat mengajukan pertanyaan secara real-time, upvote pertanyaan yang relevan, dan dosen dapat menjawab pertanyaan dengan prioritas berdasarkan voting.",
      icon: HiUserGroup,
      image: "/feature/qna.PNG",
      benefits: [
        "Submit pertanyaan secara real-time",
        "Upvote pertanyaan penting",
        "Moderasi dan prioritas pertanyaan",
        "Archive untuk review later",
      ],
      category: "interaktif",
    },
    // Collaboration Features
    {
      id: "peer-verification",
      title: "Peer Verification",
      description:
        "Refleksi yang Lebih Akurat, Belajar yang Lebih Jujur. Tingkatkan kualitas bagian Learned dengan verifikasi sejawat anonim yang objektif dan berbasis bukti. Mahasiswa dapat memberikan komentar langsung, meminta contoh atau penjelasan tambahan, dan memberi confidence score untuk setiap klaim pemahaman.",
      icon: HiUserGroup,
      image: "/feature/peer_reflection_1.PNG",
      benefits: [
        "Verifikasi sejawat anonim yang objektif",
        "Komentar langsung pada klaim pemahaman",
        "Permintaan contoh atau penjelasan tambahan",
        "Confidence score untuk setiap refleksi",
      ],
      category: "kolaborasi",
    },
    {
      id: "group-kwl-board",
      title: "KWL Collaboration (Group KWL Board)",
      description:
        "Bangun Pengetahuan Secara Kolektif, Real-Time, dan Lebih Terstruktur. Transformasikan KWL menjadi pengalaman kolaboratif yang dinamis. Dengan Group KWL Board, setiap anggota kelompok dapat menulis Know–Want–Learned secara bersamaan, melihat kontribusi teman melalui warna berbeda, dan menyusun peta pengetahuan otomatis dari hasil diskusi. AI membantu memprioritaskan pertanyaan 'Want' melalui voting, serta merangkum 'Collective Learned' menjadi insight yang ringkas dan siap dibawa ke kelas.",
      icon: HiUserGroup,
      image: "/feature/kwl_collaboration_board_1.PNG",
      benefits: [
        "Kolaborasi real-time dengan warna berbeda per anggota",
        "Peta pengetahuan otomatis dari diskusi kelompok",
        "AI-powered voting untuk prioritas pertanyaan",
        "Collective Learned summary yang ringkas",
      ],
      category: "kolaborasi",
    },
    {
      id: "think-pair-share",
      title: "Think–Pair–Share Mode",
      description:
        "Kolaborasi Klasik, Diperkaya AI. Semua Mahasiswa Terlibat, Tanpa Kecuali. Aktifkan seluruh mahasiswa dengan mode Think–Pair–Share yang terintegrasi penuh dalam kerangka KWL dan diperkuat oleh AI. Mahasiswa mulai dengan mengisi Know dan Want secara individu, lalu dipasangkan oleh AI berdasarkan tema yang mirip untuk menyatukan pertanyaan terbaik. Hasil kolaborasi ini langsung masuk ke forum kelas, lengkap dengan heatmap topik yang paling ingin dipelajari. Dosen dapat dengan mudah memilih prioritas pembahasan, sementara AI memastikan pertanyaan telah dipoles, dikelompokkan, dan siap memicu diskusi yang fokus dan bermakna—even di kelas besar hingga 500 mahasiswa.",
      icon: HiUserGroup,
      image: "/feature/Think–Pair–Share.PNG",
      benefits: [
        "AI-powered pairing berdasarkan kesamaan tema",
        "Integrasi penuh dengan framework KWL",
        "Heatmap topik yang paling ingin dipelajari",
        // "Efektif untuk kelas besar (hingga 500 mahasiswa)",
      ],
      category: "kolaborasi",
    },
    // {
    //   id: "student-activity-tracking",
    //   title: "Monitoring Aktivitas Mahasiswa",
    //   description:
    //     "Pantau aktivitas mahasiswa secara real-time saat mereka mengakses topic, lengkap dengan timestamp dan status aktif.",
    //   icon: HiEye,
    //   image: "/feature/monitoring_aktivitas_mahasiswa.PNG",
    //   benefits: [
    //     "Tracking real-time student viewing topic",
    //     "WebSocket notification saat student masuk/keluar",
    //     "Display nama student dan topic yang sedang dibuka",
    //     "Activity log dengan timestamp",
    //   ],
    //   category: "collaboration",
    // },
    {
      id: "learning-analytics-dashboard",
      title: "Learning Analytics Dashboard",
      description:
        "\"Lihat apa yang benar-benar terjadi di kelas Anda.\" K-OWL menghadirkan dashboard cerdas yang mengubah aktivitas KWL mahasiswa menjadi insight instan. Dosen dapat memantau tingkat pemahaman, engagement, dan tantangan belajar dalam satu tampilan elegan. Dari heatmap konsep hingga indikator afektif, semua dirancang untuk membantu Anda mengambil keputusan pengajaran yang cepat, tepat, dan berbasis data.",
      icon: HiChartBar,
      image: "/feature/learning_analytics_dashboard.PNG",
      benefits: [
        "Deteksi dini misunderstanding dan topik sulit",
        "Pemetaan cognitive–affective–behavioral yang lengkap",
        "Insight otomatis untuk intervensi tepat sasaran",
        "Visualisasi yang indah, real-time, dan actionable",
      ],
      category: "analytics",
    },
    {
      id: "question-intelligence-analytics",
      title: "Question Intelligence Analytics",
      description:
        "\"Pahami rasa ingin tahu mahasiswa—sebelum mereka kehilangan arah.\" Fitur ini menganalisis seluruh pertanyaan Want to Know (WTK) dari mahasiswa dan mengelompokkannya menjadi klaster topik yang mudah dipahami. K-OWL membantu Anda mengungkap apa yang paling membingungkan, apa yang memicu rasa ingin tahu tinggi, dan bagaimana meresponnya dengan pengajaran yang lebih relevan dan personal.",
      icon: HiChartBar,
      image: "/feature/question_intelligence_analytics.PNG",
      benefits: [
        "Klasterisasi otomatis pertanyaan menggunakan AI",
        "Identifikasi topik paling menantang dan paling ingin dipelajari",
        "Analisis level Bloom untuk kualitas pertanyaan",
        "Tools penting untuk merancang micro-lecture & remediasi",
      ],
      category: "analytics",
    },
    {
      id: "reflection-growth-analytics",
      title: "Reflection & Growth Analytics ",
      description:
        "\"Ukur perkembangan belajar secara lebih manusiawi.\" K-OWL tidak hanya mengumpulkan refleksi mahasiswa, tapi juga memetakan perkembangan pemahaman dari fase Know → Want → Learn. Dengan Growth Score, Reflection Radar, dan Concept Shift Map, dosen dan mahasiswa dapat melihat perjalanan belajar secara lebih utuh dan personal.",
      icon: HiChartBar,
      image: "/feature/reflection_growth_analytics.PNG",
      benefits: [
        "Analisis kedalaman refleksi dengan metacognitive markers",
        "Visualisasi perkembangan dari minggu ke minggu",
        "Insight personal untuk meningkatkan strategi belajar",
        "Evidence-based teaching report untuk dosen",
      ],
      category: "analytics",
    },
    {
      id: "gamification",
      title: "Sistem Rewards & Points",
      description:
        "Gamifikasi pembelajaran dengan sistem poin untuk aktivitas KWL dan reward items yang dapat ditukar oleh mahasiswa.",
      icon: HiStar,
      image: "/feature/sistem_reward_dan_point.PNG",
      benefits: [
        "Poin otomatis untuk Know, Want to Know, dan Learned",
        "Reward items dengan stok dan expired date",
        "Redeem history tracking",
        "Total point per mahasiswa per course",
      ],
      category: "kwl",
    },
    // {
    //   id: "multi-auth",
    //   title: "Multi-Provider Authentication",
    //   description:
    //     "Sistem autentikasi fleksibel dengan dukungan login kredensial, Keycloak SSO, dan Google OAuth2 dengan JWT token.",
    //   icon: HiUserGroup,
    //   image: "/feature/multi_provider_authentication.PNG",
    //   benefits: [
    //     "Login dengan username/password",
    //     "Keycloak SSO integration",
    //     "Google OAuth2 login",
    //     "JWT access & refresh token",
    //   ],
    //   category: "collaboration",
    // },
    {
      id: "course-management",
      title: "Manajemen Course & Topic",
      description:
        "Sistem pengelolaan course dengan enrollment key, color themes, dan topic scheduling dengan open/close time.",
      icon: HiCollection,
      image: "/feature/manajemen_course_dan_topik.PNG",
      benefits: [
        "Course dengan enrollment key untuk akses terkontrol",
        "Color themes untuk identifikasi visual",
        "Topic scheduling dengan open/close time",
        "Hide/show topic untuk kontrol visibilitas",
      ],
      category: "kwl",
    },
    // AI Features
    {
      id: "ai-question-bank",
      title: "AI-Question Bank",
      description:
        "Generator bank soal cerdas berbasis AI yang membantu dosen merancang pertanyaan berkualitas tinggi yang selaras dengan siklus KWL (Know–Want–Learned). Fitur ini secara otomatis menghasilkan berbagai jenis pertanyaan—mulai dari multiple-choice, true/false, hingga soal berbasis Bloom dan pertanyaan reflektif—dengan membaca materi kuliah, slide, video, serta respons KWL mahasiswa.",
      icon: HiDocumentText,
      image: "/feature/ai-question-bank.svg",
      benefits: [
        "Auto-generate soal dari materi kuliah, slide, dan video",
        "Berbasis respons KWL (K, W, L) mahasiswa untuk relevansi maksimal",
        "Clustering topik dan alignment ke CPMK",
        "Pengecekan kualitas otomatis untuk bank soal yang siap pakai",
      ],
      category: "ai",
    },
    {
      id: "ai-forum-assistant",
      title: "AI-Forum Assistant",
      description:
        "Asisten forum cerdas berbasis AI yang membantu mahasiswa menemukan jawaban atas apa yang ingin mereka ketahui (W – Want to Know) dalam siklus KWL. Fitur ini secara otomatis memunculkan pertanyaan pemicu, memberikan probing questions yang relevan, dan menghadirkan jawaban atau klarifikasi yang memperdalam topik yang sedang dibahas.",
      icon: HiUserGroup,
      image: "/feature/ai-forum-assistant.svg",
      benefits: [
        "Pertanyaan pemicu otomatis untuk diskusi lebih mendalam",
        "Probing questions yang relevan dengan topik",
        "Rangkuman percakapan dan deteksi thread pasif",
        "Kelompokkan pertanyaan serupa untuk insight dosen",
      ],
      category: "ai",
    },
    {
      id: "ai-mind-map",
      title: "AI-Mind Map Generator",
      description:
        "Generator peta konsep otomatis berbasis AI yang mengubah materi pembelajaran, catatan, atau hasil KWL menjadi mind map visual yang terstruktur. Membantu mahasiswa memahami hubungan antar konsep dan melihat gambaran besar dari topik yang dipelajari dengan lebih jelas dan efektif.",
      icon: HiCollection,
      image: "/feature/ai-mind-map.svg",
      benefits: [
        "Auto-generate mind map dari materi atau hasil KWL",
        "Visualisasi hubungan antar konsep secara interaktif",
        "Ekspor dalam format PNG, PDF, atau SVG",
        "Personalisasi berdasarkan pola belajar mahasiswa",
      ],
      category: "ai",
    },
    {
      id: "ai-metacognitive-coach",
      title: "AI-Metacognitive Coach",
      description:
        "Pelatih belajar berbasis AI yang membantu mahasiswa mengenali pola pikir, strategi, dan cara belajar mereka sendiri. Fitur ini memberikan pertanyaan reflektif cerdas, analisis personal, serta rekomendasi strategi belajar yang praktis. Dengan dukungan AI, mahasiswa dapat merencanakan pembelajaran dengan lebih baik, memonitor pemahaman mereka sepanjang proses, dan melakukan refleksi yang lebih dalam setelah menyelesaikan materi.",
      icon: HiLightBulb,
      image: "/feature/ai-metacognitive-coach.svg",
      benefits: [
        "Pertanyaan reflektif cerdas untuk self-awareness",
        "Analisis personal pola dan strategi belajar",
        "Rekomendasi strategi belajar yang praktis dan adaptif",
        "Monitoring pemahaman sepanjang proses pembelajaran",
      ],
      category: "ai",
    },
    {
      id: "ai-misconception-detector",
      title: "AI-Misconception Detector",
      description:
        "Sistem deteksi miskonsepsi otomatis berbasis AI yang menganalisis jawaban mahasiswa untuk mengidentifikasi kesalahpahaman konsep sejak dini. Memberikan feedback korektif yang tepat sasaran dan rekomendasi pembelajaran remedial untuk memastikan pemahaman yang solid sebelum melanjutkan ke materi berikutnya.",
      icon: HiChartBar,
      image: "/feature/ai-misconception-detector.svg",
      benefits: [
        "Deteksi miskonsepsi otomatis dari jawaban mahasiswa",
        "Feedback korektif yang tepat sasaran dan personal",
        "Rekomendasi pembelajaran remedial berbasis AI",
        "Dashboard untuk dosen melihat pola miskonsepsi kelas",
      ],
      category: "ai",
    },
    {
      id: "ai-game-based-learning",
      title: "AI-Game-Based Learning",
      description:
        "Pengalaman belajar berbasis permainan yang ditenagai AI untuk membantu mahasiswa menemukan jawaban atas apa yang ingin mereka ketahui (W – Want to Know) dengan cara yang lebih seru dan interaktif. Fitur ini mengubah pertanyaan 'Saya ingin tahu…' dari fase KWL menjadi serangkaian quests, tantangan, dan mini-games adaptif. Saat mahasiswa menjelajahi permainan, AI memberikan hints, step-by-step challenges, dan umpan balik cepat yang membantu mereka memperdalam konsep yang paling mereka ingin pahami.",
      icon: HiPuzzle,
      image: "/feature/ai-game-based-learning.svg",
      benefits: [
        "Konversi Want to Know menjadi quests dan tantangan interaktif",
        "Tingkat kesulitan adaptif sesuai performa mahasiswa",
        "Hints dan feedback real-time dari AI",
        "Pengalaman belajar yang engaging dan bermakna",
      ],
      category: "ai",
    },
    // K-OWL Studio Features
    {
      id: "ai-slide-deck-generator",
      title: "AI Slide Deck Generator",
      description:
        "Bangun presentasi profesional dalam hitungan detik — lengkap dengan struktur, visual, contoh, dan pertanyaan pemantik berpikir. K-OWL Studio menghasilkan slide deck yang selaras dengan filosofi KWL dan kebutuhan pembelajaran Anda.",
      icon: HiDocumentText,
      image: "/feature/ai_slide_deck_generator.PNG",
      benefits: [
        "Presentasi profesional dalam hitungan detik",
        "Struktur pembelajaran berbasis KWL",
        "Visual menarik dan pertanyaan pemantik",
        "Siap pakai dan dapat disesuaikan",
      ],
      category: "studio",
    },
    {
      id: "ai-mind-map-builder",
      title: "AI Mind-Map Builder",
      description:
        "Ubah topik kompleks menjadi peta konsep yang jelas dan mudah dipahami, terintegrasi dengan KWL learners. Mind map yang dihasilkan membantu mahasiswa memahami hubungan antar konsep dan melihat gambaran besar pembelajaran.",
      icon: HiCollection,
      image: "/feature/ai_mind_map_builder.PNG",
      benefits: [
        "Peta konsep otomatis dari topik kompleks",
        "Terintegrasi dengan respons KWL mahasiswa",
        "Visualisasi hubungan antar konsep",
        "Export dalam berbagai format",
      ],
      category: "studio",
    },
    {
      id: "ai-worksheet-generator",
      title: "AI Worksheet Generator",
      description:
        "Buat worksheet eksplorasi, HOTS, refleksi, atau case study secara otomatis, personal, dan siap cetak. Setiap worksheet dirancang untuk mengaktifkan pembelajaran berbasis minat dan rasa ingin tahu mahasiswa.",
      icon: HiDocumentText,
      image: "/feature/ai_worksheet_generator.PNG",
      benefits: [
        "Worksheet eksplorasi dan HOTS otomatis",
        "Personal dan adaptif dengan kebutuhan",
        "Berbagai jenis: refleksi, case study, problem solving",
        "Siap cetak dan siap digital",
      ],
      category: "studio",
    },
    {
      id: "ai-question-bank-generator",
      title: "AI Question Bank Generator",
      description:
        "Hasilkan soal MCQ, essay, coding task, dan quiz interaktif dengan kualitas evaluasi kelas dunia. Question bank yang dihasilkan selaras dengan Bloom's Taxonomy dan CPMK pembelajaran Anda.",
      icon: HiAcademicCap,
      image: "/feature/ai_question_bank_generator.PNG",
      benefits: [
        "MCQ, essay, coding task otomatis",
        "Kualitas evaluasi profesional",
        "Alignment dengan Bloom & CPMK",
        "Bank soal siap pakai dan adaptif",
      ],
      category: "studio",
    },
    {
      id: "ai-lesson-plan-generator",
      title: "AI Lesson Plan & Study Plan Generator",
      description:
        "Rencana pembelajaran otomatis untuk dosen dan mahasiswa — personal dan adaptif. Lesson plan yang dihasilkan mencakup tujuan pembelajaran, aktivitas, assessment, dan refleksi berbasis KWL.",
      icon: HiBookOpen,
      image: "/feature/ai_lesson_plan.PNG",
      benefits: [
        "Lesson plan lengkap dalam sekejap",
        "Personal untuk dosen dan mahasiswa",
        "Adaptif dengan kebutuhan pembelajaran",
        "Include aktivitas, assessment, dan refleksi KWL",
      ],
      category: "studio",
    },
    // {
    //   id: "feedback-system",
    //   title: "Feedback & Pre-reading Material",
    //   description:
    //     "Sistem feedback dari dosen ke mahasiswa dan upload pre-reading material untuk persiapan pembelajaran.",
    //   icon: HiDocumentText,
    //   image: "/feature/framework_kwl_terstruktur.PNG",
    //   benefits: [
    //     "Feedback per student per topic",
    //     "Pre-reading material upload (MinIO storage)",
    //     "Material dapat diakses sebelum topic dibuka",
    //     "Tracking feedback history",
    //   ],
    //   category: "assessment",
    // },
  ];

  const categories = [
    { id: "all", name: "Semua Fitur", icon: HiCollection },
    { id: "studio", name: "K-OWL Studio", icon: HiCube },
    { id: "ai", name: "AI Features", icon: HiSparkles },
    { id: "kwl", name: "KWL Framework", icon: HiBookOpen },
    { id: "analytics", name: "Analytics", icon: HiChartBar },
    { id: "kolaborasi", name: "Kolaborasi", icon: HiUserGroup },
    { id: "interaktif", name: "Interaktif", icon: HiAcademicCap },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((feature) => feature.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Fitur-fitur K-OWL"
        description="Jelajahi berbagai fitur canggih yang dirancang untuk meningkatkan pengalaman pembelajaran KWL Anda dengan teknologi AI terdepan dan interface yang intuitif."
        icon={HiLightBulb}
        iconSize={16}
        primaryButton={{ text: "Coba Sekarang", href: "/auth/signin" }}
        secondaryButton={{ text: "Pelajari Lebih Lanjut", href: "/about" }}
      />

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {activeCategory === "studio" ? (
        // K-OWL Studio Special Section
        <SectionContainer className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section for K-OWL Studio */}
            <div className="text-center mb-16">
              <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
                <HiCube className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">K-OWL Studio</h2>
              <h3 className="text-2xl font-semibold text-pink-600 mb-4">Your AI-Powered Learning Creation Hub</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                K-OWL Studio adalah ruang kerja cerdas yang membantu dosen dan mahasiswa menciptakan materi pembelajaran berkualitas tinggi hanya dalam hitungan detik. Didukung oleh teknologi AI dan filosofi KWL (Know–Want–Learn), K-OWL Studio memastikan setiap konten yang dihasilkan selalu relevan, personal, dan selaras dengan kebutuhan belajar.
              </p>

              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
                  🚀 Belajar Lebih Mudah. Mengajar Lebih Cepat. Konten Lebih Bermakna.
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Dengan satu klik, Anda dapat menghasilkan slide deck, worksheet, question bank, mind-map, lesson plan, hingga game pembelajaran — semuanya otomatis, adaptif, dan siap digunakan di kelas Anda.
                </p>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
                  <h5 className="text-xl font-semibold text-gray-900 mb-4">K-OWL Studio membantu Anda:</h5>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚡</span>
                      <span className="text-gray-700">Menghemat waktu persiapan hingga 80%</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎯</span>
                      <span className="text-gray-700">Mengaktifkan pembelajaran berbasis minat & rasa ingin tahu</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✨</span>
                      <span className="text-gray-700">Menghadirkan pengalaman belajar yang lebih hidup dan interaktif</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🧠</span>
                      <span className="text-gray-700">Meningkatkan metakognisi, refleksi, dan engagement learner</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h5 className="text-xl font-semibold text-gray-900 mb-4">Kenapa K-OWL Studio Berbeda?</h5>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">Dibangun dengan AI pedagogy engine berbasis KWL</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">Satu-satunya platform yang menggabungkan content creation, metakognisi, dan analytics</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">Menghasilkan evidence of learning yang langsung dapat dipakai dosen</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">Cocok untuk sekolah, universitas, bootcamp, micro-credential, dan pendidikan jarak jauh</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">Desain yang ramah pemula namun bertenaga tinggi untuk profesional pendidikan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mb-12">
              <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">🧩 Fitur Utama K-OWL Studio</h3>
              <div className="grid gap-8">
                {filteredFeatures.map((feature, index) => {
                  const categoryColor = "pink";
                  const categoryName = "K-OWL Studio";

                  return (
                    <FeatureCard
                      key={feature.id}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      image={feature.image}
                      benefits={feature.benefits}
                      category={categoryName}
                      categoryColor={categoryColor as "pink"}
                      reversed={index % 2 === 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </SectionContainer>
      ) : (
        // Regular Features Section
        <SectionContainer className="py-16">
          <div className="grid gap-16">
            {filteredFeatures.map((feature, index) => {
              const categoryColor =
                feature.category === "studio" ? "pink" :
                feature.category === "ai" ? "blue" :
                feature.category === "kwl" ? "teal" :
                feature.category === "analytics" ? "purple" :
                feature.category === "interaktif" ? "green" : "orange";

              const categoryName = categories.find(cat => cat.id === feature.category)?.name;

              return (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  image={feature.image}
                  benefits={feature.benefits}
                  category={categoryName}
                  categoryColor={categoryColor as "pink" | "blue" | "teal" | "purple" | "green" | "orange"}
                  reversed={index % 2 === 1}
                />
              );
            })}
          </div>
        </SectionContainer>
      )}

      {/* <SectionContainer
        className="py-16 bg-gray-100"
        title="Spesifikasi Teknis"
        subtitle="K-Owl dibangun dengan teknologi modern untuk memastikan performa optimal dan pengalaman pengguna yang seamless di berbagai platform."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="Real-time Updates"
            description="WebSocket connection untuk update real-time dengan latency rendah"
            icon={HiPlay}
            iconBgColor="bg-blue-100"
            iconTextColor="text-blue-600"
            variant="shadow"
          />
          <IconCard
            title="High Performance"
            description="Optimized dengan caching Redis dan database indexing"
            icon={HiClock}
            iconBgColor="bg-green-100"
            iconTextColor="text-green-600"
            variant="shadow"
          />
          <IconCard
            title="API Documentation"
            description="RESTful API dengan dokumentasi Swagger yang lengkap"
            icon={HiDocumentText}
            iconBgColor="bg-purple-100"
            iconTextColor="text-purple-600"
            variant="shadow"
          />
          <IconCard
            title="Scalable"
            description="Containerized dengan Docker dan orchestration Kubernetes"
            icon={HiChat}
            iconBgColor="bg-red-100"
            iconTextColor="text-red-600"
            variant="shadow"
          />
        </div>
      </SectionContainer> */}

      {/* Integration Features */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Integrasi & Kompatibilitas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              K-Owl mendukung berbagai sistem integrasi dan kompatibel dengan
              berbagai platform untuk memudahkan adopsi di institusi pendidikan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">
                Authentication
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Keycloak SSO Integration
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Google OAuth2 Login
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  JWT Token Security
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Role-based Access Control
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">
                Data Management
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  PostgreSQL Database
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Redis Caching
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  MinIO Object Storage
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Data Export/Import
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-800 mb-6">
                Platform Support
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Web-based Application
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Mobile Responsive
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Cross-browser Compatible
                </li>
                <li className="flex items-center">
                  <HiCheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Progressive Web App
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      <CallToActionSection
        title="Siap Menggunakan Semua Fitur Ini?"
        description="Bergabunglah dengan K-OWL sekarang dan manfaatkan seluruh fitur canggih termasuk AI-powered features untuk meningkatkan efektivitas pembelajaran KWL di institusi Anda."
        primaryButton={{ text: "Mulai Sekarang", href: "/auth/signin" }}
        secondaryButton={{ text: "Tentang K-OWL", href: "/about" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}
