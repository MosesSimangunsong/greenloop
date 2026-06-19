# Modular Implementation — GreenLoop

## Eksekusi Kode Secara Bertahap Bersama AI

## 1. Tujuan Dokumen

Dokumen ini menjadi panduan implementasi GreenLoop secara bertahap bersama AI agar proses development:

* terstruktur
* tidak loncat-loncat
* aman untuk MVP lomba
* mudah dibagi ke beberapa sesi kerja
* mudah diarahkan ke Codex / AI coding assistant

Dokumen ini bukan menjelaskan fitur produk, tetapi menjelaskan **bagaimana fitur itu dieksekusi secara modular**.

---

## 2. Prinsip Modular Implementation

GreenLoop harus dibangun dengan prinsip berikut:

### 2.1 Bangun dari fondasi ke fitur

Jangan langsung membuat fitur kompleks. Urutan implementasi harus dimulai dari:

* setup project
* auth
* role
* struktur data
* modul inti
* modul pendukung
* polishing demo

### 2.2 Satu modul, satu tujuan jelas

Setiap modul harus punya:

* tujuan
* output
* dependensi
* definisi selesai

### 2.3 AI dipakai sebagai executor bertahap

AI tidak boleh diberi instruksi terlalu besar sekaligus seperti:

* “bangun semuanya”
* “buat semua fitur GreenLoop”

AI harus diberi pekerjaan modular seperti:

* “buat migration users dan roles”
* “buat CRUD kategori limbah”
* “buat halaman daftar limbah”

### 2.4 Selalu validasi sebelum lanjut

Setelah satu modul selesai:

* cek jalan atau tidak
* cek konsistensi naming
* cek struktur folder
* cek hasil UI / backend
* baru lanjut ke modul berikutnya

---

## 3. Filosofi Eksekusi Bersama AI

AI sebaiknya diposisikan sebagai:

* co-developer
* implementer modular
* pembuat boilerplate
* partner review struktur
* helper refactor

AI **bukan** pengganti keputusan arsitektur.

Keputusan manusia tetap dibutuhkan untuk:

* scope fitur
* prioritas MVP
* keputusan final database
* keputusan final flow user
* arah visual
* penyesuaian lomba

---

## 4. Strategi Umum Eksekusi

Implementasi GreenLoop dibagi menjadi beberapa tahap besar:

1. **Foundation Setup**
2. **Core Domain Setup**
3. **Producer Flow**
4. **Receiver Flow**
5. **Admin Flow**
6. **Matching & Recommendation**
7. **Analytics & Demo Support**
8. **Refinement & Hardening**

Tujuannya agar AI selalu mengerjakan bagian yang kecil namun bernilai.

---

## 5. Tahap Implementasi

# Tahap 1 — Foundation Setup

## Tujuan

Membangun fondasi project agar repo siap dipakai coding.

## Ruang Lingkup

* setup Laravel + React + Inertia
* setup PostgreSQL
* setup Tailwind
* setup struktur folder
* setup auth dasar
* setup shadcn/ui untuk admin

## Output

* project bisa dijalankan
* login/register tersedia
* struktur dasar frontend dan backend siap

## Deliverable

* konfigurasi project
* `.env` siap database
* auth berjalan
* layout dasar tersedia

## Contoh prompt ke AI

* “Setup Laravel + React + Inertia untuk GreenLoop.”
* “Buat struktur folder frontend untuk admin, auth, waste posts, claims, dan shared components.”
* “Tambahkan auth email/password dengan Laravel Breeze.”

## Definition of Done

* project dapat `serve`
* login/register berfungsi
* database terkoneksi
* halaman dasar tampil

---

# Tahap 2 — Core Domain Setup

## Tujuan

Membuat struktur data utama GreenLoop.

## Ruang Lingkup

* migration users tambahan profil
* migration roles
* migration role_user
* migration waste_categories
* migration waste_posts
* migration waste_claims
* migration waste_recommendations
* migration transaction_logs
* model dan relasi Eloquent

## Output

