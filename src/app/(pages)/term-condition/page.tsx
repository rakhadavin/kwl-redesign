"use client";
import React from "react";
import { HiShieldCheck, HiDocumentText, HiUserGroup, HiInformationCircle, HiLockClosed } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import IconCard from "@/components/ui/IconCard";
import CallToActionSection from "@/components/ui/CallToActionSection";
import Footer from "@/components/ui/Footer";

const TermSection: React.FC<{ title: string; children: React.ReactNode; icon?: React.ComponentType<any> }> = ({
  title,
  children,
  icon: Icon = HiDocumentText
}) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="prose prose-lg max-w-none text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default function TermConditionPage() {
  const lastUpdated = "15 Januari 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Syarat & Ketentuan Penggunaan"
        description="Ketentuan dan persyaratan penggunaan platform K-Owl yang mengatur hak dan kewajiban pengguna dalam mengakses dan memanfaatkan layanan pembelajaran digital kami."
        logoSrc="/logo.png"
        logoAlt="K-Owl Terms and Conditions"
        logoSize={120}
        primaryButton={{ text: "Mulai Membaca", href: "#terms" }}
        secondaryButton={{ text: "Kebijakan Privasi", href: "/privacy-policy" }}
      />

      {/* Important Notice */}
      <SectionContainer className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              {/* <HiExclamationTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" /> */}
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pemberitahuan Penting</h3>
                <p className="text-yellow-700">
                  Dengan menggunakan platform K-Owl, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini.
                  Harap baca dengan seksama sebelum menggunakan layanan kami. Dokumen ini terakhir diperbarui pada <strong>{lastUpdated}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Quick Overview */}
      <SectionContainer
        className="py-16 bg-gray-100"
        title="Ringkasan Ketentuan"
        subtitle="Poin-poin utama dari syarat dan ketentuan penggunaan platform K-Owl untuk kemudahan pemahaman."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <IconCard
            title="Akun Pengguna"
            description="Pengguna wajib membuat akun dengan informasi yang akurat dan menjaga kerahasiaan kredensial login."
            icon={HiUserGroup}
            iconBgColor="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <IconCard
            title="Penggunaan Platform"
            description="Platform hanya untuk keperluan pendidikan dan penelitian akademik yang sah dan tidak melanggar hukum."
            icon={HiShieldCheck}
            iconBgColor="bg-gradient-to-br from-green-500 to-green-600"
          />
          <IconCard
            title="Privasi & Data"
            description="Kami berkomitmen melindungi data pribadi pengguna sesuai dengan kebijakan privasi yang berlaku."
            icon={HiLockClosed}
            iconBgColor="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>
      </SectionContainer>

      {/* Terms Content */}
      <SectionContainer
        id="terms"
        className="py-16 bg-white"
        title="Syarat dan Ketentuan Lengkap"
      >
        <div className="max-w-4xl mx-auto">

          <TermSection title="1. Definisi dan Interpretasi" icon={HiInformationCircle}>
            <p className="mb-4">
              Dalam syarat dan ketentuan ini, kecuali konteks mengharuskan sebaliknya:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>"Platform"</strong> merujuk pada aplikasi web K-Owl dan semua layanan terkait</li>
              <li><strong>"Pengguna"</strong> merujuk pada individu atau institusi yang menggunakan platform</li>
              <li><strong>"Konten"</strong> merujuk pada semua materi pembelajaran, data, dan informasi di platform</li>
              <li><strong>"Layanan"</strong> merujuk pada semua fitur dan fungsi yang disediakan oleh K-Owl</li>
              <li><strong>"Kami"</strong> merujuk pada tim pengembang dan operator platform K-Owl</li>
            </ul>
          </TermSection>

          <TermSection title="2. Penerimaan Ketentuan" icon={HiDocumentText}>
            <p className="mb-4">
              Dengan mengakses atau menggunakan platform K-Owl, Anda menyatakan bahwa:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Anda telah membaca, memahami, dan menyetujui syarat dan ketentuan ini</li>
              <li>Anda memiliki kapasitas hukum untuk terikat dalam perjanjian ini</li>
              <li>Penggunaan Anda terhadap platform mematuhi semua hukum yang berlaku</li>
              <li>Anda akan menggunakan platform hanya untuk tujuan yang sah dan pendidikan</li>
            </ul>
          </TermSection>

          <TermSection title="3. Pendaftaran dan Akun Pengguna" icon={HiUserGroup}>
            <h4 className="text-lg font-semibold mb-3">3.1 Persyaratan Pendaftaran</h4>
            <p className="mb-4">
              Untuk menggunakan platform K-Owl, Anda harus:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Berusia minimal 17 tahun atau memiliki persetujuan wali</li>
              <li>Terdaftar sebagai mahasiswa, dosen, atau peneliti di institusi pendidikan</li>
              <li>Memberikan informasi yang akurat dan lengkap saat pendaftaran</li>
              <li>Memverifikasi email dan identitas sesuai prosedur yang ditetapkan</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3 mt-6">3.2 Keamanan Akun</h4>
            <p className="mb-4">Pengguna bertanggung jawab untuk:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Menjaga kerahasiaan password dan informasi login</li>
              <li>Menggunakan password yang kuat dan unik</li>
              <li>Segera melaporkan jika terjadi penggunaan akun yang tidak sah</li>
              <li>Memperbarui informasi profil agar tetap akurat</li>
            </ul>
          </TermSection>

          <TermSection title="4. Penggunaan Platform yang Diizinkan" icon={HiShieldCheck}>
            <p className="mb-4">Platform K-Owl dapat digunakan untuk:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Kegiatan pembelajaran dan pengajaran dalam konteks akademik</li>
              <li>Penelitian ilmiah di bidang pendidikan dan teknologi pembelajaran</li>
              <li>Pengembangan kurikulum dan metodologi pembelajaran</li>
              <li>Kolaborasi akademik antar institusi pendidikan</li>
            </ul>

            <h4 className="text-lg font-semibold mb-3 mt-6">Penggunaan yang Dilarang</h4>
            <p className="mb-4">Pengguna dilarang:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Menggunakan platform untuk tujuan komersial tanpa izin tertulis</li>
              <li>Menyebarkan konten yang melanggar hukum, tidak etis, atau menyinggung</li>
              <li>Mencoba mengakses sistem atau data tanpa otorisasi</li>
              <li>Mengganggu operasi platform atau mengganggu pengguna lain</li>
              <li>Menyalahgunakan data atau informasi yang diperoleh dari platform</li>
            </ul>
          </TermSection>

          <TermSection title="5. Konten dan Hak Kekayaan Intelektual" icon={HiLockClosed}>
            <h4 className="text-lg font-semibold mb-3">5.1 Konten Platform</h4>
            <p className="mb-4">
              Semua konten di platform K-Owl, termasuk namun tidak terbatas pada teks, gambar,
              video, software, dan materi pembelajaran lainnya, dilindungi oleh hak cipta dan
              hak kekayaan intelektual lainnya.
            </p>

            <h4 className="text-lg font-semibold mb-3 mt-6">5.2 Konten Pengguna</h4>
            <p className="mb-4">Dengan mengunggah konten ke platform, pengguna:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Menjamin bahwa konten tersebut tidak melanggar hak pihak ketiga</li>
              <li>Memberikan izin kepada K-Owl untuk menggunakan konten tersebut dalam konteks platform</li>
              <li>Tetap mempertahankan hak cipta atas konten yang diunggah</li>
              <li>Bertanggung jawab atas semua konten yang dibagikan</li>
            </ul>
          </TermSection>

          <TermSection title="6. Privasi dan Perlindungan Data" icon={HiLockClosed}>
            <p className="mb-4">
              K-Owl berkomitmen untuk melindungi privasi dan data pribadi pengguna.
              Pengumpulan, penggunaan, dan perlindungan data diatur dalam Kebijakan Privasi
              yang merupakan bagian integral dari syarat dan ketentuan ini.
            </p>

            <h4 className="text-lg font-semibold mb-3 mt-6">Data yang Dikumpulkan</h4>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Informasi profil dan akademik pengguna</li>
              <li>Data pembelajaran dan progress akademik</li>
              <li>Log aktivitas dan interaksi dengan platform</li>
              <li>Data teknis untuk meningkatkan kualitas layanan</li>
            </ul>
          </TermSection>

          <TermSection title="7. Pembatasan Tanggung Jawab">
            <p className="mb-4">
              Platform K-Owl disediakan "sebagaimana adanya" dan kami tidak memberikan
              jaminan bahwa layanan akan selalu tersedia, bebas dari error, atau memenuhi
              kebutuhan spesifik pengguna.
            </p>

            <p className="mb-4">
              Kami tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Kerugian akibat gangguan teknis atau downtime sistem</li>
              <li>Kehilangan data akibat kesalahan pengguna atau force majeure</li>
              <li>Keakuratan konten yang dibuat atau dibagikan oleh pengguna lain</li>
              <li>Konsekuensi dari penggunaan platform di luar ketentuan yang berlaku</li>
            </ul>
          </TermSection>

          <TermSection title="8. Perubahan Ketentuan" icon={HiDocumentText}>
            <p className="mb-4">
              Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu.
              Perubahan akan diberitahukan kepada pengguna melalui:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Notifikasi di platform</li>
              <li>Email ke alamat yang terdaftar</li>
              <li>Pengumuman di halaman utama</li>
            </ul>
            <p className="mb-4">
              Penggunaan berkelanjutan platform setelah perubahan ketentuan dianggap
              sebagai persetujuan terhadap perubahan tersebut.
            </p>
          </TermSection>

          <TermSection title="9. Penghentian Layanan">
            <p className="mb-4">
              Kami berhak menghentikan atau menangguhkan akses pengguna jika:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Terjadi pelanggaran terhadap syarat dan ketentuan</li>
              <li>Aktivitas yang merugikan platform atau pengguna lain</li>
              <li>Permintaan dari otoritas yang berwenang</li>
              <li>Penghentian operasi platform secara keseluruhan</li>
            </ul>
          </TermSection>

          <TermSection title="10. Hukum yang Berlaku" icon={HiShieldCheck}>
            <p className="mb-4">
              Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia.
              Setiap sengketa yang timbul akan diselesaikan melalui mediasi atau
              pengadilan yang berwenang di Jakarta.
            </p>
          </TermSection>

          <TermSection title="11. Kontak" icon={HiInformationCircle}>
            <p className="mb-4">
              Untuk pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> legal@k-owl.edu</p>
              <p><strong>Alamat:</strong> Gedung Fakultas Ilmu Komputer UI, Depok 16424</p>
              <p><strong>Telepon:</strong> +62-21-1234-5678</p>
            </div>
          </TermSection>

        </div>
      </SectionContainer>

      <CallToActionSection
        title="Masih Ada Pertanyaan?"
        description="Tim legal kami siap membantu menjawab pertanyaan Anda mengenai syarat dan ketentuan penggunaan platform K-Owl."
        primaryButton={{ text: "Hubungi Tim Legal", href: "/contact" }}
        secondaryButton={{ text: "FAQ", href: "/faq" }}
        buttonSize="large"
      />

      <Footer />
    </div>
  );
}