---
name: "Warteg Bogor"
description: "Papan makan siang hangat untuk memilih menu dan menyusun pesanan."
colors:
  cream: "#fff8ed"
  orange: "#b64520"
  orange-hover: "#923718"
  brown: "#33231a"
  muted: "#735942"
  line: "#ddcdb8"
  surface: "#f3eadc"
  paper: "#fffdf8"
typography:
  display:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "clamp(64px, 6.2vw, 88px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-.018em"
  headline:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "clamp(40px, 4.2vw, 60px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-.015em"
  title:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.05
  menu-title:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.13
  body:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  field-label:
    fontFamily: "'Source Sans 3', sans-serif"
    fontSize: "16px"
    fontWeight: 600
  wordmark:
    fontFamily: "'Barlow Condensed', sans-serif"
    fontSize: "33px"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-.01em"
rounded:
  caption: "3px"
  quantity: "4px"
  control: "6px"
  thumbnail: "8px"
  mobile-media: "10px"
  surface: "12px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-mobile: "54px"
  section-tablet: "68px"
  section-desktop: "92px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.orange-hover}"
    textColor: "{colors.cream}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-outline-hover:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
  button-light:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.orange}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  button-light-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.orange-hover}"
  button-add:
    backgroundColor: "transparent"
    textColor: "{colors.orange}"
    rounded: "{rounded.control}"
    padding: "9px 12px"
  button-add-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.cream}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.brown}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  navigation:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    padding: "12px 0"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    rounded: "{rounded.control}"
    padding: "10px 19px"
  filter-active:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
  menu-card:
    textColor: "{colors.brown}"
    typography: "{typography.menu-title}"
  menu-media:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
  checkout-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.brown}"
    rounded: "{rounded.surface}"
    padding: "30px"
  featured-strip:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    padding: "21px 28px"
  fulfillment:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    rounded: "{rounded.control}"
    padding: "11px 13px"
  fulfillment-selected:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
---

# Design System: Warteg Bogor

## Overview

**Creative North Star: "Papan makan siang"**

Papan makan siang memakai bidang krem hangat, tinta cokelat tua, tindakan oranye, huruf papan nama yang tegak dan padat, serta foto hidangan yang nyata. Nama makanan, isi, harga, dan langkah pesanan membentuk hierarki; suasananya akrab dan langsung.

Komponen dibedakan oleh warna bidang, garis tipis, dan jarak. Bahasa Indonesia bersifat sehari-hari. Data contoh dan foto ilustrasi tetap disebutkan dekat konteksnya; keadaan kontak yang belum tersedia tetap terlihat.

**Key Characteristics:**

- Huruf judul padat; isi dan kontrol lapang serta terbaca.
- Foto persegi panjang dan daftar pesanan bergaris.
- Harga dan tindakan tambah berada berdekatan.
- Kontak kosong dan data contoh dijelaskan secara terbuka.

Dokumen ini merekam hasil `index.html`, `styles.css`, dan `config.js`; token di atas menjadi acuan. Metadata tambahan dan spesimen komponen ada di [.impeccable/design.json](.impeccable/design.json). Komposisi halaman khusus dicatat di [.impeccable/surfaces/index-html.md](.impeccable/surfaces/index-html.md).

## Colors

Palet meniru kertas hangat, tinta papan makan, dan warna bumbu; seluruh bidang memakai warna solid.

### Primary

- **Oranye bumbu** (`orange`): tombol utama, fokus, seleksi teks, dan aksen tindakan.
- **Oranye pekat** (`orange-hover`): hover tombol utama serta pesan galat.

### Neutral

- **Krem hangat** (`cream`): latar halaman, navigasi, dan teks pada bidang gelap.
- **Cokelat tinta** (`brown`): teks utama, strip paket, filter aktif, dan keranjang mengambang.
- **Cokelat pendamping** (`muted`): uraian, keterangan unit, bantuan, dan kredit.
- **Garis kertas** (`line`): pembatas daftar dan stroke kontrol; juga teks pendamping pada bidang cokelat.
- **Krem bidang** (`surface`): bagian cerita dan formulir checkout.
- **Putih kertas** (`paper`): isian formulir serta hover tombol terang.

