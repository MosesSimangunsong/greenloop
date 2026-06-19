# PRD — GreenLoop

## Penentu Batasan Fitur MVP

## 1. Ringkasan Produk

**GreenLoop** adalah platform web pertukaran limbah organik khusus **Kabupaten Toba** yang membantu **penghasil limbah (producer)** menyalurkan limbahnya kepada **penerima limbah (receiver)** yang sesuai. Sistem juga memberikan **rekomendasi pemanfaatan limbah** agar limbah tidak hanya terdaftar, tetapi juga diketahui dapat diolah menjadi apa.

Produk ini dibuat untuk kebutuhan **MVP lomba software development**, sehingga fokus utama adalah:

* masalah yang jelas
* alur bisnis yang hidup
* fitur inti yang benar-benar berjalan
* demo yang kuat
* implementasi realistis

---

## 2. Tujuan Produk

GreenLoop dibuat untuk menyelesaikan tiga masalah utama:

1. limbah organik tidak tersalurkan
2. penghasil limbah sulit menemukan penerima yang cocok
3. penerima limbah tidak selalu tahu limbah tersebut bisa diolah menjadi apa

Tujuan MVP:

* menyediakan media pencatatan dan publikasi limbah organik
* memudahkan receiver menemukan limbah yang sesuai
* menyediakan alur claim limbah yang jelas
* menampilkan rekomendasi pemanfaatan limbah
* memberi admin visibilitas terhadap aktivitas sistem

---

## 3. Ruang Lingkup Produk

### 3.1 Cakupan Wilayah

Produk hanya difokuskan untuk:

* **Kabupaten Toba**

### 3.2 Jenis Limbah

Produk hanya menangani:

* **limbah organik**

### 3.3 Kategori Limbah Default

Kategori awal MVP:

* Jerami
* Sekam padi
* Kulit kopi
* Sisa makanan
* Kotoran ternak

Admin dapat menambah kategori baru.

### 3.4 Platform

* Web app
* Bukan mobile app
* Bukan marketplace nasional
* Bukan sistem pembayaran penuh

---

## 4. Tipe Pengguna

### 4.1 Producer

Pengguna yang:

* membuat posting limbah
* menerima atau menolak claim
* menandai transaksi selesai

### 4.2 Receiver

Pengguna yang:

* mencari limbah
* melihat detail limbah
* melihat rekomendasi pemanfaatan limbah
* melakukan claim

### 4.3 Admin

Pengguna yang:

* memantau user
* memantau limbah
* memantau claim
* mengelola kategori
* mengelola rekomendasi pemanfaatan limbah
* melihat statistik sistem

### 4.4 Multi-role

Satu user dapat memiliki lebih dari satu role:

* producer
* receiver
* admin

---

## 5. Masalah yang Diselesaikan

### 5.1 Masalah Utama

* limbah organik tersedia tetapi tidak tersalurkan
* pencarian penerima limbah masih manual
* informasi pemanfaatan limbah tidak terstruktur
* belum ada visibilitas sederhana terhadap tren limbah

### 5.2 Nilai Produk

GreenLoop bukan sekadar tempat posting limbah, tetapi:

* membantu pencocokan awal berdasarkan kategori dan lokasi
* menyediakan alur claim yang lebih terstruktur
* memberi insight pemanfaatan limbah
* menyediakan dashboard monitoring untuk admin

---

## 6. Pembeda Utama Produk

Pembeda utama GreenLoop dalam MVP ini adalah:

**platform limbah organik khusus Toba yang tidak hanya mempertemukan penghasil dan penerima limbah, tetapi juga memberikan rekomendasi pemanfaatan limbah berdasarkan kategorinya.**

Jadi nilai produk bukan hanya:

* listing limbah

tetapi juga:

* pencarian limbah relevan
* claim flow
* rekomendasi pemanfaatan
* monitoring tren data limbah

---

## 7. Alur Bisnis Utama

### 7.1 Flow Producer

1. user login/register
2. user memilih / memiliki role producer
3. producer membuat posting limbah
4. posting tampil di listing
5. receiver melakukan claim
6. producer menerima notifikasi di sistem
7. producer menyetujui atau menolak claim
8. jika disetujui, komunikasi lanjutan dilakukan di luar sistem / melalui WhatsApp
9. producer menandai transaksi selesai

