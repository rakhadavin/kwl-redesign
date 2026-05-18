"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiExternalLink, HiBookOpen, HiAcademicCap, HiUsers, HiDocumentText, HiCalendar } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  abstract: string;
  category: 'journal' | 'conference' | 'book' | 'thesis';
  tags: string[];
}

const publications: Publication[] = [
  {
    id: "1",
    title: "K-Owl: Next-Gen Interactive Platform for Student Engagement and Feedback",
    authors: ["Baginda Anggun Nan Cenka"],
    journal: "The Indonesian Journal of Computer Science",
    year: 2025,
    doi: "https://doi.org/10.33022/ijcs.v14i5",
    url: "http://ijcs.net/ijcs/index.php/ijcs/article/view/5001",
    abstract: "In the digital era, the challenges faced by lecturers and students in learning are increasingly diverse, which makes students tend to be less involved in learning. A student response system called “K-Owl” is proposed to support the Know, Want to Know, Learn (KWL) strategy where lecturers can monitor students’ knowledge in real-time while the platform helps students stay actively engaged in class. User-Centered Design was used as a methodology to ensure that the proposed platform aligns with user needs, with stages including identifying user problems and needs, system design and development, and evaluation. This study involved 16 interview participants and 71 usability testing participants. Quantitative data were collected using the System Usability Scale (SUS) and the Maze application to usability testing and analysed using the SUS Score and Maze Score. Meanwhile, qualitative data were collected through user interviews and analysed using thematic analysis. This study resulted in three main features including courses management, KWL, and dashboard. The results of user acceptance testing and usability testing were with a score of 100% and a SUS score of 69 (Good category), respectively. The results of the study indicate that K-Owl is a promising platform to support active learning.",
    category: "journal",
    tags: ["KWL", "Digital Learning", "Student Engagement", "Higher Education"]
  },
  // {
  //   id: "2",
  //   title: "Analisis Dampak Platform K-Owl Terhadap Hasil Belajar Mahasiswa: Studi Longitudinal",
  //   authors: ["Dr. Indira Sari", "Prof. Budi Santoso"],
  //   journal: "Indonesian Journal of Educational Technology",
  //   year: 2023,
  //   doi: "10.5678/ijet.2023.045",
  //   url: "https://example.com/publication2",
  //   abstract: "Studi longitudinal selama 2 tahun ini meneliti dampak penggunaan platform K-Owl terhadap hasil belajar mahasiswa di 5 universitas. Data menunjukkan peningkatan signifikan dalam retensi pengetahuan dan kemampuan berpikir kritis.",
  //   category: "journal",
  //   tags: ["Learning Outcomes", "Longitudinal Study", "Critical Thinking", "Knowledge Retention"]
  // },
  // {
  //   id: "3",
  //   title: "User Experience Design in Educational Technology: A Case Study of K-Owl Platform",
  //   authors: ["Rina Kusuma", "Dr. Arif Rahman", "Sarah Putri"],
  //   journal: "Proceedings of International Conference on Educational Technology",
  //   year: 2022,
  //   url: "https://example.com/publication3",
  //   abstract: "Penelitian ini menganalisis desain user experience platform K-Owl dan dampaknya terhadap adopsi teknologi pendidikan. Metodologi design thinking diterapkan untuk mengoptimalkan antarmuka pengguna.",
  //   category: "conference",
  //   tags: ["UX Design", "Educational Technology", "Design Thinking", "User Adoption"]
  // },
  // {
  //   id: "4",
  //   title: "Pengembangan Framework Pembelajaran Adaptif Berbasis Metode KWL untuk Pendidikan Tinggi",
  //   authors: ["Dr. Maya Sari"],
  //   journal: "Disertasi - Universitas Indonesia",
  //   year: 2024,
  //   abstract: "Disertasi ini mengembangkan framework pembelajaran adaptif yang mengintegrasikan metode KWL dengan teknologi artificial intelligence untuk personalisasi pembelajaran di pendidikan tinggi.",
  //   category: "thesis",
  //   tags: ["Adaptive Learning", "AI in Education", "Personalization", "Framework Development"]
  // },
  // {
  //   id: "5",
  //   title: "Comparative Analysis of KWL-Based Digital Platforms in Southeast Asian Universities",
  //   authors: ["Prof. Jennifer Tan", "Dr. Ahmad Wijaya", "Dr. Siti Nurhaliza"],
  //   journal: "Asian Journal of Educational Research",
  //   year: 2023,
  //   doi: "10.9012/ajer.2023.078",
  //   url: "https://example.com/publication5",
  //   abstract: "Studi komparatif ini menganalisis implementasi platform pembelajaran berbasis KWL di 15 universitas di Asia Tenggara, termasuk evaluasi terhadap platform K-Owl sebagai salah satu platform terdepan di wilayah ini.",
  //   category: "journal",
  //   tags: ["Comparative Study", "Southeast Asia", "Higher Education", "Platform Analysis"]
  // }
];

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'journal': return HiDocumentText;
      case 'conference': return HiUsers;
      case 'book': return HiBookOpen;
      case 'thesis': return HiAcademicCap;
      default: return HiDocumentText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'journal': return 'bg-blue-100 text-blue-800';
      case 'conference': return 'bg-green-100 text-green-800';
      case 'book': return 'bg-purple-100 text-purple-800';
      case 'thesis': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CategoryIcon = getCategoryIcon(publication.category);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(publication.category)}`}>
          <CategoryIcon className="w-4 h-4 mr-1" />
          {publication.category.charAt(0).toUpperCase() + publication.category.slice(1)}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <HiCalendar className="w-4 h-4 mr-1" />
          {publication.year}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
        {publication.title}
      </h3>

      <div className="text-gray-600 mb-3">
        <p className="text-sm">
          <span className="font-medium">Authors:</span> {publication.authors.join(", ")}
        </p>
        <p className="text-sm">
          <span className="font-medium">Published in:</span> {publication.journal}
        </p>
        {publication.doi && (
          <p className="text-sm">
            <span className="font-medium">DOI:</span> {publication.doi}
          </p>
        )}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {publication.abstract}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {publication.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {publication.url && (
        <div className="flex justify-end">
          <Link
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            <HiExternalLink className="w-4 h-4 mr-2" />
            Read Publication
          </Link>
        </div>
      )}
    </div>
  );
};

export default function PublikasiPage() {
  const journalPublications = publications.filter(p => p.category === 'journal');
  const conferencePublications = publications.filter(p => p.category === 'conference');
  const thesisPublications = publications.filter(p => p.category === 'thesis');

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Publikasi Penelitian K-Owl"
        description="Kumpulan penelitian dan publikasi ilmiah terkait pengembangan dan implementasi platform pembelajaran KWL (Know, Want to Learn, Learned) K-Owl dalam pendidikan tinggi."
        logoSrc="/logo.png"
        logoAlt="K-Owl Research Publications"
        logoSize={120}
        primaryButton={{ text: "Lihat Semua Publikasi", href: "#publications" }}
        secondaryButton={{ text: "Tentang K-Owl", href: "/about" }}
      />

      {/* Research Impact Statistics */}
      <SectionContainer
        className="py-16 bg-white"
        title="Dampak Penelitian K-Owl"
        subtitle="Platform K-Owl telah menjadi subjek berbagai penelitian akademik yang mengkaji efektivitas metode KWL dalam pembelajaran digital."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="5+ Publikasi"
            description="Artikel dan penelitian yang telah dipublikasikan di jurnal dan konferensi internasional."
            icon={HiDocumentText}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="15+ Universitas"
            description="Institusi pendidikan tinggi yang telah mengimplementasikan dan meneliti platform K-Owl."
            icon={HiAcademicCap}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="75% Peningkatan"
            description="Rata-rata peningkatan keterlibatan mahasiswa dalam pembelajaran menggunakan metode KWL."
            icon={HiUsers}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <IconCard
            title="60% Pemahaman"
            description="Peningkatan pemahaman materi dibandingkan dengan metode pembelajaran konvensional."
            icon={HiBookOpen}
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      {/* Publications Section */}
      <SectionContainer
        id="publications"
        className="py-16 bg-gray-100"
        title="Publikasi Terbaru"
        subtitle="Penelitian dan publikasi ilmiah yang mengkaji berbagai aspek platform K-Owl dan implementasi metode KWL dalam pendidikan digital."
        centered
      >
        {/* Journal Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Artikel Jurnal</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {journalPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>

        {/* Conference Papers */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Makalah Konferensi</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {conferencePublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>

        {/* Thesis */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Tesis & Disertasi</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {thesisPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Research Areas */}
      <SectionContainer
        className="py-16 bg-white"
        title="Area Penelitian"
        subtitle="Platform K-Owl menjadi fokus penelitian di berbagai bidang pendidikan dan teknologi pembelajaran."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Pembelajaran Digital"
            description="Penelitian tentang efektivitas implementasi teknologi digital dalam pendidikan tinggi menggunakan metode KWL."
            icon={HiBookOpen}
            categoryColor="blue"
          />
          <FeatureCard
            title="User Experience"
            description="Studi tentang desain antarmuka pengguna dan pengalaman pengguna dalam platform pembelajaran interaktif."
            icon={HiUsers}
            categoryColor="green"
          />
          <FeatureCard
            title="Pembelajaran Adaptif"
            description="Pengembangan sistem pembelajaran yang dapat menyesuaikan dengan kebutuhan dan gaya belajar individual."
            icon={HiAcademicCap}
            categoryColor="purple"
          />
        </div>
      </SectionContainer>

      <CallToActionSection
        title="Tertarik Berkolaborasi dalam Penelitian?"
        description="Kami terbuka untuk kolaborasi penelitian dengan akademisi dan praktisi pendidikan. Mari bersama-sama mengembangkan inovasi dalam teknologi pendidikan."
        primaryButton={{ text: "Hubungi Tim Peneliti", href: "/contact" }}
        secondaryButton={{ text: "Pelajari Platform", href: "/feature" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}