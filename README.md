# ScriptsPlay

ScriptsPlay is becoming a marketplace for creators who make video, audio, music, acting, and performance work. Buyers will be able to find talent, explore finished content, and post casting calls. The old transcription service and worker portal have been removed from the website.

The public pages and a first version of account, profile, offer, sample, and casting flows are in this repository. **The marketplace is not ready for paid orders.** The database migration has not been applied to the ScriptsPlay Supabase project, and no Flutterwave merchant account or supported delayed-payout product has been confirmed. Checkout, delivery, automatic completion, and creator payouts must remain off until they are built and tested.

## Stack

React 19, TypeScript, Vite, React Router, Supabase, and Vercel. The brand colours and fonts are kept in `src/index.css`.

## Local setup

1. Run `npm ci`.
2. Copy `.env.example` to `.env.local` and add the ScriptsPlay Supabase project URL and publishable/anon key. Never put a service-role key in a `VITE_` variable.
3. Run `npm run dev`.
4. Run `npm run build` and `npm run lint` before opening a pull request.

The public homepage can render without Supabase. Search, account pages, and the contact form need a valid ScriptsPlay project. The contact form uses the existing `contact_submissions` table and `send-contact-email` Edge Function.

## Video

The homepage uses `public/videos/marketplace-hero.mp4`, an optimized version of the user-provided desktop video. It is muted and loops only on desktop when reduced motion is off. Mobile uses the brand-colour background and does not request the video or a poster image.

## Database and launch gate

The proposed marketplace schema is in `supabase/migrations/20261017232406_marketplace_foundation.sql`. It has not been applied. Review it against the real ScriptsPlay project, test its RLS rules and storage access, then run the migration through an authenticated deployment process. Existing worker records are preserved; removing the old portal did not delete them.

See `PLATFORM_PLAN.txt` for the full product plan and fee rules. The planned fees are 6% to buyers and 20% from creator prices. These are examples until a compliant checkout is available. An ordinary Flutterwave split payment must not be treated as a three-day escrow hold. Confirm the provider's supported hold, release, refund, and payout process before connecting real payments.

Public URLs are listed in `public/sitemap.xml`. `vercel.json` redirects old service pages and sends client routes to `index.html`. Account pages use `noindex` metadata.
