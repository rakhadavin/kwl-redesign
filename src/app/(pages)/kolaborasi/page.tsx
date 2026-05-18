"use client";
import React from "react";
import Link from "next/link";
import { HiMail, HiPhone, HiLocationMarker, HiAcademicCap, HiOfficeBuilding, HiUsers, HiLightBulb, HiDocumentText, HiGlobeAlt } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import FeatureCard from "@/components/ui/FeatureCard";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

interface Partner {
  id: string;
  name: string;
  type: 'university' | 'research' | 'industry' | 'government';
  description: string;
  logo?: string;
  website?: string;
  collaboration: string[];
  since: number;
}

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone?: string;
  expertise: string[];
}

const partners: Partner[] = [
  {
    id: "1",
    name: "Universitas Indonesia",
    type: "university",
    description: "Kolaborasi dalam pengembangan metodologi pembelajaran digital dan implementasi platform K-Owl di Fakultas Ilmu Komputer.",
    website: "https://ui.ac.id",
    collaboration: ["Research", "Implementation", "Student Exchange"],
    since: 2021
  },
  {
    id: "2",
    name: "Institut Teknologi Bandung",
    type: "university",
    description: "Kerjasama dalam penelitian artificial intelligence untuk pembelajaran adaptif dan personalisasi konten KWL.",
    website: "https://itb.ac.id",
    collaboration: ["AI Research", "Technology Development", "Publication"],
    since: 2022
  },
  {
    id: "3",
    name: "Pusat Penelitian Informatika LIPI",
    type: "research",
    description: "Kemitraan dalam pengembangan standar teknologi pendidikan dan evaluasi efektivitas metode KWL secara nasional.",
    collaboration: ["Standards Development", "National Evaluation", "Research Grant"],
    since: 2020
  },
  {
    id: "4",
    name: "Microsoft Education",
    type: "industry",
    description: "Kolaborasi teknologi cloud computing dan integrasi platform pembelajaran dengan Azure Educational Services.",
    website: "https://education.microsoft.com",
    collaboration: ["Cloud Infrastructure", "Technology Integration", "Training"],
    since: 2023
  },
  {
    id: "5",
    name: "Kemendikbudristek RI",
    type: "government",
    description: "Kerjasama dalam program digitalisasi pendidikan tinggi dan implementasi Kampus Merdeka dengan metode KWL.",
    collaboration: ["Policy Development", "National Implementation", "Funding"],
    since: 2021
  }
];

