'use client';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DauWeeklyItem } from "@/typesorinterface/dashboard";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export const BarChartComponent = ({ dailyActiveUsersData }: { dailyActiveUsersData: DauWeeklyItem[] }) => {

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
              <Bar dataKey="active_users" fill="#D4915D" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        
        </>
    )

}