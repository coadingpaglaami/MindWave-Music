import { generatePermutedData } from "../subscriptions-payments/data";

export interface Notification {
  id: string;
  head: string;
  message: string;
  segment: "All Users" | "Free Users" | "Premium Users";
  date: string;
  time: string;
  status: "Sent" | "Scheduled" | "Failed";
}

export const notificationsData: Notification[] = [
  {
    id: "1",
    head: "New Meditation Added",
    message: "Check out our latest Deep Sleep Journey meditation",
    segment: "All Users",
    date: "Dec 3",
    time: "10:00 AM",
    status: "Sent",
  },
  {
    id: "2",
    head: "Premium Offer",
    message: "Get 30% off on annual subscription this week only!",
    segment: "Free Users",
    date: "Dec 2",
    time: "2:00 PM",
    status: "Sent",
  },
  {
    id: "3",
    head: "Streak Reminder",
    message: "Don't break your streak! Complete today's meditation",
    segment: "Premium Users",
    date: "Dec 1",
    time: "8:00 PM",
    status: "Sent",
  },
  {
    id: "4",
    head: "Weekend Special",
    message: "New sleep stories added for peaceful weekend rest",
    segment: "All Users",
    date: "Dec 7",
    time: "9:00 AM",
    status: "Scheduled",
  },
  {
    id: "5",
    head: "App Update",
    message: "New breathing exercises and improved interface",
    segment: "All Users",
    date: "Nov 28",
    time: "11:00 AM",
    status: "Failed",
  },
];

const generateNotifications = (
  source: Notification[],
  length: number
): Notification[] => {
  return generatePermutedData(source, length, "notif-");
};

export const generateNotificationsData = generateNotifications(
  notificationsData,
  50
);
