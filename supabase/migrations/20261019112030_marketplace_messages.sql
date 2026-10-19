-- Private pre-order conversations about a published offer.
-- No payment information or confidential files should be sent here.
create table public.marketplace_conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.marketplace_profiles(id),
  creator_id uuid not null references public.marketplace_profiles(id),
  offer_id uuid not null references public.creator_offers(id),
  created_at timestamptz not null default now(),
  unique (buyer_id, offer_id),
  check (buyer_id <> creator_id)
);
create index marketplace_conversations_creator_idx
  on public.marketplace_conversations(creator_id, created_at desc);
create index marketplace_conversations_offer_idx
  on public.marketplace_conversations(offer_id);

create table public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.marketplace_conversations(id) on delete cascade,
  sender_id uuid not null references public.marketplace_profiles(id),
  body text not null check (char_length(trim(body)) between 1 and 3000),
  created_at timestamptz not null default now()
);
create index conversation_messages_thread_idx
  on public.conversation_messages(conversation_id, created_at);
create index conversation_messages_sender_idx
  on public.conversation_messages(sender_id);

alter table public.marketplace_conversations enable row level security;
alter table public.conversation_messages enable row level security;

revoke all on public.marketplace_conversations, public.conversation_messages
  from public, anon, authenticated;
grant select, insert on public.marketplace_conversations, public.conversation_messages
  to authenticated;
grant all on public.marketplace_conversations, public.conversation_messages to service_role;

create policy conversations_participant_read on public.marketplace_conversations
  for select to authenticated
  using (buyer_id = (select auth.uid()) or creator_id = (select auth.uid()));
create policy conversations_buyer_start on public.marketplace_conversations
  for insert to authenticated
  with check (
    buyer_id = (select auth.uid()) and buyer_id <> creator_id
    and exists (
      select 1 from public.creator_offers o
      where o.id = marketplace_conversations.offer_id
        and o.creator_id = marketplace_conversations.creator_id
        and o.status = 'published'
    )
  );

create policy messages_participant_read on public.conversation_messages
  for select to authenticated
  using (exists (
    select 1 from public.marketplace_conversations c
    where c.id = conversation_id
      and (c.buyer_id = (select auth.uid()) or c.creator_id = (select auth.uid()))
  ));
create policy messages_participant_send on public.conversation_messages
  for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and exists (
      select 1 from public.marketplace_conversations c
      where c.id = conversation_id
        and (c.buyer_id = (select auth.uid()) or c.creator_id = (select auth.uid()))
    )
  );

create policy profiles_conversation_participant_read on public.marketplace_profiles
  for select to authenticated
  using (exists (
    select 1 from public.marketplace_conversations c
    where (c.buyer_id = marketplace_profiles.id and c.creator_id = (select auth.uid()))
       or (c.creator_id = marketplace_profiles.id and c.buyer_id = (select auth.uid()))
  ));
