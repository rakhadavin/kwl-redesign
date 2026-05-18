"use client";
import React, { useState } from "react";
import { HiPlay, HiAcademicCap, HiUsers, HiChartBar, HiLightBulb, HiBookOpen, HiClipboardList, HiCog, HiArrowRight } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

interface Scenario {
  id: string;
  title: string;
  description: string;
  userType: 'lecturer' | 'student' | 'admin';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  steps: ScenarioStep[];
  tools: string[];
  expectedOutcome: string;
}

interface ScenarioStep {
  step: number;
  title: string;
  description: string;
  action: string;
  tips?: string;
}

const scenarios: Scenario[] = [
  {
    id: "1",
    title: "Membuat Course Baru dengan Metode KWL",
    description: "Panduan lengkap untuk dosen dalam membuat course baru dan mengimplementasikan metode KWL untuk mata kuliah.",
    userType: "lecturer",
    duration: "30 menit",
    difficulty: "beginner",
    objectives: [
      "Membuat course baru di platform K-Owl",
      "Mengonfigurasi setting KWL untuk course",
      "Menambahkan materi pembelajaran dan assessment",
      "Mengundang mahasiswa untuk bergabung"
    ],
    steps: [
      {
        step: 1,
        title: "Login dan Akses Dashboard",
        description: "Masuk ke platform menggunakan akun dosen",
        action: "Klik tombol 'Login' dan masukkan kredensial Anda"
      },
      {
        step: 2,
        title: "Buat Course Baru",
        description: "Mulai membuat course dengan informasi dasar",
        action: "Klik 'Buat Course Baru' dan isi form dengan nama, deskripsi, dan periode course",
        tips: "Gunakan nama course yang jelas dan deskripsi yang komprehensif"
      },
      {
        step: 3,
        title: "Konfigurasi KWL Settings",
        description: "Atur preferensi metode KWL untuk course",
        action: "Pilih jenis aktivitas KWL, durasi setiap fase, dan metode evaluasi"
      },
      {
        step: 4,
        title: "Upload Materi Pembelajaran",
        description: "Tambahkan konten pembelajaran yang relevan",
        action: "Upload slide, video, atau dokumen pendukung untuk setiap topik"
      },
      {
        step: 5,
        title: "Undang Mahasiswa",
        description: "Tambahkan mahasiswa ke dalam course",
        action: "Gunakan enrollment key atau undang langsung via email"
      }
    ],
    tools: ["Course Builder", "Content Manager", "User Management"],
    expectedOutcome: "Course siap digunakan dengan setting KWL yang optimal untuk pembelajaran interaktif"
  },
  {
    id: "2",
    title: "Mengikuti Pembelajaran KWL sebagai Mahasiswa",
    description: "Panduan untuk mahasiswa dalam mengikuti pembelajaran menggunakan metode KWL dan memaksimalkan hasil belajar.",
    userType: "student",
    duration: "45 menit",
    difficulty: "beginner",
    objectives: [
      "Memahami tahapan pembelajaran KWL",
      "Mengisi fase Know, Want to Learn, dan Learned",
      "Berpartisipasi dalam diskusi dan quiz",
      "Melakukan self-reflection dan evaluasi"
    ],
    steps: [
      {
        step: 1,
        title: "Join Course",
        description: "Bergabung dengan course yang telah dibuat dosen",
        action: "Masukkan enrollment key atau terima undangan course"
      },
      {
        step: 2,
        title: "Fase KNOW - Identifikasi Pengetahuan Awal",
        description: "Isi apa yang sudah Anda ketahui tentang topik",
        action: "Lengkapi form 'What I Know' dengan pengetahuan yang sudah dimiliki",
        tips: "Jujur dalam mengisi agar dosen dapat menyesuaikan pembelajaran"
      },
      {
        step: 3,
        title: "Fase WANT TO LEARN - Tentukan Tujuan Belajar",
        description: "Rumuskan apa yang ingin dipelajari",
        action: "Isi form 'What I Want to Learn' dengan pertanyaan dan tujuan belajar"
      },
      {
        step: 4,
        title: "Akses Materi Pembelajaran",
        description: "Pelajari konten yang disediakan dosen",
        action: "Buka dan pelajari video, slide, atau dokumen pembelajaran"
      },
      {
        step: 5,
        title: "Fase LEARNED - Refleksi Pembelajaran",
        description: "Dokumentasikan apa yang telah dipelajari",
        action: "Isi form 'What I Learned' dan jawab quiz evaluasi"
      }
    ],
    tools: ["KWL Forms", "Content Viewer", "Quiz System", "Discussion Forum"],
    expectedOutcome: "Pemahaman yang lebih dalam tentang materi dan awareness terhadap progress belajar sendiri"
  },
  {
    id: "3",
    title: "Analisis Learning Analytics untuk Evaluasi Course",
    description: "Menggunakan dashboard analytics untuk menganalisis efektivitas pembelajaran dan progress mahasiswa.",
    userType: "lecturer",
    duration: "25 menit",
    difficulty: "intermediate",
    objectives: [
      "Mengakses dashboard learning analytics",
      "Menginterpretasi data engagement mahasiswa",
      "Menganalisis progress pembelajaran per fase KWL",
      "Membuat laporan evaluasi course"
    ],
    steps: [
      {
        step: 1,
        title: "Akses Dashboard Analytics",
        description: "Buka menu analytics untuk course yang dipilih",
        action: "Klik tab 'Analytics' pada course dashboard"
      },
      {
        step: 2,
        title: "Review Engagement Metrics",
        description: "Lihat tingkat partisipasi dan aktivitas mahasiswa",
        action: "Analisis chart engagement, login frequency, dan completion rate"
      },
      {
        step: 3,
        title: "Evaluasi Progress KWL",
        description: "Tinjau perkembangan mahasiswa di setiap fase KWL",
        action: "Gunakan visualisasi progress untuk identifikasi area yang perlu perhatian"
      },
      {
        step: 4,
        title: "Generate Reports",
        description: "Buat laporan comprehensive untuk evaluasi",
        action: "Export data dalam format PDF atau Excel untuk dokumentasi"
      }
    ],
    tools: ["Analytics Dashboard", "Data Visualization", "Report Generator"],
    expectedOutcome: "Insight yang actionable untuk improving course design dan teaching strategy"
  },
  {
    id: "4",
    title: "Kolaborasi Tim dalam Project-Based Learning",
    description: "Menggunakan fitur kolaborasi K-Owl untuk project-based learning dengan metode KWL dalam tim.",
    userType: "student",
    duration: "60 menit",
    difficulty: "intermediate",
    objectives: [
      "Membentuk tim untuk project pembelajaran",
      "Menggunakan collaborative KWL workspace",
      "Mengelola timeline dan deliverables project",
      "Melakukan peer review dan feedback"
    ],
    steps: [
      {
        step: 1,
        title: "Bentuk Tim Project",
        description: "Bergabung atau membuat tim untuk project",
        action: "Gunakan fitur team formation atau terima undangan tim"
      },
      {
        step: 2,
        title: "Collaborative KWL Planning",
        description: "Buat KWL plan bersama dengan anggota tim",
        action: "Isi shared KWL board untuk merencanakan project learning objectives"
      },
      {
        step: 3,
        title: "Distribute Tasks",
        description: "Bagi tugas berdasarkan expertise dan learning goals",
        action: "Assign individual learning tasks yang align dengan KWL objectives"
      },
      {
        step: 4,
        title: "Progress Tracking",
        description: "Monitor progress individual dan tim secara berkala",
        action: "Update progress di shared dashboard dan lakukan sync meeting"
      },
      {
        step: 5,
        title: "Peer Review & Reflection",
        description: "Evaluasi hasil belajar dan berikan feedback",
        action: "Gunakan peer review tools dan complete team reflection"
      }
    ],
    tools: ["Team Workspace", "Collaborative KWL", "Task Management", "Peer Review"],
    expectedOutcome: "Project yang sukses dengan learning outcomes yang clear dan teamwork skills yang improved"
  },
  {
    id: "5",
    title: "Customisasi Platform untuk Institusi",
    description: "Panduan administrator dalam mengkustomisasi platform K-Owl sesuai kebutuhan institusi pendidikan.",
    userType: "admin",
    duration: "90 menit",
    difficulty: "advanced",
    objectives: [
      "Konfigurasi institutional settings",
      "Customisasi branding dan user interface",
      "Setup user roles dan permissions",
      "Integrasi dengan sistem existing"
    ],
    steps: [
      {
        step: 1,
        title: "Institutional Setup",
        description: "Konfigurasi dasar untuk institusi",
        action: "Set institutional profile, domain, dan basic configuration"
      },
      {
        step: 2,
        title: "Branding Customization",
        description: "Sesuaikan tampilan dengan brand institusi",
        action: "Upload logo, set color scheme, dan customize UI elements"
      },
      {
        step: 3,
        title: "User Management Configuration",
        description: "Setup role-based access control",
        action: "Define user roles, permissions, dan approval workflows"
      },
      {
        step: 4,
        title: "System Integration",
        description: "Integrasikan dengan sistem akademik existing",
        action: "Configure API connections, data sync, dan SSO integration"
      },
      {
        step: 5,
        title: "Testing & Deployment",
        description: "Test konfigurasi dan deploy ke production",
        action: "Run system tests, user acceptance testing, dan go-live"
      }
    ],
    tools: ["Admin Console", "Customization Tools", "API Manager", "System Monitor"],
    expectedOutcome: "Platform yang fully customized dan terintegrasi dengan ekosistem institusi"
  }
];

