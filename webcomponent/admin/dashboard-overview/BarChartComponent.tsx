'use client';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dailyActiveUsersData = [
  { day: "Sunday", users: 4800 },
  { day: "Monday", users: 3200 },
  { day: "Tuesday", users: 3800 },
  { day: "Wednesday", users: 1800 },
  { day: "Thursday", users: 5200 },
  { day: "Friday", users: 4000 },
  { day: "Saturday", users: 4600 },
];

export const BarChartComponent = () => {

    return (
        <>
        <CardHeader>
          <CardTitle>Daily Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyActiveUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#D4915D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        
        </>
    )

}