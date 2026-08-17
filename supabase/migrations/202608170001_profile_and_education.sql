create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  contact_email text not null check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text,
  birth_date date check (birth_date is null or birth_date <= current_date),
  address_line text,
  city text,
  state text,
  postal_code text,
  country text,
  linkedin_url text check (linkedin_url is null or linkedin_url ~* '^https?://'),
  github_url text check (github_url is null or github_url ~* '^https?://'),
  avatar_path text,
  biography text check (biography is null or char_length(biography) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.educations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  institution text not null check (char_length(trim(institution)) between 2 and 160),
  course text not null check (char_length(trim(course)) between 2 and 160),
  degree text,
  started_at date,
  ended_at date,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'paused', 'cancelled')),
  completion_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ended_at is null or started_at is null or ended_at >= started_at)
);

create index educations_user_id_idx on public.educations(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger educations_set_updated_at
before update on public.educations
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.educations enable row level security;

revoke all on public.profiles, public.educations from anon;
grant select, insert, update, delete on public.profiles, public.educations to authenticated;

create policy "Users manage their own profile"
on public.profiles
for all
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users manage their own educations"
on public.educations
for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-photos',
  'profile-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
);

create policy "Users upload their own profile photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users read their own profile photos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users update their own profile photos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
)
with check (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Users delete their own profile photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'profile-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
