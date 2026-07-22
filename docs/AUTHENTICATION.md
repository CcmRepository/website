# Arsitektur Autentikasi

Dokumen ini menjelaskan cara kerja sistem autentikasi pada website PT Cikal Citra Mapan. Autentikasi menggunakan **Supabase Auth** dengan paket `@supabase/ssr`, sehingga sesi disimpan dalam **cookie** dan bisa dibaca baik di sisi browser maupun server (server component, route handler, dan middleware).

---

## Ringkasan Fitur

- **Login** — email + password
- **Sign up** — email + password (dengan konfirmasi email opsional)
- **Forgot password** — kirim link reset ke email
- **Reset password** — set password baru dari link email
- **Dashboard** — halaman terproteksi yang hanya bisa diakses setelah login
- **Sign out**

Metode: **email & password saja** (tanpa OAuth/social login).

---

## Komponen Utama

### Supabase Clients (`app/utils/supabase/`)

| File            | Dipakai di                        | Fungsi                                            |
| --------------- | --------------------------------- | ------------------------------------------------- |
| `client.js`     | Client Component (browser)        | `createBrowserClient` — sesi disimpan di cookie   |
| `server.js`     | Server Component / Route Handler  | `createServerClient` — baca/tulis cookie via `next/headers` |
| `middleware.js` | `proxy.js`                        | Refresh sesi tiap request + proteksi route        |

Karena browser client menyimpan sesi di **cookie** (bukan `localStorage`), server bisa membaca sesi yang sama — inilah yang membuat proteksi route di sisi server berfungsi.

### `proxy.js` (root)

Menggunakan konvensi **proxy** Next.js 16 (pengganti `middleware.js` yang deprecated). Menjalankan `updateSession()` pada setiap request untuk:

1. Me-refresh token sesi agar tidak kedaluwarsa.
2. **Memblokir** akses `/dashboard` bagi yang belum login → redirect ke `/login`.
3. **Mengalihkan** pengguna yang sudah login dari `/login`, `/signup`, `/forgot-password` → `/dashboard`.

Matcher mengecualikan aset statis & gambar demi performa.

---

## Alur (Flow)

### 1. Sign Up

```
/signup  ──signUp()──►  Supabase mengirim email konfirmasi
                        (emailRedirectTo: /auth/callback)
   │
   └─ Jika "Confirm email" MATI  → sesi langsung dibuat → redirect /dashboard
   └─ Jika "Confirm email" NYALA → tampil pesan "cek email"
                                    → user klik link → /auth/callback
                                    → tukar code → sesi → /dashboard
```

### 2. Login

```
/login  ──signInWithPassword()──►  sesi dibuat (cookie)  ──►  /dashboard
```

### 3. Forgot / Reset Password

```
/forgot-password ──resetPasswordForEmail()──► email berisi link reset
   (redirectTo: /auth/callback?next=/reset-password)
        │
        └─ user klik link ─► /auth/callback ─► tukar code ─► sesi recovery
                                              ─► /reset-password
                                              ─► updateUser({ password })
                                              ─► /dashboard
```

### 4. Sign Out

Tombol `SignOutButton` memanggil `supabase.auth.signOut()` lalu redirect ke `/login`.

---

## `/auth/callback` (Route Handler)

Semua link yang dikirim Supabase lewat email (konfirmasi signup & reset password) mengarah ke sini. Route ini menukar parameter `code` menjadi sesi (`exchangeCodeForSession`), lalu redirect ke tujuan (`next`, default `/dashboard`). Jika gagal, redirect ke `/login` dengan pesan error.

---

## Proteksi Route

Proteksi terjadi di **dua lapis**:

1. **`proxy.js`** — lapisan utama; mencegat request sebelum halaman dirender.
2. **`dashboard/page.jsx`** — pengaman tambahan; memanggil `getUser()` di server dan `redirect('/login')` jika tidak ada user.

Untuk menambah route terproteksi baru, tambahkan pengecekan di `app/utils/supabase/middleware.js`:

```js
if (!user && pathname.startsWith('/route-baru')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
}
```

---

## Header Auth-Aware

`app/components/Header.js` memantau status login secara real-time via `supabase.auth.onAuthStateChange`. Link di navbar berubah otomatis:

- **Belum login** → **Login**
- **Sudah login** → **Dashboard**

---

## Role & Admin

Role pengguna disimpan di tabel **`public.profiles`** (bukan `user_metadata`, agar user tidak bisa menaikkan dirinya sendiri menjadi admin).

### Setup (wajib dijalankan sekali)

Jalankan migrasi [supabase/migrations/0001_profiles_and_roles.sql](../supabase/migrations/0001_profiles_and_roles.sql) di **Supabase Dashboard → SQL Editor**. Migrasi ini:

1. Membuat tabel `profiles` (`id`, `role`, `created_at`) + Row Level Security.
2. Membuat trigger `on_auth_user_created` → tiap user baru otomatis dapat profil.
   - **User pertama** (tabel masih kosong) → `admin`
   - User berikutnya → `user`
3. Backfill user yang sudah ada, lalu mempromosikan user paling awal menjadi `admin`.

Aman dijalankan berulang (idempotent).

### Cara pakai di kode

```js
import { getUserRole } from '@/app/utils/roles';

const role = await getUserRole(supabase, user.id); // 'admin' | 'user'
```

`getUserRole` mengembalikan `'user'` sebagai fallback bila migrasi belum dijalankan, sehingga aplikasi tetap berjalan. Di `/dashboard`, badge role ditampilkan dan panel **Admin Area** hanya muncul untuk admin.

### Mengubah role manual

Lewat SQL Editor:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'seseorang@contoh.com');
```

---

## Catatan Keamanan

- Selalu gunakan `supabase.auth.getUser()` (bukan `getSession()`) di sisi server untuk verifikasi, karena `getUser()` memvalidasi token ke server Supabase.
- **Anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) aman diekspos ke browser — keamanan sebenarnya ditegakkan oleh **Row Level Security (RLS)** di Supabase. Aktifkan RLS pada setiap tabel data yang kamu buat nanti.
- Jangan pernah menaruh **service_role key** di variabel `NEXT_PUBLIC_*`.
