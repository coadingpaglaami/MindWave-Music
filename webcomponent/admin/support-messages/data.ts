import { generatePermutedData } from "../subscriptions-payments/data";

export interface MessageTable {
  id: string;
  userName: string;
  email: string;
  subject: string;
  date: string;
  status: "New" | "Viewed";
  message: string;
}

export const messageData: MessageTable[] = [
    {
        id: "1",
        userName: "Emily Rodriguez",
        email: "emily.r@email.com",
        subject: "Unable to access premium features",
        date: "Dec 4, 2024",
        status: "New",
        message: "I've been unable to access the premium features even though my subscription is active. Please help me resolve this issue.",
    },
    {
        id: "2",
        userName: "Michael Chen",
        email: "m.chen@email.com",
        subject: "Request for refund",
        date: "Dec 4, 2024",
        status: "New",
        message: "I would like to request a refund for my last subscription payment as I'm no longer using the app.",
    },
    {
        id: "3",
        userName: "Sarah Johnson",
        email: "sarah.j@email.com",
        subject: "Meditation audio not playing",
        date: "Dec 3, 2024",
        status: "Viewed",
        message: "The meditation audio tracks are not playing properly. I get an error message each time I try to start a session.",
    },
    {
        id: "4",
        userName: "David Kim",
        email: "david.k@email.com",
        subject: "Suggestion for new feature",
        date: "Dec 3, 2024",
        status: "Viewed",
        message: "I'd love to see a feature that allows users to create custom meditation sequences. This would enhance the user experience.",
    },
    {
        id: "5",
        userName: "Lisa Wang",
        email: "lisa.w@email.com",
        subject: "App crashes on startup",
        date: "Dec 2, 2024",
        status: "New",
        message: "The app keeps crashing immediately after launch. I've tried reinstalling but the issue persists.",
    },
    {
        id: "6",
        userName: "James Brown",
        email: "james.b@email.com",
        subject: "Thank you!",
        date: "Dec 2, 2024",
        status: "Viewed",
        message: "Just wanted to say thank you for creating such a wonderful wellness app. It's truly helped me manage my stress.",
    },
    {
        id: "7",
        userName: "Olivia Martinez",
        email: "olivia.m@email.com",
        subject: "Cannot reset password",
        date: "Dec 1, 2024",
        status: "Viewed",
        message: "I'm unable to reset my password. The reset link isn't working and I'm locked out of my account.",
    },
];

const generateMessage = (
  source: MessageTable[],
  length: number
): MessageTable[] => {
  return generatePermutedData(source, length, "mes-");
};

export const generatedMessages = generateMessage(messageData, 50);  