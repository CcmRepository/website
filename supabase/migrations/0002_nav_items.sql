-- ============================================================================
-- Nav Items (Page Visibility)
-- ----------------------------------------------------------------------------
-- Menyimpan halaman yang tampil di menu header dan status aktif/nonaktifnya.
-- Semua orang bisa MEMBACA (agar header bisa render, termasuk saat logout),
-- tetapi hanya ADMIN yang bisa MENGUBAH.
--
-- Cara menjalankan:
--   Supabase Dashboard -> SQL Editor -> tempel seluruh isi file ini -> Run.
--   Aman dijalankan berulang (idempotent).
-- ============================================================================

create table if not exists public.nav_items (
    key text primary key,
    label text not null,
    href text not null,
    enabled boolean not null default true,
    position int not null default 0
);

alter table public.nav_items enable row level security;

-- Baca: untuk semua (anon & authenticated)
drop policy if exists "nav_items readable by all" on public.nav_items;
create policy "nav_items readable by all"
    on public.nav_items for select
    using (true);

-- Ubah: hanya admin
drop policy if exists "nav_items updatable by admin" on public.nav_items;
create policy "nav_items updatable by admin"
    on public.nav_items for update
    using (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
        )
    )
    with check (
        exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role = 'admin'
        )
    );

-- Seed halaman default (Home tidak dimasukkan — selalu tampil).
insert into public.nav_items (key, label, href, enabled, position) values
    ('shop', 'Shop', '/shop', true, 1),
    ('portfolio', 'Portfolio', '/portfolio', true, 2),
    ('book-online', 'Book Online', '/book-online', true, 3)
on conflict (key) do nothing;
