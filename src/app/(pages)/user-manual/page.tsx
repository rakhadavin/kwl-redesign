"use client";
import React, { useState } from "react";
import { HiBookOpen, HiSearch, HiAcademicCap, HiUsers, HiCog, HiQuestionMarkCircle, HiDownload, HiPlay, HiChevronDown, HiChevronRight } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

interface ManualSection {
  id: string;
  title: string;
  description: string;
  category: 'getting-started' | 'lecturer' | 'student' | 'admin' | 'features' | 'troubleshooting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: string;
  title: string;
  content: string;
  steps?: string[];
  tips?: string[];
  related?: string[];
}

const manualSections: ManualSection[] = [
  {
    id: "getting-started",
    title: "Memulai dengan K-Owl",
    description: "Panduan dasar untuk mulai menggunakan platform K-Owl",
    category: "getting-started",
    difficulty: "beginner",
    subsections: [
      {
        id: "account-creation",
        title: "Membuat Akun",
        content: "Langkah-langkah untuk mendaftar dan membuat akun di platform K-Owl.",
        steps: [
          "Kunjungi halaman pendaftaran K-Owl",
          "Pilih role Anda (Dosen atau Mahasiswa)",
          "Isi form pendaftaran dengan data yang akurat",
          "Verifikasi email yang telah dikirimkan",
          "Login dengan kredensial yang telah dibuat"
        ],
        tips: [
          "Gunakan email institusi untuk validasi yang lebih mudah",
          "Pastikan password memiliki kombinasi huruf, angka, dan simbol"
        ]
      },
      {
        id: "first-login",
        title: "Login Pertama Kali",
        content: "Panduan lengkap untuk login pertama dan mengatur profil dasar.",
        steps: [
          "Masukkan email dan password di halaman login",
          "Lengkapi profil dengan informasi akademik",
          "Atur preferensi notifikasi",
          "Familiarasi dengan dashboard utama"
        ]
      },
      {
        id: "interface-overview",
        title: "Mengenal Interface",
        content: "Pengenalan elemen-elemen utama dalam interface platform K-Owl.",
        steps: [
          "Navigasi menu utama dan sidebar",
          "Understanding dashboard widgets",
          "Menggunakan search dan filter",
          "Mengakses profile dan settings"
        ]
      }
    ]
  },
  {
    id: "lecturer-guide",
    title: "Panduan untuk Dosen",
    description: "Manual lengkap untuk dosen dalam mengelola pembelajaran dengan metode KWL",
    category: "lecturer",
    difficulty: "intermediate",
    subsections: [
      {
        id: "course-creation",
        title: "Membuat Course Baru",
        content: "Panduan lengkap membuat dan mengonfigurasi course baru dengan metode KWL.",
        steps: [
          "Klik 'Buat Course Baru' di dashboard",
          "Isi informasi dasar course (nama, deskripsi, periode)",
          "Pilih template KWL yang sesuai",
          "Konfigurasi setting assessment dan grading",
          "Upload materi pembelajaran initial",
          "Set enrollment key atau invite students"
        ],
        tips: [
          "Gunakan nama course yang jelas dan konsisten dengan kurikulum",
          "Siapkan materi pembelajaran sebelum mengundang mahasiswa"
        ]
      },
      {
        id: "content-management",
        title: "Mengelola Konten Pembelajaran",
        content: "Cara mengunggah, mengorganisir, dan mengelola materi pembelajaran dalam course.",
        steps: [
          "Akses Content Manager di course dashboard",
          "Upload file (PDF, video, presentasi)",
          "Organize content dalam topik dan subtopik",
          "Set visibility dan access permissions",
          "Preview content sebelum publish"
        ]
      },
      {
        id: "kwl-setup",
        title: "Konfigurasi KWL Activities",
        content: "Mengatur aktivitas KWL untuk setiap topik pembelajaran dalam course.",
        steps: [
          "Pilih topik untuk dikonfigurasi KWL",
          "Set durasi untuk setiap fase (Know, Want to Learn, Learned)",
          "Tentukan jenis assessment untuk setiap fase",
          "Konfigurasi rubrik penilaian",
          "Set deadline dan reminder notifications"
        ]
      },
      {
        id: "student-monitoring",
        title: "Monitoring Progress Mahasiswa",
        content: "Menggunakan dashboard analytics untuk memantau progress dan engagement mahasiswa.",
        steps: [
          "Akses Analytics Dashboard",
          "Review individual student progress",
          "Analyze class-wide engagement metrics",
          "Identify students yang membutuhkan bantuan",
          "Generate progress reports"
        ]
      }
    ]
  },
  {
    id: "student-guide",
    title: "Panduan untuk Mahasiswa",
    description: "Manual untuk mahasiswa dalam mengikuti pembelajaran dengan metode KWL",
    category: "student",
    difficulty: "beginner",
    subsections: [
      {
        id: "joining-course",
        title: "Bergabung dengan Course",
        content: "Cara bergabung dengan course yang telah dibuat oleh dosen.",
        steps: [
          "Dapatkan enrollment key dari dosen",
          "Klik 'Join Course' di dashboard",
          "Masukkan enrollment key atau course code",
          "Konfirmasi pendaftaran course",
          "Akses course dashboard"
        ]
      },
      {
        id: "kwl-participation",
        title: "Berpartisipasi dalam KWL",
        content: "Panduan lengkap mengikuti setiap fase dalam metode pembelajaran KWL.",
        steps: [
          "Fase KNOW: Identifikasi pengetahuan yang sudah dimiliki",
          "Fase WANT TO LEARN: Tentukan tujuan dan pertanyaan pembelajaran",
          "Akses dan pelajari materi yang disediakan",
          "Fase LEARNED: Refleksi dan dokumentasi pembelajaran",
          "Submit assessment dan self-evaluation"
        ],
        tips: [
          "Jujur dalam mengisi fase KNOW untuk pembelajaran yang optimal",
          "Buat pertanyaan spesifik di fase WANT TO LEARN",
          "Lakukan refleksi mendalam di fase LEARNED"
        ]
      },
      {
        id: "collaboration",
        title: "Berkolaborasi dengan Teman",
        content: "Menggunakan fitur kolaborasi untuk project-based learning dan team activities.",
        steps: [
          "Join atau buat study group",
          "Participate dalam discussion forums",
          "Collaborate dalam shared KWL workspace",
          "Peer review dan feedback",
          "Track team progress"
        ]
      }
    ]
  },
  {
    id: "admin-guide",
    title: "Panduan Administrator",
    description: "Manual untuk administrator dalam mengelola platform dan institusi",
    category: "admin",
    difficulty: "advanced",
    subsections: [
      {
        id: "user-management",
        title: "Mengelola Pengguna",
        content: "Administrasi user accounts, roles, dan permissions dalam platform.",
        steps: [
          "Akses User Management Console",
          "Create dan manage user accounts",
          "Assign roles dan permissions",
          "Bulk import users dari CSV",
          "Monitor user activity dan engagement"
        ]
      },
      {
        id: "institutional-setup",
        title: "Konfigurasi Institusi",
        content: "Setup dan customisasi platform sesuai kebutuhan institusi.",
        steps: [
          "Configure institutional profile",
          "Customize branding dan UI elements",
          "Set up domain dan SSL",
          "Configure email settings",
          "Setup backup dan security policies"
        ]
      },
      {
        id: "system-integration",
        title: "Integrasi Sistem",
        content: "Mengintegrasikan K-Owl dengan sistem akademik dan learning tools lainnya.",
        steps: [
          "Configure API connections",
          "Setup Single Sign-On (SSO)",
          "Integrate dengan Learning Management System",
          "Configure data synchronization",
          "Test dan validate integrations"
        ]
      }
    ]
  },
  {
    id: "features-guide",
    title: "Panduan Fitur",
    description: "Penjelasan detail tentang fitur-fitur utama platform K-Owl",
    category: "features",
    difficulty: "intermediate",
    subsections: [
      {
        id: "kwl-methodology",
        title: "Metodologi KWL",
        content: "Pemahaman mendalam tentang metode Know, Want to Learn, Learned dan implementasinya.",
        steps: [
          "Understand theoretical background KWL",
          "Learn best practices untuk setiap fase",
          "Explore different KWL templates",
          "Understand assessment strategies",
          "Apply KWL dalam berbagai konteks pembelajaran"
        ]
      },
      {
        id: "analytics-dashboard",
        title: "Dashboard Analytics",
        content: "Menggunakan learning analytics untuk insights dan decision making.",
        steps: [
          "Navigate analytics interface",
          "Understand key metrics dan indicators",
          "Create custom reports",
          "Export data untuk external analysis",
          "Set up automated monitoring"
        ]
      },
      {
        id: "communication-tools",
        title: "Tools Komunikasi",
        content: "Menggunakan fitur komunikasi dan kolaborasi dalam platform.",
        steps: [
          "Use messaging dan notification system",
          "Participate dalam discussion forums",
          "Utilize video conferencing integration",
          "Manage announcements dan updates",
          "Configure communication preferences"
        ]
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Solusi untuk masalah umum dan panduan pemecahan masalah",
    category: "troubleshooting",
    difficulty: "beginner",
    subsections: [
      {
        id: "login-issues",
        title: "Masalah Login",
        content: "Solusi untuk berbagai masalah yang berkaitan dengan login dan authentication.",
        steps: [
          "Check email dan password accuracy",
          "Clear browser cache dan cookies",
          "Try different browser atau incognito mode",
          "Reset password jika diperlukan",
          "Contact support jika masalah persists"
        ]
      },
      {
        id: "technical-issues",
        title: "Masalah Teknis",
        content: "Panduan mengatasi masalah teknis umum dalam penggunaan platform.",
        steps: [
          "Check internet connection stability",
          "Update browser ke versi terbaru",
          "Disable browser extensions yang conflict",
          "Check system requirements",
          "Report bugs ke technical support"
        ]
      },
      {
        id: "performance-optimization",
        title: "Optimasi Performa",
        content: "Tips untuk mengoptimalkan performa platform dan pengalaman pengguna.",
        tips: [
          "Use recommended browser specifications",
          "Close unnecessary browser tabs",
          "Ensure stable internet connection",
          "Regularly clear cache dan temporary files",
          "Update browser dan operating system"
        ]
      }
    ]
  }
];

const ManualCard: React.FC<{ section: ManualSection; onSelect: (section: ManualSection) => void }> = ({
  section,
  onSelect
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'getting-started': return HiPlay;
      case 'lecturer': return HiAcademicCap;
      case 'student': return HiUsers;
      case 'admin': return HiCog;
      case 'features': return HiBookOpen;
      case 'troubleshooting': return HiQuestionMarkCircle;
      default: return HiBookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'getting-started': return 'bg-green-100 text-green-800';
      case 'lecturer': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'features': return 'bg-yellow-100 text-yellow-800';
      case 'troubleshooting': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const CategoryIcon = getCategoryIcon(section.category);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(section.category)}`}>
          <CategoryIcon className="w-4 h-4 mr-1" />
          {section.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
        <span className={`text-sm font-medium ${getDifficultyColor(section.difficulty)}`}>
          {section.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {section.title}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {section.description}
      </p>

      <div className="mb-4">
        <span className="text-sm text-gray-600">
          {section.subsections.length} subsections available
        </span>
      </div>

      <button
        onClick={() => onSelect(section)}
        className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
      >
        <HiBookOpen className="w-4 h-4 mr-2" />
        Read Manual
      </button>
    </div>
  );
};

const ManualDetail: React.FC<{ section: ManualSection; onBack: () => void }> = ({
  section,
  onBack
}) => {
  const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Back to Manual Index
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{section.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{section.description}</p>
        </div>

        <div className="space-y-6">
          {section.subsections.map((subsection, index) => (
            <div key={subsection.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedSubsection(
                  expandedSubsection === subsection.id ? null : subsection.id
                )}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">{subsection.title}</h3>
                {expandedSubsection === subsection.id ? (
                  <HiChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <HiChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {expandedSubsection === subsection.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">{subsection.content}</p>

                  {subsection.steps && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Langkah-langkah:</h4>
                      <ol className="space-y-2">
                        {subsection.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {subsection.tips && subsection.tips.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Tips:</h4>
                      <ul className="space-y-2">
                        {subsection.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <span className="text-yellow-500 mr-2 mt-1">💡</span>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function UserManualPage() {
  const [selectedSection, setSelectedSection] = useState<ManualSection | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSections = manualSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedSection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <ManualDetail
            section={selectedSection}
            onBack={() => setSelectedSection(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="User Manual K-Owl"
        description="Panduan lengkap penggunaan platform K-Owl untuk semua role pengguna. Temukan jawaban atas pertanyaan Anda dan pelajari cara memaksimalkan fitur pembelajaran KWL."
        logoSrc="/logo.png"
        logoAlt="K-Owl User Manual"
        logoSize={120}
        primaryButton={{ text: "Mulai Membaca", href: "#manual" }}
        secondaryButton={{ text: "Download PDF", href: "/downloads/k-owl-manual.pdf" }}
      />

      {/* Quick Access */}
      <SectionContainer
        className="py-16 bg-white"
        title="Akses Cepat"
        subtitle="Pilih kategori manual yang sesuai dengan role atau kebutuhan Anda untuk panduan yang lebih terfokus."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="Getting Started"
            description="Panduan dasar untuk pengguna baru dalam memulai menggunakan platform K-Owl."
            icon={HiPlay}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="Untuk Dosen"
            description="Manual lengkap untuk dosen dalam mengelola course dan pembelajaran KWL."
            icon={HiAcademicCap}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="Untuk Mahasiswa"
            description="Panduan mahasiswa dalam mengikuti pembelajaran dan berpartisipasi dalam KWL."
            icon={HiUsers}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <IconCard
            title="Troubleshooting"
            description="Solusi untuk masalah umum dan panduan pemecahan masalah teknis."
            icon={HiQuestionMarkCircle}
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      {/* Search Section */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Cari Manual"
        subtitle="Gunakan pencarian untuk menemukan topik manual yang spesifik sesuai kebutuhan Anda."
        centered
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari topik manual, fitur, atau panduan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </SectionContainer>

      {/* Manual Sections */}
      <SectionContainer
        id="manual"
        className="py-16 bg-white"
        title="Daftar Manual"
        subtitle="Koleksi lengkap panduan penggunaan platform K-Owl yang dikategorikan berdasarkan role dan tingkat kesulitan."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSections.map((section) => (
            <ManualCard
              key={section.id}
              section={section}
              onSelect={setSelectedSection}
            />
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <HiQuestionMarkCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak Ada Hasil</h3>
            <p className="text-gray-500">
              Tidak ditemukan manual yang sesuai dengan pencarian "{searchTerm}".
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}
      </SectionContainer>

      {/* Additional Resources */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Sumber Daya Tambahan"
        subtitle="Akses sumber daya tambahan untuk mendukung penggunaan platform K-Owl secara optimal."
        centered
      >
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Video Tutorials"
            description="Koleksi video tutorial step-by-step untuk berbagai fitur dan fungsi platform K-Owl."
            icon={HiPlay}
            categoryColor="blue"
          />
          <FeatureCard
            title="FAQ"
            description="Pertanyaan yang sering diajukan beserta jawaban lengkap dari tim support K-Owl."
            icon={HiQuestionMarkCircle}
            categoryColor="green"
          />
          <FeatureCard
            title="Best Practices"
            description="Panduan best practices dalam implementasi metode KWL untuk hasil pembelajaran optimal."
            icon={HiBookOpen}
            categoryColor="purple"
          />
        </div>
      </SectionContainer>

      <CallToActionSection
        title="Masih Butuh Bantuan?"
        description="Tim support kami siap membantu Anda dengan pertanyaan khusus atau kebutuhan training untuk institusi Anda."
        primaryButton={{ text: "Hubungi Support", href: "/contact" }}
        secondaryButton={{ text: "Request Training", href: "/kolaborasi" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}