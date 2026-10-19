-- Older Supabase projects may automatically grant every new public table
-- to anon and authenticated. Reset these grants to the marketplace's needs.
revoke all on
  public.marketplace_profiles,
  public.creator_offers,
  public.offer_media,
  public.casting_calls,
  public.casting_applications,
  public.marketplace_orders,
  public.order_events,
  public.order_deliveries,
  public.payment_attempts,
  public.creator_payouts
from public, anon, authenticated;

grant select on
  public.marketplace_profiles,
  public.creator_offers,
  public.offer_media,
  public.casting_calls
to anon;

grant select, insert, update on
  public.marketplace_profiles,
  public.creator_offers,
  public.offer_media,
  public.casting_calls
to authenticated;
grant delete on public.offer_media to authenticated;

grant select, insert on public.casting_applications to authenticated;
grant update(status) on public.casting_applications to authenticated;

grant select on
  public.marketplace_orders,
  public.order_events,
  public.order_deliveries,
  public.payment_attempts,
  public.creator_payouts
to authenticated;
