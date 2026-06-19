# Design System — GreenLoop

## Standardisasi Visual dan Estetika MVP

## 1. Tujuan Dokumen

Dokumen ini menjadi acuan visual GreenLoop agar seluruh tampilan produk:

* konsisten
* mudah digunakan
* mudah dikembangkan
* terasa profesional saat demo
* memiliki identitas yang selaras dengan tema lingkungan, sirkularitas, dan efisiensi

Design system ini berfungsi sebagai panduan untuk:

* UI designer
* frontend developer
* implementasi komponen React
* styling admin panel
* konsistensi presentasi produk saat lomba

---

## 2. Brand Personality

GreenLoop harus terasa seperti produk yang:

* **bersih**
* **ramah**
* **modern**
* **terstruktur**
* **membumi**
* **fungsional**
* **berorientasi dampak**

GreenLoop bukan aplikasi yang terlalu korporat, tetapi juga bukan aplikasi yang terlalu playful. Kesan utama yang harus muncul adalah:

**“platform lingkungan yang praktis, terpercaya, dan mudah dipakai.”**

---

## 3. Prinsip Desain

Seluruh tampilan GreenLoop harus mengikuti prinsip berikut:

### 3.1 Clarity First

UI harus mudah dipahami sejak pertama kali dibuka. Informasi utama seperti:

* kategori limbah
* berat
* harga / gratis
* lokasi
* status
  harus selalu terlihat jelas.

### 3.2 Functional Minimalism

Gunakan desain yang rapi dan efisien. Hindari elemen dekoratif berlebihan.

### 3.3 Visual Trust

Tampilan harus memberi rasa aman dan meyakinkan, karena user akan berinteraksi dengan data limbah, claim, dan komunikasi antar pihak.

### 3.4 Environmental Identity

Visual harus mencerminkan:

* keberlanjutan
* daur ulang
* sirkularitas
* pemanfaatan kembali

Namun tetap modern dan tidak terlalu “poster lingkungan” klasik.

### 3.5 Demo Friendly

Tampilan harus kuat saat dipresentasikan:

* teks terbaca jelas
* struktur halaman mudah dipahami
* tabel dan statistik tidak membingungkan
* status dan aksi user terlihat tegas

---

## 4. Arah Visual Utama

Secara visual, GreenLoop harus berada di tengah antara:

* **eco-tech**
* **dashboard product**
* **community platform**

Artinya:

* warna utama bernuansa hijau alami
* layout modern dan clean
* kartu, tabel, badge, dan statistik terasa seperti aplikasi digital nyata
* ada keseimbangan antara human-friendly dan system-friendly

---

## 5. Color System

## 5.1 Warna Utama

### Primary Green

Digunakan untuk:

* tombol utama
* link penting
* badge aktif
* highlight utama
* elemen brand

**Rekomendasi:**

* `#2F855A` — Green 700
* `#276749` — Green 800
* `#38A169` — Green 600

### Secondary Green

Digunakan untuk:

* background lembut
* aksen kartu
* state ringan
* indikator positif

**Rekomendasi:**

* `#68D391`
* `#9AE6B4`
* `#C6F6D5`

---

## 5.2 Warna Netral

Warna netral dipakai untuk menjaga keterbacaan dan struktur layout.

### Neutral Dark

* `#1A202C`
* `#2D3748`

Untuk:

* heading
* teks utama
* sidebar admin

### Neutral Gray

* `#4A5568`
* `#718096`
* `#A0AEC0`

Untuk:

* teks sekunder
* border
* placeholder
* label pelengkap

### Neutral Light

* `#EDF2F7`
* `#F7FAFC`
* `#FFFFFF`

Untuk:

* background utama
* surface
* card
* section divider

---

## 5.3 Warna Status

### Success

Untuk:

* claim berhasil
* transaksi selesai
* data aktif
* indikator positif

Rekomendasi:

* `#16A34A`

### Warning

Untuk:

