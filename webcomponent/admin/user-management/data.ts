export interface UserData {
  id: string;
  name: string;
  email: string;
  accountType: "Free" | "Premium";
  steak: number;
  session: number;
  joinDate: string;
  status: "Active" | "Disabled";
  plan: "Free" | "Basic" | "Premium";
  nextBillingDate?: string;
  amountPerYear: number;
  contentengament: {
    meditationCompleted: number;
    sleepSounds: number;
    focusMusic: number;
    breathing: number;
  };
}

export const userData: UserData[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    accountType: "Premium",
    steak: 127,
    session: 450,
    joinDate: "Mar 15, 2024",
    status: "Active",
    plan: "Premium",
    nextBillingDate: "March 15, 2026",
    amountPerYear: 12000,
    contentengament: {
      meditationCompleted: 180,
      sleepSounds: 135,
      focusMusic: 90,
      breathing: 45,
    },
  },
  {
    id: "2",
    name: "James Thompson",
    email: "james.t@email.com",
    accountType: "Free",
    steak: 42,
    session: 156,
    joinDate: "Aug 22, 2024",
    status: "Active",
    plan: "Free",
    amountPerYear: 0,
    contentengament: {
      meditationCompleted: 62,
      sleepSounds: 45,
      focusMusic: 30,
      breathing: 19,
    },
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    accountType: "Premium",
    steak: 89,
    session: 320,
    joinDate: "May 10, 2024",
    status: "Active",
    plan: "Premium",
    nextBillingDate: "May 10, 2025",
    amountPerYear: 12000,
    contentengament: {
      meditationCompleted: 142,
      sleepSounds: 98,
      focusMusic: 55,
      breathing: 25,
    },
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "m.brown@email.com",
    accountType: "Free",
    steak: 15,
    session: 45,
    joinDate: "Nov 5, 2024",
    status: "Active",
    plan: "Free",
    amountPerYear: 0,
    contentengament: {
      meditationCompleted: 18,
      sleepSounds: 12,
      focusMusic: 10,
      breathing: 5,
    },
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@email.com",
    accountType: "Free",
    steak: 8,
    session: 23,
    joinDate: "Dec 1, 2024",
    status: "Disabled",
    plan: "Free",
    amountPerYear: 0,
    contentengament: {
      meditationCompleted: 5,
      sleepSounds: 10,
      focusMusic: 2,
      breathing: 6,
    },
  },
];

const generateAffirmativeData = (
  source: UserData[],
  length: number
): UserData[] => {
  if (length <= 0) return [];
  return Array.from({ length }, (_, index) => {
    const base = source[index % source.length];
    return { ...base, id: `${index + 1}` };
  });
};


export const generatedUserData = generateAffirmativeData(userData, 87);
