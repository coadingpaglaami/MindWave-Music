import {
  LayoutDashboard,
  Library,
  Headphones,
  Music,
  Heart,
  Users,
  CreditCard,
  Bell,
  MessageSquare,
} from "lucide-react";

export const sidbaarLinks = [
  {
    label: "Dashboard Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Content Management",
    href: "/content",
    icon: Library,
    dropdown: [
      {
        label: "Meditations",
        href: "/content/meditations",
        icon: Headphones, // Optional: if your component renders icons in dropdowns
      },
      {
        label: "Music",
        href: "/content/music",
        icon: Music,
      },
      {
        label: "Affirmations",
        href: "/content/affirmations",
        icon: Heart,
      },
    ],
  },
  {
    label: "User Management",
    href: "/user",
    icon: Users,
  },
  {
    label: "Subscriptions & Payments",
    href: "/subscriptions",
    icon: CreditCard,
  },
  {
    label: "Push Notifications",
    href: "/push_notifications",
    icon: Bell,
  },
  {
    label: "Support Messages",
    href: "/support_messages",
    icon: MessageSquare,
  },
];