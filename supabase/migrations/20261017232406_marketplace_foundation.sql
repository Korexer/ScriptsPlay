-- ScriptsPlay marketplace foundation. Legacy worker tables are deliberately untouched.
-- All money amounts use the smallest unit of the order currency.

create table public.marketplace_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9][a-z0-9_-]{2,39}$'),
  display_name text not null check (char_length(display_name) between 2 and 100),
  bio text not null default '' check (char_length(bio) <= 2000),
  country_code text check (country_code ~ '^[A-Z]{2}$'),
  city text check (char_length(city) <= 120),
  languages text[] not null default '{}',
  portfolio_url text check (char_length(portfolio_url) <= 500 and portfolio_url ~* '^https?://'),
  avatar_path text,
  is_creator boolean not null default false,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.creator_offers (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.marketplace_profiles(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{2,99}$'),
  kind text not null check (kind in ('custom', 'ready_made', 'physical_role')),
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'paused', 'rejected', 'archived')),
  category_slug text not null,
  title text not null check (char_length(title) between 15 and 120),
  description text not null check (char_length(description) between 40 and 10000),
  deliverable text not null check (char_length(deliverable) between 10 and 1500),
  tags text[] not null default '{}',
  language_code text,
  country_code text check (country_code ~ '^[A-Z]{2}$'),
  city text,
  is_remote boolean not null default true,
  price_minor bigint not null check (price_minor > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  delivery_days integer not null default 7 check (delivery_days between 0 and 180),
  revisions integer not null default 1 check (revisions between 0 and 20),
  buyer_requirements text not null default '',
  usage_rights text not null check (char_length(usage_rights) between 10 and 3000),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index creator_offers_public_category_idx on public.creator_offers(category_slug, published_at desc) where status = 'published';
create index creator_offers_creator_idx on public.creator_offers(creator_id, updated_at desc);
create index creator_offers_search_idx on public.creator_offers using gin
  (to_tsvector('simple', title || ' ' || description || ' ' || deliverable));

create table public.offer_media (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references public.creator_offers(id) on delete cascade,
  object_path text not null unique,
  media_type text not null check (media_type in ('image', 'video', 'audio')),
  caption text not null default '' check (char_length(caption) <= 250),
  position integer not null default 0 check (position between 0 and 20),
  created_at timestamptz not null default now()
);
create index offer_media_offer_idx on public.offer_media(offer_id, position);

create table public.casting_calls (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.marketplace_profiles(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'closed', 'rejected')),
  title text not null check (char_length(title) between 10 and 150),
  description text not null check (char_length(description) between 40 and 10000),
  category_slug text not null,
  country_code text check (country_code ~ '^[A-Z]{2}$'),
  city text,
  is_remote boolean not null default true,
  budget_minor bigint check (budget_minor > 0),
  currency text check (currency ~ '^[A-Z]{3}$'),
  application_deadline timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((budget_minor is null) = (currency is null))
);
create index casting_calls_public_idx on public.casting_calls(published_at desc) where status = 'published';
create index casting_calls_buyer_idx on public.casting_calls(buyer_id, updated_at desc);

create table public.casting_applications (
  id uuid primary key default gen_random_uuid(),
  casting_id uuid not null references public.casting_calls(id) on delete cascade,
  creator_id uuid not null references public.marketplace_profiles(id) on delete cascade,
  message text not null check (char_length(message) between 20 and 3000),
  sample_url text check (char_length(sample_url) <= 500 and sample_url ~* '^https?://'),
  status text not null default 'submitted' check (status in ('submitted', 'shortlisted', 'declined', 'withdrawn')),
  created_at timestamptz not null default now(),
  unique(casting_id, creator_id)
);
create index casting_applications_creator_idx on public.casting_applications(creator_id, created_at desc);

-- Only trusted server code creates or changes financial rows.
create table public.marketplace_orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.marketplace_profiles(id),
  creator_id uuid not null references public.marketplace_profiles(id),
  offer_id uuid references public.creator_offers(id),
  status text not null check (status in ('pending_payment', 'paid', 'in_progress', 'delivered', 'revision_requested', 'disputed', 'completed', 'cancelled', 'refunded')),
  title_snapshot text not null,
  deliverable_snapshot text not null,
  rights_snapshot text not null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  price_minor bigint not null check (price_minor > 0),
  buyer_fee_minor bigint not null check (buyer_fee_minor >= 0),
  creator_fee_minor bigint not null check (creator_fee_minor >= 0),
  total_minor bigint not null check (total_minor = price_minor + buyer_fee_minor),
  creator_earnings_minor bigint not null check (creator_earnings_minor = price_minor - creator_fee_minor),
  buyer_fee_bps integer not null default 600 check (buyer_fee_bps between 0 and 10000),
  creator_fee_bps integer not null default 2000 check (creator_fee_bps between 0 and 10000),
  delivered_at timestamptz,
  buyer_notified_at timestamptz,
  auto_complete_at timestamptz,
  completed_at timestamptz,
  dispute_opened_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (buyer_id <> creator_id)
);
create index marketplace_orders_buyer_idx on public.marketplace_orders(buyer_id, created_at desc);
create index marketplace_orders_creator_idx on public.marketplace_orders(creator_id, created_at desc);
create index marketplace_orders_auto_complete_idx on public.marketplace_orders(auto_complete_at)
  where status = 'delivered' and dispute_opened_at is null;

