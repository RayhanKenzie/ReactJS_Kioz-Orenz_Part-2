import { Link } from 'react-router-dom'
import { infoUmum } from '../data/kiosData'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-900 text-white pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-800">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/public/kioz-orenz-logo.png" alt="Logo" className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Kioz <span className="text-orange-500">Orenz</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mt-2">
              Penyedia sewa kios terpercaya di Depok dengan letak strategis, fasilitas lengkap, dan aksesibilitas tinggi untuk mendukung kesuksesan bisnis Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-500 mb-6">Navigasi</h3>
            <ul className="grid grid-cols-1 gap-3.5">
              <li>
                <Link to="/" className="text-stone-300 hover:text-white transition text-sm">Home</Link>
              </li>
              <li>
                <Link to="/kios" className="text-stone-300 hover:text-white transition text-sm">Daftar Kios</Link>
              </li>
              <li>
                <Link to="/waiting-list" className="text-stone-300 hover:text-white transition text-sm">Waiting List</Link>
              </li>
              <li>
                <Link to="/kontak" className="text-stone-300 hover:text-white transition text-sm">Hubungi Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Address & Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-orange-500 mb-6">Lokasi & Kontak</h3>
            <ul className="flex flex-col gap-4 text-sm text-stone-300">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{infoUmum.lokasi}</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href={`https://wa.me/${infoUmum.kontakWA.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  WhatsApp: {infoUmum.kontakWA}
                </a>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Respon Cepat: Setiap Hari 08:00 - 21:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-stone-500 gap-4">
          <p>© {currentYear} {infoUmum.nama}. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-400 cursor-default">Fasilitas Lengkap</span>
            <span className="hover:text-stone-400 cursor-default">Tanpa Perantara</span>
            <span className="hover:text-stone-400 cursor-default">S&K Berlaku</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer