import { useState } from 'react'
import { Link } from 'react-router-dom'
import { kiosData, infoUmum } from '../data/kiosData'

function KiosList() {
  const [floorFilter, setFloorFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  // Helper to parse size string and calculate numeric area
  const getArea = (ukuran) => {
    try {
      const cleaned = ukuran.replace('m²', '').trim()
      const parts = cleaned.split('×')
      if (parts.length === 2) {
        const w = parseFloat(parts[0].replace(',', '.').trim())
        const h = parseFloat(parts[1].replace(',', '.').trim())
        return w * h
      }
    } catch (e) {
      console.error(e)
    }
    return 0
  }

  // Filter & Sort logic
  const filteredKios = kiosData.filter((kios) => {
    if (floorFilter === 'all') return true
    return kios.lantai.toString() === floorFilter
  })

  const sortedKios = [...filteredKios].sort((a, b) => {
    if (sortBy === 'size-asc') {
      return getArea(a.ukuran) - getArea(b.ukuran)
    }
    if (sortBy === 'size-desc') {
      return getArea(b.ukuran) - getArea(a.ukuran)
    }
    return 0 // default sorting (by id)
  })

  // Pre-filled WA Message Generator
  const getWAMessage = (kios) => {
    const text = `Halo Kioz Orenz, saya ingin bertanya lebih lanjut tentang sewa Kios Unit ${kios.id} (Lantai ${kios.lantai}, Ukuran ${kios.ukuran}). Apakah unit ini siap disurvey?`
    return `https://wa.me/${infoUmum.kontakWA.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Katalog Unit</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-stone-900">
            Daftar Unit Kios di Kioz Orenz
          </h1>
          <p className="text-stone-500 mt-3 text-sm sm:text-base leading-relaxed">
            Pilih unit kios yang paling sesuai dengan kebutuhan usaha Anda. Tersedia unit di lantai 1 (akses langsung jalan) dan lantai 2 (lebih tenang & sejuk).
          </p>
        </div>

        {/* Filter and Sort Panel */}
        <div className="bg-white border border-stone-200/60 rounded-2xl p-5 shadow-sm mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in-up">
          {/* Floor Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider mr-2">Pilih Lantai:</span>
            <button
              onClick={() => setFloorFilter('all')}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                floorFilter === 'all'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/10'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              Semua Lantai
            </button>
            <button
              onClick={() => setFloorFilter('1')}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                floorFilter === '1'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/10'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              Lantai 1 (Utama)
            </button>
            <button
              onClick={() => setFloorFilter('2')}
              className={`px-4.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                floorFilter === '2'
                  ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/10'
                  : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
              }`}
            >
              Lantai 2 (Balkon)
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3.5 border-t border-stone-100 pt-4 md:border-none md:pt-0">
            <span className="text-stone-400 text-xs font-bold uppercase tracking-wider shrink-0">Urutkan Ukuran:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-semibold px-3 py-2 rounded-xl text-xs border-none focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="default">Default (ID Unit)</option>
              <option value="size-asc">Terkecil ke Terbesar</option>
              <option value="size-desc">Terbesar ke Terkecil</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedKios.map((kios, idx) => {
            const isLarge = kios.ukuran.includes('4') // detect 3.5x4
            return (
              <div
                key={kios.id}
                className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 flex flex-col justify-between animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                
                {/* SVG Blueprint Mock Illustration */}
                <div className="h-48 bg-stone-50 border-b border-stone-100 flex items-center justify-center p-6 relative overflow-hidden group">
                  {/* Grid overlay background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
                  
                  {/* Outer blueprint border */}
                  <div className="relative w-full max-w-[280px] h-32 border-2 border-dashed border-orange-300 bg-orange-50/20 rounded-lg p-2.5 flex flex-col justify-between shadow-inner">
                    {/* Dimension tags */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 border border-stone-200 rounded-md text-[9px] font-bold text-stone-500 tracking-wider">
                      {isLarge ? "LEBAR: 3.5m / PANJANG: 4m" : "LEBAR: 3.5m / PANJANG: 3.5m"}
                    </div>

                    <div className="flex justify-between items-start">
                      {/* Room identification */}
                      <span className="text-[11px] font-extrabold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                        UNIT {kios.id}
                      </span>
                      {/* Bathroom Mock */}
                      <div className="w-10 h-10 border border-stone-300 bg-stone-100 rounded flex items-center justify-center text-[8px] font-bold text-stone-500">
                        KM/WC
                      </div>
                    </div>

                    {/* Rolling door indicator */}
                    <div className="w-full flex items-center justify-center gap-1 mt-auto">
                      <div className="h-1 bg-orange-600 rounded flex-1"></div>
                      <span className="text-[7.5px] font-extrabold text-orange-600 tracking-widest uppercase">
                        ROLLING DOOR
                      </span>
                      <div className="h-1 bg-orange-600 rounded flex-1"></div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status & Floor Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        {kios.status}
                      </span>
                      <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Lantai {kios.lantai}
                      </span>
                    </div>

                    {/* Title Specs */}
                    <h3 className="font-extrabold text-xl text-stone-900 mb-1">
                      Kios Unit {kios.id} ({kios.ukuran})
                    </h3>
                    <p className="text-stone-400 text-xs mb-5">
                      Lokasi: {infoUmum.lokasi} (Lantai {kios.lantai})
                    </p>

                    {/* Facilities Checklist */}
                    <ul className="grid grid-cols-2 gap-3 text-xs text-stone-600 mb-6 pb-6 border-b border-stone-100">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold text-sm">✓</span> Kamar Mandi Dalam
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold text-sm">✓</span> Listrik 900 Watt
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold text-sm">✓</span> Air Tanah Bersih
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold text-sm">✓</span> Akses Parkir Motor
                      </li>
                    </ul>

                    {/* Price Showcase */}
                    <div className="flex items-baseline justify-between mb-6">
                      <div>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Biaya Sewa</p>
                        <p className="text-2xl font-extrabold text-orange-600 mt-0.5">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0
                          }).format(infoUmum.harga.perBulan)}
                          <span className="text-stone-400 text-xs font-normal"> / bln</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase tracking-wide inline-block">
                          Opsi Tahunan
                        </p>
                        <p className="text-sm font-semibold text-stone-700 mt-1">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0
                          }).format(infoUmum.harga.perTahun)}
                          <span className="text-stone-400 text-[10px] font-normal"> / thn</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link
                      to={`/waiting-list?unit=${kios.id}`}
                      className="bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-semibold py-3 rounded-xl text-center text-xs transition duration-300 cursor-pointer"
                    >
                      Daftar Waiting List
                    </Link>
                    <a
                      href={getWAMessage(kios)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl text-center text-xs transition duration-300 shadow-md shadow-orange-600/10 cursor-pointer"
                    >
                      Hubungi Pemilik
                    </a>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Empty state filter */}
        {sortedKios.length === 0 && (
          <div className="text-center bg-white border border-stone-200/60 p-12 rounded-3xl shadow-sm">
            <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-stone-850 font-bold text-lg">Unit Tidak Ditemukan</p>
            <p className="text-stone-400 text-sm mt-1">Silakan ganti opsi filter lantai Anda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default KiosList