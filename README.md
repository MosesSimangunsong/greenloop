# GreenLoop

GreenLoop adalah web app MVP untuk pertukaran limbah organik di Kabupaten Toba. Aplikasi ini mempertemukan pihak yang memiliki limbah organik (`producer`) dengan pihak yang membutuhkan atau ingin mengolah limbah tersebut (`receiver`). Selain listing limbah dan alur claim, sistem juga menampilkan rekomendasi pemanfaatan limbah dan menyediakan dashboard monitoring untuk admin.

README ini ditulis untuk membantu teman collaborator memahami apa yang sudah dikerjakan di repo ini, bagian mana yang sudah stabil, dan bagaimana cara menjalankannya tanpa harus menebak-nebak isi project.

## 1. Tujuan project ini

Fokus GreenLoop saat ini adalah MVP lomba, jadi yang dikejar bukan fitur sebanyak mungkin, tetapi alur inti yang benar-benar hidup dan bisa didemokan.

Masalah yang ingin diselesaikan:

- limbah organik ada, tapi tidak tersalurkan dengan baik
- producer sulit menemukan receiver yang relevan
- receiver tidak selalu tahu limbah itu bisa dimanfaatkan menjadi apa
- admin butuh visibilitas sederhana terhadap aktivitas sistem

## 2. Stack yang dipakai

Backend:

- Laravel
- Eloquent ORM
- Form Request Validation
- Policy / Gate authorization

Frontend:

- React
- Inertia.js
- Tailwind CSS
- pola komponen bergaya shadcn/ui untuk layout baru
- lucide-react untuk icon

Tooling:

- Vite
- PHPUnit / Laravel test

## 3. Kondisi implementasi saat ini

Secara umum, repo ini sudah tidak lagi dalam tahap setup awal. Fitur inti MVP sudah diimplementasikan dan sudah melewati beberapa putaran hardening serta refactor layout.

Yang sudah selesai:

- auth dasar login/register/logout
- profile user dengan data bisnis dan lokasi
- multi-role `producer`, `receiver`, `admin`
- CRUD posting limbah untuk producer
- listing dan detail limbah untuk receiver
- claim flow antara receiver dan producer
- admin dashboard, analytics, monitoring user/post/claim
- manajemen kategori limbah
- manajemen rekomendasi pemanfaatan limbah
- matching rule-based sederhana berdasarkan kategori, radius, dan lokasi
- demo seeder dan akun demo
- authorization berbasis policy/gate
- refactor layout menjadi sidebar kiri

Yang sengaja belum dikerjakan karena di luar scope MVP:

- payment gateway
- chat internal penuh
- rating/review
- machine learning recommendation
- mobile app
- marketplace berskala nasional

## 4. Alur bisnis utama yang sudah jalan

### Producer

Producer bisa:

- melengkapi profil
- membuat posting limbah
- melihat posting miliknya
- mengedit posting jika belum diproses
- menghapus posting jika belum diproses
- melihat claim masuk
- approve / reject claim
- menandai claim sebagai selesai

### Receiver

Receiver bisa:

- melengkapi profil dan lokasi
- melihat daftar limbah yang tersedia
- filter berdasarkan kategori dan radius
- membuka detail limbah
- melihat rekomendasi pemanfaatan limbah
- melihat reasoning matching sederhana
- mengajukan claim
- membatalkan claim yang masih pending
- melihat riwayat claim miliknya

### Admin

Admin bisa:

- melihat dashboard statistik
- melihat analytics sederhana
- memantau user
- memantau waste posts
- memantau claims
- mengelola kategori limbah
- mengelola rekomendasi pemanfaatan

## 5. Status penting yang dipakai di project

Status ini sudah dipakai konsisten di backend dan frontend. Kalau mau menambah fitur baru, jangan mengubah nilai ini sembarangan.

### waste_posts

- `available`
- `pending`
- `reserved`
- `in_process`
- `completed`
- `cancelled`