create table public.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.marketplace_orders(id) on delete cascade,
  actor_id uuid references auth.users(id),
  event_type text not null,
  detail jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index order_events_order_idx on public.order_events(order_id, created_at);

create table public.order_deliveries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.marketplace_orders(id),
  creator_id uuid not null references public.marketplace_profiles(id),
  note text not null default '',
  object_path text,
  created_at timestamptz not null default now()
);
create index order_deliveries_order_idx on public.order_deliveries(order_id, created_at desc);

create table public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.marketplace_orders(id),
  provider text not null,
  provider_reference text unique,
  status text not null check (status in ('created', 'pending', 'verified', 'failed', 'refunded')),
  amount_minor bigint not null check (amount_minor > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  created_at timestamptz not null default now(),
  verified_at timestamptz
);
create index payment_attempts_order_idx on public.payment_attempts(order_id, created_at desc);

create table public.creator_payouts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.marketplace_orders(id),
  creator_id uuid not null references public.marketplace_profiles(id),
  status text not null check (status in ('eligible', 'queued', 'processing', 'paid', 'failed', 'held')),
  amount_minor bigint not null check (amount_minor > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  provider_reference text unique,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index creator_payouts_creator_idx on public.creator_payouts(creator_id, created_at desc);

alter table public.marketplace_profiles enable row level security;
alter table public.creator_offers enable row level security;
alter table public.offer_media enable row level security;
alter table public.casting_calls enable row level security;
alter table public.casting_applications enable row level security;
alter table public.marketplace_orders enable row level security;
alter table public.order_events enable row level security;
alter table public.order_deliveries enable row level security;
alter table public.payment_attempts enable row level security;
alter table public.creator_payouts enable row level security;

grant select on public.marketplace_profiles, public.creator_offers, public.offer_media, public.casting_calls to anon;
grant select, insert, update on public.marketplace_profiles, public.creator_offers, public.offer_media, public.casting_calls, public.casting_applications to authenticated;
grant delete on public.offer_media to authenticated;
grant select on public.marketplace_orders, public.order_events, public.order_deliveries, public.payment_attempts, public.creator_payouts to authenticated;
grant all on public.marketplace_profiles, public.creator_offers, public.offer_media, public.casting_calls, public.casting_applications, public.marketplace_orders, public.order_events, public.order_deliveries, public.payment_attempts, public.creator_payouts to service_role;
grant usage, select on sequence public.order_events_id_seq to service_role;

create policy profiles_public_read on public.marketplace_profiles for select to anon, authenticated
  using (is_public or id = (select auth.uid()));
create policy profiles_owner_insert on public.marketplace_profiles for insert to authenticated
  with check (id = (select auth.uid()));
create policy profiles_owner_update on public.marketplace_profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy offers_public_read on public.creator_offers for select to anon, authenticated
  using (status = 'published' or creator_id = (select auth.uid()));
create policy offers_owner_insert on public.creator_offers for insert to authenticated
  with check (creator_id = (select auth.uid()) and status in ('draft', 'review'));
create policy offers_owner_update on public.creator_offers for update to authenticated
  using (creator_id = (select auth.uid()))
  with check (creator_id = (select auth.uid()) and status in ('draft', 'review', 'paused', 'archived'));

create policy offer_media_read on public.offer_media for select to anon, authenticated
  using (exists (select 1 from public.creator_offers o where o.id = offer_id and (o.status = 'published' or o.creator_id = (select auth.uid()))));
create policy offer_media_owner_insert on public.offer_media for insert to authenticated
  with check (split_part(object_path, '/', 1) = (select auth.uid())::text
    and split_part(object_path, '/', 2) = offer_id::text
    and exists (select 1 from public.creator_offers o where o.id = offer_id and o.creator_id = (select auth.uid()) and o.status = 'draft'));
create policy offer_media_owner_update on public.offer_media for update to authenticated
  using (exists (select 1 from public.creator_offers o where o.id = offer_id and o.creator_id = (select auth.uid()) and o.status = 'draft'))
  with check (split_part(object_path, '/', 1) = (select auth.uid())::text
    and split_part(object_path, '/', 2) = offer_id::text
    and exists (select 1 from public.creator_offers o where o.id = offer_id and o.creator_id = (select auth.uid()) and o.status = 'draft'));
create policy offer_media_owner_delete on public.offer_media for delete to authenticated
  using (exists (select 1 from public.creator_offers o where o.id = offer_id and o.creator_id = (select auth.uid()) and o.status = 'draft'));

create policy casting_public_read on public.casting_calls for select to anon, authenticated
  using (status = 'published' or buyer_id = (select auth.uid()));
create policy casting_owner_insert on public.casting_calls for insert to authenticated
  with check (buyer_id = (select auth.uid()) and status in ('draft', 'review'));
create policy casting_owner_update on public.casting_calls for update to authenticated
  using (buyer_id = (select auth.uid()))
  with check (buyer_id = (select auth.uid()) and status in ('draft', 'review', 'closed'));

create policy applications_participant_read on public.casting_applications for select to authenticated
  using (creator_id = (select auth.uid()) or exists
    (select 1 from public.casting_calls c where c.id = casting_id and c.buyer_id = (select auth.uid())));
create policy applications_creator_insert on public.casting_applications for insert to authenticated
  with check (creator_id = (select auth.uid()) and status = 'submitted' and exists
    (select 1 from public.casting_calls c where c.id = casting_id and c.status = 'published'
      and c.buyer_id <> (select auth.uid())
      and (c.application_deadline is null or c.application_deadline > now()))
    and exists (select 1 from public.marketplace_profiles p where p.id = (select auth.uid()) and p.is_creator));
create policy applications_creator_withdraw on public.casting_applications for update to authenticated
  using (creator_id = (select auth.uid()) and status = 'submitted')
  with check (creator_id = (select auth.uid()) and status = 'withdrawn');

create policy orders_participant_read on public.marketplace_orders for select to authenticated
  using (buyer_id = (select auth.uid()) or creator_id = (select auth.uid()));
create policy events_participant_read on public.order_events for select to authenticated
  using (exists (select 1 from public.marketplace_orders o where o.id = order_id
    and (o.buyer_id = (select auth.uid()) or o.creator_id = (select auth.uid()))));
create policy deliveries_participant_read on public.order_deliveries for select to authenticated
  using (exists (select 1 from public.marketplace_orders o where o.id = order_id
    and (o.buyer_id = (select auth.uid()) or o.creator_id = (select auth.uid()))));
create policy payment_buyer_read on public.payment_attempts for select to authenticated
  using (exists (select 1 from public.marketplace_orders o where o.id = order_id and o.buyer_id = (select auth.uid())));
create policy payouts_creator_read on public.creator_payouts for select to authenticated
  using (creator_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('marketplace-samples', 'marketplace-samples', false, 52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'audio/mpeg', 'audio/mp4'])
on conflict (id) do nothing;

create policy marketplace_samples_read on storage.objects for select to anon, authenticated
  using (bucket_id = 'marketplace-samples' and exists
    (select 1 from public.offer_media m join public.creator_offers o on o.id = m.offer_id
      where m.object_path = name and (o.status = 'published' or o.creator_id = (select auth.uid()))));
create policy marketplace_samples_owner_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'marketplace-samples'
    and split_part(name, '/', 1) = (select auth.uid())::text
    and exists (select 1 from public.creator_offers o where o.id::text = split_part(name, '/', 2)
      and o.creator_id = (select auth.uid()) and o.status = 'draft'));
create policy marketplace_samples_owner_update on storage.objects for update to authenticated
  using (bucket_id = 'marketplace-samples'
    and split_part(name, '/', 1) = (select auth.uid())::text
    and exists (select 1 from public.creator_offers o where o.id::text = split_part(name, '/', 2)
      and o.creator_id = (select auth.uid()) and o.status = 'draft'))
  with check (bucket_id = 'marketplace-samples'
    and split_part(name, '/', 1) = (select auth.uid())::text
    and exists (select 1 from public.creator_offers o where o.id::text = split_part(name, '/', 2)
      and o.creator_id = (select auth.uid()) and o.status = 'draft'));
create policy marketplace_samples_owner_delete on storage.objects for delete to authenticated
  using (bucket_id = 'marketplace-samples'
    and split_part(name, '/', 1) = (select auth.uid())::text
    and exists (select 1 from public.creator_offers o where o.id::text = split_part(name, '/', 2)
      and o.creator_id = (select auth.uid()) and o.status = 'draft'));
