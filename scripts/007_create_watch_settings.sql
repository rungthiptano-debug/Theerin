-- Create watch_settings table to store user preferences for watch features
create table if not exists public.watch_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  watch_connection_id uuid references public.watch_connections(id) on delete cascade,
  setting_category text not null check (setting_category in ('notifications', 'health_monitoring', 'privacy', 'accessibility', 'watch_face')),
  setting_key text not null,
  setting_value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, watch_connection_id, setting_category, setting_key)
);

-- Enable Row Level Security
alter table public.watch_settings enable row level security;

-- Create RLS policies for watch_settings
create policy "watch_settings_select_own"
  on public.watch_settings for select
  using (auth.uid() = user_id);

create policy "watch_settings_insert_own"
  on public.watch_settings for insert
  with check (auth.uid() = user_id);

create policy "watch_settings_update_own"
  on public.watch_settings for update
  using (auth.uid() = user_id);

create policy "watch_settings_delete_own"
  on public.watch_settings for delete
  using (auth.uid() = user_id);

-- Add performance indexes
create index if not exists watch_settings_user_id_idx on public.watch_settings(user_id);
create index if not exists watch_settings_category_idx on public.watch_settings(setting_category);
create index if not exists watch_settings_watch_connection_idx on public.watch_settings(watch_connection_id);
