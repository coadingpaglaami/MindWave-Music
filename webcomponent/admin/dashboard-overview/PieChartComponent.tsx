'use client';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart } from "recharts";

const userDistributionData = [
  { name: "Free Users", value: 77, color: "#D4915D" },
  { name: "Premium Users", value: 23, color: "#D4AF37" },
];
export const PieChartComponent = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userDistributionData}
              cx="50%"
              cy="50%"
            
              outerRadius={100}
              dataKey="value"
            >
              {userDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D4915D]" />
              <span>Free Users</span>
            </div>
            <span>77%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              <span>Premium Users</span>
            </div>
            <span>23%</span>
          </div>
        </div>
      </CardContent>
    </>
  );
};
