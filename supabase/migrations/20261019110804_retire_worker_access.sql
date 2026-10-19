-- Retire the transcription worker API without deleting historical records.
drop policy if exists "Workers can update their own profile" on public.workers;
drop policy if exists "Workers can view their own profile" on public.workers;
drop policy if exists "Workers can update tasks they claimed" on public.tasks;
drop policy if exists "Workers can view available tasks or their own tasks" on public.tasks;
drop policy if exists "Workers can insert their own submissions" on public.submissions;
drop policy if exists "Workers can view their own submissions" on public.submissions;
drop policy if exists "Workers can view their own payments" on public.payments;

revoke all on public.workers, public.tasks, public.submissions, public.payments
  from public, anon, authenticated;

-- The marketplace contact form needs write-only access from visitors.
drop policy if exists "Anyone can submit contact messages" on public.contact_submissions;
revoke all on public.contact_submissions from public, anon, authenticated;
grant insert on public.contact_submissions to anon, authenticated;
create policy marketplace_contact_insert on public.contact_submissions for insert
  to anon, authenticated with check (true);
