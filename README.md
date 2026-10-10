# Template Warteg Bogor

Website HTML, CSS, dan JavaScript untuk UMKM makanan. Tidak membutuhkan framework, instalasi paket, akun, atau backend. Semua foto dan font sudah tersimpan secara lokal.

## Menjalankan

Cara paling mudah: buka **index.html** di Chrome, Edge, Firefox, atau Safari. Navigasi, menu, filter, dan keranjang dapat digunakan langsung.

Untuk pratinjau melalui server lokal, jika Node.js sudah tersedia:

```powershell
node server.mjs
```

Buka **http://127.0.0.1:3000**. Tekan `Ctrl+C` di terminal untuk menghentikan server. Server ini hanya menerima koneksi dari komputer sendiri. Jika port digunakan, pilih port lain:

```powershell
$env:PORT = '3001'
node server.mjs
```

## Mengganti data usaha

Semua data utama ada di **config.js**, dalam `window.WARTEG_CONFIG`.

| Bagian | Isi yang diubah |
| --- | --- |
| `business.name` | Nama lengkap usaha untuk judul, pesan, dan footer. |
| `business.brandName` | Tulisan utama pada logo tipografi. |
| `business.city`, `business.region` | Kota dan provinsi. |
| `business.whatsapp` | Nomor WhatsApp asli, memakai kode negara, tanpa tanda tambah. Untuk Indonesia: `62` diikuti nomor tanpa `0` awal. Format `08...` juga dinormalisasi menjadi `628...`. |
| `business.whatsappDisplay` | Nomor yang ditampilkan, boleh memakai spasi. Kosong berarti memakai nomor di atas. |
| `business.address` | Alamat lengkap yang benar. |
| `business.hours` | Jam buka yang benar. |
| `business.instagram` | Username Instagram tanpa `@`; kosong atau tidak valid menampilkan “Akun belum tersedia”. |
| `business.mapsUrl` | Tautan Google Maps lokasi usaha yang tepat. |
| `business.hero` | Dua baris judul, deskripsi, foto, alt, posisi foto, dan ID paket unggulan. |
| `business.about` | Judul, paragraf cerita, foto pendukung, dan alt. |
| `theme` | Warna krem, oranye, cokelat, teks pendukung, garis, dan permukaan. |
| `benefits` | Judul dan penjelasan layanan/keunggulan yang sesuai kenyataan. |

**Sebelum dipakai untuk usaha nyata:** isi nomor dan alamat asli, periksa harga serta jam buka, ganti cerita contoh, dan atur `business.demoMode: false`. Jangan hanya mematikan label contoh saat datanya masih fiktif. Google Maps awal hanya menunjuk area Bogor, bukan lokasi warteg tertentu.

Jika nomor WhatsApp masih kosong, tombol kontak menampilkan informasi bahwa nomor belum tersedia. Formulir checkout tetap bisa membuat rincian pesanan untuk disalin. Setelah nomor yang valid diisi, tombol checkout membuka WhatsApp dengan penerima dan teks pesanan. Pengunjung tetap harus menekan **Kirim** di WhatsApp; website tidak mengirim pesan otomatis.

## Mengganti menu dan foto

Daftar `products` berisi delapan menu contoh. Setiap menu mempunyai ID unik, nama, kategori, harga angka, unit, deskripsi, path foto, alt, dan posisi pemotongan foto. Gunakan kategori `Makanan`, `Camilan`, atau `Minuman` agar masuk filter yang sesuai.

```javascript
{
  id: 'menu-baru',
  name: 'Nama menu',
  category: 'Makanan',
  price: 18000,
  unit: 'porsi',
  description: 'Isi atau deskripsi singkat yang benar.',
  image: 'assets/foto-menu-sendiri.jpg',
  alt: 'Deskripsi foto makanan untuk pembaca layar',
  position: '50% 50%',
  available: true
}
```

`available: false` menonaktifkan tombol tambah dan menampilkan status belum tersedia. ID menu yang dihapus atau habis tidak dipulihkan dari keranjang lama. Batas jumlah adalah 99 per menu. Jika mengganti ID menu unggulan, sesuaikan `business.hero.featuredProductId`.

Letakkan foto sendiri di `assets/`. Disarankan foto lebar sekitar 1600 px untuk hero dan sekitar 800 px untuk menu. Ukuran gambar menu dibuat seragam oleh CSS; `position` mengatur bagian foto yang dipertahankan. JPG atau WebP yang dikompres lebih ringan daripada foto langsung dari kamera. Isi `alt` dengan deskripsi hidangannya.

Foto awal merupakan **ilustrasi**, bukan foto Warteg Bogor. Atribusi lengkap ada dalam **ASSETS.md** dan kredit foto yang bisa dibuka di footer. Semua lisensi gambar tetap harus dihormati. Jika mengganti foto, sesuaikan `assets/photo-credits.js` dengan sumber dan lisensi baru. Kredit untuk foto lama yang tidak dipakai akan otomatis disembunyikan. Jika memakai foto milik sendiri, boleh mengosongkan array kredit, setelah memastikan tidak ada foto Commons tersisa. Lisensi font ada dalam `assets/fonts/`.