const contactPersons: ContactPerson[] = [
  {
    name: "Dr. Ahmad Wijaya, M.Kom",
    role: "Principal Investigator & Project Director",
    email: "ahmad.wijaya@k-owl.edu",
    phone: "+62-21-1234-5678",
    expertise: ["Educational Technology", "KWL Methodology", "Digital Learning"]
  },
  {
    name: "Prof. Siti Nurhaliza, Ph.D",
    role: "Research Collaboration Coordinator",
    email: "siti.nurhaliza@k-owl.edu",
    phone: "+62-21-1234-5679",
    expertise: ["Learning Analytics", "Data Science", "Educational Research"]
  },
  {
    name: "Dr. Budi Santoso, M.T",
    role: "Technology Partnership Manager",
    email: "budi.santoso@k-owl.edu",
    expertise: ["Software Architecture", "System Integration", "Cloud Computing"]
  },
  {
    name: "Rina Kusuma, M.Pd",
    role: "Academic Partnership Specialist",
    email: "rina.kusuma@k-owl.edu",
    expertise: ["Curriculum Development", "Faculty Training", "Academic Program"]
  }
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'university': return HiAcademicCap;
      case 'research': return HiLightBulb;
      case 'industry': return HiOfficeBuilding;
      case 'government': return HiGlobeAlt;
      default: return HiUsers;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'university': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-green-100 text-green-800';
      case 'industry': return 'bg-purple-100 text-purple-800';
      case 'government': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TypeIcon = getTypeIcon(partner.type);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(partner.type)}`}>
          <TypeIcon className="w-4 h-4 mr-1" />
          {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
        </div>
        <span className="text-sm text-gray-500">Since {partner.since}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {partner.name}
      </h3>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {partner.description}
      </p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Collaboration Areas:</h4>
        <div className="flex flex-wrap gap-2">
          {partner.collaboration.map((area, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {partner.website && (
        <div className="flex justify-end">
          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            <HiGlobeAlt className="w-4 h-4 mr-2" />
            Visit Website
          </Link>
        </div>
      )}
    </div>
  );
};

const ContactCard: React.FC<{ contact: ContactPerson }> = ({ contact }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {contact.name}
      </h3>
      <p className="text-blue-600 font-medium mb-4">{contact.role}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <HiMail className="w-4 h-4 mr-3 text-gray-400" />
          <a href={`mailto:${contact.email}`} className="hover:text-blue-600 transition-colors">
            {contact.email}
          </a>
        </div>
        {contact.phone && (
          <div className="flex items-center text-gray-600">
            <HiPhone className="w-4 h-4 mr-3 text-gray-400" />
            <a href={`tel:${contact.phone}`} className="hover:text-blue-600 transition-colors">
              {contact.phone}
            </a>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Expertise:</h4>
        <div className="flex flex-wrap gap-2">
          {contact.expertise.map((skill, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function KolaborasiPage() {
  const universityPartners = partners.filter(p => p.type === 'university');
  const researchPartners = partners.filter(p => p.type === 'research');
  const industryPartners = partners.filter(p => p.type === 'industry');
  const governmentPartners = partners.filter(p => p.type === 'government');

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Kolaborasi & Kemitraan"
        description="K-Owl terbuka untuk kolaborasi dengan berbagai institusi pendidikan, lembaga penelitian, industri, dan pemerintah dalam mengembangkan inovasi teknologi pendidikan berbasis metode KWL."
        logoSrc="/logo.png"
        logoAlt="K-Owl Collaboration"
        logoSize={120}
        primaryButton={{ text: "Hubungi Kami", href: "#contact" }}
        secondaryButton={{ text: "Lihat Mitra", href: "#partners" }}
      />

      {/* Collaboration Benefits */}
      <SectionContainer
        className="py-16 bg-white"
        title="Manfaat Kolaborasi"
        subtitle="Bergabunglah dengan ekosistem K-Owl dan dapatkan akses ke teknologi terdepan, data penelitian, dan jaringan akademik yang luas."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <IconCard
            title="Akses Data Penelitian"
            description="Dapatkan akses ke dataset komprehensif dan hasil penelitian terbaru dalam bidang educational technology."
            icon={HiDocumentText}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="Jaringan Akademik"
            description="Terhubung dengan peneliti dan akademisi terkemuka di bidang teknologi pendidikan dan learning analytics."
            icon={HiAcademicCap}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="Teknologi Platform"
            description="Akses ke platform K-Owl dan teknologi pendukung untuk implementasi di institusi mitra."
            icon={HiLightBulb}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <IconCard
            title="Publikasi Bersama"
            description="Kesempatan untuk publikasi bersama di jurnal internasional dan konferensi akademik terkemuka."
            icon={HiUsers}
            iconBgColor="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      {/* Collaboration Types */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Jenis Kolaborasi"
        subtitle="Kami menyediakan berbagai bentuk kolaborasi yang dapat disesuaikan dengan kebutuhan dan kapasitas mitra."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            title="Kolaborasi Penelitian"
            description="Kerjasama dalam proyek penelitian, pengembangan metodologi, dan publikasi ilmiah di bidang educational technology."
            icon={HiLightBulb}
            categoryColor="blue"
          />
          <FeatureCard
            title="Implementasi Platform"
            description="Bantuan implementasi platform K-Owl di institusi mitra dengan dukungan training dan customization."
            icon={HiAcademicCap}
            categoryColor="green"
          />
          <FeatureCard
            title="Pengembangan Teknologi"
            description="Kolaborasi dalam pengembangan fitur baru, integrasi sistem, dan inovasi teknologi pembelajaran."
            icon={HiOfficeBuilding}
            categoryColor="purple"
          />
          <FeatureCard
            title="Program Akademik"
            description= "Kerjasama dalam pengembangan kurikulum, program pelatihan, dan sertifikasi untuk pendidik dan mahasiswa."
            icon={HiDocumentText}
            categoryColor= "orange"
          />
        </div>
      </SectionContainer>

      {/* Current Partners */}
      <SectionContainer
        id="partners"
        className="py-16 bg-white"
        title="Mitra Saat Ini"
        subtitle="K-Owl telah menjalin kemitraan strategis dengan berbagai institusi terkemuka untuk mengembangkan ekosistem pembelajaran digital yang komprehensif."
        centered
      >
        {/* University Partners */}
        {universityPartners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Mitra Universitas</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {universityPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Research Partners */}
        {researchPartners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Mitra Penelitian</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {researchPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Industry Partners */}
        {industryPartners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Mitra Industri</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {industryPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        )}

        {/* Government Partners */}
        {governmentPartners.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-left">Mitra Pemerintah</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {governmentPartners.map((partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        )}
      </SectionContainer>

      {/* Contact Team */}
      <SectionContainer
        id="contact"
        className="py-16 bg-gray-100"
        title="Tim Kolaborasi"
        subtitle="Hubungi tim kami untuk memulai diskusi kolaborasi yang sesuai dengan kebutuhan dan tujuan institusi Anda."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactPersons.map((contact, index) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      </SectionContainer>

      {/* How to Collaborate */}
      <SectionContainer
        className="py-16 bg-white"
        title="Cara Memulai Kolaborasi"
        subtitle="Proses kolaborasi yang terstruktur untuk memastikan kemitraan yang produktif dan berkelanjutan."
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Initial Contact</h3>
              <p className="text-gray-600">
                Hubungi tim kami melalui email atau form kontak untuk memulai diskusi awal tentang potensi kolaborasi.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proposal Review</h3>
              <p className="text-gray-600">
                Tim kami akan mengevaluasi proposal kolaborasi dan mengidentifikasi area kerjasama yang paling sesuai.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agreement & Launch</h3>
              <p className="text-gray-600">
                Setelah mencapai kesepakatan, kami akan memulai implementasi kolaborasi dengan timeline yang jelas.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      <CallToActionSection
        title="Siap Memulai Kolaborasi?"
        description="Mari bergabung dengan ekosistem K-Owl dan bersama-sama mengembangkan masa depan teknologi pendidikan yang lebih baik dan inovatif."
        primaryButton={{ text: "Kirim Proposal", href: "/contact" }}
        secondaryButton={{ text: "Unduh Brochure", href: "/dataset" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}