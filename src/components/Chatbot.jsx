import { useState, useEffect, useRef } from 'react'
import { infoUmum } from '../data/kiosData'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Selamat datang di Kioz Orenz! Saya adalah asisten AI yang siap membantu menjawab pertanyaan Anda seputar fasilitas, lokasi, harga sewa, dan informasi lainnya tentang ruko kami. Ada yang ingin Anda tanyakan?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const suggestedQuestions = [
    'Berapa harga sewa?',
    'Fasilitasnya apa saja?',
    'Dimana lokasi kios?',
    'Apakah boleh untuk bengkel?',
    'Bagaimana cara survey lokasi?'
  ]

  // Prompt engineering system instructions
  const systemContext = `
Informasi Valid Kioz Orenz (JANGAN MENGARANG LOKASI/HARGA):
- Nama Properti: Kioz Orenz
- Lokasi Alamat: Jalan Rawa Indah Raya, Depok
- Kontak WhatsApp Pemilik: 085711404401
- Harga Sewa: Rp 1.500.000 / bulan atau Rp 17.000.000 / tahun (hemat Rp 1.000.000 dibandingkan bayar bulanan).
- Detail 4 Unit Kios:
  - Unit 1: Lantai 1, ukuran 3.5 × 3.5 m² (Tersedia)
  - Unit 2: Lantai 2, ukuran 3.5 × 3.5 m² (Tersedia)
  - Unit 3: Lantai 1, ukuran 3.5 × 4 m² (Tersedia)
  - Unit 4: Lantai 2, ukuran 3.5 × 4 m² (Tersedia)
- Fasilitas: Kamar mandi di dalam tiap unit kios, Daya listrik 900 Watt (sistem pulsa/token mandiri), Area parkiran motor, Air tanah bersih, Lokasi aman.
- Keunggulan Lokasi: Dekat jalur Angkot 05 aktif 24 jam, Dekat rel KRL Jakarta–Bogor (dekat Stasiun Depok / Stasiun Citayam), Dekat Jalan Raya Citayam, Dekat pemukiman warga & perumahan cluster padat penduduk.
- Catatan Kebijakan: TIDAK disewakan untuk usaha bengkel motor/mobil maupun las demi menjaga kebersihan & kenyamanan warga sekitar.
- Cara Sewa: Hubungi pemilik via WA di 085711404401 atau isi form waiting list di website.

Tugas Anda:
1. Anda adalah Kioz Orenz AI Assistant yang ramah, profesional, dan informatif.
2. Jawab pertanyaan user berikut ini secara singkat, padat, dan akurat berdasarkan data di atas.
3. Gunakan Bahasa Indonesia yang baik dan komunikatif.
4. Jika user bertanya hal di luar data di atas, jawab dengan ramah bahwa Anda hanya memiliki informasi seputar kios Kioz Orenz.
5. Jika ditanya cara menyewa, sarankan menghubungi WhatsApp pemilik di 085711404401.

Pertanyaan User: `

  // Mock reply generator (fallback engine if API key is missing or calls fail)
  const getMockReply = (query) => {
    const q = query.toLowerCase()
    
    if (q.includes('harga') || q.includes('biaya') || q.includes('bayar') || q.includes('sewa') || q.includes('tarif') || q.includes('bulan') || q.includes('tahun')) {
      return `Harga sewa di Kioz Orenz adalah Rp 1.500.000 per bulan atau Rp 17.000.000 per tahun. Sewa tahunan lebih hemat Rp 1.000.000! Harga belum termasuk biaya listrik token.`
    }
    if (q.includes('bengkel') || q.includes('las') || q.includes('motor') || q.includes('mobil') || q.includes('oli')) {
      return `Mohon maaf, demi menjaga kebersihan lingkungan dan ketenangan warga sekitar, Kios Orenz tidak disewakan untuk usaha bengkel motor, mobil, las, atau usaha sejenisnya yang menghasilkan suara bising dan limbah oli.`
    }
    if (q.includes('fasilitas') || q.includes('dapat apa') || q.includes('listrik') || q.includes('air') || q.includes('wc') || q.includes('toilet') || q.includes('kamar mandi') || q.includes('parkir')) {
      return `Setiap kios dilengkapi fasilitas mandiri berupa: kamar mandi dalam, daya listrik 900 Watt (sistem token prabayar), air tanah bersih gratis, area parkiran motor, serta jaminan lingkungan aman.`
    }
    if (q.includes('lokasi') || q.includes('alamat') || q.includes('dimana') || q.includes('depok') || q.includes('posisi') || q.includes('peta') || q.includes('jalan')) {
      return `Kioz Orenz terletak di Jalan Rawa Indah Raya, Depok. Lokasi sangat strategis dekat dengan jalur Angkot 05 (aktif 24 jam), rel KRL Jakarta-Bogor (dekat Stasiun Depok/Citayam), Jalan Raya Citayam, serta dikelilingi kompleks perumahan cluster padat penduduk.`
    }
    if (q.includes('kontak') || q.includes('wa') || q.includes('nomor') || q.includes('pemilik') || q.includes('telepon') || q.includes('hubung')) {
      return `Anda bisa menghubungi pemilik Kioz Orenz langsung melalui WhatsApp di nomor 085711404401 untuk bertanya-tanya atau bernegosiasi seputar unit.`
    }
    if (q.includes('ukuran') || q.includes('lantai') || q.includes('dimensi') || q.includes('tipe') || q.includes('luas') || q.includes('meter')) {
      return `Terdapat 4 unit kios total:\n- Unit 1: Lantai 1, ukuran 3.5 × 3.5 m²\n- Unit 2: Lantai 2, ukuran 3.5 × 3.5 m²\n- Unit 3: Lantai 1, ukuran 3.5 × 4 m²\n- Unit 4: Lantai 2, ukuran 3.5 × 4 m²\nSemua unit saat ini berstatus tersedia.`
    }
    if (q.includes('survey') || q.includes('lihat') || q.includes('kunjung')) {
      return `Tentu, Anda dipersilakan melakukan survey lokasi. Harap hubungi pemilik terlebih dahulu melalui WhatsApp di 085711404401 untuk membuat janji temu.`
    }

    return `Terima kasih atas pertanyaan Anda! Untuk detail teknis sewa, negosiasi harga, dan survey unit, Anda dapat berdiskusi langsung dengan pemilik melalui WhatsApp di 085711404401.`
  }

  // Handle message sending
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    const timeString = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

    // Add user message
    const userMsg = { sender: 'user', text: text, time: timeString }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Call API (or fallback to Mock)
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    let botReplyText = ''

    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: systemContext + text
                    }
                  ]
                }
              ]
            })
          }
        )

        if (!response.ok) {
          throw new Error('API Request failed')
        }

        const data = await response.json()
        botReplyText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      } catch (err) {
        console.error('Gemini API Error, falling back to local mock.', err)
        botReplyText = getMockReply(text)
      }
    } else {
      // Delay simulating network call
      await new Promise(resolve => setTimeout(resolve, 800))
      botReplyText = getMockReply(text)
    }

    setIsTyping(false)
    setMessages(prev => [...prev, {
      sender: 'bot',
      text: botReplyText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }])
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shadow-xl shadow-orange-600/30 hover:scale-105 transition-all duration-300 focus:outline-none cursor-pointer"
        aria-label="Tanya AI Chatbot"
      >
        {isOpen ? (
          // Close Icon
          <svg className="w-6 h-6 animate-fade-in-up" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat bubble icon with sparkles
          <div className="relative">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 z-50 w-auto sm:w-96 h-[480px] bg-white border border-stone-200 shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-stone-900 text-white px-5 py-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-white leading-none">Orenz AI Assistant</h3>
                <span className="text-[10px] text-emerald-400 font-bold tracking-wider flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  ONLINE
                </span>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white transition focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-tr-none'
                      : 'bg-white border border-stone-200 text-stone-850 rounded-tl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-stone-400 mt-1 font-semibold">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Animation State */}
            {isTyping && (
              <div className="flex flex-col items-start mr-auto max-w-[85%]">
                <div className="px-4 py-3 rounded-2xl bg-white border border-stone-200 rounded-tl-none shadow-xs flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-stone-300 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-2.5 h-2.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Prompts & Input Area */}
          <div className="p-3 bg-white border-t border-stone-200 shrink-0">
            {/* Suggested Chips (Horizontal Scroll) */}
            <div className="flex gap-2 overflow-x-auto pb-2.5 mb-2.5 no-scrollbar scroll-smooth">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-stone-50 border border-stone-200 hover:border-orange-500 hover:text-orange-600 text-[11px] font-bold text-stone-600 px-3 py-1.5 rounded-full shrink-0 transition cursor-pointer whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Text input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Tulis pertanyaan Anda..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center shrink-0 transition shadow-md shadow-orange-600/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <svg className="w-4 h-4 fill-current transform rotate-90" viewBox="0 0 24 24">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
