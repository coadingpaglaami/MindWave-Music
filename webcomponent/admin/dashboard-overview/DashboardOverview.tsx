'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/webcomponent/reusable";
import { LineChart } from "./LineChart";
import { PieChartComponent } from "./PieChartComponent";
import { BarChartComponent } from "./BarChartComponent";
import { cn } from "@/lib/utils";
import { Clock, Crown, UserPlus, Users, Activity } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/api/auth";



export const DashboardOverview = () => {
  const { data: dashboardStats, isLoading } = useGetDashboardStatsQuery();
  const quickInsights = [
  {
    title: "Most Played Meditation",
    highlight: dashboardStats?.data?.insights?.most_played_meditation?.title,
    subtitle: `${dashboardStats?.data?.insights?.most_played_meditation?.count} plays this week`,
  },
  {
    title: "Highest Streak",
    highlight: dashboardStats?.data?.insights?.highest_streak?.name,
    subtitle: `Achieved by ${dashboardStats?.data?.insights?.highest_streak?.name}`,
  },
  {
    title: "Popular Affirmation",
    highlight: dashboardStats?.data?.insights?.popular_affirmation?.text,
    subtitle: `${dashboardStats?.data?.insights?.popular_affirmation?.count} users favorite this month`,
  },
];

const statsData = [
  {
    title: "Total Active Users",
    value: dashboardStats?.data?.kpis?.total_users ?? 0,
    icon: Users,
  },
  {
    title: "New Users Today",
    value: dashboardStats?.data?.kpis?.new_users_today ?? 0,
    icon: UserPlus,
  },
  {
    title: "Premium Subscribers",
    value: dashboardStats?.data?.kpis?.premium_subscribers ?? 0,
    icon: Crown,
  },
  {
    title: "Sessions Today",
    value: dashboardStats?.data?.kpis?.sessions_today ?? 0,
    icon: Activity,
  },
  
];

const userDistributionData = [
  {
    name: "Free Users",
    value: dashboardStats?.data?.distribution?.free_users_percent ?? 0,
    color: "#D4915D",
  },
  {
    name: "Premium Users",
    value: dashboardStats?.data?.distribution?.premium_users_percent ?? 0,
    color: "#D4AF37",
  },
];
  return (
    <div className="flex flex-col gap-6 py-16">
      <Heading
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with Zenzi Wellness today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-4 bg-slate-50/50">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card key={index} className="border-primary overflow-hidden">
              <CardContent className="p-6 flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground leading-none">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </h3>
              
                </div>

                <div className="p-3 rounded-full bg-[#D4915D]/10 text-[#D4915D]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex items-stretch gap-3.5 w-full ">
        <Card className="md:w-[70%]">
          {" "}
          <LineChart revenueData={dashboardStats?.data?.charts?.revenue_monthly || []} />
        </Card>

        <Card className="md:w-[30%]">
          <PieChartComponent userDistributionData={userDistributionData} />
        </Card>
      </div>
      <Card className="w-full">
        <BarChartComponent dailyActiveUsersData={dashboardStats?.data?.charts?.dau_weekly || []} />
      </Card>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3.5">
        {quickInsights.map((insight, index) => (
          <Card
            key={index}
            className="shadow-brand border-primary border-t border-r border-b border-l-4 border-l-primary "
          >
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">{insight.title}</p>
              <p className="text-xl font-semibold text-[#D4915D]">
                {insight.highlight}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {insight.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