* pending
* menunggu persetujuan
* masa layak hampir habis

Rekomendasi:

* `#D97706`

### Danger

Untuk:

* claim ditolak
* status dibatalkan
* error penting

Rekomendasi:

* `#DC2626`

### Info

Untuk:

* badge kategori
* informasi sistem
* rekomendasi ringan

Rekomendasi:

* `#2563EB`

---

## 5.4 Aturan Penggunaan Warna

* warna hijau hanya dipakai untuk elemen penting dan identitas brand
* jangan terlalu banyak shade hijau di satu layar
* warna status harus konsisten di seluruh aplikasi
* hindari background terlalu gelap di halaman utama user
* admin panel boleh menggunakan netral lebih dominan

---

## 6. Typography System

## 6.1 Karakter Tipografi

Tipografi GreenLoop harus:

* modern
* bersih
* mudah dibaca
* cocok untuk dashboard dan form

### Rekomendasi font

* **Inter**
* alternatif: **Manrope**
* alternatif: **Plus Jakarta Sans**

Rekomendasi utama:
**Inter**

---

## 6.2 Skala Tipografi

### Heading 1

* untuk judul halaman utama
* ukuran: `32px`
* weight: `700`

### Heading 2

* untuk judul section
* ukuran: `24px`
* weight: `700`

### Heading 3

* untuk judul card / modul
* ukuran: `20px`
* weight: `600`

### Heading 4

* untuk subjudul kecil
* ukuran: `16px`
* weight: `600`

### Body Large

* ukuran: `16px`
* weight: `400`

### Body Regular

* ukuran: `14px`
* weight: `400`

### Caption / Meta

* ukuran: `12px`
* weight: `400`

---

## 6.3 Aturan Tipografi

* maksimal 2 tingkat heading utama per halaman
* teks body jangan terlalu kecil
* angka statistik harus lebih menonjol dari labelnya
* gunakan font-weight untuk hierarki, bukan hanya warna
* status penting gunakan badge, jangan hanya teks biasa

---

## 7. Spacing System

Gunakan sistem spacing konsisten berbasis kelipatan 4.

### Skala spacing

* `4px`
* `8px`
* `12px`
* `16px`
* `20px`
* `24px`
* `32px`
* `40px`
* `48px`

### Penggunaan umum

* jarak antar input form: `16px`
* padding card: `16px` atau `24px`
* jarak antar section: `24px` atau `32px`
* jarak antar halaman modul besar: `32px` atau `40px`

### Prinsip

* hindari layout rapat
* beri ruang cukup pada card, table, dan form
* utamakan keterbacaan dan scanability

---

## 8. Border Radius dan Surface

### Border Radius

Gunakan radius sedang agar terasa modern dan ramah.

Rekomendasi:

* input: `10px`
* button: `10px`
* card: `16px`
* modal: `16px`
* badge: `999px`

### Surface

Surface utama:

* putih
* abu sangat terang
* aksen hijau lembut seperlunya

Hindari terlalu banyak layer yang membuat UI terasa berat.

---

## 9. Shadow dan Elevation

### Shadow ringan

Untuk:

* card
* dropdown
* modal
* tabel penting

Gunakan shadow lembut, bukan shadow keras.

### Aturan

* landing page boleh sedikit lebih visual
* admin panel lebih flat dan fungsional
* jangan menumpuk banyak shadow dalam satu area

---

## 10. Grid dan Layout

## 10.1 Layout Umum

### Landing Page

* lebar konten nyaman
* hero sederhana
* section vertikal
* fokus pada value proposition

### Dashboard User

* layout card-based
* daftar limbah sebagai fokus utama
* filter mudah dijangkau

### Admin Dashboard

* sidebar kiri
* topbar sederhana
* konten utama berbasis:

  * stats cards
  * table
  * chart
  * form CRUD

---

## 10.2 Grid

Gunakan sistem grid responsif:

* mobile: 1 kolom
* tablet: 2 kolom
* desktop: 3–4 kolom untuk card
* admin table: lebar penuh

---

## 11. Komponen Utama

## 11.1 Button

Jenis button yang dibutuhkan:

* **Primary Button**
* **Secondary Button**
* **Outline Button**
* **Danger Button**
* **Ghost Button**

### Aturan

* CTA utama selalu pakai primary
* aksi sekunder jangan lebih mencolok dari aksi utama
* danger hanya untuk aksi destruktif

---

## 11.2 Input dan Form

Input harus:

* jelas
* mudah dibaca
* label selalu ada
* error state terlihat

Form wajib punya:

* label
* placeholder seperlunya
* helper text jika perlu
* error message di bawah input

---

## 11.3 Card

Card dipakai untuk:

* daftar limbah
* statistik
* rekomendasi
* ringkasan data

Isi card limbah minimal:

* nama limbah
* kategori
* berat
* harga / gratis
* lokasi
* status
* tombol detail

---

## 11.4 Badge

Badge dipakai untuk:

* kategori
* status
* gratis / berbayar
* role user

Badge harus kecil, jelas, dan konsisten warna statusnya.

---

## 11.5 Table

Table terutama dipakai di admin untuk:

* users
* waste posts
* claims
* categories
* recommendations

Aturan:

* heading tabel jelas
* aksi row konsisten
* status pakai badge
* jangan terlalu padat

---

## 11.6 Modal / Dialog

Dipakai untuk:

* konfirmasi delete
* approve/reject claim
* edit data cepat

Modal harus ringkas dan fokus pada aksi.

---

## 12. Komponen Khas GreenLoop

## 12.1 Waste Card

Komponen utama untuk listing limbah.

Informasi prioritas:

1. nama limbah
2. kategori
3. berat
4. harga / gratis
5. lokasi
6. status

### Tujuan desain

User harus bisa scan daftar limbah dengan cepat tanpa membuka satu per satu.

---

## 12.2 Recommendation Panel

Komponen untuk menampilkan:

* limbah ini bisa diolah jadi apa
* jenis pemanfaatan
* peluang usaha turunan

Bentuk ideal:

* card / panel khusus
* ikon ringan
* daftar poin jelas
* tidak terlalu panjang

---

## 12.3 Status Timeline Sederhana

Untuk claim flow:

* pending
* approved
* rejected
* completed

Bisa dalam bentuk:

* badge status
* step indicator sederhana
* activity list

---

## 12.4 Stats Card

Untuk admin dashboard:

* total users
* total limbah
* transaksi sukses
* kategori paling sering muncul

Stats card harus:

* bersih
* angka besar
* label kecil
* ikon seperlunya

---

## 13. Ikonografi

Gunakan ikon yang:

* sederhana
* outline
* modern
* konsisten

Rekomendasi:

* **Lucide Icons**

Contoh ikon:

* leaf
* recycle
* map-pin
* package
* user
* badge-check
* clipboard-list
* chart-column

---

## 14. Ilustrasi dan Gambar

Untuk MVP, ilustrasi bukan prioritas utama.

Jika digunakan:

* gunakan gaya flat sederhana
* jangan terlalu ramai
* gunakan hanya di landing page atau empty state

Foto limbah tetap lebih penting daripada ilustrasi dekoratif.

---

## 15. Empty State

Saat data kosong, UI harus tetap informatif.

Contoh:

* belum ada limbah tersedia
* belum ada claim masuk
* belum ada kategori tambahan

Empty state harus berisi:

* judul singkat
* penjelasan pendek
* tombol aksi jika relevan

---

## 16. State Visual

Setiap komponen utama harus punya state:

### Default

komponen normal

### Hover

memberi feedback interaktif ringan

### Focus

jelas terlihat untuk aksesibilitas

### Disabled

warna lebih redup, tidak ambigu

### Error

label / border / helper text merah konsisten

### Success

indikator hijau, khusus aksi berhasil

---

## 17. Design untuk Halaman Utama