* schema database inti siap
* model domain utama siap

## Deliverable

* migration files
* model files
* relasi dasar
* seed awal kategori dan role

## Contoh prompt ke AI

* “Buat migration dan model untuk roles serta pivot role_user.”
* “Buat migration waste_posts sesuai ERD GreenLoop.”
* “Tambahkan relasi Eloquent untuk User, WasteCategory, WastePost, dan WasteClaim.”

## Definition of Done

* migration berjalan tanpa error
* seed data awal berhasil
* relasi model bisa dipakai query

---

# Tahap 3 — Producer Flow

## Tujuan

Membuat alur producer agar dapat memposting limbah dan mengelola posting miliknya.

## Ruang Lingkup

* halaman profile producer
* form buat posting limbah
* validasi posting
* upload foto limbah
* halaman daftar posting milik saya
* edit posting
* hapus posting sebelum diproses

## Output

* producer dapat membuat dan mengelola limbah

## Deliverable

* controller waste post
* request validation
* halaman create/edit/list/detail milik producer

## Contoh prompt ke AI

* “Buat CRUD waste post untuk producer.”
* “Buat form React untuk posting limbah dengan field sesuai PRD.”
* “Tambahkan validasi Laravel untuk quantity_kg, category, lokasi, harga, dan tanggal.”

## Definition of Done

* producer bisa membuat posting
* data tersimpan ke database
* posting muncul di daftar
* edit dan delete berjalan sesuai aturan

---

# Tahap 4 — Receiver Flow

## Tujuan

Membuat alur receiver agar dapat mencari limbah dan membuka detail limbah.

## Ruang Lingkup

* halaman daftar limbah
* filter kategori
* filter radius jarak
* card limbah
* detail limbah
* tampilan informasi producer
* tombol claim

## Output

* receiver bisa menemukan limbah yang relevan

## Deliverable

* listing page
* filtering logic
* detail page

## Contoh prompt ke AI

* “Buat halaman listing limbah untuk receiver.”
* “Tambahkan filter kategori dan radius.”
* “Buat komponen WasteCard dan halaman detail limbah.”

## Definition of Done

* listing tampil
* filter bekerja
* detail limbah dapat dibuka
* hanya limbah dengan status valid yang muncul

---

# Tahap 5 — Claim Flow

## Tujuan

Membuat alur claim antara receiver dan producer.

## Ruang Lingkup

* receiver claim limbah
* status claim pending
* producer lihat claim masuk
* producer approve / reject
* producer tandai selesai
* riwayat claim

## Output

* interaksi inti producer-receiver berjalan

## Deliverable

* claim controller
* halaman claim saya
* halaman claim masuk
* status update logic

## Contoh prompt ke AI

* “Buat fitur claim limbah oleh receiver.”
* “Buat halaman producer untuk melihat claim masuk.”
* “Tambahkan aksi approve, reject, dan complete pada claim.”

## Definition of Done

* receiver bisa claim
* producer bisa memproses claim
* status berubah konsisten
* alur inti transaksi berjalan

---

# Tahap 6 — Admin Flow

## Tujuan

Membangun kontrol sistem dari sisi admin.

## Ruang Lingkup

* admin dashboard
* tabel users
* tabel waste posts
* tabel claims
* CRUD kategori
* CRUD rekomendasi pemanfaatan

## Output

* admin dapat memantau dan mengelola sistem

## Deliverable

* admin layout
* pages admin
* statistik ringkas
* manajemen kategori dan rekomendasi

## Contoh prompt ke AI

* “Buat admin dashboard dengan React dan shadcn/ui.”
* “Buat CRUD waste categories.”
* “Buat CRUD waste recommendations.”

## Definition of Done

* admin dapat login
* admin bisa mengelola kategori
* admin bisa mengelola rekomendasi
* admin bisa melihat user, limbah, dan claim

---

# Tahap 7 — Matching & Recommendation

## Tujuan

Menambahkan pembeda utama GreenLoop.

## Ruang Lingkup

