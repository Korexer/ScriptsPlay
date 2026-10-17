export interface MarketplaceProfile {
  id: string;
  handle: string;
  display_name: string;
  bio: string;
  country_code: string | null;
  city: string | null;
  languages: string[];
  portfolio_url: string | null;
  avatar_path: string | null;
  is_creator: boolean;
  is_public: boolean;
}

export interface CreatorOffer {
  id: string;
  creator_id: string;
  slug: string;
  kind: "custom" | "ready_made" | "physical_role";
  status: "draft" | "review" | "published" | "paused" | "rejected" | "archived";
  category_slug: string;
  title: string;
  description: string;
  deliverable: string;
  tags: string[];
  language_code: string | null;
  country_code: string | null;
  city: string | null;
  is_remote: boolean;
  price_minor: number;
  currency: string;
  delivery_days: number;
  revisions: number;
  buyer_requirements: string;
  usage_rights: string;
  published_at: string | null;
  created_at: string;
}

export interface CastingCall {
  id: string;
  buyer_id: string;
  status: "draft" | "review" | "published" | "closed" | "rejected";
  title: string;
  description: string;
  category_slug: string;
  country_code: string | null;
  city: string | null;
  is_remote: boolean;
  budget_minor: number | null;
  currency: string | null;
  application_deadline: string | null;
  published_at: string | null;
}

export function currencyDigits(currency: string): number {
  return new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits ?? 2;
}

export function parseMoney(value: string, currency: string): number | null {
  const digits = currencyDigits(currency);
  const pattern = digits === 0 ? /^(\d+)$/ : new RegExp(`^(\\d+)(?:\\.(\\d{1,${digits}}))?$`);
  const match = pattern.exec(value.trim());
  if (!match) return null;
  const amount = Number(match[1] ?? "0") * 10 ** digits + Number((match[2] || "").padEnd(digits, "0"));
  return Number.isSafeInteger(amount) && amount > 0 && amount <= 1_000_000_000_000 ? amount : null;
}

export function formatMoney(minor: number, currency: string): string {
  try {
    const digits = currencyDigits(currency);
    return new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "code" }).format(minor / 10 ** digits);
  } catch {
    return `${currency} ${minor}`;
  }
}
