"use client";
import React from "react";
import { HiMail, HiPhone, HiLocationMarker, HiClock } from "react-icons/hi";
import HeroSection from "@/components/ui/HeroSection";
import SectionContainer from "@/components/ui/SectionContainer";
import IconCard from "@/components/ui/IconCard";
import Footer from "@/components/ui/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection
        title="Hubungi Kami"
        description="Kami siap membantu Anda dengan segala pertanyaan mengenai K-Owl. Jangan ragu untuk menghubungi tim kami melalui berbagai channel yang tersedia."
        logoSrc="/logo.png"
        logoAlt="K-Owl Logo"
        logoSize={120}
        primaryButton={{ text: "Mulai Chat", href: "#contact-form" }}
        secondaryButton={{ text: "FAQ", href: "/help" }}
      />

      <SectionContainer
        className="py-16 bg-white"
        title="Informasi Kontak"
        subtitle="Berikut adalah berbagai cara untuk menghubungi tim K-Owl. Pilih yang paling sesuai dengan kebutuhan Anda."
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <IconCard
            title="Email Support"
            description="support@k-owl.edu"
            icon={HiMail}
            iconBgColor="bg-gradient-to-br from-blue-500 to-purple-600"
          />
          <IconCard
            title="Phone Support"
            description="+62 21-1234-5678"
            icon={HiPhone}
            iconBgColor="bg-gradient-to-br from-green-500 to-teal-600"
          />
          <IconCard
            title="Alamat Kantor"
            description="Jl. Pendidikan No. 123, Jakarta Selatan"
            icon={HiLocationMarker}
            iconBgColor="bg-gradient-to-br from-red-500 to-pink-600"
          />
          <IconCard
            title="Jam Operasional"
            description="Senin - Jumat: 08:00 - 17:00 WIB"
            icon={HiClock}
            iconBgColor="bg-gradient-to-br from-yellow-500 to-orange-600"
          />
        </div>
      </SectionContainer>

      <SectionContainer className="py-16 bg-gray-100">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Kirim Pesan</h2>
            <form id="contact-form" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama depan"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama belakang"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="nama@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subjek
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih subjek pesan</option>
                  <option value="general">Pertanyaan Umum</option>
                  <option value="technical">Bantuan Teknis</option>
                  <option value="feedback">Feedback & Saran</option>
                  <option value="partnership">Kerjasama</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                ></textarea>
              </div>

              <div className="flex items-start">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="privacy" className="ml-3 text-sm text-gray-600">
                  Saya setuju dengan{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Kebijakan Privasi
                  </a>{" "}
                  dan{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Syarat & Ketentuan
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Informasi Tambahan</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Response Time</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kami berkomitmen untuk merespon setiap pertanyaan dalam waktu maksimal 24 jam pada hari kerja.
                  Untuk pertanyaan teknis yang kompleks, mungkin memerlukan waktu hingga 2-3 hari kerja.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Support Channels</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Email: Untuk pertanyaan detail dan dokumentasi</li>
                  <li>• Telepon: Untuk bantuan urgent dan real-time</li>
                  <li>• Form Online: Untuk feedback dan saran pengembangan</li>
                  <li>• Chat: Untuk bantuan cepat (dalam pengembangan)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-4">FAQ Populer</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Bagaimana cara reset password?</p>
                    <p className="text-sm text-gray-600">Klik "Lupa Password" di halaman login dan ikuti instruksi.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Apakah K-Owl gratis?</p>
                    <p className="text-sm text-gray-600">Ya, K-Owl gratis untuk institusi pendidikan.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Bagaimana cara membuat course baru?</p>
                    <p className="text-sm text-gray-600">Login sebagai dosen, lalu pilih "Buat Course Baru" di dashboard.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Butuh Bantuan Segera?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Untuk masalah teknis yang urgent, hubungi hotline kami.
                </p>
                <a
                  href="tel:+6221-1234-5678"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                >
                  Hubungi Hotline
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </div>
  );
}