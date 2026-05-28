import type { ReactNode } from "react";

const baseIcons = [
  "home",
  "bolt",
  "flame",
  "wifi",
  "router",
  "tv",
  "phone",
  "repeat",
  "car",
  "bike",
  "scooter",
  "heart",
  "paw",
  "shield",
  "coins",
  "bank",
  "search",
  "cashback",
  "lock",
  "unlock",
  "clock",
  "gift",
  "handshake",
  "sparkles",
  "check",
  "star",
  "mail",
  "book",
  "help",
  "info",
  "tag",
  "user",
  "users",
  "calendar",
  "arrow-right",
  "arrow-left",
  "chevron-down",
  "chevron-up",
  "chevron-left",
  "chevron-right",
  "x",
  "x-circle",
  "plus",
  "minus",
  "copy",
  "send",
  "download",
  "upload",
  "file",
  "file-text",
  "edit",
  "save",
  "smile",
  "message-circle",
  "comparison",
  "logo",
  "crown",
  "globe",
  "map-pin",
  "briefcase",
  "dollar-sign",
  "trending-up",
  "trending-down",
  "thumbs-up",
  "credit-card",
  "check-circle",
  "alert-triangle",
  "loader",
  "palette",
  "cookie",
  "bell",
  "activity",
  "book-open",
  "newsletter",
  "zap",
  "facebook",
  "twitter",
  "instagram",
  "linkedin",
] as const;

export const iconNames = baseIcons;

export type IconName = (typeof iconNames)[number];

type Props = {
  name: IconName | string;
  className?: string;
};