**The Tindakan Oranye Rule.** Gunakan oranye untuk tindakan utama, fokus, dan keadaan galat; gunakan cokelat untuk teks utama serta bidang ringkasan.

Nilai warna sumber di `config.js` dipetakan ke custom property CSS yang senama; `orangeHover` dipetakan ke `--orange-hover`. Ramp tonal pada sidecar merupakan pratinjau turunan, bukan tambahan warna runtime.

## Typography

**Display Font:** Barlow Condensed, fallback sans-serif.  
**Body Font:** Source Sans 3, fallback sans-serif.

Barlow Condensed memberi karakter papan nama warung tanpa mengurangi ruang untuk makanan. Source Sans 3 menjaga harga, uraian, dan isian tetap mudah dibaca.

- **Display:** judul hero kapital, dua baris. Pada lebar (860px) memakai `clamp(55px, 8vw, 72px)`; pada (600px) `clamp(56px, 15vw, 76px)`; pada (360px) menjadi (54px).
- **Headline:** judul bagian; pada (600px) ukuran umum (44px). Judul cerita dan kontak memiliki penyesuaian tersendiri dalam CSS.
- **Title / menu-title:** judul blok dan nama hidangan. Nama menu memakai (25px) pada (1100px), (29px) pada (860px), (23px) pada (600px), dan (22px) pada (360px). Bungkus baris alami, tanpa pemotongan judul.
- **Body:** turun menjadi (17px) pada (600px). Uraian kartu memakai (16px / 1.45), lalu (14px) pada HP. Uraian hero dibatasi sekitar (35–37ch).
- **Label / field-label:** tombol utama dan label isian. Bantuan memakai (14px); galat (15px). Angka harga menggunakan `tabular-nums`.
- **Wordmark:** huruf utama (33px), lalu (29px) dan (27px). Nama kota tetap (12px), bobot (600), jarak huruf (.28em).

**The Dua Suara Rule.** Gunakan Barlow Condensed untuk judul dan identitas; gunakan Source Sans 3 untuk uraian, harga menu, label, dan kontrol.

Font disimpan lokal melalui `assets/fonts/fonts.css`, memakai `font-display: swap`. Barlow tersedia pada bobot (600/700); Source Sans 3 pada (400/600/700). Pertahankan `SOURCES.txt` dan kedua lisensi SIL OFL 1.1 di folder tersebut.

## Layout

Kontainer tengah memakai `min(1280px, calc(100% - 112px))`. Batas dan gutter aktual:

| Kondisi viewport | Kontainer dan perubahan |
| --- | --- |
| Minimal 1700px | Lebar tetap (1344px). |
| Maksimal 1100px | Gutter (36px) per sisi; jarak kolom dipadatkan. |
| Maksimal 860px | Gutter (24px); menu menjadi dua kolom; navigasi memakai tombol buka/tutup. |
| Maksimal 600px | Gutter (18px); hero, cerita, checkout, testimoni, dan kontak ditumpuk. |
| Maksimal 360px | Gutter (14px); beberapa kontrol dan daftar lebih rapat. |

Jarak bagian menggunakan token `section-desktop`, `section-tablet`, dan `section-mobile`. Jarak kecil berulang berasal dari token (8/12/16/24/32px); jarak kontekstual lain tetap mengikuti komponen, bukan dipaksa ke satu skala.

Menu desktop empat kolom dengan gap (38px 25px); dua kolom pada (860px), gap (24px 17px) pada (600px), lalu (23px 13px) pada (360px). Checkout memakai dua kolom (1.2fr / 1fr), berubah seimbang pada (860px), lalu satu kolom pada (600px).

