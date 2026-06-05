import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { kiosData } from '../data/kiosData'

function WaitingList() {
  const [searchParams] = useSearchParams()
  const presetUnit = searchParams.get('unit') || ''

  // Form states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedUnit, setSelectedUnit] = useState(presetUnit)
  const [businessType, setBusinessType] = useState('')
  const [notes, setNotes] = useState('')
  
  // Modal state
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success', // 'success' | 'error'
    title: '',
    message: ''
  })

  // Auto-select unit if preset in query params change
  useEffect(() => {
    if (presetUnit) {
      setSelectedUnit(presetUnit)
    }
  }, [presetUnit])

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()

    // Client-Side Validation
    if (!name.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Input Tidak Valid',
        message: 'Nama Lengkap wajib diisi.'
      })
      return
    }
    if (!phone.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Input Tidak Valid',
        message: 'Nomor WhatsApp wajib diisi.'
      })
      return
    }
    if (!/^\d+$/.test(phone.trim().replace('+', ''))) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Nomor Tidak Valid',
        message: 'Nomor WhatsApp harus berupa angka valid.'
      })
      return
    }
    if (!selectedUnit) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Unit Belum Dipilih',
        message: 'Silakan pilih unit kios yang ingin Anda sewa.'
      })
      return
    }
    if (!businessType.trim()) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Bidang Usaha Kosong',
        message: 'Rencana bidang usaha wajib diisi.'
      })
      return
    }

    try {
      // Load current queues from localStorage
      const stored = localStorage.getItem('kioz_orenz_waiting_list')
      let queues = []
      if (stored) {
        queues = JSON.parse(stored)
      }

      // Create new queue item
      const newItem = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        unitId: parseInt(selectedUnit),
        businessType: businessType.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString()
      }

      // Save back to LocalStorage
      queues = [newItem, ...queues]
      localStorage.setItem('kioz_orenz_waiting_list', JSON.stringify(queues))

      const unit = kiosData.find((k) => k.id === parseInt(selectedUnit))
      const unitLabel = unit ? `Kios Unit ${unit.nomor} (Lantai ${unit.lantai})` : `Kios Unit ${selectedUnit}`

      // Trigger Success Modal
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Pendaftaran Berhasil!',
        message: `Pendaftaran waiting list atas nama ${name} untuk ${unitLabel} telah sukses terkirim. Pemilik Kioz Orenz akan segera menghubungi Anda.`
      })

      // Reset Form Fields
      setName('')
      setPhone('')
      setSelectedUnit('')
      setBusinessType('')
      setNotes('')

    } catch (error) {
      console.error(error)
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Kendala Sistem',
        message: 'Gagal mengirim pendaftaran karena kendala teknis lokal browser.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <span className="text-orange-600 font-bold text-xs uppercase tracking-widest">Registrasi</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 text-stone-900">
            Formulir Waiting List Kios
          </h1>
          <p className="text-stone-500 mt-3 text-sm sm:text-base leading-relaxed">
            Daftarkan rencana bisnis Anda ke dalam antrean prioritas Kioz Orenz. Pemilik akan langsung menghubungi nomor WhatsApp Anda setelah unit siap diproses.
          </p>
        </div>

        {/* Centered Form Card */}
        <div className="bg-white border border-stone-200/60 p-6 sm:p-10 rounded-3xl shadow-sm max-w-xl mx-auto animate-fade-in-up">
          <h2 className="text-xl font-extrabold text-stone-900 mb-6 pb-2 border-b border-stone-100 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Isi Data Pengajuan Sewa
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Nama Lengkap <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
              />
            </div>

            {/* WA Phone */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Nomor WhatsApp <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: 0857xxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Kios Unit Select */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Pilih Unit Kios <span className="text-orange-500">*</span>
              </label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition cursor-pointer"
              >
                <option value="">-- Pilih Unit Kios --</option>
                {kiosData.map((kios) => (
                  <option key={kios.id} value={kios.id}>
                    Unit {kios.nomor} (Lantai {kios.lantai} - {kios.ukuran})
                  </option>
                ))}
              </select>
            </div>

            {/* Rencana Bidang Usaha */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Rencana Bidang Usaha <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Kuliner Ayam Goreng, Laundry, Pulsa"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                placeholder="Tulis pesan atau pertanyaan khusus lainnya jika ada..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition resize-none"
              ></textarea>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-orange-600/10 transition cursor-pointer text-sm"
            >
              Kirim Pendaftaran
            </button>
          </form>
        </div>

      </div>

      {/* Screen-Wide Modal Popup Alert */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-100 flex flex-col items-center text-center">
            
            {/* Modal Icon */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
              modal.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {modal.type === 'success' ? (
                // Checkmark
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                // Cross / Warning
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* Modal Title */}
            <h3 className="text-xl font-extrabold text-stone-900 mb-2">
              {modal.title}
            </h3>

            {/* Modal Message */}
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              {modal.message}
            </p>

            {/* Modal Action Button */}
            <button
              onClick={() => setModal(prev => ({ ...prev, isOpen: false }))}
              className={`w-full font-bold py-3 rounded-xl transition text-sm cursor-pointer shadow-sm ${
                modal.type === 'success' 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/10' 
                  : 'bg-stone-900 hover:bg-stone-850 text-white'
              }`}
            >
              Tutup
            </button>
            
          </div>
        </div>
      )}

    </div>
  )
}

export default WaitingList