* matching rule-based sederhana
* filter berdasarkan kategori dan jarak
* rekomendasi limbah relevan untuk receiver
* rekomendasi pemanfaatan limbah pada detail page

## Output

* GreenLoop terasa lebih dari sekadar listing biasa

## Deliverable

* MatchingService
* DistanceService
* RecommendationService
* label rekomendasi pada listing/detail

## Contoh prompt ke AI

* “Buat MatchingService sederhana berbasis kategori dan jarak.”
* “Tambahkan sorting rekomendasi limbah terdekat.”
* “Tampilkan rekomendasi pemanfaatan limbah di halaman detail.”

## Definition of Done

* hasil pencarian lebih relevan
* recommendation panel muncul
* reasoning sederhana bisa ditampilkan jika perlu

---

# Tahap 8 — Analytics & Demo Support

## Tujuan

Menyiapkan sistem agar kuat saat demo lomba.

## Ruang Lingkup

* total user
* total limbah
* total transaksi sukses
* kategori paling sering muncul
* grafik tren sederhana
* seed data demo
* akun demo
* empty states
* polishing UI penting

## Output

* sistem lebih siap dipresentasikan

## Deliverable

* stats cards
* chart sederhana
* dummy data demo
* skenario demo end-to-end

## Contoh prompt ke AI

* “Buat statistik dashboard admin.”
* “Tambahkan chart tren kategori limbah.”
* “Buat seeder data demo GreenLoop untuk Kabupaten Toba.”

## Definition of Done

* data statistik tampil
* chart terbaca jelas
* demo bisa dijalankan tanpa data kosong

---

# Tahap 9 — Refinement & Hardening

## Tujuan

Merapikan implementasi sebelum finalisasi.

## Ruang Lingkup

* refactor ringan
* perbaikan naming
* policy / authorization
* validasi final
* error handling
* responsive check
* review UI
* README dan dokumentasi teknis

## Output

* codebase lebih stabil
* lebih siap untuk juri dan repo open-source

## Deliverable

* middleware / policy
* cleanup code
* README
* dokumentasi setup

## Contoh prompt ke AI

* “Refactor controller agar lebih tipis dan pindahkan logika ke service.”
* “Tambahkan authorization untuk admin pages dan producer-only actions.”
* “Review konsistensi status antara backend dan frontend.”

## Definition of Done

* fitur inti stabil
* struktur codebase rapi
* dokumentasi cukup
* aplikasi siap dipresentasikan

---

## 6. Urutan Pengerjaan yang Direkomendasikan

Urutan aman implementasi GreenLoop:

1. setup project
2. auth
3. roles
4. database domain utama
5. kategori
6. posting limbah
7. listing limbah
8. detail limbah
9. claim
10. admin dashboard
11. recommendation
12. analytics
13. polish

Jangan membalik urutan ini kecuali ada alasan kuat.

---

## 7. Format Kerja Sama dengan AI

Agar AI efektif, gunakan pola kerja ini:

### 7.1 Satu tugas per instruksi

Contoh:

* benar: “Buat migration waste_categories.”
* salah: “Buat semua backend GreenLoop.”

### 7.2 Sertakan konteks singkat

Contoh:

* stack yang dipakai
* nama tabel
* relasi yang diinginkan
* status yang digunakan
* file tujuan

### 7.3 Minta output konkret

Contoh:

* migration
* model
* controller
* React page
* component
* seeder
* route

### 7.4 Setelah AI memberi hasil

Lakukan:

* review
* jalankan kode
* cek error
* commit
* lanjut modul berikutnya

---

## 8. Template Instruksi untuk AI

Format prompt yang disarankan saat bekerja dengan AI:

### Template Umum

* konteks modul
* tujuan task
* file yang diubah / dibuat
* aturan coding
* output yang diinginkan
* batasan scope

### Contoh

**Konteks:** Saya sedang membangun GreenLoop dengan Laravel + React + PostgreSQL.
**Tujuan:** Saya ingin membuat migration dan model `waste_categories`.
**Aturan:** Gunakan field `name`, `slug`, `description`, `is_active`, timestamps.
**Output:** Berikan migration, model, dan seeder default kategori limbah organik.
**Batasan:** Jangan membuat fitur di luar kategori.