Pada halaman ini, judul dan uraian berada di atas foto lebar, diikuti strip paket. Bingkai hero aktual (320px) pada desktop/tablet dan (200px) pada HP; pemotongan memakai `object-fit: cover`. Awal menu memakai padding atas (48px), lalu (32px) pada HP. Pertahankan urutan baca dan keterbacaan saat mengubah isi.

Header sticky dipisahkan garis; tinggi minimal (90/79/74px). Scroll anchor memiliki offset (104px), lalu (88px) pada HP. Keranjang HP yang terlihat memberi ruang bawah halaman (92px) dan menghormati safe area perangkat.

## Elevation & Depth

Bidang menetap tidak memakai bayangan. Pergantian krem, krem bidang, cokelat, serta garis tipis memberi pemisahan konten. Hanya elemen yang menempel pada layar memakai bayangan lunak.

- **Pemberitahuan:** `0 10px 28px rgba(51, 35, 26, .18)`.
- **Keranjang HP:** `0 8px 22px rgba(51, 35, 26, .17)`.

**The Bidang Datar Rule.** Konten menetap memakai bidang solid dan garis; bayangan hanya membantu pemberitahuan serta keranjang yang menempel di layar.

## Shapes

Sudut kontrol memakai `control`; gambar menu dan formulir memakai `surface`. Foto menu menjadi `mobile-media` pada HP, thumbnail dan toast memakai `thumbnail`, pengubah jumlah memakai `quantity`, serta label foto memakai `caption`. Hero dan strip paket tetap bersudut siku. Stroke pembatas umumnya (1px); tidak ada panel kaca atau gradient.

## Components

### Buttons

Tombol padat dan jelas. Tombol umum tinggi minimal (48px), menggunakan token padding serta sudut kontrol. Varian oranye, outline, dan terang memakai warna pada frontmatter; outline memiliki stroke cokelat (1px). Tombol tambah memiliki stroke garis kertas, tinggi minimal (44px), lalu menjadi tombol ikon (44px) pada HP dengan nama aksesibel tetap lengkap.

Hover mengubah warna selama (180ms ease). Fokus memakai outline oranye (3px), offset (4px); pada bidang oranye atau cokelat memakai krem. Disabled memakai cursor `not-allowed` dan opacity (.55), khusus tombol tambah (.4). Tidak ada gerakan tombol pada hover.

### Chips

Filter kategori berbentuk persegi panjang bersudut kontrol, tinggi minimal (44px). Hover memakai krem bidang; terpilih memakai cokelat dan krem, disertai `aria-pressed`. Pada HP padding menjadi (10px 13px), ukuran teks (14px).

### Cards / Containers

Kartu menu terbuka langsung di latar halaman. Hanya bingkai fotonya berwarna krem bidang dan membulat; tidak ada panel berbayang di sekeliling setiap hidangan. Foto memakai rasio (4:3), menjadi (1:1) pada HP. Harga, unit, dan tambah berada dalam satu baris; teks jumlah ditempatkan di bawahnya.

Formulir checkout adalah bidang krem dengan padding (30px), lalu (23px) pada tablet dan (25px 22px) pada HP. Daftar keranjang menggunakan garis antarbaris dan thumbnail, bukan kumpulan kartu terangkat.

### Inputs / Fields

Isian berwarna putih kertas, stroke garis kertas (1px), sudut kontrol, teks (16px / 1.5). Tinggi input minimal (49px). Pencarian memakai latar transparan dan ruang untuk ikon kecil. Placeholder tetap terbaca memakai warna pendamping.

Galat memberi stroke oranye melalui `aria-invalid` dan pesan teks di bawah isian; jangan mengandalkan warna saja. Opsi penerimaan memiliki stroke oranye dan bidang krem saat terpilih. Alamat tampil dan wajib hanya ketika memilih pengantaran.

### Navigation

Navigasi desktop memakai Source Sans 3 (16px/600), garis bawah oranye (2px) untuk hover atau bagian aktif. Pada (860px) tombol membuka daftar di bawah header; item aktif memakai teks oranye. `aria-expanded`, `aria-current`, Escape, dan fokus tombol menjaga keadaan dapat dipahami.

### Paket, keranjang, dan pratinjau

Strip paket adalah bidang cokelat yang menghubungkan nama hidangan, harga, dan tombol tambah nyata. Harga dan badge jumlah memakai angka tabular. Keranjang kosong menyediakan tautan ke menu; hasil pencarian kosong menyediakan tombol reset; gambar gagal memuat menampilkan “Foto belum tersedia”. Produk habis menonaktifkan tambah dan menunjukkan “Belum tersedia”.

Tambah memperbarui jumlah dan subtotal, lalu memunculkan toast selama (5200ms). Animasi masuk berlangsung (350ms), perpindahan vertikal (10px), dengan `cubic-bezier(.16, 1, .3, 1)`. Konten utama langsung terlihat. `prefers-reduced-motion` meniadakan scroll halus dan memendekkan animasi/transisi menjadi (.01ms).

Keranjang HP tampil saat berisi dan bagian pesanan belum terlihat. Kontak WhatsApp kosong menjelaskan nomor belum tersedia; checkout tetap menghasilkan rincian yang bisa disalin. Keberhasilan salin mengubah label menjadi “Pesanan tersalin”; kegagalan menyediakan pilihan salin manual. Instagram selalu memiliki baris kontak: nilai kosong/tidak valid menampilkan “Akun belum tersedia”, nilai valid menjadi tautan akun. Pengiriman tidak otomatis.

### Aset dan pengungkapan

Gunakan foto lokal di `assets/`, alt yang menerangkan hidangan, dan titik fokus dari `config.js`. Sepuluh JPEG ilustrasi memiliki asal tertanam; pertahankan [ASSETS.md](ASSETS.md), `assets/photo-sources.json`, dan kredit pengunjung melalui `assets/photo-credits.js`. Ukuran sumber: hero lebar (1600px), menu sisi terpanjang maksimal (800px), pendukung lebar (1200px). Pemotongan terjadi di CSS; jangan menghapus identitas sumber atau lisensi.

Foto disebut ilustrasi, harga dan testimoni disebut contoh, jam buka contoh diberi label. Favicon SVG geometris dan ikon SVG kecil hanya mendukung identitas atau tindakan. Berkas riset dan review bukan aset runtime.

## Do's and Don'ts

### Do:

- **Do** gunakan token warna yang sama di config.js dan styles.css; perubahan tema harus memperbarui dokumentasi.
- **Do** biarkan nama menu membungkus alami dan pertahankan harga, unit, serta kontrol tambah yang terbaca.
- **Do** sediakan label formulir, nama aksesibel untuk tombol ikon, fokus terlihat, dan keadaan kosong yang memberi langkah berikutnya.
- **Do** pertahankan label contoh, foto ilustrasi, informasi kontak belum tersedia, atribusi foto, dan lisensi font.

### Don't:

- **Don't** tambahkan glass, gradient, glow, atau ornamen mengambang pada dunia ini.
- **Don't** tambahkan rating, sertifikasi, riwayat usaha, atau testimoni nyata tanpa data yang sah.
- **Don't** mengganti huruf display dengan serif atau menjadikan ikon dekoratif besar sebagai pola layanan.
- **Don't** sembunyikan isi untuk animasi reveal atau menganggap pesanan sudah terkirim saat WhatsApp baru dibuka.

Catatan yang tidak dikanonisasi: temuan detector tentang krem mengikuti warna yang dipilih pengguna; padding pembungkus bagian merupakan false positive. Ukuran nama kota HP yang dahulu (10px) sudah menjadi (12px), sehingga ukuran lama tidak menjadi token. Verdict terakhir mencakup dua perbaikan yang diminta—awal viewport dan keadaan Instagram—bukan pemeriksaan ulang seluruh halaman.

