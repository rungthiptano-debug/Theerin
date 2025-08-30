-- Create health_data table to store health metrics from smartwatches
create table if not exists public.health_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  watch_connection_id uuid references public.watch_connections(id) on delete cascade,
  metric_type text not null check (metric_type in ('heart_rate', 'steps', 'sleep', 'calories', 'distance', 'exercise_minutes')),
  metric_value numeric not null,
  metric_unit text not null, -- 'bpm', 'steps', 'hours', 'calories', 'km', 'minutes'
  recorded_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.health_data enable row level security;

-- Create RLS policies for health_data
create policy "health_data_select_own"
  on public.health_data for select
  using (auth.uid() = user_id);

create policy "health_data_insert_own"
  on public.health_data for insert
  with check (auth.uid() = user_id);

create policy "health_data_update_own"
  on public.health_data for update
  using (auth.uid() = user_id);

create policy "health_data_delete_own"
  on public.health_data for delete
  using (auth.uid() = user_id);

-- Add performance indexes
create index if not exists health_data_user_id_idx on public.health_data(user_id);
create index if not exists health_data_metric_type_idx on public.health_data(metric_type);
create index if not exists health_data_recorded_at_idx on public.health_data(recorded_at);
create index if not exists health_data_watch_connection_idx on public.health_data(watch_connection_id);
