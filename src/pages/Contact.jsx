import { infoUmum } from '../data/kiosData'
import mapImage from '../assets/map.jpg'


function Contact() {
  const waLink = `https://wa.me/${infoUmum.kontakWA.replace(/\D/g, '')}?text=Halo%20Kioz%20Orenz%2C%20saya%20ingin%20berdiskusi%20mengenai%20proses%20penyewaan%20kios.`
  const mapSearchLink = `https://maps.app.goo.gl/EZ6ZAqkyLeFkdt6HA`

  return (
    <div className="min-h-screen bg-[#FCFBF4] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Hubungi Kami</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-stone-900">
            Informasi Kontak dan Lokasi
          </h1>
          <p className="text-stone-500 mt-3 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan mengenai harga, ketersediaan unit, atau ingin menjadwalkan survey lokasi? Jangan ragu untuk menghubungi kami langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-white border border-stone-200/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 animate-fade-in-up">
            <h2 className="text-xl font-extrabold text-stone-900 pb-4 border-b border-stone-100">
              Detail Kontak
            </h2>

            {/* List of details */}
            <div className="space-y-5 text-sm text-stone-600">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-600">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-0.5">Alamat Kios</h3>
                  <p className="leading-relaxed">{infoUmum.lokasi}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-600">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-0.5">Nomor WhatsApp</h3>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition font-medium">
                    {infoUmum.kontakWA}
                  </a>
                </div>
              </div>

              {/* Email Mock */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-600">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-0.5">Email Pertanyaan</h3>
                  <a href="mailto:kiozorenz@gmail.com" className="hover:text-orange-600 transition">
                    kiozorenz@gmail.com
                  </a>
                </div>
              </div>

              {/* Operational Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-orange-600">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-0.5">Jam Operasional</h3>
                  <p>Senin - Minggu: 08:00 - 21:00 WIB</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call-to-Action */}
            <div className="pt-4 border-t border-stone-100">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition cursor-pointer text-sm"
              >
                <div className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <img src="../WhatsApp.webp" alt="whatsapp logo" />
                </div>
                Chat via WhatsApp
              </a>
            </div>
          </div>

          {/* SVG Map Column */}
          <div className="md:col-span-7 bg-white border border-stone-200/60 p-6 rounded-3xl shadow-sm space-y-6 flex flex-col justify-between h-full min-h-[460px] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900">Peta Lokasi</h2>
                <p className="text-stone-400 text-xs mt-0.5">Letak Kioz Orenz, Rawa Indah, Depok</p>
              </div>

              {/* Google Maps Screenshot */}
              <div className="h-64 border border-stone-200/85 rounded-2xl overflow-hidden relative shadow-sm group">
                <img 
                  src={mapImage} 
                  alt="Peta Lokasi Kioz Orenz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-stone-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase backdrop-blur-xs">
                  Satelit Google Maps
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={mapSearchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-stone-200 hover:border-orange-500 hover:text-orange-600 text-stone-700 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition cursor-pointer text-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Buka Petunjuk Arah Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact