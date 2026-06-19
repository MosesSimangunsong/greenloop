# User Flow — GreenLoop

## Tujuan Dokumen

Dokumen ini memetakan bagaimana fitur GreenLoop digunakan oleh user dalam MVP. Fokus utama user flow ini adalah memastikan alur sistem mudah dipahami, konsisten dengan PRD, dan siap dipakai sebagai acuan desain, implementasi, dan demo.

## Ringkasan Role

GreenLoop memiliki 3 role utama:

* **Producer**: penghasil limbah yang membuat posting limbah
* **Receiver**: penerima limbah yang mencari dan melakukan claim
* **Admin**: pengelola sistem yang memantau user, limbah, claim, kategori, rekomendasi, dan statistik

Satu user dapat memiliki lebih dari satu role.

---

## 1. User Flow Umum

### 1.1 Entry Point

Semua user masuk ke sistem melalui:

* Landing page
* Login
* Register

### 1.2 Setelah Login

Setelah login, sistem akan:

* mengenali role user
* mengarahkan user ke dashboard atau halaman utama yang sesuai
* menampilkan menu sesuai role

---

## 2. User Flow Producer

### Tujuan Producer

Producer ingin memposting limbah organik agar bisa ditemukan dan di-claim oleh receiver.

### Alur Producer

1. Producer membuka aplikasi
2. Producer login / register
3. Producer masuk ke dashboard
4. Producer memilih menu **Buat Posting Limbah**
5. Producer mengisi form posting:

   * nama limbah
   * kategori
   * deskripsi
   * berat dalam kg
   * harga atau gratis
   * alamat
   * titik koordinat
   * foto
   * tanggal tersedia
   * masa layak pakai
6. Producer menyimpan posting
7. Sistem menampilkan posting di daftar limbah
8. Receiver dapat melihat posting tersebut
9. Saat ada claim masuk, producer membuka daftar claim
10. Producer meninjau data receiver
11. Producer memilih:

* setujui claim
* tolak claim

12. Jika claim disetujui, producer melanjutkan komunikasi dengan receiver
13. Setelah limbah diserahkan, producer menandai transaksi sebagai **selesai**

### Kebutuhan Utama Producer

* form posting limbah yang sederhana
* daftar posting milik saya
* daftar claim masuk
* aksi approve / reject
* tombol tandai selesai

### Output yang Diharapkan

* limbah berhasil terposting
* claim dapat diproses
* transaksi selesai tercatat di sistem

---

## 3. User Flow Receiver

### Tujuan Receiver

Receiver ingin menemukan limbah organik yang relevan dan mengetahui limbah itu bisa diolah menjadi apa sebelum melakukan claim.

### Alur Receiver

1. Receiver membuka aplikasi
2. Receiver login / register
3. Receiver masuk ke halaman daftar limbah
4. Receiver melakukan pencarian / filter berdasarkan:

   * kategori
   * lokasi / jarak
   * status tersedia
5. Sistem menampilkan daftar limbah yang relevan
6. Receiver membuka halaman detail limbah
7. Receiver melihat:

   * informasi limbah
   * lokasi
   * harga / gratis
   * producer
   * rekomendasi pemanfaatan limbah
8. Receiver memutuskan apakah limbah sesuai kebutuhannya
9. Receiver klik **Claim**
10. Sistem membuat claim dengan status **pending**
11. Receiver menunggu keputusan producer
12. Jika claim disetujui, receiver melanjutkan komunikasi dengan producer
13. Setelah handoff selesai, transaksi ditutup oleh producer

### Kebutuhan Utama Receiver

* pencarian limbah yang mudah
* filter kategori dan jarak
* detail limbah yang jelas
* rekomendasi pemanfaatan limbah
* status claim saya

### Output yang Diharapkan

* receiver menemukan limbah yang relevan
* receiver memahami potensi pengolahan limbah
* receiver berhasil mengajukan claim

---

## 4. User Flow Admin

### Tujuan Admin

Admin ingin memantau aktivitas sistem dan mengelola data dasar GreenLoop.

### Alur Admin

1. Admin login
2. Admin masuk ke admin dashboard
3. Admin melihat ringkasan statistik:

   * total user
   * total limbah
   * total claim / transaksi sukses
   * kategori limbah paling sering muncul
   * grafik tren
4. Admin membuka modul yang dibutuhkan:

   * manajemen user
   * manajemen limbah
   * manajemen claim
   * manajemen kategori
   * manajemen rekomendasi pemanfaatan
5. Admin menambah / mengubah kategori limbah
6. Admin menambah / mengubah rekomendasi pemanfaatan limbah
7. Admin memantau data sistem secara berkala

### Kebutuhan Utama Admin

* dashboard statistik
* tabel user
* tabel limbah
* tabel claim
* CRUD kategori
* CRUD rekomendasi pemanfaatan

### Output yang Diharapkan

* sistem dapat dipantau
* kategori dan rekomendasi dapat dikelola
* admin punya visibilitas terhadap tren data

---

## 5. Navigasi Halaman

### 5.1 Halaman Publik

* `/`
* `/login`
* `/register`

### 5.2 Halaman User

* `/dashboard`
* `/profile`
* `/waste-posts`
* `/waste-posts/create`
* `/waste-posts/{id}`
* `/my-posts`
* `/my-claims`

### 5.3 Halaman Admin

* `/admin/dashboard`
* `/admin/users`
* `/admin/waste-posts`
* `/admin/claims`
* `/admin/categories`
* `/admin/recommendations`
* `/admin/analytics`

---

## 6. Detail Alur Fitur Utama

## 6.1 Flow Register dan Login

1. User membuka halaman register
2. User mengisi data:

   * nama
   * email
   * password
3. User menyelesaikan register
4. User login menggunakan email dan password
5. Sistem mengarahkan user ke dashboard

## 6.2 Flow Lengkapi Profil

1. User membuka halaman profil
2. User melengkapi:

   * nama
   * usaha/instansi
   * alamat
   * titik lokasi
   * nomor WhatsApp
3. Sistem menyimpan profil
4. Data profil digunakan untuk aktivitas producer/receiver

## 6.3 Flow Buat Posting Limbah

1. Producer klik **Buat Posting**
2. Producer isi form
3. Sistem validasi data
4. Jika valid, posting tersimpan
5. Status awal posting adalah **available**
6. Posting tampil di daftar limbah

## 6.4 Flow Cari dan Filter Limbah

1. Receiver masuk ke halaman daftar limbah
2. Receiver memilih kategori
3. Receiver mengatur radius jarak
4. Sistem memfilter data
5. Sistem menampilkan limbah yang relevan

## 6.5 Flow Lihat Detail dan Rekomendasi Pemanfaatan

1. Receiver membuka detail limbah
2. Sistem menampilkan data limbah lengkap
3. Sistem menampilkan rekomendasi pemanfaatan berdasarkan kategori
4. Receiver membaca potensi penggunaan limbah

## 6.6 Flow Claim Limbah

1. Receiver klik **Claim**
2. Sistem membuat data claim baru
3. Status claim menjadi **pending**
4. Producer melihat claim masuk
5. Producer memilih approve / reject
6. Jika approve, claim berubah menjadi **approved**
7. Jika reject, claim berubah menjadi **rejected**
8. Setelah serah terima selesai, producer mengubah status menjadi **completed**

---

## 7. Aturan Alur Penting

### 7.1 Aturan Posting

* hanya producer yang bisa membuat posting
* satu posting dianggap satu lot penuh
* satuan berat menggunakan kg

### 7.2 Aturan Claim

* receiver hanya bisa claim limbah yang tersedia
* claim harus menunggu persetujuan producer
* transaksi ditutup oleh producer

### 7.3 Aturan Rekomendasi

* rekomendasi pemanfaatan muncul di halaman detail limbah
* rekomendasi berbasis kategori
* rekomendasi dikelola admin

### 7.4 Aturan Admin

* admin memiliki akses penuh ke data monitoring
* admin tidak menjadi pihak transaksi utama
* admin fokus pada kontrol sistem dan data

---

## 8. Skenario Demo Utama

### Skenario Demo 1 — Producer Berhasil Memposting Limbah

1. Login sebagai producer
2. Lengkapi profil
3. Buat posting limbah baru
4. Tampilkan bahwa posting berhasil muncul di listing

### Skenario Demo 2 — Receiver Menemukan dan Claim Limbah

1. Login sebagai receiver
2. Cari limbah berdasarkan kategori
3. Buka detail limbah
4. Lihat rekomendasi pemanfaatan
5. Lakukan claim

### Skenario Demo 3 — Producer Menyetujui Claim

1. Kembali login sebagai producer
2. Buka daftar claim
3. Approve claim
4. Tunjukkan perubahan status

### Skenario Demo 4 — Admin Memantau Sistem

1. Login sebagai admin
2. Buka dashboard
3. Tampilkan total user, total limbah, dan tren kategori
4. Buka modul kategori dan rekomendasi

---

## 9. Fokus UX untuk MVP

Agar user flow efektif di MVP:

* form jangan terlalu panjang
* listing limbah harus mudah dipindai
* detail limbah harus jelas
* tombol claim harus terlihat
* status transaksi harus mudah dipahami
* admin panel harus fokus pada tabel dan statistik

---

## 10. Kesimpulan

User flow GreenLoop dirancang sederhana agar:

* producer mudah memposting limbah
* receiver mudah menemukan dan claim limbah
* admin mudah memantau sistem

User flow ini menjadi acuan implementasi navigasi, struktur halaman, dan demo MVP GreenLoop.
