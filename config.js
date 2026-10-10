/* Ubah data usaha, warna, dan daftar menu di file ini. Panduan lengkap: README.md. */
window.WARTEG_CONFIG = {
  business: {
    name: 'Warteg Bogor',
    brandName: 'Warteg',
    city: 'Bogor',
    region: 'Jawa Barat',
    demoMode: true,
    whatsapp: '6281517382018', // Format internasional untuk tautan WhatsApp.
    whatsappDisplay: '0815 1738 2018',
    address: '',
    hours: 'Setiap hari, 07.00–21.00 WIB',
    instagram: '', // Username Instagram, tanpa @. Kosong = tampil “Akun belum tersedia”.
    mapsUrl: '', // Isi tautan lokasi yang tepat. Kosong = peta area kota, bukan alamat warteg.
    hero: {
      title: ['Makan enak.', 'Nggak ribet.'],
      description: 'Nasi, lauk, sayur, sambal. Pilih yang kamu suka, kami siapkan untuk harimu.',
      image: 'assets/nasi-rames-hero.jpg',
      alt: 'Ilustrasi nasi rames dengan aneka lauk, sayuran, tempe, dan kerupuk',
      position: '50% 52%',
      featuredProductId: 'nasi-ayam'
    },
    about: {
      title: 'Tempat singgah\nuntuk makan sehari-hari.',
      paragraphs: [
        'Di sela pekerjaan, setelah perjalanan, atau saat ingin makan tanpa repot — kadang yang dicari hanya sepiring nasi dengan lauk yang akrab.',
        'Itulah gagasan Warteg Bogor. Pilih paket nasi atau susun lauk sesuai selera, lalu tentukan mau diambil sendiri atau diantar. Sederhana, seperti makan sehari-hari seharusnya.'
      ],
      image: 'assets/nasi-campur-support.jpg',
      alt: 'Ilustrasi nasi campur dengan lauk ayam, tempe, sayur, dan sambal'
    }
  },
  theme: {
    cream: '#fff8ed',
    orange: '#b64520',
    orangeHover: '#923718',
    brown: '#33231a',
    muted: '#735942',
    line: '#ddcdb8',
    surface: '#f3eadc',
    paper: '#fffdf8'
  },
  products: [
    { id: 'nasi-ayam', name: 'Nasi ayam goreng', category: 'Makanan', price: 22000, unit: 'paket', description: 'Nasi, ayam, tempe, sayur, dan sambal.', image: 'assets/ayam-goreng.jpg', alt: 'Ilustrasi ayam goreng kremes dengan sambal dan lalapan', position: '50% 65%' },
    { id: 'nasi-telur', name: 'Nasi telur balado', category: 'Makanan', price: 17000, unit: 'paket', description: 'Nasi, telur balado, tempe, dan sayur.', image: 'assets/telur-balado.jpg', alt: 'Ilustrasi telur dengan bumbu balado merah', position: '50% 50%' },
    { id: 'nasi-ikan', name: 'Nasi ikan goreng', category: 'Makanan', price: 23000, unit: 'paket', description: 'Nasi, ikan goreng, sayur, dan sambal.', image: 'assets/ikan-goreng.jpg', alt: 'Ilustrasi ikan goreng berbumbu kunyit', position: '50% 50%' },
    { id: 'sayur-lodeh', name: 'Sayur lodeh', category: 'Makanan', price: 6000, unit: 'porsi', description: 'Sayuran dengan kuah santan gurih.', image: 'assets/sayur-lodeh.jpg', alt: 'Ilustrasi sayur lodeh berkuah santan', position: '50% 50%' },
    { id: 'tempe-orek', name: 'Tempe orek', category: 'Makanan', price: 5000, unit: 'porsi', description: 'Tempe berbumbu kecap, teman nasi hangat.', image: 'assets/tempe-orek.jpg', alt: 'Ilustrasi tempe orek berbumbu kecap', position: '50% 60%' },
    { id: 'bakwan', name: 'Dijual musang', category: 'Camilan', price: 3000, unit: 'buah', description: 'Produk contoh.', image: 'assets/dijual-musang.png', alt: 'Foto orang berkacamata sedang tersenyum', position: '50% 50%' },
    { id: 'es-teh', name: 'Es teh manis', category: 'Minuman', price: 5000, unit: 'gelas', description: 'Teh manis dengan es batu.', image: 'assets/es-teh.jpg', alt: 'Ilustrasi dua gelas es teh dengan es batu', position: '50% 50%' },
    { id: 'es-jeruk', name: 'Es jeruk', category: 'Minuman', price: 7000, unit: 'gelas', description: 'Minuman jeruk segar dengan es.', image: 'assets/es-jeruk.jpg', alt: 'Ilustrasi minuman jeruk untuk dibawa pulang', position: '50% 65%' }
  ],
  benefits: [
    { title: 'Pilihan lauk rumahan', description: 'Ada paket nasi, sayur, dan lauk tambahan. Pilih kombinasi yang cocok untukmu.' },
    { title: 'Pesan sesuai pilihanmu', description: 'Tulis catatan seperti sambal dipisah. Ketersediaan dikonfirmasi saat pemesanan.' },
    { title: 'Makan di mana saja', description: 'Ambil sendiri atau tanyakan layanan antar. Kemasan dan ongkir dapat disesuaikan.' }
  ],
  testimonials: {
    enabled: true,
    isExample: true,
    items: [
      { quote: 'Bisa pilih lauk yang lagi diinginkan. Pesanan tinggal dicek di WhatsApp, lalu ambil saat sudah siap.', name: 'Pelanggan contoh', detail: 'Ambil sendiri' },
      { quote: 'Senang ada pilihan nasi, sayur, dan minuman dalam satu pesanan. Catatan sambal terpisah juga gampang ditulis.', name: 'Pelanggan contoh', detail: 'Pesan untuk dibawa pulang' }
    ]
  }
};
