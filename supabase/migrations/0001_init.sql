-- Accounts: the two tables that let progress follow a person between devices.
--
-- This file is a transcription of a schema that was built by hand in the
-- Supabase dashboard and, until now, existed nowhere else. It was read back
-- out of the live project, so it describes what is actually running rather
-- than what anyone remembers setting up. Written idempotently: re-applying it
-- to the live project is a no-op.
--
-- The security posture is the whole point of this file, so it is worth stating
-- plainly. The publishable key ships inside the client bundle, which means
-- anyone can read it and talk to this API as `anon`. Nothing here is protected
-- by the app being the only caller; it is protected by RLS. scripts/check-rls.mjs
-- attacks these policies through the real API for exactly that reason.

-- ---------------------------------------------------------------- profiles
-- A handful of denormalised numbers per person. Nothing in the app reads this
-- table — the app's own copy of the truth is the progress blob below. It
-- exists so that comparing two people later (the streak comparison that is
-- eventually wanted) is one indexed query rather than a scan over everybody's
-- JSON.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  streak_count integer not null default 0,
  lessons_done integer not null default 0,
  last_active date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles drop constraint if exists profiles_display_name_len;
alter table public.profiles
  add constraint profiles_display_name_len
  check (display_name is null or char_length(display_name) <= 40);

-- ---------------------------------------------------------------- progress
-- The learner's entire local state, stored verbatim as one jsonb document.
--
-- Deliberately not a normalised schema of lessons and completions. The shape
-- of that state is the app's business and changes with it; a relational mirror
-- would have to be migrated in lockstep with every curriculum change, and the
-- server has no opinion about any of it. Merging two copies is pure client-side
-- logic in src/lib/merge.js, which is testable without a database at all.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------- updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path to '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists progress_touch_updated_at on public.progress;
create trigger progress_touch_updated_at
  before update on public.progress
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------- a row for every new user
-- sync.js writes the profile summary with an upsert, but the row existing from
-- the start keeps the very first sync from depending on that.
--
-- SECURITY DEFINER because it writes to public.profiles on behalf of someone
-- who is, at this instant, mid-signup. `set search_path to ''` is not optional
-- on a definer function: without it the caller controls name resolution and
-- can point `profiles` at something of their own.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path to '' as $$
begin
  insert into public.profiles (id) values (new.id) on conflict (id) do nothing;
  return new;
end;
$$;

-- Nobody may call it directly; it runs only as a trigger. check-rls.mjs
-- asserts this.
revoke execute on function public.handle_new_user() from anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- --------------------------------------------------------------------- RLS
-- Every policy is `to authenticated` and own-row-only.
--
-- On the table grants: Supabase hands `anon` the usual table privileges by
-- default and they are left in place, because they buy nothing. With RLS on
-- and no policy granting `anon` anything, an anonymous request matches zero
-- rows — a privilege to touch rows you can never see is not access. This is
-- the standard posture, and check-rls.mjs confirms the outcome rather than
-- trusting the reasoning.
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "create own profile" on public.profiles;
create policy "create own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- No delete policy on profiles, on purpose: a profile dies with its auth user
-- through the foreign key, and a stray delete should affect zero rows.

drop policy if exists "read own progress" on public.progress;
create policy "read own progress" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "create own progress" on public.progress;
create policy "create own progress" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "update own progress" on public.progress;
create policy "update own progress" on public.progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Progress *can* be deleted by its owner: "start over" is a reasonable thing
-- to want, and it is their own work.
drop policy if exists "delete own progress" on public.progress;
create policy "delete own progress" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- The policies reference auth.uid() as `(select auth.uid())` rather than bare.
-- Postgres then evaluates it once as an InitPlan instead of once per row, which
-- is what Supabase's own performance advisor asks for.
