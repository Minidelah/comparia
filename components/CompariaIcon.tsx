export type IconName =
  | "home"
  | "bolt"
  | "flame"
  | "wifi"
  | "phone"
  | "repeat"
  | "car"
  | "bike"
  | "scooter"
  | "heart"
  | "paw"
  | "shield"
  | "coins"
  | "bank"
  | "search"
  | "cashback"
  | "lock"
  | "unlock"
  | "clock"
  | "gift"
  | "handshake"
  | "sparkles"
  | "check";

type Props = {
  name: IconName;
  className?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10M9 19.5v-5h6v5" />,
  bolt: <path d="m13 2-8 12h6l-1 8 9-13h-6l0-7Z" />,
  flame: <path d="M12 22c4.4 0 7-3.1 7-7.2 0-3.1-1.8-5.7-4.8-8.8.1 2.1-.9 3.8-2.5 5.1.1-3.2-1.5-5.9-4.2-8.1.1 3.9-2.5 6.3-2.5 10.1C5 18.1 7.8 22 12 22Z" />,
  wifi: <path d="M4.5 9.5a12 12 0 0 1 15 0M7.5 13a7.4 7.4 0 0 1 9 0M10.5 16.5a2.8 2.8 0 0 1 3 0M12 20h.01" />,
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
};

export function getCategoryIcon(slug: string): IconName {
  if (slug === "electricite") return "bolt";
  if (slug === "gaz") return "flame";
  if (slug === "box-internet") return "wifi";
  if (slug === "forfait-mobile") return "phone";
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

export default function CompariaIcon({ name, className = "h-6 w-6" }: Props) {
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
      {paths[name]}
    </svg>
  );
}
