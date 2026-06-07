export const infoUmum = {
  nama: "Kioz Orenz",
  lokasi: "Jalan Rawa Indah Raya, Depok",
  kontakWA: import.meta.env.VITE_OWNER_WHATSAPP || "085711404401",
  harga: {
    perBulan: 1500000,
    perTahun: 17000000,
  },
  fasilitas: ["Kamar mandi", "Listrik 900 Watt", "Parkiran", "Air tanah", "Lokasi aman"],
  keunggulan: ["Dekat Angkot 05 (24 jam)", "Dekat KRL Jakarta–Bogor", "Dekat Jalan Raya Citayam", "Dekat pemukiman & perumahan cluster"],
  catatan: "Tidak disewakan untuk bengkel",
}

export const kiosData = [
  { id: 1, nomor: 1, ukuran: "3,5 × 3,5 m²", lantai: 1, status: "tersedia" },
  { id: 2, nomor: 2, ukuran: "3,5 × 3,5 m²", lantai: 1, status: "tersedia" },
  { id: 3, nomor: 3, ukuran: "3,5 × 4 m²", lantai: 1, status: "tersedia", catatan: "Di dalam unit terdapat tangga akses ke lantai 2" },
  { id: 4, nomor: 4, ukuran: "3,5 × 4 m²", lantai: 1, status: "tersedia", catatan: "Rolling door + tambahan pintu & jendela kaca di bagian depan" },
  { id: 5, nomor: 1, ukuran: "3,5 × 3,5 m²", lantai: 2, status: "tersedia" },
  { id: 6, nomor: 2, ukuran: "3,5 × 3,5 m²", lantai: 2, status: "tersedia" },
  { id: 7, nomor: 3, ukuran: "3,5 × 4 m²", lantai: 2, status: "tersedia", catatan: "Di dalam unit terdapat tangga akses ke lantai 1" },
  { id: 8, nomor: 4, ukuran: "3,5 × 4 m²", lantai: 2, status: "tersedia" },
]