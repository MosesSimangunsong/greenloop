# ERD — GreenLoop

## Perancangan Arsitektur Data MVP

## 1. Tujuan Dokumen

Dokumen ini menjelaskan rancangan arsitektur data GreenLoop untuk MVP. Fokus utamanya adalah menentukan:

* data apa saja yang disimpan
* data disimpan di entitas/tabel mana
* hubungan antar data
* aturan dasar penyimpanan data user, limbah, claim, kategori, rekomendasi, dan monitoring

Dokumen ini menjadi acuan untuk:

* perancangan database PostgreSQL
* pembuatan migration Laravel
* penyusunan model Eloquent
* konsistensi relasi antar fitur

---

## 2. Prinsip Arsitektur Data

GreenLoop dirancang sebagai aplikasi web MVP berbasis:

* Laravel
* React
* PostgreSQL

Prinsip arsitektur data:

1. sederhana dan mudah diimplementasikan
2. mendukung alur bisnis inti MVP
3. tidak overengineered
4. siap dikembangkan di iterasi berikutnya
5. menjaga konsistensi relasi antara user, limbah, dan claim

---

## 3. Gambaran Entitas Utama

Untuk MVP, GreenLoop menggunakan entitas utama berikut:

1. **users**
2. **roles**
3. **role_user**
4. **waste_categories**
5. **waste_posts**
6. **waste_claims**
7. **waste_recommendations**
8. **transaction_logs**

Entitas tambahan bawaan Laravel seperti `password_reset_tokens`, `sessions`, dan lainnya tidak dijelaskan detail di dokumen ini karena bukan inti domain bisnis GreenLoop.

---

## 4. Entitas dan Fungsinya

## 4.1 users

Tabel ini menyimpan seluruh data akun pengguna GreenLoop.

### Fungsi

* menyimpan identitas user
* menyimpan data login
* menyimpan data profil dasar
* menjadi parent untuk aktivitas producer dan receiver

### Data yang disimpan

* id
* name
* email
* password
* phone
* business_name
* address
* latitude
* longitude
* is_active
* created_at
* updated_at

### Catatan

* satu user bisa memiliki lebih dari satu role
* user dapat menjadi producer sekaligus receiver
* admin juga tetap berasal dari entitas user

---

## 4.2 roles

Tabel ini menyimpan daftar role yang tersedia dalam sistem.

### Fungsi

* mendefinisikan jenis peran user

### Nilai awal

* admin
* producer
* receiver

### Data yang disimpan

* id
* name
* created_at
* updated_at

---

## 4.3 role_user

Tabel pivot antara users dan roles.

### Fungsi

* memungkinkan satu user memiliki banyak role
* memungkinkan satu role dimiliki banyak user

### Data yang disimpan

* id
* user_id
* role_id
* created_at
* updated_at

### Catatan

Relasi ini penting karena GreenLoop mengizinkan satu akun untuk:

* memberikan limbah
* menerima limbah

---

## 4.4 waste_categories

Tabel ini menyimpan kategori limbah organik.

### Fungsi

* mengelompokkan limbah
* menjadi dasar filter pencarian
* menjadi dasar rekomendasi pemanfaatan

### Data awal kategori

* jerami
* sekam padi
* kulit kopi
* sisa makanan
* kotoran ternak

### Data yang disimpan

* id
* name
* slug
* description
* is_active
* created_at
* updated_at

### Catatan

* admin dapat menambah kategori baru
* kategori yang nonaktif tidak digunakan untuk posting baru

---

## 4.5 waste_posts

Tabel inti untuk menyimpan posting limbah dari producer.

### Fungsi

* menyimpan data limbah yang diposting
* menjadi sumber utama pencarian receiver
* menjadi objek utama claim

### Data yang disimpan

* id
* user_id
* waste_category_id
* title
* description
* quantity_kg
* price
* is_free
* address
* latitude
* longitude
* available_date
* expiry_date
* image_path
* status
* claim_radius_km
* created_at
* updated_at

### Penjelasan field penting

* **user_id**: producer pemilik posting
* **waste_category_id**: kategori limbah
* **quantity_kg**: berat limbah dalam kilogram
* **price**: harga limbah
* **is_free**: apakah limbah gratis
* **latitude & longitude**: dipakai untuk pencocokan jarak
* **available_date**: tanggal limbah tersedia
* **expiry_date**: masa layak pakai
* **status**: status posting limbah
* **claim_radius_km**: radius pencocokan maksimum

### Status yang disarankan

* available
* pending
* reserved
* in_process
* completed
* cancelled

### Catatan

* satu posting dianggap satu lot penuh
* satu posting tidak dibagi ke beberapa pembeli di MVP
* semua posting berkaitan langsung dengan satu producer

---

## 4.6 waste_claims

Tabel ini menyimpan data claim dari receiver terhadap posting limbah.

### Fungsi

* mencatat permintaan claim
* mencatat status persetujuan atau penolakan
* menjadi jejak transaksi dasar antara producer dan receiver