---

## 9. Modular Breakdown per Layer

## 9.1 Backend Modules

* auth
* roles
* categories
* waste posts
* claims
* recommendations
* admin stats
* policies
* seeders

## 9.2 Frontend Modules

* auth pages
* app layout
* admin layout
* waste list
* waste detail
* producer dashboard
* claim pages
* admin tables
* statistics cards
* recommendation panels

## 9.3 Shared Modules

* status constants
* helper formatters
* distance helper
* badge components
* table wrapper
* empty state
* form components

---

## 10. Definition of Done per Modul

Setiap modul dianggap selesai jika memenuhi:

1. kodenya jalan
2. alur user terkait bisa diuji
3. validasi dasar ada
4. UI cukup layak dipakai
5. data benar-benar tersimpan / terambil
6. tidak merusak modul sebelumnya

---

## 11. Hal yang Tidak Boleh Dilakukan Saat Implementasi

* jangan menambah fitur di luar PRD tanpa keputusan tim
* jangan lompat ke UI mewah sebelum flow inti jadi
* jangan menambahkan payment gateway untuk MVP
* jangan memakai machine learning tanpa kebutuhan nyata
* jangan membuat arsitektur terlalu kompleks
* jangan memecah repo atau service terlalu dini
* jangan menyerahkan terlalu banyak keputusan desain ke AI tanpa review manusia

---

## 12. Strategi Commit Git

Setiap modul sebaiknya punya commit terpisah.

Contoh:

* `setup laravel react inertia auth`
* `add roles and role pivot`
* `add waste categories migration and seeder`
* `add waste post crud`
* `add waste claim flow`
* `add admin dashboard stats`

Tujuannya:

* mudah rollback
* mudah review
* mudah dibaca juri jika repo diperiksa

---

## 13. Strategi Branch

Jika tim lebih dari satu orang:

### Branch utama

* `main`

### Branch kerja

* `feature/auth`
* `feature/roles`
* `feature/waste-posts`
* `feature/claims`
* `feature/admin-dashboard`
* `feature/recommendations`

Jika tim kecil dan waktu sangat mepet, boleh lebih sederhana. Namun modular secara commit tetap wajib.

---

## 14. Strategi Validasi Tiap Tahap

Setelah tiap modul selesai, lakukan minimal:

* cek route
* cek migration
* cek UI render
* cek submit form
* cek database record
* cek role access
* cek error state

Untuk modul penting:

* auth
* waste posts
* claims
* admin

harus diuji manual minimal sekali end-to-end.

---

## 15. Minimum Demo Path

Agar implementasi tetap fokus, GreenLoop harus selalu menjaga jalur demo minimum berikut:

1. login sebagai producer
2. buat posting limbah
3. logout
4. login sebagai receiver
5. cari limbah
6. buka detail limbah
7. lihat rekomendasi pemanfaatan
8. claim limbah
9. logout
10. login sebagai producer
11. approve claim
12. tandai selesai
13. login sebagai admin
14. lihat statistik

Jika jalur ini belum mulus, jangan tambah fitur baru.

---

## 16. MVP Lock Rule

Aturan penting:
Setelah modul inti selesai, tim harus melakukan **MVP Lock**.

Artinya:

* tidak menambah fitur baru besar
* fokus ke stabilisasi
* fokus ke demo
* fokus ke dokumentasi
* fokus ke polishing

Ini penting supaya proyek tidak melebar menjelang deadline.

---

## 17. Kesimpulan

GreenLoop harus dibangun dengan pendekatan modular agar:

* AI bisa membantu secara efektif
* tim tidak bingung
* fitur inti selesai tepat waktu
* repo tetap rapi
* demo lomba lebih siap

Dokumen ini menjadi panduan eksekusi teknis bertahap bersama AI dari awal setup sampai finalisasi MVP.