### 7.2 Flow Receiver

1. user login/register
2. user memilih / memiliki role receiver
3. receiver mencari limbah
4. sistem menampilkan limbah sesuai kategori dan lokasi
5. receiver membuka detail limbah
6. receiver melihat rekomendasi pemanfaatan limbah
7. receiver melakukan claim
8. menunggu persetujuan producer

### 7.3 Flow Admin

1. admin login
2. admin melihat dashboard statistik
3. admin mengelola kategori limbah
4. admin mengelola rekomendasi pemanfaatan
5. admin memantau user, posting limbah, dan claim

---

## 8. Fitur yang Wajib Dibuat (In Scope)

Ini adalah fitur yang **wajib masuk MVP**.

### 8.1 Authentication

* register
* login
* logout
* email + password

### 8.2 User Profile

* nama
* usaha/instansi
* alamat
* titik lokasi
* nomor WhatsApp

### 8.3 Role Management

* user dapat memiliki role producer
* user dapat memiliki role receiver
* admin memiliki akses khusus admin panel

### 8.4 Waste Category Management

* kategori default tersedia
* admin dapat tambah kategori
* admin dapat edit kategori
* admin dapat nonaktifkan kategori

### 8.5 Waste Post CRUD

Producer dapat:

* membuat posting limbah
* melihat posting miliknya
* mengedit posting
* menghapus posting jika belum diproses

Field minimum posting:

* nama limbah
* kategori
* deskripsi
* berat dalam kg
* lokasi
* foto
* tanggal tersedia
* masa layak pakai
* harga
* gratis / berbayar
* status

### 8.6 Waste Listing & Search

Receiver dapat:

* melihat daftar limbah
* mencari limbah
* filter berdasarkan kategori
* filter berdasarkan jarak / lokasi
* melihat status limbah

### 8.7 Waste Detail Page

Halaman detail limbah wajib menampilkan:

* nama limbah
* kategori
* deskripsi
* berat
* harga / label gratis
* lokasi
* tanggal tersedia
* masa layak pakai
* data producer
* rekomendasi pemanfaatan limbah
* tombol claim

### 8.8 Claim Flow

Receiver dapat:

* mengajukan claim

Producer dapat:

* menerima claim
* menolak claim
* menandai transaksi selesai

Status claim minimum:

* pending
* approved
* rejected
* completed
* cancelled

### 8.9 Recommendation Feature

Sistem menampilkan rekomendasi pemanfaatan limbah di halaman detail limbah.

Contoh:

* bisa dijadikan kompos
* bisa dijadikan pakan
* bisa menjadi peluang usaha turunan

Sumber rekomendasi:

* dikelola admin
* berbasis kategori limbah

### 8.10 Admin Dashboard

Admin dapat:

* melihat total user
* melihat total limbah terdaftar
* melihat total transaksi sukses
* melihat kategori limbah paling sering muncul
* melihat grafik tren limbah

### 8.11 Admin Monitoring

Admin dapat:

* melihat semua user
* melihat semua posting limbah
* melihat semua claim
* melihat statistik sistem
* mengelola kategori
* mengelola rekomendasi pemanfaatan

---

## 9. Fitur yang Tidak Dibuat Sekarang (Out of Scope)

Fitur berikut **tidak masuk MVP** dan tidak boleh menjadi fokus utama pengerjaan saat ini.

### 9.1 Pembayaran di Dalam Sistem

Tidak ada:

* top up
* wallet
* escrow
* potongan transaksi otomatis
* payment gateway

Semua transaksi harga dilakukan di luar sistem.

### 9.2 Receiver Posting Kebutuhan

Receiver belum bisa membuat posting “butuh limbah”.

### 9.3 Machine Learning / AI Matching

Sistem tidak menggunakan:

* machine learning
* AI recommendation kompleks

Matching cukup rule-based.

### 9.4 Chat Internal Penuh

Belum ada fitur chat kompleks.
Komunikasi utama cukup:

