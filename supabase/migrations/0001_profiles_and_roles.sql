-- ============================================================================
-- Profiles & Roles
-- ----------------------------------------------------------------------------
-- Menambahkan tabel `profiles` dengan kolom `role` dan otomatis menjadikan
-- USER PERTAMA sebagai `admin`; user berikutnya menjadi `user`.
--
-- Cara menjalankan:
--   Supabase Dashboard -> SQL Editor -> tempel seluruh isi file ini -> Run.
--   Aman dijalankan berulang (idempotent).
-- ============================================================================

-- 1. Tabel profiles (1:1 dengan auth.users)
create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    role text not null default 'user' check (role in ('admin', 'user')),
    created_at timestamptz not null default now()
);

-- 2. Row Level Security: user hanya bisa melihat & mengubah profilnya sendiri.
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
    on public.profiles for select
    using (auth.uid() = id);

-- Catatan: kolom `role` sengaja TIDAK diberi policy update untuk user biasa,
-- agar user tidak bisa menaikkan dirinya menjadi admin. Perubahan role
-- dilakukan lewat SQL Editor atau service_role.

-- 3. Fungsi: buat profil otomatis saat user baru mendaftar.
--    User pertama (tabel profiles masih kosong) => admin, sisanya => user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
    existing_count int;
begin
    select count(*) into existing_count from public.profiles;

    insert into public.profiles (id, role)
    values (
        new.id,
        case when existing_count = 0 then 'admin' else 'user' end
    )
    on conflict (id) do nothing;

    return new;
end;
$$;

-- 4. Trigger di auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- 5. Backfill user yang sudah ada SEBELUM migrasi ini dijalankan.
--    Semua user existing dibuatkan profil, lalu user paling awal (created_at
--    terkecil) dipromosikan menjadi admin.
insert into public.profiles (id, role, created_at)
select u.id, 'user', u.created_at
from auth.users u
on conflict (id) do nothing;

update public.profiles
set role = 'admin'
where id = (
    select id from auth.users order by created_at asc limit 1
);
