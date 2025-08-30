-- Create watch_connections table to store user's connected smartwatches
create table if not exists public.watch_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_name text not null,
  device_type text not null, -- 'apple_watch', 'fitbit', 'samsung_galaxy'
  device_model text,
  battery_level integer default 100,
  connection_status text default 'connected' check (connection_status in ('connected', 'disconnected', 'syncing')),
  last_sync timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.watch_connections enable row level security;

-- Create RLS policies for watch_connections
create policy "watch_connections_select_own"
  on public.watch_connections for select
  using (auth.uid() = user_id);

create policy "watch_connections_insert_own"
  on public.watch_connections for insert
  with check (auth.uid() = user_id);

create policy "watch_connections_update_own"
  on public.watch_connections for update
  using (auth.uid() = user_id);

create policy "watch_connections_delete_own"
  on public.watch_connections for delete
  using (auth.uid() = user_id);

-- Add performance index
create index if not exists watch_connections_user_id_idx on public.watch_connections(user_id);
create index if not exists watch_connections_status_idx on public.watch_connections(connection_status);
