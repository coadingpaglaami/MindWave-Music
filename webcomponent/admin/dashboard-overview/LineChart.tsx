"use client";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { RevenueMonthlyItem } from "@/typesorinterface/dashboard";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



export const LineChart = ({revenueData}: { revenueData: RevenueMonthlyItem[] }) => {


  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue Overview</CardTitle>
    
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
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
