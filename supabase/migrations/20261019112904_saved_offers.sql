-- Buyers can keep a private list of published offers.
create table public.saved_offers (
  buyer_id uuid not null references public.marketplace_profiles(id) on delete cascade,
  offer_id uuid not null references public.creator_offers(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (buyer_id, offer_id)
);
create index saved_offers_offer_idx on public.saved_offers(offer_id);

alter table public.saved_offers enable row level security;
revoke all on public.saved_offers from public, anon, authenticated;
grant select, insert, delete on public.saved_offers to authenticated;
grant all on public.saved_offers to service_role;

create policy saved_offers_owner_read on public.saved_offers
  for select to authenticated
  using (buyer_id = (select auth.uid()));
create policy saved_offers_owner_add on public.saved_offers
  for insert to authenticated
  with check (
    buyer_id = (select auth.uid())
    and exists (
      select 1 from public.creator_offers o
      where o.id = saved_offers.offer_id
        and o.status = 'published'
        and o.creator_id <> (select auth.uid())
    )
  );
create policy saved_offers_owner_remove on public.saved_offers
  for delete to authenticated
  using (buyer_id = (select auth.uid()));
