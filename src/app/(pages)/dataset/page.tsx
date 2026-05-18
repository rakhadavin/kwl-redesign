"use client";
import React from "react";
import Link from "next/link";
import {
  HiDownload,
  HiDatabase,
  HiDocumentData,
  HiChartBar,
  HiAcademicCap,
  HiCalendar,
  HiUsers,
  HiClipboardList,
} from "@/components/ui/SimpleIcons";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

interface Dataset {
  id: string;
  title: string;
  description: string;
  size: string;
  format: string[];
  lastUpdated: string;
  category: "learning" | "performance" | "engagement" | "behavior";
  downloadUrl?: string;
  doi?: string;
  license: string;
  citations: number;
  samples: number;
}

const datasets: Dataset[] = [
  {
    id: "1",
    title: "KWL Learning Progress Dataset",
    description:
      "Dataset komprehensif yang berisi data progres pembelajaran mahasiswa menggunakan metode KWL di platform K-Owl. Mencakup data dari 15 universitas dengan 5,000+ mahasiswa selama periode 2 tahun.",
    size: "2.5 GB",
    format: ["CSV", "JSON", "Excel"],
    lastUpdated: "2024-01-15",
    category: "learning",
    downloadUrl: "https://example.com/dataset1",
    doi: "10.5281/zenodo.12345",
    license: "CC BY 4.0",
    citations: 23,
    samples: 125000,
  },
  {
    id: "2",
    title: "Student Engagement Analytics Dataset",
    description:
      "Data keterlibatan mahasiswa dalam platform pembelajaran digital, termasuk metrik interaksi, waktu pembelajaran, dan pola akses. Data telah dianonimkan untuk menjaga privasi.",
    size: "1.8 GB",
    format: ["CSV", "Parquet"],
    lastUpdated: "2023-12-20",
    category: "engagement",
    downloadUrl: "https://example.com/dataset2",
    doi: "10.5281/zenodo.23456",
    license: "CC BY-SA 4.0",
    citations: 18,
    samples: 89000,
  },
  {
    id: "3",
    title: "KWL Assessment Performance Dataset",
    description:
      "Dataset berisi hasil evaluasi dan assessment mahasiswa dalam berbagai tahap KWL (Know, Want to Learn, Learned). Termasuk skor quiz, refleksi, dan feedback dosen.",
    size: "850 MB",
    format: ["CSV", "JSON"],
    lastUpdated: "2024-02-10",
    category: "performance",
    downloadUrl: "https://example.com/dataset3",
    license: "CC BY 4.0",
    citations: 15,
    samples: 45000,
  },
  {
    id: "4",
    title: "Learning Behavior Patterns Dataset",
    description:
      "Analisis pola perilaku belajar mahasiswa dalam lingkungan digital, termasuk preferensi konten, strategi pembelajaran, dan adaptasi terhadap metode KWL.",
    size: "1.2 GB",
    format: ["CSV", "JSON", "SQLite"],
    lastUpdated: "2023-11-30",
    category: "behavior",
    downloadUrl: "https://example.com/dataset4",
    doi: "10.5281/zenodo.34567",
    license: "CC BY-NC 4.0",
    citations: 31,
    samples: 67000,
  },
  {
    id: "5",
    title: "Multi-institutional KWL Implementation Dataset",
    description:
      "Dataset lintas institusi yang mengumpulkan data implementasi metode KWL di berbagai universitas dengan karakteristik dan konteks yang berbeda.",
    size: "3.1 GB",
    format: ["CSV", "JSON", "HDF5"],
    lastUpdated: "2024-03-05",
    category: "learning",
    doi: "10.5281/zenodo.45678",
    license: "CC BY 4.0",
    citations: 42,
    samples: 156000,
  },
];