### Data yang disimpan

* id
* waste_post_id
* producer_id
* receiver_id
* status
* receiver_message
* approved_at
* rejected_at
* completed_at
* created_at
* updated_at

### Penjelasan field penting

* **waste_post_id**: posting limbah yang di-claim
* **producer_id**: pemilik posting
* **receiver_id**: pihak yang mengajukan claim
* **status**: status claim
* **receiver_message**: pesan singkat dari receiver saat claim
* **approved_at / rejected_at / completed_at**: jejak waktu proses claim

### Status yang disarankan

* pending
* approved
* rejected
* completed
* cancelled

### Catatan

* claim dibuat oleh receiver
* claim harus diproses oleh producer
* claim tidak otomatis selesai tanpa aksi producer

---

## 4.7 waste_recommendations

Tabel ini menyimpan rekomendasi pemanfaatan limbah berdasarkan kategori.

### Fungsi

* memberikan insight pada receiver
* menjadi pembeda utama GreenLoop
* menjelaskan limbah bisa diolah menjadi apa

### Data yang disimpan

* id
* waste_category_id
* title
* description
* usage_type
* reference_notes
* is_active
* created_at
* updated_at

### Contoh data

Untuk kategori **jerami**:

* dapat digunakan sebagai kompos
* dapat dimanfaatkan sebagai pakan ternak
* dapat dimanfaatkan sebagai mulsa pertanian

Untuk kategori **kulit kopi**:

* dapat menjadi kompos
* dapat menjadi campuran media tanam
* dapat menjadi peluang usaha turunan tertentu

### Catatan

* rekomendasi ditampilkan di halaman detail limbah
* data rekomendasi dikelola admin
* relasi utamanya ke waste_categories, bukan langsung ke waste_posts

---

## 4.8 transaction_logs

Tabel ini menyimpan log aktivitas penting yang berkaitan dengan alur transaksi.

### Fungsi

* audit sederhana
* histori aktivitas sistem
* pelacakan aksi penting

### Data yang disimpan

* id
* waste_post_id
* actor_user_id
* action
* notes
* created_at

### Contoh action

* created_post
* updated_post
* claimed
* approved_claim
* rejected_claim
* completed_transaction
* cancelled_transaction

### Catatan

Tabel ini tidak wajib untuk semua aksi minor, tetapi penting untuk jejak alur inti.

---

## 5. Relasi Antar Entitas

## 5.1 User dan Role

* satu **user** dapat memiliki banyak **role**
* satu **role** dapat dimiliki banyak **user**
* relasi: many-to-many melalui `role_user`

## 5.2 User dan Waste Post

* satu **user** dapat memiliki banyak **waste_posts**
* satu **waste_post** dimiliki satu **user**
* relasi: one-to-many

## 5.3 Waste Category dan Waste Post

* satu **waste_category** dapat digunakan banyak **waste_posts**
* satu **waste_post** hanya memiliki satu **waste_category**
* relasi: one-to-many

## 5.4 Waste Category dan Waste Recommendation

* satu **waste_category** dapat memiliki banyak **waste_recommendations**
* satu **waste_recommendation** hanya milik satu **waste_category**
* relasi: one-to-many

## 5.5 Waste Post dan Waste Claim

* satu **waste_post** dapat memiliki banyak **waste_claims**
* satu **waste_claim** hanya terkait satu **waste_post**
* relasi: one-to-many

## 5.6 User dan Waste Claim

* satu **user** dapat menjadi banyak **producer** dalam claim
* satu **user** dapat menjadi banyak **receiver** dalam claim
* `producer_id` dan `receiver_id` sama-sama mereferensi `users.id`

## 5.7 Waste Post dan Transaction Log

* satu **waste_post** dapat memiliki banyak **transaction_logs**
* satu **transaction_log** terkait satu **waste_post**
* relasi: one-to-many

---

## 6. Alur Penyimpanan Data User

## 6.1 Saat Register

Saat user register, data awal disimpan ke tabel:

* `users`

Data minimal:

* name
* email
* password

## 6.2 Saat Menentukan Role

Saat role diberikan atau dipilih, data disimpan ke tabel:

* `role_user`

## 6.3 Saat Melengkapi Profil

Saat user melengkapi profil, data diperbarui di tabel:

* `users`

Field yang diperbarui:

* phone
* business_name
* address
* latitude
* longitude

---

## 7. Alur Penyimpanan Data Limbah

## 7.1 Saat Producer Membuat Posting

Data posting limbah disimpan ke tabel:

* `waste_posts`

Relasi yang digunakan:

* `user_id` -> user pembuat posting
* `waste_category_id` -> kategori limbah

## 7.2 Saat Detail Limbah Dibuka

Sistem mengambil data dari:

* `waste_posts`
* `users`
* `waste_categories`
* `waste_recommendations`

## 7.3 Saat Receiver Claim Limbah

Data claim disimpan ke tabel:

* `waste_claims`

Field penting:

* waste_post_id
* producer_id
* receiver_id
* status = pending

## 7.4 Saat Claim Diproses

Data pada `waste_claims` diperbarui:

* status
* approved_at atau rejected_at

## 7.5 Saat Transaksi Selesai

Data pada `waste_claims` diperbarui:

* status = completed
* completed_at

Data pada `waste_posts` juga dapat diperbarui:

* status = completed atau reserved/in_process sesuai flow

---

## 8. Alur Penyimpanan Data Admin

Admin mengelola data berikut:

### 8.1 Kategori

Disimpan di:

* `waste_categories`

### 8.2 Rekomendasi

Disimpan di:

* `waste_recommendations`

### 8.3 Monitoring User

Dibaca dari:

* `users`
* `role_user`
* `roles`

### 8.4 Monitoring Limbah

Dibaca dari:

* `waste_posts`
* `waste_categories`
* `users`

### 8.5 Monitoring Claim

Dibaca dari:

* `waste_claims`
* `waste_posts`
* `users`

---

## 9. Normalisasi dan Batasan MVP

## 9.1 Yang Dinormalisasi

Data dipisah agar tidak redundan:

* role dipisah dari user
* kategori dipisah dari posting
* rekomendasi dipisah dari posting
* claim dipisah dari posting

## 9.2 Yang Disederhanakan untuk MVP

Agar tidak overengineered, MVP tidak membuat tabel untuk:

* pembayaran
* wallet
* invoice
* review/rating
* kebutuhan limbah oleh receiver
* percakapan/chat internal
* dispute handling
* carbon impact detail per transaksi

---

## 10. Aturan Integritas Data

### 10.1 User

* email harus unik
* password harus terenkripsi
* user nonaktif tidak boleh membuat posting baru

### 10.2 Kategori

* kategori aktif boleh dipakai
* kategori nonaktif tidak boleh dipilih saat membuat posting

### 10.3 Waste Post

* quantity_kg harus lebih dari 0
* waste_category_id harus valid
* user_id harus valid
* posting harus memiliki status yang sah
* lokasi harus memiliki alamat dan koordinat

### 10.4 Waste Claim

* claim hanya boleh dibuat untuk posting dengan status available
* receiver tidak boleh claim posting miliknya sendiri
* claim harus terkait ke posting yang valid

### 10.5 Recommendation

* rekomendasi harus terkait kategori yang valid
* rekomendasi nonaktif tidak ditampilkan

---

## 11. Indeks yang Disarankan

Untuk membantu performa query di PostgreSQL, tabel berikut sebaiknya memiliki index:

### users

* email
* is_active

### waste_categories

* slug
* is_active

### waste_posts

* user_id
* waste_category_id
* status
* available_date
* latitude
* longitude

### waste_claims

* waste_post_id
* producer_id
* receiver_id
* status

### waste_recommendations

* waste_category_id
* is_active

---

## 12. Model Eloquent yang Disarankan

### User

Relasi:

* belongsToMany(Role::class)
* hasMany(WastePost::class)
* hasMany(WasteClaim::class, 'producer_id')
* hasMany(WasteClaim::class, 'receiver_id')

### Role

Relasi:

* belongsToMany(User::class)

### WasteCategory

Relasi:

* hasMany(WastePost::class)
* hasMany(WasteRecommendation::class)

### WastePost

Relasi:

* belongsTo(User::class)
* belongsTo(WasteCategory::class)
* hasMany(WasteClaim::class)
* hasMany(TransactionLog::class)

### WasteClaim

Relasi:

* belongsTo(WastePost::class)
* belongsTo(User::class, 'producer_id')
* belongsTo(User::class, 'receiver_id')

### WasteRecommendation

Relasi:

* belongsTo(WasteCategory::class)

### TransactionLog

Relasi:

* belongsTo(WastePost::class)
* belongsTo(User::class, 'actor_user_id')

---

## 13. Keputusan Arsitektur Data Final untuk MVP

Arsitektur data GreenLoop MVP berpusat pada:

* **users** sebagai penyimpan identitas akun
* **roles** untuk pengaturan peran
* **waste_posts** sebagai inti data limbah
* **waste_claims** sebagai inti interaksi transaksi
* **waste_categories** dan **waste_recommendations** sebagai penopang pencarian dan insight
* **transaction_logs** sebagai jejak aktivitas

Dengan struktur ini, GreenLoop sudah cukup kuat untuk:

* register dan login
* multi-role user
* posting limbah
* pencarian limbah
* claim flow
* rekomendasi pemanfaatan
* admin monitoring

---

## 14. Kesimpulan

ERD GreenLoop MVP dirancang agar:

* sederhana namun lengkap
* mendukung alur bisnis inti
* siap diterjemahkan ke migration Laravel
* mendukung pengembangan berikutnya tanpa membebani MVP

Dokumen ini menjadi dasar sebelum dibuat visual ERD dalam format diagram.
