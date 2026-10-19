-- Only Auth app_metadata can grant moderation access. Users cannot edit it.
create policy profiles_moderator_read on public.marketplace_profiles for select to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');

create policy profiles_casting_buyer_read on public.marketplace_profiles for select to authenticated
  using (exists (
    select 1 from public.casting_applications a
    join public.casting_calls c on c.id = a.casting_id
    where a.creator_id = marketplace_profiles.id and c.buyer_id = (select auth.uid())
  ));

create policy offers_moderator_read on public.creator_offers for select to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');
create policy offers_moderator_update on public.creator_offers for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true')
  with check ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');

create policy offer_media_moderator_read on public.offer_media for select to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');
create policy marketplace_samples_moderator_read on storage.objects for select to authenticated
  using (bucket_id = 'marketplace-samples'
    and (select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');

create policy casting_moderator_read on public.casting_calls for select to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');
create policy casting_moderator_update on public.casting_calls for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true')
  with check ((select auth.jwt()->'app_metadata'->>'scriptsplay_admin') = 'true');

-- Applicant and buyer can change only the application status, not its author or text.
revoke update on public.casting_applications from authenticated;
grant update(status) on public.casting_applications to authenticated;
create policy applications_buyer_review on public.casting_applications for update to authenticated
  using (status in ('submitted', 'shortlisted') and exists (
    select 1 from public.casting_calls c where c.id = casting_id and c.buyer_id = (select auth.uid())
  ))
  with check (status in ('shortlisted', 'declined') and exists (
    select 1 from public.casting_calls c where c.id = casting_id and c.buyer_id = (select auth.uid())
  ));