const DatasetCard: React.FC<{ dataset: Dataset }> = ({ dataset }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "learning":
        return HiAcademicCap;
      case "performance":
        return HiChartBar;
      case "engagement":
        return HiUsers;
      case "behavior":
        return HiClipboardList;
      default:
        return HiDatabase;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "learning":
        return "bg-blue-100 text-blue-800";
      case "performance":
        return "bg-green-100 text-green-800";
      case "engagement":
        return "bg-purple-100 text-purple-800";
      case "behavior":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const CategoryIcon = getCategoryIcon(dataset.category);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
            dataset.category
          )}`}
        >
          <CategoryIcon className="w-4 h-4 mr-1" />
          {dataset.category.charAt(0).toUpperCase() + dataset.category.slice(1)}
        </div>
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center">
            <HiCalendar className="w-4 h-4 mr-1" />
            {dataset.lastUpdated}
          </div>
          <div className="mt-1">
            <span className="font-medium">{dataset.size}</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {dataset.title}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {dataset.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="font-medium text-gray-600">Samples:</span>
          <p className="text-gray-900">{dataset.samples.toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Citations:</span>
          <p className="text-gray-900">{dataset.citations}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">License:</span>
          <p className="text-gray-900">{dataset.license}</p>
        </div>
        <div>
          <span className="font-medium text-gray-600">Formats:</span>
          <p className="text-gray-900">{dataset.format.join(", ")}</p>
        </div>
      </div>

      {dataset.doi && (
        <div className="mb-4 text-sm">
          <span className="font-medium text-gray-600">DOI:</span>
          <span className="text-blue-600 ml-1">{dataset.doi}</span>
        </div>
      )}

      {dataset.downloadUrl && (
        <div className="flex justify-end">
          <Link
            href={dataset.downloadUrl}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
          >
            <HiDownload className="w-4 h-4 mr-2" />
            Download Dataset
          </Link>
        </div>
      )}
    </div>
  );
};

export default function DatasetPage() {
  const learningDatasets = datasets.filter((d) => d.category === "learning");
  const performanceDatasets = datasets.filter(
    (d) => d.category === "performance"
  );
  const engagementDatasets = datasets.filter(
    (d) => d.category === "engagement"
  );
  const behaviorDatasets = datasets.filter((d) => d.category === "behavior");

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Dataset Penelitian K-Owl"
        description="Kumpulan dataset penelitian berkualitas tinggi yang dihasilkan dari implementasi platform K-Owl. Dataset ini tersedia untuk keperluan penelitian akademik dan pengembangan teknologi pendidikan."
        logoSrc="/logo.png"
        logoAlt="K-Owl Research Datasets"
        logoSize={120}
        primaryButton={{ text: "Jelajahi Dataset", href: "#datasets" }}
        secondaryButton={{ text: "Panduan Penggunaan", href: "/user-manual" }}
      />

      {/* Dataset Statistics */}
      <SectionContainer
        className="py-16 bg-white"
        title="Statistik Dataset"
        subtitle="Dataset K-Owl menyediakan data komprehensif untuk penelitian pembelajaran digital dan analisis perilaku mahasiswa dalam lingkungan KWL."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="400k+ Samples"
            description="Total sampel data pembelajaran dari berbagai institusi pendidikan tinggi di Indonesia."
            icon={HiDocumentData}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="5 Kategori"
            description="Dataset dikategorikan berdasarkan aspek pembelajaran, performa, keterlibatan, dan perilaku."
            icon={HiDatabase}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="15+ Universitas"
            description="Data dikumpulkan dari berbagai universitas untuk memastikan representativitas."
            icon={HiAcademicCap}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <IconCard
            title="Open Access"
            description="Semua dataset tersedia dengan lisensi Creative Commons untuk penelitian terbuka."
            icon={HiDownload}
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      {/* Dataset Categories */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Kategori Dataset"
        subtitle="Dataset diklasifikasikan berdasarkan fokus penelitian untuk memudahkan peneliti menemukan data yang sesuai dengan kebutuhan."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Learning Data"
            description="Data progres pembelajaran, materi yang dipelajari, dan hasil evaluasi dalam konteks metode KWL."
            icon={HiAcademicCap}
            categoryColor="blue"
          />
          <FeatureCard
            title="Performance Data"
            description="Metrik performa mahasiswa, skor assessment, dan analisis pencapaian learning outcomes."
            icon={HiChartBar}
            categoryColor="green"
          />
          <FeatureCard
            title="Engagement Data"
            description="Data keterlibatan mahasiswa, interaksi dengan platform, dan pola aktivitas pembelajaran."
            icon={HiUsers}
            categoryColor="purple"
          />
          <FeatureCard
            title="Behavior Data"
            description="Analisis pola perilaku belajar, preferensi pembelajaran, dan adaptasi terhadap teknologi."
            icon={HiClipboardList}
            categoryColor="orange"
          />
        </div>
      </SectionContainer>

      {/* Available Datasets */}
      <SectionContainer
        id="datasets"
        className="py-16 bg-white"
        title="Dataset Tersedia"
        subtitle="Koleksi dataset penelitian yang dapat diunduh dan digunakan untuk berbagai keperluan penelitian akademik."
        centered
      >
        {/* Learning Datasets */}
        {learningDatasets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Learning Data
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {learningDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}

        {/* Performance Datasets */}
        {performanceDatasets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Performance Data
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {performanceDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}

        {/* Engagement Datasets */}
        {engagementDatasets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Engagement Data
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {engagementDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}

        {/* Behavior Datasets */}
        {behaviorDatasets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">
              Behavior Data
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {behaviorDatasets.map((dataset) => (
                <DatasetCard key={dataset.id} dataset={dataset} />
              ))}
            </div>
          </div>
        )}
      </SectionContainer>

      {/* Usage Guidelines */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Panduan Penggunaan Dataset"
        subtitle="Pastikan untuk mengikuti pedoman penggunaan dataset dan memberikan sitasi yang tepat dalam publikasi penelitian Anda."
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Syarat Penggunaan
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Dataset hanya untuk keperluan penelitian akademik
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Wajib memberikan sitasi dalam publikasi
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Tidak untuk keperluan komersial tanpa izin
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Menghormati privasi dan anonimitas data
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Format Sitasi
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
                  K-Owl Research Team. (2024). K-Owl Learning Dataset. DOI:
                  10.5281/zenodo.xxxxx. Retrieved from https://k-owl.edu/dataset
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <CallToActionSection
        title="Butuh Dataset Khusus?"
        description="Kami dapat menyediakan dataset kustom atau kolaborasi penelitian sesuai dengan kebutuhan penelitian Anda. Hubungi tim kami untuk diskusi lebih lanjut."
        primaryButton={{ text: "Hubungi Tim Peneliti", href: "/kolaborasi" }}
        secondaryButton={{ text: "Panduan Lengkap", href: "/user-manual" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}