### waste_claims

- `pending`
- `approved`
- `rejected`
- `completed`
- `cancelled`

## 6. Struktur folder penting

Berikut bagian repo yang paling sering dipakai saat development:

### Backend

- `app/Models`
  model domain utama seperti `WastePost`, `WasteClaim`, `WasteCategory`, `WasteRecommendation`

- `app/Http/Controllers`
  controller untuk profile, waste post, claim, dan admin

- `app/Http/Requests`
  validasi request untuk form producer, receiver, dan admin

- `app/Services`
  logika aplikasi yang sudah dipisah dari controller, misalnya:
  - `WastePostService`
  - `WasteClaimService`
  - `WasteListingService`
  - `MatchingService`
  - `DistanceService`
  - `RecommendationService`

- `app/Policies`
  policy authorization untuk `WastePost` dan `WasteClaim`

- `database/migrations`
  struktur database utama project

- `database/seeders`
  seed role, kategori, dan demo data

### Frontend

- `resources/js/Pages`
  semua halaman Inertia

- `resources/js/Layouts`
  shell layout utama aplikasi
  - `GuestLayout`
  - `AuthenticatedLayout`
  - `AppLayout`
  - `AdminLayout`

- `resources/js/Components`
  komponen reusable seperti:
  - `AppSidebar`
  - `StatusBadge`
  - `WasteCard`
  - `RecommendationPanel`
  - `EmptyState`

- `resources/js/Components/ui`
  komponen arah shadcn-style untuk layout dan navigasi

### Dokumen acuan

- `docs/PRD.md`
- `docs/USER_FLOW.md`
- `docs/MODULAR_IMPLEMENTATION.md`

Kalau ingin memahami keputusan product dan scope MVP, mulai dari folder `docs`.

## 7. Layout dan navigasi terbaru

Sebelumnya aplikasi memakai menu atas. Sekarang layout sudah direfactor menjadi gaya dashboard dengan sidebar kiri.

Struktur layout terbaru:

- `AppLayout`
  shell dasar aplikasi

- `AuthenticatedLayout`
  dipakai halaman user biasa, dan isi sidebar disusun berdasarkan role aktif user

- `AdminLayout`
  dipakai khusus halaman admin agar area admin tetap terpisah dari area user

Yang perlu diketahui collaborator:

- halaman user dan admin masih kompatibel dengan flow lama
- perubahan ini fokus pada UI structure, bukan logic bisnis
- mobile navigation sekarang memakai drawer dari kiri

## 8. Seeder dan akun demo

Repo ini sudah punya demo data agar aplikasi tidak kosong saat dibuka.

Akun demo:

- Admin
  - email: `admin@greenloop.test`
  - password: `password`

- Producer
  - email: `producer@greenloop.test`
  - password: `password`

- Receiver
  - email: `receiver@greenloop.test`
  - password: `password`

Seeder demo juga membuat:

- beberapa kategori
- beberapa rekomendasi limbah
- beberapa posting lintas status
- beberapa claim lintas status
- activity log untuk dashboard admin

## 9. Cara menjalankan project

### 1. Install dependency

```bash
composer install
npm install
```

### 2. Siapkan environment

Copy `.env` jika belum ada, lalu sesuaikan database.

Contoh yang dipakai di workspace ini:

- database lokal sudah pernah memakai nama `db_localgreen`

### 3. Generate key dan migrasi