* informasi kontak
* tombol WhatsApp

### 9.5 Rating dan Review

Belum ada:

* rating user
* review transaksi
* reputasi pengguna penuh

### 9.6 Moderasi Kompleks

Belum ada:

* report posting
* dispute handling
* fraud detection lanjutan

### 9.7 Carbon Impact Calculator Real

Belum ada kalkulasi karbon berbasis model ilmiah penuh.
Jika ditampilkan, hanya boleh bersifat sederhana/asumsi dan bukan prioritas awal.

### 9.8 Multi-lot Purchase

Satu posting limbah dianggap satu lot penuh dan harus di-claim sebagai satu kesatuan.

### 9.9 Mobile App

Belum ada aplikasi Android/iOS.

### 9.10 Integrasi Pihak Ketiga

Belum ada integrasi dengan:

* maps API kompleks
* payment service
* logistics service
* IoT / sensor

---

## 10. Logika Matching MVP

Matching dilakukan secara **rule-based**, bukan ML.

Parameter utama:

* kategori limbah
* lokasi / jarak
* status tersedia

Output utama:

* rekomendasi limbah untuk receiver

Tujuan matching:

* membantu receiver menemukan limbah yang lebih relevan
* mempermudah pencarian di wilayah Toba

---

## 11. Data Minimum yang Harus Ada

### 11.1 Data User

* nama
* email
* password
* nomor WhatsApp
* usaha/instansi
* alamat
* latitude
* longitude

### 11.2 Data Posting Limbah

* producer
* kategori limbah
* nama limbah
* deskripsi
* quantity dalam kg
* harga
* is_free
* alamat
* latitude
* longitude
* available_date
* expiry_date
* image
* status

### 11.3 Data Claim

* waste post
* producer
* receiver
* status
* waktu claim
* waktu approval / rejection / completion

### 11.4 Data Recommendation

* kategori limbah
* judul rekomendasi
* deskripsi
* jenis pemanfaatan
* status aktif

---

## 12. Indikator Sukses MVP

MVP dianggap berhasil bila:

1. producer bisa membuat posting limbah
2. receiver bisa mencari dan melihat limbah
3. receiver bisa melakukan claim
4. producer bisa approve/reject claim
5. detail limbah menampilkan rekomendasi pemanfaatan
6. admin bisa memantau sistem
7. demo end-to-end bisa dijalankan tanpa alur putus

---

## 13. Prioritas Pengerjaan

### Prioritas 1

* auth
* role
* kategori
* posting limbah

### Prioritas 2

* listing limbah
* detail limbah
* claim flow

### Prioritas 3

* rekomendasi pemanfaatan
* admin dashboard

### Prioritas 4

* filter jarak
* statistik grafik tren

---

## 14. Prinsip Pengembangan

* fokus pada alur inti, bukan fitur terlalu banyak
* utamakan fitur yang bisa didemokan
* hindari overengineering
* pastikan backend dan frontend konsisten
* semua keputusan fitur harus tunduk pada batasan MVP ini

---

## 15. Keputusan Final Scope

GreenLoop MVP untuk lomba adalah:

**platform web limbah organik khusus Kabupaten Toba yang memungkinkan producer memposting limbah, receiver mencari dan meng-claim limbah, serta sistem menampilkan rekomendasi pemanfaatan limbah dan dashboard admin sederhana.**

Yang **dibuat**:

* auth
* role
* posting limbah
* kategori
* listing & detail
* claim
* rekomendasi pemanfaatan
* admin dashboard

Yang **tidak dibuat sekarang**:

* pembayaran
* wallet
* chat kompleks
* rating
* ML
* posting kebutuhan oleh receiver
* mobile app
* fitur enterprise

---

## 16. Catatan untuk Tim

Jika ada ide fitur baru, tanyakan dulu:

1. apakah fitur ini mendukung demo inti?
2. apakah fitur ini benar-benar menyelesaikan masalah utama?
3. apakah fitur ini wajib untuk MVP?
4. apakah tanpa fitur ini produk masih bisa berjalan?

Jika jawabannya tidak kuat, fitur tersebut masuk backlog, bukan MVP.
