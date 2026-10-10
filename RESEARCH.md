# Riset dan keputusan desain

Permintaan: template Warteg Bogor dengan warna krem hangat, oranye, dan cokelat, referensi website warteg, fungsi pesanan, serta pemeriksaan terhadap kebiasaan desain yang sering disebut AI slop.

Sumber utama yang dibaca: [katalog anti-pattern Impeccable](https://impeccable.style/slop/) dan [dokumentasi desain Impeccable](https://impeccable.style/docs/impeccable/). Katalog menganggap temuannya sebagai alasan untuk memeriksa konteks dan tujuan, bukan penilaian otomatis tentang asal atau mutu sebuah desain.

## Penerapan

| Pola yang diteliti | Keputusan dalam template |
| --- | --- |
| Halaman yang hanya mengulang hero, angka, dan grid fitur generik | Susunan papan makan siang dipilih pengguna: judul di atas foto lebar, paket yang langsung bisa ditambahkan, lalu menu. |
| Krem/serif sebagai pengganti keputusan identitas | Palet krem dipertahankan karena diminta pengguna; huruf Barlow Condensed merujuk papan nama warung dan Source Sans 3 untuk informasi serta kontrol. |
| Glassmorphism, glow, gradient, ornamen yang tidak membantu | Permukaan warna solid, foto makanan nyata, garis untuk harga, pemisahan konten, dan formulir. |
| Ikon besar dalam kotak dekoratif di setiap fitur | Keunggulan berupa teks layanan; ikon kecil hanya menunjukkan aksi atau keadaan keranjang. |
| Kicker berulang, label berlebihan, promosi yang tidak spesifik | Nama makanan, isi paket, harga, unit, dan langkah pemesanan merupakan isi utama. |
| Foto yang tidak sesuai produk atau bukti sosial palsu | Foto Commons sesuai hidangan dan diberi label ilustrasi; testimoni dan harga diberi label contoh. Tidak ada bintang rating, angka pelanggan, sejarah, sertifikasi, atau klaim halal. |
| Animasi pada setiap section dan konten disembunyikan saat menunggu reveal | Isi terlihat sejak awal. Gerak singkat hanya pada pemberitahuan penambahan pesanan, dengan dukungan reduced motion. |
| Tombol hiasan dan formulir yang tidak selesai | Search, filter, jumlah, hapus, penyimpanan, pickup/delivery, validasi, pratinjau, dan penyusunan teks WhatsApp dikerjakan dalam JavaScript nyata. |

Tidak ada cara objektif untuk membuktikan bahwa sebuah website sama sekali tidak mengandung “AI slop”: istilah ini memuat penilaian selera dan konteks. Sasaran pemeriksaan adalah pola yang dapat dilihat/diperiksa, kesesuaian dengan arah yang dipilih pengguna, dan fungsi yang bekerja.

Hasil pemeriksaan browser dan reviewer disimpan sebagai bahan kerja di `.impeccable/review/` dan `output/playwright/`; berkas tersebut tidak dikirim sebagai kode runtime.
