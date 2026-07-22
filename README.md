# PT Cikal Citra Mapan — Website

Website perusahaan **PT Cikal Citra Mapan** (produsen furnitur & kontraktor interior, berdiri sejak 1980). Dibangun dengan Next.js App Router, styling Tailwind CSS, dan autentikasi Supabase.

---

## Tech Stack

| Bagian        | Teknologi                                   |
| ------------- | ------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI            | React 19                                    |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com)  |
| Autentikasi   | [Supabase Auth](https://supabase.com) (`@supabase/ssr`) |
| Ikon          | `react-icons`                               |
| Font          | Poppins & Montserrat (via `next/font`)      |

---

## Menjalankan Secara Lokal

### 1. Prasyarat

- Node.js 20+ (disarankan kelola dengan [nvm](https://github.com/nvm-sh/nvm))
- Akun & project [Supabase](https://supabase.com)

### 2. Install dependency

```bash
npm install
```

### 3. Siapkan environment variables

Salin file contoh lalu isi kredensial Supabase:

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
```

> `.env.local` sudah otomatis di-ignore git — kredensial tidak akan ter-commit.

### 4. Jalankan dev server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Script yang tersedia

| Perintah         | Fungsi                          |
| ---------------- | ------------------------------- |
| `npm run dev`    | Menjalankan dev server          |
| `npm run build`  | Build produksi                  |
| `npm run start`  | Menjalankan hasil build         |
| `npm run lint`   | Menjalankan ESLint              |

---

## Setup Supabase

1. **Buat project** di [supabase.com](https://supabase.com) → **New project** (pilih region terdekat, mis. Singapore).
2. **Ambil kredensial**: **Project Settings → Data API** (Project URL) dan **API Keys** (anon/publishable key). Masukkan ke `.env.local`.
3. **Konfigurasi URL redirect**: **Authentication → URL Configuration**
   - **Site URL**: `http://localhost:3000` (dev) / domain produksi
   - **Redirect URLs**: tambahkan `http://localhost:3000/auth/callback` (dan `https://<domain-produksi>/auth/callback`)
4. **Email provider**: **Authentication → Providers → Email**. Jika **Confirm email** aktif, pengguna wajib mengonfirmasi lewat email sebelum bisa login. Untuk pengembangan cepat, opsi ini bisa dimatikan.
5. **Role & admin**: jalankan migrasi [supabase/migrations/0001_profiles_and_roles.sql](supabase/migrations/0001_profiles_and_roles.sql) di **SQL Editor**. Ini membuat tabel `profiles` + role, dan menjadikan **user pertama sebagai admin** secara otomatis.
6. **Menu halaman**: jalankan migrasi [supabase/migrations/0002_nav_items.sql](supabase/migrations/0002_nav_items.sql) di **SQL Editor**. Ini membuat tabel `nav_items` sehingga admin bisa mengaktifkan/menonaktifkan halaman di menu header lewat **Admin Area**.

> ⚠️ Tanpa Redirect URL yang benar, link konfirmasi & reset password dari email akan ditolak Supabase.

Detail arsitektur autentikasi: lihat [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md).

---

## Struktur Proyek

```
website/
├── app/
│   ├── layout.js                 → Root layout (Header, font, padding-top)
│   ├── page.jsx                  → Halaman utama (Home)
│   ├── globals.css               → Import Tailwind + token tema + base style
│   ├── components/
│   │   ├── Header.js             → Navbar fixed, auth-aware (Login/Dashboard)
│   │   ├── Footer.js             → Footer: kontak + CTA WhatsApp
│   │   └── auth-ui.js            → Komponen UI form auth bersama
│   ├── login/page.jsx            → Halaman login
│   ├── signup/page.jsx           → Halaman daftar
│   ├── forgot-password/page.jsx  → Minta link reset password
│   ├── reset-password/page.jsx   → Set password baru
│   ├── dashboard/
│   │   ├── page.jsx              → Dashboard (protected, server component)
│   │   └── SignOutButton.js      → Tombol sign out (client)
│   ├── auth/callback/route.js    → Tukar kode dari link email → sesi
│   └── utils/supabase/
│       ├── client.js             → Supabase client (browser)
│       ├── server.js             → Supabase client (server)
│       └── middleware.js         → Refresh sesi + proteksi route
├── proxy.js                      → Entry proxy Next.js 16 (proteksi route)
├── public/images/                → Aset gambar
└── .env.local                    → Kredensial Supabase (tidak di-commit)
```

---

## Routing

| Route              | Akses           | Status      |
| ------------------ | --------------- | ----------- |
| `/`                | Publik          | ✅ Aktif    |
| `/login`           | Publik          | ✅ Aktif    |
| `/signup`          | Publik          | ✅ Aktif    |
| `/forgot-password` | Publik          | ✅ Aktif    |
| `/reset-password`  | Via link email  | ✅ Aktif    |
| `/dashboard`       | **Perlu login** | ✅ Aktif    |
| `/shop`            | Publik          | 🚧 Rencana  |
| `/portfolio`       | Publik          | 🚧 Rencana  |
| `/book-online`     | Publik          | 🚧 Rencana  |

> Link `Shop`, `Portfolio`, dan `Book Online` sudah ada di navbar tetapi halamannya belum dibuat.

---

## Styling

Proyek memakai **Tailwind CSS v4**. Palet warna & font didefinisikan sebagai token tema di [app/globals.css](app/globals.css):

| Token             | Nilai      | Penggunaan                         |
| ----------------- | ---------- | ---------------------------------- |
| `brand`           | `#263440`  | Header, footer, judul, tombol      |
| `cream`           | `#F3F2EE`  | Latar halaman                      |
| `ink`             | `#252226`  | Teks utama                         |
| `textbox`         | `#E6E0D6`  | Kartu "Our Offerings"              |
| `font-poppins`    | Poppins    | Judul                              |
| `font-montserrat` | Montserrat | Teks paragraf                      |

Gunakan lewat utility seperti `bg-brand`, `text-ink`, `font-poppins`, dll.

---

## Deployment (Vercel)

1. Push repo ke GitHub.
2. Import project di [Vercel](https://vercel.com/new).
3. Tambahkan environment variables `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di **Settings → Environment Variables**.
4. Di Supabase, tambahkan domain produksi ke **Site URL** dan **Redirect URLs** (`https://<domain>/auth/callback`).
5. Deploy.

Alternatif via CLI:

```bash
npm install -g vercel
vercel            # preview
vercel --prod     # produksi
```
