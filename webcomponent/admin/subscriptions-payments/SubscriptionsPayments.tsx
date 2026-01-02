"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heading, SearchBar } from "@/webcomponent/reusable";
import { Calendar, DollarSign, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { SubscriptionTable } from "./SubscriptionTable";
import { TransactionTable } from "./TransactionTable";

export const statsData = [
  {
    title: "Revenue This Month",
    value: "₦456,000",
    icon: DollarSign,
    // Using specific hex colors from your design
    iconBg: "bg-[#FEF9E7]",
    iconColor: "text-[#D4A017]",
  },
  {
    title: "Premium Subscriptions",
    value: "3,800",
    icon: Users,
    iconBg: "bg-[#FFF5ED]",
    iconColor: "text-[#C18859]",
  },
  {
    title: "Monthly Subscribers",
    value: "1,200",
    icon: Calendar,
    iconBg: "bg-[#FFF5ED]",
    iconColor: "text-[#C18859]",
  },
  {
    title: "Annual Subscribers",
    value: "2,600",
    icon: TrendingUp,
    iconBg: "bg-[#FFF5ED]",
    iconColor: "text-[#C18859]",
  },
];

export const SubscriptionsPayments = () => {
  const [search, setSearch] = useState("");
  const [transactionSearch, setTransactionSearch] = useState("");
  const [subscriptionType, setSubscriptionType] = useState<
    string | "All Subscriptions"
  >("All Subscriptions");
  const subscriptions = ["All Subscriptions", "Active", "Expired", "Cancelled"];
  return (
    <div className="py-16 flex flex-col gap-6">
      <Heading
        title="Subscriptions & Payments"
        subtitle="Monitor revenue and manage subscriptions"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card
            key={index}
            className="border-[#F0E6DD] shadow-sm overflow-hidden"
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-[11px] font-medium text-[#8C746A] uppercase tracking-tight">
                  {stat.title}
                </p>
                <h3 className="text-xl font-bold text-[#5C4033]">
                  {stat.value}
                </h3>
              </div>

              {/* Circular Icon Container */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}
              >
                <stat.icon size={22} className={stat.iconColor} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <span className="">Active Subscription</span>
        <SearchBar
          className="flex-1"
          value={search}
          placeholder={"Search subscriptions..."}
          onChange={setSearch}
        />
        <Select value={subscriptionType} onValueChange={setSubscriptionType}>
          <SelectTrigger className="max-w-56 w-full bg-[#F5E6D3]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent
            className="
          "
          >
            {subscriptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SubscriptionTable search={search} statusFilter={subscriptionType} />
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <span className="">Recent Transaction</span>
        <SearchBar
          className="flex-1"
          value={transactionSearch}
          placeholder={"Search Transactions..."}
          onChange={setTransactionSearch}
        />
      </div>
      <TransactionTable search={transactionSearch} />
    </div>
  );
};
