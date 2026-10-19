import {
  Clapperboard,
  Mic2,
  Music2,
  Sparkles,
  Video,
  WandSparkles,
} from "lucide-react";

export const categories = [
  {
    slug: "acting-skits",
    name: "Acting & skits",
    description: "Actors, comedy performers, and people who can bring a scene to life.",
    examples: "Skits, film roles, comedy, scripted scenes",
    icon: Clapperboard,
  },
  {
    slug: "creator-ads",
    name: "Creator ads",
    description: "Real people who can make an honest, engaging video for your brand.",
    examples: "Product demos, scripted ads, social videos",
    icon: Video,
  },
  {
    slug: "voice-words",
    name: "Voice & words",
    description: "Distinct voices and spoken performances for every kind of story.",
    examples: "Voice acting, narration, poetry, eulogies",
    icon: Mic2,
  },
  {
    slug: "music-beats",
    name: "Music & beats",
    description: "Original sound made by singers, producers, and instrumentalists.",
    examples: "Beats, instrumentals, vocals, jingles",
    icon: Music2,
  },
  {
    slug: "dance-performance",
    name: "Dance & performance",
    description: "Movement and live acts that make your content memorable.",
    examples: "Dance, magic, live performance",
    icon: Sparkles,
  },
  {
    slug: "live-collaboration",
    name: "Live & collaboration",
    description: "Find another creative voice for a stream, skit, or local project.",
    examples: "Live streams, creator collabs, local roles",
    icon: WandSparkles,
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categoryFromSlug = (slug: string | null) =>
  categories.find((category) => category.slug === slug);

export const processSteps = [
  {
    title: "Find your person",
    description:
      "Explore creators by skill, style, language, location, and the work they have made.",
  },
  {
    title: "Agree on the brief",
    description:
      "Choose an offer or share your project. Know the price, delivery time, and usage rights before you pay.",
  },
  {
    title: "Get your content",
    description:
      "Follow the project, review the finished video or audio, and request a covered revision if needed.",
  },
] as const;

export const feeExample = {
  price: 100,
  buyerFee: 6,
  buyerTotal: 106,
  creatorFee: 20,
  creatorEarns: 80,
} as const;
