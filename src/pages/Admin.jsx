import { useState, useEffect } from 'react'
import { kiosData } from '../data/kiosData'

function Admin() {
  const [passcode, setPasscode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [queues, setQueues] = useState([])

  // Check if session is already unlocked on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('kioz_orenz_admin_auth')
    if (sessionAuth === 'true') {
      setIsUnlocked(true)
    }
    loadQueues()
  }, [])

  // Load queue records from localStorage
  const loadQueues = () => {
    const stored = localStorage.getItem('kioz_orenz_waiting_list')
    if (stored) {
      try {
        setQueues(JSON.parse(stored))
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleVerifyPasscode = (e) => {
    e.preventDefault()
    setErrorMsg('')

    const adminPasscode = import.meta.env.VITE_ADMIN_PASSCODE
    if (passcode === adminPasscode) {
      setIsUnlocked(true)
      sessionStorage.setItem('kioz_orenz_admin_auth', 'true')
    } else {
      setErrorMsg('Passcode salah. Silakan hubungi pemilik.')
      setPasscode('')
    }
  }

  // Handle logout / lock
  const handleLock = () => {
    setIsUnlocked(false)
    sessionStorage.removeItem('kioz_orenz_admin_auth')
    setPasscode('')
  }

  // Delete individual entry
  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus antrean ini?')) {
      const updated = queues.filter((q) => q.id !== id)
      setQueues(updated)
      localStorage.setItem('kioz_orenz_waiting_list', JSON.stringify(updated))
    }
  }

  // Clear all entries
  const handleClearAll = () => {
    if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus SELURUH data antrean waiting list? Tindakan ini tidak bisa dibatalkan.')) {
      setQueues([])
      localStorage.removeItem('kioz_orenz_waiting_list')
    }
  }

  // Export to CSV Report
  const handleExportCSV = () => {
    if (queues.length === 0) return

    const headers = ['ID Antrean', 'Tanggal Terdaftar', 'Nama Lengkap', 'Nomor WA', 'Pilihan Kios', 'Lantai Kios', 'Rencana Usaha', 'Catatan']
    
    const rows = queues.map((q) => {
      const unit = kiosData.find((k) => k.id === q.unitId)
      const floor = unit ? `Lantai ${unit.lantai}` : '-'
      const dateStr = new Date(q.createdAt).toLocaleString('id-ID')
      
      return [
        q.id,
        dateStr,
        q.name,
        q.phone,
        unit ? `Unit ${unit.nomor}` : `Unit ${q.unitId}`,
        floor,
        q.businessType,
        q.notes || '-'
      ]
    })

    // Construct CSV content
    const csvContent = "\uFEFF" // Add UTF-8 BOM for Excel compatibility
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(','))].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `waiting_list_kioz_orenz_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Helper date formatter
  const formatDate = (isoString) => {
    const d = new Date(isoString)
    return d.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Metrics calculators
  const totalSubmissions = queues.length
  const floor1Count = queues.filter(q => {
    const unit = kiosData.find(k => k.id === q.unitId)
    return unit && unit.lantai === 1
  }).length
  const floor2Count = queues.filter(q => {
    const unit = kiosData.find(k => k.id === q.unitId)
    return unit && unit.lantai === 2
  }).length

  // Render Gate Screen if Locked
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-stone-200/60 p-8 rounded-3xl shadow-lg max-w-sm w-full text-center space-y-6 animate-fade-in-up">
          
          {/* Lock Icon */}
          <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">Owner Portal</h1>
            <p className="text-stone-400 text-xs mt-1.5 leading-relaxed">
              Halaman ini dilindungi. Silakan masukkan passcode admin untuk mengakses data formulir waiting list.
            </p>
          </div>

          {errorMsg && (
            <p className="text-rose-600 text-xs font-semibold bg-rose-50 border border-rose-100 p-2.5 rounded-xl flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMsg}
            </p>
          )}

          <form onSubmit={handleVerifyPasscode} className="space-y-4">
            <input
              type="password"
              placeholder="Masukkan Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-center text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition font-mono tracking-widest"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-850 text-white font-bold py-3 rounded-xl transition text-sm cursor-pointer"
            >
              Buka Kunci
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Render Dashboard if Unlocked
  return (
    <div className="min-h-screen bg-[#FFFBF5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white border border-stone-200/60 p-6 rounded-3xl shadow-sm">
          <div>
            <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Laporan Pemilik</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 text-stone-900">
              Dashboard Waiting List
            </h1>
            <p className="text-stone-400 text-xs mt-1">Kelola data peminat sewa Kioz Orenz secara terpadu.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              disabled={queues.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ekspor CSV (Excel)
            </button>
            <button
              onClick={handleLock}
              className="bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Kunci Portal
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card Total */}
          <div className="bg-white border border-stone-200/60 p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Total Pendaftar</p>
              <p className="text-3xl font-extrabold text-stone-900 mt-2">{totalSubmissions}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>

          {/* Floor 1 Interests */}
          <div className="bg-white border border-stone-200/60 p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Minat Lantai 1</p>
              <p className="text-3xl font-extrabold text-stone-900 mt-2">{floor1Count}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <span className="font-extrabold text-lg">L1</span>
            </div>
          </div>

          {/* Floor 2 Interests */}
          <div className="bg-white border border-stone-200/60 p-6 rounded-3xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Minat Lantai 2</p>
              <p className="text-3xl font-extrabold text-stone-900 mt-2">{floor2Count}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <span className="font-extrabold text-lg">L2</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-stone-200/60 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="px-6 py-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-stone-900">Database Antrean</h2>
                <p className="text-stone-400 text-xs mt-0.5">Seluruh data pendaftar kios terdaftar saat ini.</p>
              </div>
              {queues.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  Hapus Semua Data
                </button>
              )}
            </div>

            {queues.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-stone-50 text-stone-400 text-[10px] font-bold uppercase tracking-wider border-b border-stone-100">
                      <th className="py-4 px-6">Tanggal</th>
                      <th className="py-4 px-6">Nama</th>
                      <th className="py-4 px-6">WhatsApp</th>
                      <th className="py-4 px-6">Unit</th>
                      <th className="py-4 px-6">Rencana Usaha</th>
                      <th className="py-4 px-6">Catatan</th>
                      <th className="py-4 px-6 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {queues.map((q) => {
                      const unit = kiosData.find((k) => k.id === q.unitId)
                      const unitLabel = unit ? `Kios Unit ${unit.nomor} (Lantai ${unit.lantai})` : `Kios Unit ${q.unitId}`
                      const waLink = `https://wa.me/${q.phone.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(q.name)}%2C%20ini%20pemilik%20Kioz%20Orenz.%20Saya%20menerima%20pengajuan%20waiting%20list%20Anda%20untuk%20${encodeURIComponent(unitLabel)}.`
                      return (
                        <tr key={q.id} className="hover:bg-stone-50/50 transition">
                          <td className="py-4.5 px-6 text-xs whitespace-nowrap text-stone-400">
                            {formatDate(q.createdAt)}
                          </td>
                          <td className="py-4.5 px-6 font-bold text-stone-900">
                            {q.name}
                          </td>
                          <td className="py-4.5 px-6 text-xs">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 hover:text-orange-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span className="shrink-0 font-mono">{q.phone}</span>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </td>
                          <td className="py-4.5 px-6">
                            <span className="bg-orange-50 text-orange-850 text-[10px] font-extrabold px-2 py-0.5 rounded whitespace-nowrap">
                              {unit ? `Unit ${unit.nomor} (L${unit.lantai})` : `Unit ${q.unitId}`}
                            </span>
                          </td>
                          <td className="py-4.5 px-6 font-medium text-stone-800 text-xs">
                            {q.businessType}
                          </td>
                          <td className="py-4.5 px-6 text-xs text-stone-400 max-w-[150px] truncate" title={q.notes}>
                            {q.notes || '-'}
                          </td>
                          <td className="py-4.5 px-6 text-center">
                            <button
                              onClick={() => handleDelete(q.id)}
                              className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl text-xs font-bold transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center border border-stone-100 mb-4 text-stone-300">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <p className="text-stone-850 font-bold text-sm">Belum Ada Pendaftar</p>
                <p className="text-stone-400 text-xs mt-1 max-w-xs mx-auto">
                  Registrasi baru yang dikirimkan oleh calon penyewa di formulir waiting list akan terdata secara lokal di sini.
                </p>
              </div>
            )}
          </div>

          {/* Footer simulation notice */}
          <div className="p-5 bg-stone-50 border-t border-stone-100 flex items-center gap-3">
            <svg className="w-5 h-5 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[10px] text-stone-400 leading-normal">
              Data di atas bersumber dari browser <code className="bg-white px-1 py-0.5 rounded border font-mono">localStorage</code>. Anda dapat mengunduh laporan di atas sebagai file CSV yang dapat langsung dibuka menggunakan Microsoft Excel atau Google Sheets.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Admin
