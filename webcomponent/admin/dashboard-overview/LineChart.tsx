"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const yearlyRevenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1400 },
  { month: "Mar", revenue: 1300 },
  { month: "Apr", revenue: 1100 },
  { month: "May", revenue: 1500 },
  { month: "Jun", revenue: 1800 },
  { month: "Jul", revenue: 2000 },
  { month: "Aug", revenue: 2100 },
  { month: "Sep", revenue: 2050 },
  { month: "Oct", revenue: 2000 },
  { month: "Nov", revenue: 1950 },
  { month: "Dec", revenue: 1900 },
];

const weeklyRevenueData = [
  { day: "Mon", revenue: 180 },
  { day: "Tue", revenue: 220 },
  { day: "Wed", revenue: 200 },
  { day: "Thu", revenue: 250 },
  { day: "Fri", revenue: 300 },
  { day: "Sat", revenue: 350 },
  { day: "Sun", revenue: 280 },
];

const monthlyRevenueData = [
  { week: "Week 1", revenue: 1200 },
  { week: "Week 2", revenue: 1350 },
  { week: "Week 3", revenue: 1500 },
  { week: "Week 4", revenue: 1650 },
];

export const LineChart = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");

  const revenueData =
    timeFilter === "monthly"
      ? monthlyRevenueData
      : timeFilter === "weekly"
      ? weeklyRevenueData
      : yearlyRevenueData;

  const xAxisKey =
    timeFilter === "weekly"
      ? "day"
      : timeFilter === "monthly"
      ? "week"
      : "month";

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Overview</CardTitle>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D4915D"
              strokeWidth={3}
              dot={{ fill: "#D4915D" }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </>
  );
};