## 17.1 Landing Page

Karakter:

* ringan
* bersih
* tidak terlalu panjang
* fokus pada value proposition

Section yang disarankan:

* hero
* masalah
* solusi GreenLoop
* cara kerja
* kategori limbah
* manfaat
* CTA login/register

### Hero utama

Tampilkan pesan seperti:

* penyaluran limbah organik lebih mudah
* limbah bisa menjadi peluang baru
* platform khusus Toba

---

## 17.2 Halaman Listing Limbah

Karakter:

* praktis
* mudah dipindai
* filter jelas
* tidak terasa seperti e-commerce penuh

Elemen utama:

* search/filter
* waste cards
* badge kategori
* lokasi
* status

---

## 17.3 Halaman Detail Limbah

Karakter:

* informatif
* fokus pada keputusan claim

Bagian utama:

* informasi limbah
* informasi producer
* rekomendasi pemanfaatan
* tombol claim
* status dan tanggal penting

---

## 17.4 Admin Dashboard

Karakter:

* profesional
* rapi
* fokus pada data
* tidak dekoratif berlebihan

Komposisi:

* sidebar
* stats cards
* charts
* tables

Karena admin wajib menggunakan komponen berbasis React dan shadcn, maka konsistensi layout admin harus mengikuti pendekatan dashboard modern yang modular.

---

## 18. Aksesibilitas Dasar

Minimal standar aksesibilitas MVP:

* kontras teks cukup
* ukuran font tidak terlalu kecil
* form memiliki label
* fokus keyboard terlihat
* warna status tidak menjadi satu-satunya penanda
* tombol cukup besar untuk di-klik

---

## 19. Responsiveness

GreenLoop harus tetap layak dipakai di:

* desktop
* tablet
* mobile

### Prioritas desain

* admin optimal di desktop
* listing dan detail limbah tetap usable di mobile
* form posting tetap bisa diisi dari mobile

---

## 20. Implementasi Teknis Visual

## 20.1 Styling

Gunakan:

* Tailwind CSS

## 20.2 Komponen Admin

Gunakan:

* shadcn/ui

## 20.3 Komponen Shared

Komponen reusable yang perlu dibuat:

* Button
* Input
* Select
* Badge
* Card
* StatsCard
* WasteCard
* RecommendationPanel
* StatusBadge
* TableWrapper
* EmptyState

---

## 21. Aturan Konsistensi

Agar desain tetap konsisten:

1. jangan gunakan warna acak di luar sistem
2. jangan ubah ukuran border radius per komponen sembarangan
3. jangan gunakan terlalu banyak jenis tombol di satu layar
4. semua status harus memakai warna yang sama di seluruh aplikasi
5. semua halaman admin harus mengikuti layout yang sama
6. semua card limbah harus punya struktur informasi yang sama

---

## 22. Anti-Pattern yang Harus Dihindari

Hal berikut tidak boleh dilakukan:

* UI terlalu ramai
* terlalu banyak shade hijau
* terlalu banyak elemen dekoratif lingkungan
* tabel tanpa hierarki visual
* form terlalu padat
* dashboard penuh chart tetapi miskin informasi inti
* card limbah tidak konsisten isinya
* terlalu mirip marketplace umum

---

## 23. Arah Estetika Final

Estetika GreenLoop harus bisa dirangkum sebagai:

**clean eco-tech dashboard with community-friendly usability**

Atau dalam bahasa yang lebih sederhana:

**modern, hijau, rapi, dan terasa seperti platform lingkungan yang benar-benar bisa dipakai.**

---

## 24. Kesimpulan

Design system GreenLoop harus membantu tim menghasilkan tampilan yang:

* konsisten
* modern
* mudah dipahami
* kuat untuk demo
* cocok dengan tema lingkungan dan ekonomi sirkular

Dokumen ini menjadi dasar visual sebelum dibuat style guide lebih teknis atau implementasi komponen secara langsung di frontend.