const paths: Record<IconName, ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M9 19.5v-5h6v5" />,
  bolt: <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z" />,
  zap: <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z" />,
  flame: <path d="M12 22c4.4 0 7-3.1 7-7.2 0-3.1-1.8-5.7-4.8-8.8.1 2.1-.9 3.8-2.5 5.1.1-3.2-1.5-5.9-4.2-8.1.1 3.9-2.5 6.3-2.5 10.1C5 18.1 7.8 22 12 22Z" />,
  wifi: <path d="M4.5 9.5a12 12 0 0 1 15 0M7.5 13a7.4 7.4 0 0 1 9 0M10.5 16.5a2.8 2.8 0 0 1 3 0M12 20h.01" />,
  router: <path d="M5 14h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2Zm2 2.5h.01M11 16.5h.01M15 16.5h.01M8 12l4-4 4 4M10 10.5a3 3 0 0 1 4 0M8 8a6 6 0 0 1 8 0" />,
  tv: <path d="M4 6h16v11H4V6Zm5 15h6M12 17v4M8 10l2.5 2.5L16 8" />,
  phone: <path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 15h2" />,
  repeat: <path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" />,
  car: <path d="M5 17h14M6 17l1-5h10l1 5M8 12l1.5-4h5L16 12M7 19v2m10-2v2" />,
  bike: <path d="M6 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm12 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM8 14h5l-2-5m2 5 2-5h3M9 9h3" />,
  scooter: <path d="M5 18h10a4 4 0 0 0 4-4V9h-4M7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm13 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9 6h4l2 8" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  paw: <path d="M12 21c2.8 0 5-1.4 5-3.7 0-1.9-1.4-3.3-3.2-4.1-.8-.4-1.1-1.2-1.8-1.2s-1 .8-1.8 1.2C8.4 14 7 15.4 7 17.3 7 19.6 9.2 21 12 21ZM7.5 10.5A2.5 2.5 0 1 0 7.5 5a2.5 2.5 0 0 0 0 5.5Zm9 0A2.5 2.5 0 1 0 16.5 5a2.5 2.5 0 0 0 0 5.5ZM4 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Zm-3-10 2 2 4-5" />,
  coins: <path d="M12 7c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm8-3v5c0 1.7-3.6 3-8 3s-8-1.3-8-3V4m16 5v5c0 1.7-3.6 3-8 3s-8-1.3-8-3V9m16 5v5c0 1.7-3.6 3-8 3s-8-1.3-8-3v-5" />,
  bank: <path d="M3 9h18M5 9v9m4-9v9m6-9v9m4-9v9M2 21h20M12 3l9 4H3l9-4Z" />,
  search: <path d="m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />,
  cashback: <path d="M12 2v20m5-16H9.5a3.5 3.5 0 1 0 0 7H14a3.5 3.5 0 1 1 0 7H6" />,
  lock: <path d="M7 10V7a5 5 0 0 1 10 0v3m-9 0h8a2 2 0 0 1 2 2v8H6v-8a2 2 0 0 1 2-2Z" />,
  unlock: <path d="M8 10V7a4 4 0 0 1 7.8-1.3M8 10h8a2 2 0 0 1 2 2v8H6v-8a2 2 0 0 1 2-2Z" />,
  clock: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-14v5l3 2" />,
  gift: <path d="M20 12v8H4v-8m16 0H4m16 0V8H4v4m8-4v12M7.5 8C5.6 8 5 6.8 5 5.8S5.8 4 7 4c2 0 3.5 4 5 4m4.5 0C18.4 8 19 6.8 19 5.8S18.2 4 17 4c-2 0-3.5 4-5 4" />,
  handshake: <path d="M7.5 12.5 4 9l3-3 3 3m6.5 3.5L20 9l-3-3-3 3M8 13l3 3a2 2 0 0 0 2.8 0L17 12.8M10 9l2-2 2 2 3 3m-9 .5 2-2 2 2 2-2" />,
  sparkles: <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14ZM5 14l1.2 2.8L9 18l-2.8 1.2L5 22l-1.2-2.8L1 18l2.8-1.2L5 14Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  star: <path d="m12 2 3 7h7l-5.5 4 2 7-6.5-4.5L6.5 20l2-7L3 9h7l2-7Z" />,
  mail: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" />,
  book: <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm2 0v14M19 6v14" />,
  "book-open": <path d="M12 7v14M5 5.5A3.5 3.5 0 0 1 8.5 2H12v20H8.5A3.5 3.5 0 0 1 5 18.5V5.5Zm7 0V18.5A3.5 3.5 0 0 0 15.5 22H19V2h-3.5A3.5 3.5 0 0 0 12 5.5Z" />,
  help: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-7h.01M9.5 9a2.5 2.5 0 1 1 4.8 1c0 2-3 2-3 4" />,
  info: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-7h.01M12 8v4" />,
  tag: <path d="M20 12 12 20l-8-8V4h8l8 8ZM7.5 7.5h.01" />,
  user: <path d="M20 21a8 8 0 1 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
  users: <path d="M17 21a4 4 0 0 0-8 0M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 2a3 3 0 1 0 0-6M3 21a4 4 0 0 1 8 0M16 3.13a4 4 0 0 1 0 7.75" />,
  calendar: <path d="M8 3v3m8-3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v13H4V7a2 2 0 0 1 2-2Z" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M19 12H5m6 6-6-6 6-6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-up": <path d="m18 15-6-6-6 6" />,
  "chevron-left": <path d="m15 18-6-6 6-6" />,
  "chevron-right": <path d="m9 18 6-6-6-6" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  "x-circle": <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm3-11-6 6m0-6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  copy: <path d="M9 9H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M15 3h6v6M10 14 21 7" />,
  send: <path d="m22 2-11 11M22 2l-7 20-4-9-9-4 20-7Z" />,
  download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />,
  upload: <path d="M12 15V3m0 0 4 4m-4-4-4 4M4 21h16" />,
  file: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6" />,
  "file-text": <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h8M8 9h2" />,
  edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />,
  save: <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM7 3v6h8M12 15v6" />,
  smile: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />,
  "message-circle": <path d="M21 11.5a8.4 8.4 0 0 1-1.9 5.4 8.5 8.5 0 0 1-7.6 4.1 8.4 8.4 0 0 1-4.2-1.1L3 21l1.1-4.3a8.4 8.4 0 0 1-1.1-4.2 8.5 8.5 0 0 1 4.1-7.6A8.4 8.4 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />,
  comparison: <path d="M8 3v18M16 3v18M3 8h6M15 8h6M3 16h6M15 16h6" />,
  logo: <path d="M12 3 4 8v8l8 5 8-5V8l-8-5Zm0 4 5 3v6l-5 3-5-3V10l5-3Z" />,
  crown: <path d="M3 9 7 4l5 5 5-5 4 5 2 13H3L3 9Zm4 10h10" />,
  globe: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />,
  "map-pin": <path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  briefcase: <path d="M10 7V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2m-8 0h8m-8 0H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />,
  "dollar-sign": <path d="M12 2v20M17 6.5A4.5 4.5 0 0 0 7 6.5M17 17.5A4.5 4.5 0 0 1 7 17.5" />,
  "trending-up": <path d="m22 7-8.5 8.5-5-5L2 17M16 7h6v6" />,
  "trending-down": <path d="m22 17-8.5-8.5-5 5L2 7M16 17h6v-6" />,
  "thumbs-up": <path d="M7 11v10M3 11h4l4-9 4 18h7a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-5" />,
  "credit-card": <path d="M3 8h18v10H3V8Zm0-2h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm3 12h4" />,
  "check-circle": <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-4-8 3 3 6-6" />,
  "alert-triangle": <path d="M12 3 2 20h20L12 3Zm0 7v5m0 3h.01" />,
  loader: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />,
  palette: <path d="M12 3a9 9 0 1 0 0 18c1.7 0 2-1 2-2 0-.6-.4-1-1-1H9a4 4 0 0 1-4-4c0-5 3-7 7-7Z M8 10h.01M12 8h.01M16 10h.01" />,
  cookie: <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm-2 7h.01M12 14h.01M16 10h.01" />,
  bell: <path d="M18 16H6l-1 2h14l-1-2Zm-2-2V9a4 4 0 1 0-8 0v5M9 20a3 3 0 0 0 6 0" />,
  activity: <path d="M22 12h-4l-3 9-4-18-3 9H2" />,
  newsletter: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7M4 6l8 5 8-5" />,
  facebook: <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3V2Z" />,
  twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.3 3.3 4.3s-2 .7-4 0c-2.5 3.2-6.5 4.8-10 4.5C6 15 3 11 3 7.5 5.5 9 8 8.5 8 8.5 6.5 7 4.5 7 4.5 3 6.5 5 10.5 7 12c-2 1-5 1-5 1s3.5 5 10 3.5c6-1.5 7-9 7-9Z" />,
  instagram: <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.9h.01" />,
  linkedin: <path d="M6 9H3v12h3V9Zm1.5-4.5A1.5 1.5 0 1 0 6 6a1.5 1.5 0 0 0 1.5-1.5ZM21 21v-6.2c0-3.3-1.7-4.8-4-4.8-1.8 0-2.6 1-3 1.9V9h-3v12h3v-6.8c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.1V21h3Z" />,
};

function resolveIcon(name: string): IconName {
  if (name in paths) {
    return name as IconName;
  }
  return "shield";
}

export function getCategoryIcon(slug: string): IconName {
  if (slug === "electricite") return "bolt";
  if (slug === "gaz") return "flame";
  if (slug === "box-internet") return "wifi";
  if (slug === "forfait-mobile" || slug === "mobile") return "phone";
  if (slug === "abonnements") return "repeat";
  if (slug === "assurance-auto") return "car";
  if (slug === "assurance-moto") return "scooter";
  if (slug === "assurance-velo") return "bike";
  if (slug === "assurance-trottinette") return "scooter";
  if (slug === "assurance-habitation") return "home";
  if (slug === "mutuelle-sante" || slug === "assurance-sante-frontaliers") return "heart";
  if (slug === "assurance-animaux") return "paw";
  if (slug === "change-chf-eur") return "coins";
  if (slug === "banque" || slug === "assurance-emprunteur") return "bank";
  return "shield";
}

export default function BrandIcon({ name, className = "h-6 w-6" }: Props) {
  const resolved = resolveIcon(name);

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[resolved]}
    </svg>
  );
}
