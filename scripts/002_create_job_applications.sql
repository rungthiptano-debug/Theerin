-- Create job applications table
create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_id text not null, -- We'll use job IDs from our static data
  company_name text not null,
  job_title text not null,
  application_date timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'applied' check (status in ('applied', 'reviewed', 'interview', 'rejected', 'accepted')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.job_applications enable row level security;

-- Create policies for job applications
create policy "job_applications_select_own"
  on public.job_applications for select
  using (auth.uid() = user_id);

create policy "job_applications_insert_own"
  on public.job_applications for insert
  with check (auth.uid() = user_id);

create policy "job_applications_update_own"
  on public.job_applications for update
  using (auth.uid() = user_id);

create policy "job_applications_delete_own"
  on public.job_applications for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists job_applications_user_id_idx on public.job_applications(user_id);
create index if not exists job_applications_job_id_idx on public.job_applications(job_id);
