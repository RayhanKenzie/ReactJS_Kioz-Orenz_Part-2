import { useState } from 'react'
import { Link } from 'react-router-dom'
import { infoUmum } from '../data/kiosData'
import heroBg from '../assets/kios-hero.jpg'


function Home() {
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      q: "Apakah biaya sewa sudah termasuk biaya listrik dan air?",
      a: "Biaya sewa belum termasuk listrik. Setiap kios memiliki meteran listrik mandiri daya 900 Watt (sistem token/prabayar) sehingga pemakaian lebih adil. Untuk air tanah bersih dan pemeliharaan area luar sudah termasuk dalam biaya sewa."
    },
    {
      q: "Apakah diperbolehkan menyewa untuk usaha bengkel motor/mobil?",
      a: "Mohon maaf, demi menjaga kebersihan, ketenangan lingkungan sekitar, dan keasrian ruko, kios kami tidak disewakan untuk usaha bengkel las, bengkel motor, maupun usaha sejenis yang menghasilkan polusi suara dan oli berat."
    },
    {
      q: "Bagaimana cara melakukan survey lokasi?",
      a: "Anda sangat dipersilakan melakukan survey langsung. Lokasi kami berada di Jalan Rawa Indah Raya, Depok. Silakan hubungi pemilik terlebih dahulu melalui tombol WhatsApp agar dapat kami jadwalkan pendampingan survey."
    },
    {
      q: "Bagaimana sistem pembayaran sewanya?",
      a: "Sistem sewa bisa dibayar bulanan sebesar Rp 1.500.000 atau tahunan sebesar Rp 17.000.000 (menghemat Rp 1.000.000 dibandingkan bayar bulanan). Pembayaran dilakukan di awal masa sewa setelah penandatanganan surat perjanjian sewa menyewa."
    }
  ]

  const toggleFaq = (idx) => {
    if (activeFaq === idx) {
      setActiveFaq(null)
    } else {
      setActiveFaq(idx)
    }
  }

  // Helper icons for Keunggulan
  const getKeunggulanIcon = (idx) => {
    const icons = [
      // Bus/Angkot
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>,
      // Train
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>,
      // Road
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>,
      // Building/Residential
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ]
    return icons[idx] || icons[3]
  }

  const listFasilitas = [
    {
      nama: "Kamar Mandi Dalam",
      desc: "Kamar mandi pribadi bersih tersedia di dalam setiap unit kios demi kenyamanan dan higienitas usaha Anda.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      span: "col-span-3 md:col-span-2",
      padding: "p-8",
      minHeight: "min-h-[200px]"
    },
    {
      nama: "Listrik 900 Watt",
      desc: "Setiap unit kios difasilitasi meteran listrik prabayar token mandiri.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      span: "col-span-3 md:col-span-1",
      padding: "p-6",
      minHeight: "min-h-[140px]"
    },
    {
      nama: "Sumber Air Bersih",
      desc: "Akses sumur bor air tanah lancar dan jernih untuk operasional harian.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 13c0 5-3.5 7-8 7s-8-2-8-7c0-4.3 4-8.5 8-12 4 3.5 8 7.7 8 12z" />
        </svg>
      ),
      span: "col-span-3 md:col-span-1",
      padding: "p-6",
      minHeight: "min-h-[140px]"
    },
    {
      nama: "Keamanan Terjamin",
      desc: "Lingkungan ruko yang kondusif, bersih, aman, serta terpantau bebas dari premanisme demi kenyamanan kelancaran usaha Anda.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      span: "col-span-3 md:col-span-2",
      padding: "p-8",
      minHeight: "min-h-[200px]"
    },
    {
      nama: "Halaman Parkir Luas",
      desc: "Tersedia area parkir sepeda motor yang lapang dan aman di depan kios, memudahkan para pelanggan setia untuk berkunjung langsung ke tempat usaha Anda.",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20V4h6a5 5 0 010 10H9" />
        </svg>
      ),
      span: "col-span-3 md:col-span-3",
      padding: "p-8",
      minHeight: "min-h-[160px]",
      isWide: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden text-white min-h-[550px] flex items-center">
        {/* Background Image with object-cover and object-center */}
        <img 
          src={heroBg} 
          alt="Kioz Orenz Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Overlay bg-stone-900/60 */}
        <div className="absolute inset-0 bg-stone-900/65 pointer-events-none"></div>

        {/* Decorative blob with reduced opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto w-full relative z-10 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Kolom Kiri (60%) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-600/20 text-orange-400 border border-orange-500/20 tracking-wide uppercase">
                ⚡ Lokasi Strategis di Depok
              </span>
              
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Kembangkan Bisnis <br />Anda di{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                  Kioz Orenz
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-light">
                Ruang usaha premium, bersih, dan aman di Depok. Sangat ideal untuk ekspansi bisnis kuliner, jasa, kecantikan, maupun retail di kawasan padat penduduk.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                <Link
                  to="/kios"
                  className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 cursor-pointer"
                >
                  Lihat Unit Kios
                </Link>
                <Link
                  to="/waiting-list"
                  className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/30 font-semibold px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  Gabung Waiting List
                </Link>
              </div>
            </div>

            {/* Kolom Kanan (40%) with Stats Grid */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-stone-900/80 backdrop-blur-md border border-stone-700/50 p-6 sm:p-8 rounded-3xl text-white shadow-2xl">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-orange-500 mb-6 border-b border-white/10 pb-3">
                  Informasi Utama Kios
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-orange-500">4</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Pilihan Kios</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-orange-500">Rp 1,5Jt</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Mulai per Bulan</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-orange-500">24 Jam</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Akses Angkutan</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-orange-500">900W</p>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Daya Listrik</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Keunggulan Lokasi */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Keunggulan</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-stone-900">
            Lokasi Emas untuk Usaha Anda
          </h2>
          <p className="text-stone-500 mt-3.5 leading-relaxed text-sm sm:text-base">
            Terletak strategis di Depok dengan jangkauan transportasi publik dan area pemukiman yang padat, menjamin kestabilan arus konsumen potensial Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoUmum.keunggulan.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/60 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                {getKeunggulanIcon(idx)}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 text-lg mb-1">
                  {idx === 0 && "Konektivitas Angkutan Umum"}
                  {idx === 1 && "Dekat Jalur Kereta (KRL)"}
                  {idx === 2 && "Akses Utama Kendaraan"}
                  {idx === 3 && "Dikelilingi Pemukiman Padat"}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fasilitas */}
      <section className="px-4 py-20 bg-stone-100/50 border-y border-stone-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Fasilitas</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-stone-900">
              Fasilitas Pendukung Lengkap
            </h2>
            <p className="text-stone-500 mt-3.5 leading-relaxed text-sm sm:text-base">
              Setiap unit kios telah didesain dengan fasilitas esensial lengkap yang siap pakai, tanpa memerlukan renovasi besar tambahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listFasilitas.map((item, idx) => {
              if (item.isWide) {
                return (
                  <div
                    key={idx}
                    className={`${item.span} ${item.padding} ${item.minHeight} bg-white border border-stone-200/60 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-2 max-w-2xl">
                      <h3 className="font-bold text-stone-900 text-lg">{item.nama}</h3>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              }
              return (
                <div
                  key={idx}
                  className={`${item.span} ${item.padding} ${item.minHeight} bg-white border border-stone-200/60 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between`}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-lg mb-1.5">{item.nama}</h3>
                    <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Paket Sewa */}
      <section className="px-4 py-20 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Paket Sewa</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-stone-900">
            Penawaran Harga Sewa Terbaik
          </h2>
          <p className="text-stone-500 mt-3.5 leading-relaxed text-sm sm:text-base">
            Kami menawarkan sistem sewa yang fleksibel dengan opsi pembayaran bulanan atau tahunan dengan potongan harga khusus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Per Bulan */}
          <div className="bg-white border border-stone-200/80 p-8 rounded-3xl shadow-sm flex flex-col justify-between relative hover:border-orange-300 transition duration-300">
            <div>
              <span className="bg-stone-100 text-stone-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Sewa Standar
              </span>
              <p className="text-gray-900 font-bold text-xl mt-4">Bulanan</p>
              <p className="text-stone-400 text-xs mt-1">Pembayaran sewa setiap bulan</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-stone-900">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                  }).format(infoUmum.harga.perBulan)}
                </span>
                <span className="text-stone-400 text-sm font-medium"> / bulan</span>
              </div>
              <ul className="space-y-3.5 text-stone-600 text-sm border-t border-stone-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Fleksibel untuk usaha pemula
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Deposit awal ringan
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Evaluasi usaha berkala
                </li>
              </ul>
            </div>
            <Link
              to="/kios"
              className="mt-8 block w-full text-center bg-stone-900 hover:bg-stone-800 text-white font-semibold py-3 rounded-xl transition duration-300 text-sm"
            >
              Lihat Ketersediaan Kios
            </Link>
          </div>

          {/* Per Tahun */}
          <div className="bg-white border-2 border-orange-500 p-8 rounded-3xl shadow-md flex flex-col justify-between relative hover:shadow-lg transition duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Paling Hemat
            </div>
            <div>
              <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Sewa Prioritas
              </span>
              <p className="text-gray-900 font-bold text-xl mt-4">Tahunan</p>
              <p className="text-stone-400 text-xs mt-1">Komitmen sewa jangka panjang</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-orange-600">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0
                  }).format(infoUmum.harga.perTahun)}
                </span>
                <span className="text-stone-400 text-sm font-medium"> / tahun</span>
              </div>
              <ul className="space-y-3.5 text-stone-600 text-sm border-t border-stone-100 pt-6">
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Hemat biaya sewa Rp 1.000.000
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Kepastian lokasi dalam jangka panjang
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-orange-500 font-bold text-lg">✓</span> Prioritas perpanjangan kontrak sewa
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${infoUmum.kontakWA.replace(/\D/g, '')}?text=Halo%20Kioz%20Orenz%2C%20saya%20tertarik%20menyewa%20kios%20tahunan%20sebesar%20Rp%2017%20Juta.`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition duration-300 text-sm shadow-md shadow-orange-600/10 cursor-pointer"
            >
              Hubungi Pemilik
            </a>
          </div>
        </div>

        {/* Catatan Penting */}
        <div className="mt-12 bg-amber-50 border border-amber-200/70 p-6 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-amber-900 uppercase tracking-wide">Kebijakan Jenis Usaha</p>
            <p className="text-stone-700 text-sm mt-1 leading-relaxed">
              <span className="font-semibold">Penting:</span> {infoUmum.catatan}. Kami mengutamakan ketenangan dan kebersihan bersama. Hubungi kami untuk berkonsultasi mengenai kelayakan rencana bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="px-4 py-20 bg-stone-100/50 border-t border-stone-200/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Tanya Jawab</span>
            <h2 className="text-3xl font-extrabold mt-2 text-stone-900">Pertanyaan Umum (FAQ)</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={idx} className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 font-semibold text-stone-950 flex justify-between items-center hover:bg-stone-50 transition focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-orange-600 text-xl font-bold ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-1 text-sm text-stone-500 border-t border-stone-100 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative px-4 py-20 bg-stone-900 text-white text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Siap Memulai Bisnis Anda?
          </h2>
          <p className="text-stone-400 mb-10 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Dapatkan sewa langsung tanpa perantara dengan unit kios strategis yang terawat. Hubungi pemilik sekarang via WhatsApp untuk memesan atau negosiasi sewa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/kios"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 transition-all duration-300 text-sm"
            >
              Cek Ketersediaan Kios
            </Link>
            <a
              href={`https://wa.me/${infoUmum.kontakWA.replace(/\D/g, '')}?text=Halo%20Kioz%20Orenz%2C%20saya%20tertarik%20tanya-tanya%20seputar%20sewa%20kios.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 transition-all duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.99L2 22l5.233-1.371a9.936 9.936 0 0 0 4.779 1.21h.005c5.505 0 9.989-4.478 9.99-9.984 0-2.67-1.037-5.178-2.923-7.065C17.199 2.906 14.693 2 12.012 2zm5.836 14.199c-.32.898-1.579 1.649-2.181 1.706-.554.053-1.282.08-2.079-.174-.5-.16-1.127-.404-1.928-.745-3.411-1.455-5.61-4.936-5.782-5.163-.17-.228-1.38-1.84-1.38-3.513 0-1.674.87-2.502 1.182-2.839.311-.337.678-.42.905-.42.228 0 .454.001.651.01.2.01.468-.076.732.55.264.629.905 2.203.984 2.36.079.158.132.342.027.551-.105.21-.158.342-.317.525-.158.183-.332.41-.476.549-.16.158-.328.328-.142.645.186.317.828 1.358 1.776 2.202.193.172.368.326.52.443 1.218.934 1.921.802 2.224.47.302-.332 1.306-1.517 1.654-2.033.348-.517.697-.43.15-.175.547.256 3.473 1.637 4.076 1.938.603.302.82.382.946.597.127.215.127 1.234-.193 2.132z" />
              </svg>
              Chat WhatsApp Pemilik
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home