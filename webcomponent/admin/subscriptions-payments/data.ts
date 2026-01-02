/* =======================
   Interfaces
======================= */
import { v4 as uuidv4 } from "uuid";

export interface Subscription {
  id: string;
  name: string;
  status: "Active" | "Expired" | "Cancelled";
  startDate: string;
  renewalDate: string;
  amountPerYear: number;
  plan: "Annual" | "Monthly";
}

export interface Transaction {
  id: string;
  transactionId: string;
  name: string;
  plan: "Annual" | "Monthly";
  amount: number;
  date: string;
  status: "Successful" | "Failed" | "Pending";
}

/* =======================
   Base Seed Data
======================= */

export const subscriptionsData: Subscription[] = [
  {
    id: "sub-001",
    name: "Sarah Mitchell",
    status: "Active",
    plan: "Annual",
    amountPerYear: 12000,
    startDate: "Mar 15, 2024",
    renewalDate: "Mar 15, 2025",
  },
  {
    id: "sub-002",
    name: "Emily Chen",
    status: "Active",
    plan: "Monthly",
    amountPerYear: 1200,
    startDate: "Nov 10, 2024",
    renewalDate: "Jan 10, 2025",
  },
  {
    id: "sub-003",
    name: "Olivia Rodriguez",
    status: "Active",
    plan: "Annual",
    amountPerYear: 12000,
    startDate: "Jan 8, 2024",
    renewalDate: "Jan 8, 2025",
  },
  {
    id: "sub-004",
    name: "John Davis",
    status: "Expired",
    plan: "Monthly",
    amountPerYear: 1200,
    startDate: "Sep 20, 2024",
    renewalDate: "Dec 25, 2024",
  },
  {
    id: "sub-005",
    name: "Lisa Wang",
    status: "Cancelled",
    plan: "Annual",
    amountPerYear: 12000,
    startDate: "Jun 12, 2024",
    renewalDate: "Jun 12, 2025",
  },
];

export const transactionsData: Transaction[] = [
  {
    id: "1",
    transactionId: "PAY-2024-001",
    name: "Sarah Mitchell",
    plan: "Annual",
    amount: 12000,
    date: "Mar 15, 2024",
    status: "Successful",
  },
  {
    id: "2",
    transactionId: "PAY-2024-002",
    name: "Emily Chen",
    plan: "Monthly",
    amount: 1200,
    date: "Dec 10, 2024",
    status: "Successful",
  },
  {
    id: "3",
    transactionId: "PAY-2024-003",
    name: "Michael Johnson",
    plan: "Monthly",
    amount: 1200,
    date: "Dec 8, 2024",
    status: "Failed",
  },
  {
    id: "4",
    transactionId: "PAY-2024-004",
    name: "Olivia Rodriguez",
    plan: "Annual",
    amount: 12000,
    date: "Jan 8, 2024",
    status: "Successful",
  },
  {
    id: "5",
    transactionId: "PAY-2024-005",
    name: "Daniel Brown",
    plan: "Monthly",
    amount: 1200,
    date: "Dec 4, 2024",
    status: "Pending",
  },
];

/* =======================
   Generic Permutation Generator
======================= */

type WithId = { id: string };

export function generatePermutedData<T extends WithId>(
  source: T[],
  length: number,
  idPrefix: string
): T[] {
  if (!source.length) return [];

  const keys = Object.keys(source[0]) as (keyof T)[];

  return Array.from({ length }, () => {
    const item: Partial<T> = {};

    keys.forEach((key) => {
      if (key === "id") return;
      const randomSource = source[Math.floor(Math.random() * source.length)];
      item[key] = randomSource[key];
    });

    return {
      ...(item as T),
      id: `${idPrefix}-${uuidv4()}`,
    };
  });
}

/* =======================
   Specialized Generators
======================= */

// ✅ Subscription generator (keeps plan ↔ amount correct)
export function generateSubscriptions(
  source: Subscription[],
  length: number
): Subscription[] {
  return generatePermutedData(source, length, "sub").map((item) => ({
    ...item,
    amountPerYear: item.plan === "Annual" ? 12000 : 1200,
  }));
}

// ✅ Transaction generator (keeps plan ↔ amount correct)
export function generateTransactions(
  source: Transaction[],
  length: number
): Transaction[] {
  return generatePermutedData(source, length, "txn").map((item, index) => ({
    ...item,
    transactionId: `PAY-${2025}-${1000 + index}`,
    amount: item.plan === "Annual" ? 12000 : 1200,
  }));
}

/* =======================
   Example Generated Data
======================= */

// 🔥 Ready-to-use datasets
export const generatedSubscriptions = generateSubscriptions(
  subscriptionsData,
  64
);

export const generatedTransactions = generateTransactions(transactionsData, 34);