## Testimoni

Bagian `testimonials` mendukung:

- `enabled: false` untuk menyembunyikan bagian testimoni.
- `isExample: true` untuk menampilkan label jelas bahwa ulasan adalah contoh.
- `items` untuk isi ulasan, nama, dan konteks pesanan.

Gunakan `isExample: false` hanya setelah mengganti seluruh isinya dengan ulasan nyata yang diizinkan untuk ditampilkan. Template tidak menyertakan rating, sertifikasi, atau klaim halal.

## Fitur pesanan

- Cari dan saring menu, tambah produk dari hero atau menu.
- Ubah jumlah melalui tombol atau input angka; hapus satu menu atau semua menu.
- Keranjang tersimpan di `localStorage`, dan ikut berubah bila dibuka pada tab lain dengan origin yang sama.
- Isi nama; pilih ambil sendiri atau diantar. Alamat hanya diwajibkan untuk pengantaran.
- Pesan WhatsApp memuat nama, cara menerima, alamat bila diantar, tiap menu, jumlah, harga satuan, subtotal, dan catatan.
- Ongkir belum dimasukkan ke subtotal; ketersediaan dan biaya antar dikonfirmasi melalui percakapan.

Data nama, alamat, dan catatan tidak disimpan dalam localStorage. Jika browser melarang penyimpanan, keranjang tetap berfungsi selama halaman terbuka. Penyimpanan pada URL `file://` mengikuti kebijakan browser; gunakan server lokal agar origin penyimpanannya konsisten. Halaman tidak menyimpan pesanan di server dan tidak menerima pembayaran.

## Struktur file

```text
index.html                 Halaman dan struktur semantik
styles.css                 Desain, responsif, dan reduced motion
config.js                  Data usaha, warna, menu, dan testimoni
app.js                     Pencarian, keranjang, formulir, WhatsApp
server.mjs                 Server lokal opsional, tanpa dependensi
README.md                  Panduan ini
ASSETS.md                  Sumber, pembuat, dan lisensi foto
RESEARCH.md                Riset desain dan batas pemeriksaan
DESIGN.md                  Warna, tipografi, jarak, dan aturan desain
PRODUCT.md                 Lingkup template dan data contoh
.impeccable/
  design.json              Metadata dan contoh komponen desain
  surfaces/index-html.md   Catatan arah halaman untuk pengembangan
assets/
  *.jpg                    Sepuluh foto ilustrasi lokal
  favicon.svg              Ikon W asli berbasis geometri sederhana
  photo-credits.js          Data atribusi yang dibaca halaman
  photo-sources.json        Metadata foto
  fonts/                   Font lokal dan berkas lisensi OFL
```

Folder `output/`, `.playwright-cli/`, dan `assets/.research/` merupakan bahan kerja/pemeriksaan dan tidak dimasukkan ke ZIP. Dari `.impeccable/`, hanya metadata desain dan catatan arah halaman di atas yang disertakan. Keduanya tidak dibutuhkan saat menjalankan website dan tidak perlu diunggah ke hosting.

## Pemeriksaan yang dilakukan

Chrome menjalankan 26 pemeriksaan fungsi: pencarian, kategori, tambah/jumlah/hapus, subtotal, pemulihan keranjang, nama dan alamat wajib, pilihan penerimaan, salin rincian, serta penyusunan tautan WhatsApp. Tautan WhatsApp dicegat dalam pemeriksaan; tidak ada pesan dikirim. Buka langsung `index.html` juga diperiksa untuk pemuatan aset, menu, pencarian, dan tambah pesanan.

Tampilan diperiksa pada desktop 1440 px, HP 390 px, dan lebar referensi 1917 px. Tidak ada halaman melebar ke samping pada delapan lebar dari 320 sampai 1917 px. Setelah review, awal menu diringkas dan keadaan Instagram kosong/valid/tidak valid diperiksa. Pemeriksaan ini tidak menyatakan sertifikasi aksesibilitas atau pengujian semua browser.

## Mengunggah ke hosting

Unggah `index.html`, `styles.css`, `config.js`, `app.js`, dan folder `assets/` dengan susunan yang sama. Jangan ikut mengunggah folder bahan kerja. Semua path relatif sehingga template juga dapat dijalankan dalam subfolder. HTTPS disarankan agar fitur clipboard tersedia. Fitur pesanan tetap bekerja melalui WhatsApp tanpa backend.

### GitHub Pages

Workflow `.github/workflows/deploy-pages.yml` menerbitkan website saat branch `main` diperbarui. Pada pengaturan repository, **Settings → Pages → Source** harus memakai **GitHub Actions**. Workflow juga bisa dijalankan dari tab **Actions** melalui **Run workflow**.

`.github/scripts/prepare-pages.mjs` menyiapkan hanya HTML, CSS, JavaScript, foto, font, dan lisensi aset untuk website. Dokumentasi dan bahan pemeriksaan tetap berada di repository; folder riset sementara tidak ikut diunggah. Mengedit `config.js` di GitHub lalu commit ke `main` akan memperbarui situs melalui workflow ini.