const ScenarioCard: React.FC<{ scenario: Scenario; onSelect: (scenario: Scenario) => void }> = ({
  scenario,
  onSelect
}) => {
  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'lecturer': return HiAcademicCap;
      case 'student': return HiUsers;
      case 'admin': return HiCog;
      default: return HiUsers;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'lecturer': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const UserTypeIcon = getUserTypeIcon(scenario.userType);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(scenario.userType)}`}>
          <UserTypeIcon className="w-4 h-4 mr-1" />
          {scenario.userType.charAt(0).toUpperCase() + scenario.userType.slice(1)}
        </div>
        <div className="flex space-x-2">
          <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
            {scenario.difficulty}
          </span>
          <span className="text-sm text-gray-500">{scenario.duration}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {scenario.title}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {scenario.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Learning Objectives:</h4>
        <ul className="space-y-1">
          {scenario.objectives.slice(0, 3).map((objective, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-green-500 mr-2 mt-1">•</span>
              {objective}
            </li>
          ))}
          {scenario.objectives.length > 3 && (
            <li className="text-sm text-gray-500 italic">
              +{scenario.objectives.length - 3} more objectives...
            </li>
          )}
        </ul>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {scenario.tools.slice(0, 2).map((tool, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tool}
            </span>
          ))}
          {scenario.tools.length > 2 && (
            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
              +{scenario.tools.length - 2}
            </span>
          )}
        </div>
        <button
          onClick={() => onSelect(scenario)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          <HiPlay className="w-4 h-4 mr-2" />
          Start Scenario
        </button>
      </div>
    </div>
  );
};

const ScenarioDetail: React.FC<{ scenario: Scenario; onBack: () => void }> = ({
  scenario,
  onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Back to Scenarios
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{scenario.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{scenario.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{scenario.duration}</div>
            <div className="text-sm text-gray-600">Estimated Duration</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 capitalize">{scenario.difficulty}</div>
            <div className="text-sm text-gray-600">Difficulty Level</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{scenario.steps.length}</div>
            <div className="text-sm text-gray-600">Steps</div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
          <ul className="space-y-3">
            {scenario.objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Guide</h2>
          <div className="space-y-6">
            {scenario.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3">
                      <p className="text-blue-800"><strong>Action:</strong> {step.action}</p>
                    </div>
                    {step.tips && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p className="text-yellow-800"><strong>Tips:</strong> {step.tips}</p>
                      </div>
                    )}
                  </div>
                </div>
                {index < scenario.steps.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools Required</h2>
          <div className="flex flex-wrap gap-3">
            {scenario.tools.map((tool, index) => (
              <span
                key={index}
                className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-green-800 mb-3">Expected Outcome</h2>
          <p className="text-green-700">{scenario.expectedOutcome}</p>
        </div>
      </div>
    </div>
  );
};

export default function SkenarioPenggunaanPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const lecturerScenarios = scenarios.filter(s => s.userType === 'lecturer');
  const studentScenarios = scenarios.filter(s => s.userType === 'student');
  const adminScenarios = scenarios.filter(s => s.userType === 'admin');

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <ScenarioDetail
            scenario={selectedScenario}
            onBack={() => setSelectedScenario(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Skenario Penggunaan K-Owl"
        description="Panduan praktis dan skenario penggunaan platform K-Owl untuk berbagai role pengguna. Pelajari cara memaksimalkan fitur pembelajaran KWL dalam konteks pendidikan Anda."
        logoSrc="/logo.png"
        logoAlt="K-Owl Usage Scenarios"
        logoSize={120}
        primaryButton={{ text: "Jelajahi Skenario", href: "#scenarios" }}
        secondaryButton={{ text: "User Manual", href: "/user-manual" }}
      />

      {/* Usage Overview */}
      <SectionContainer
        className="py-16 bg-white"
        title="Panduan Berdasarkan Role"
        subtitle="Setiap role pengguna memiliki cara penggunaan yang berbeda. Pilih skenario yang sesuai dengan peran Anda di platform K-Owl."
        centered
      >
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Untuk Dosen"
            description="Pelajari cara membuat course, mengelola pembelajaran KWL, dan menganalisis progress mahasiswa dengan tools yang tersedia."
            icon={HiAcademicCap}
            categoryColor="blue"
          />
          <FeatureCard
            title="Untuk Mahasiswa"
            description="Panduan lengkap mengikuti pembelajaran KWL, berkolaborasi dalam tim, dan memaksimalkan hasil belajar Anda."
            icon={HiUsers}
            categoryColor="green"
          />
          <FeatureCard
            title="Untuk Administrator"
            description="Konfigurasi platform, customisasi sesuai institusi, dan mengelola user management dengan tools admin yang advanced."
            icon={HiCog}
            categoryColor="purple"
          />
        </div>
      </SectionContainer>

      {/* Scenario Categories */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Kategori Skenario"
        subtitle="Skenario penggunaan dikategorikan berdasarkan kompleksitas dan tujuan pembelajaran untuk memudahkan pemilihan."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="Basic Setup"
            description="Skenario dasar untuk memulai menggunakan platform K-Owl dengan langkah-langkah sederhana."
            icon={HiPlay}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="Learning Activities"
            description="Panduan menggunakan fitur pembelajaran KWL dan berpartisipasi dalam aktivitas akademik."
            icon={HiBookOpen}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="Analytics & Insights"
            description="Menggunakan data analytics untuk evaluasi dan improvement dalam proses pembelajaran."
            icon={HiChartBar}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <IconCard
            title="Advanced Features"
            description="Skenario advanced untuk customisasi, integrasi, dan optimasi penggunaan platform."
            icon={HiLightBulb}
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      {/* Available Scenarios */}
      <SectionContainer
        id="scenarios"
        className="py-16 bg-white"
        title="Skenario Tersedia"
        subtitle="Pilih skenario yang sesuai dengan role dan kebutuhan Anda. Setiap skenario dilengkapi dengan langkah-langkah detail dan tips praktis."
        centered
      >
        {/* Lecturer Scenarios */}
        {lecturerScenarios.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Skenario untuk Dosen</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {lecturerScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={setSelectedScenario}
                />
              ))}
            </div>
          </div>
        )}

        {/* Student Scenarios */}
        {studentScenarios.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Skenario untuk Mahasiswa</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {studentScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={setSelectedScenario}
                />
              ))}
            </div>
          </div>
        )}

        {/* Admin Scenarios */}
        {adminScenarios.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Skenario untuk Administrator</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {adminScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={setSelectedScenario}
                />
              ))}
            </div>
          </div>
        )}
      </SectionContainer>

      <CallToActionSection
        title="Butuh Panduan Lebih Detail?"
        description="Akses user manual lengkap atau hubungi tim support kami untuk mendapatkan bantuan khusus sesuai kebutuhan institusi Anda."
        primaryButton={{ text: "User Manual", href: "/user-manual" }}
        secondaryButton={{ text: "Hubungi Support", href: "/contact" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}