```bash
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 4. Jalankan app

```bash
php artisan serve
npm run dev
```

Atau untuk build production frontend:

```bash
npm run build
```

## 10. Cara cek apakah project masih sehat

Minimal cek ini sebelum commit besar:

```bash
php artisan test
npm run build
```

Status terakhir saat repo ini dirapikan:

- test suite lulus
- build frontend lulus

## 11. Modul yang sudah dikerjakan per tahap

Project ini dikerjakan mengikuti urutan modular dari `docs/MODULAR_IMPLEMENTATION.md`.

Ringkasannya:

### Tahap 1 - Foundation Setup

- Laravel + React + Inertia aktif
- auth dasar tersedia
- struktur folder frontend/backend siap

### Tahap 2 - Core Domain Setup

- migration domain utama selesai
- enum status sudah ada
- model dan relasi domain utama sudah dipakai
- seeder role dan kategori sudah tersedia

### Tahap 3 - Producer Flow

- profile producer
- create/edit/delete post
- upload image
- daftar posting milik producer

### Tahap 4 - Receiver Flow

- browse waste posts
- filter kategori
- filter radius
- detail limbah

### Tahap 5 - Claim Flow

- receiver claim limbah
- producer approve / reject / complete
- riwayat claim

### Tahap 6 - Admin Flow

- admin dashboard
- monitoring user/post/claim
- CRUD kategori
- CRUD rekomendasi

### Tahap 7 - Matching & Recommendation

- `MatchingService`
- `DistanceService`
- `RecommendationService`
- label kecocokan di listing/detail
- reasoning sederhana di halaman detail

### Tahap 8 - Analytics & Demo Support

- analytics page
- status breakdown
- top category
- waste trend
- demo seeder
- akun demo

### Tahap 9 - Refinement & Hardening

- policy/gate authorization
- regression tests tambahan
- empty state yang lebih rapi
- flash status global
- refactor layout sidebar kiri

## 12. File penting yang sering disentuh

Kalau collaborator ingin lanjut kerja, biasanya file-file ini yang paling relevan:

- `routes/web.php`
- `app/Http/Controllers/AdminController.php`
- `app/Http/Controllers/WastePostController.php`
- `app/Http/Controllers/WasteClaimController.php`
- `app/Services/WasteListingService.php`
- `app/Services/WasteClaimService.php`
- `app/Services/MatchingService.php`
- `resources/js/Layouts/AuthenticatedLayout.jsx`
- `resources/js/Layouts/AdminLayout.jsx`
- `resources/js/Components/AppSidebar.jsx`

## 13. Prinsip kerja di repo ini

Beberapa prinsip yang sudah dijaga sampai titik sekarang:

- jangan menambah fitur di luar MVP tanpa keputusan tim
- logic bisnis sebisa mungkin ditaruh di service, bukan controller
- validasi form lewat Form Request
- authorization lewat policy/gate
- UI reusable lebih diutamakan daripada copy-paste per halaman
- perubahan besar sebaiknya tetap mengikuti urutan modular

## 14. Kalau ingin lanjut mengembangkan repo ini

Urutan aman untuk collaborator:

1. baca `docs/PRD.md`
2. baca `docs/USER_FLOW.md`
3. baca `docs/MODULAR_IMPLEMENTATION.md`
4. jalankan project dan login dengan akun demo
5. test demo path end-to-end
6. baru lanjut perubahan berikutnya

Demo path minimum yang sebaiknya selalu aman:

1. login sebagai producer
2. buat posting limbah
3. login sebagai receiver
4. cari limbah dan buka detail
5. claim limbah
6. login lagi sebagai producer
7. approve claim lalu complete
8. login sebagai admin
9. cek dashboard dan analytics

## 15. Catatan terakhir

Project ini sudah berada di fase MVP yang cukup matang. Artinya, fondasi utamanya sudah ada dan bisa dipakai, tetapi setiap perubahan baru tetap perlu hati-hati supaya tidak merusak flow demo yang sudah hidup.

Kalau ada bagian yang terasa membingungkan, biasanya jawabannya ada di tiga tempat:

- `docs/` untuk keputusan produk
- `app/Services` untuk logika aplikasi
- `resources/js/Layouts` dan `resources/js/Components` untuk struktur UI

Intinya: repo ini bukan lagi blank Laravel. Ini sudah menjadi GreenLoop MVP yang punya alur producer, receiver, admin, matching sederhana, analytics, demo data, dan layout dashboard sidebar yang siap dilanjutkan bersama.
