import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/webcomponent/reusable";
import { LineChart } from "./LineChart";
import { PieChartComponent } from "./PieChartComponent";
import { BarChartComponent } from "./BarChartComponent";
import { cn } from "@/lib/utils";
import { Clock, Crown, UserPlus, Users, Activity } from "lucide-react";

const quickInsights = [
  {
    title: "Most Played Meditation",
    highlight: "Deep Sleep Journey",
    subtitle: "2,340 plays this week",
  },
  {
    title: "Highest Streak",
    highlight: "127 Days",
    subtitle: "Achieved by Sarah M.",
  },
  {
    title: "Popular Affirmation",
    highlight: "Self-Love & Confidence",
    subtitle: "1,890 users favorite this month",
  },
];

const statsData = [
  {
    title: "Total Active Users",
    value: "16,300",
    trend: "+12% this month",
    trendType: "positive",
    icon: Users,
  },
  {
    title: "New Users Today",
    value: "342",
    trend: "+8% from yesterday",
    trendType: "positive",
    icon: UserPlus,
  },
  {
    title: "Premium Subscribers",
    value: "3,800",
    trend: "23% conversion",
    trendType: "info",
    icon: Crown,
  },
  {
    title: "Sessions Today",
    value: "8,420",
    trend: "-15% decrease",
    trendType: "negative",
    icon: Activity,
  },
  {
    title: "Peak Activity",
    value: "8:00 PM",
    trend: "Evening meditation",
    trendType: "info",
    icon: Clock,
  },
];

export const DashboardOverview = () => {
  return (
    <div className="flex flex-col gap-6 py-16">
      <Heading
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening with Zenzi Wellness today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-4 bg-slate-50/50">
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
                  <p
                    className={cn(
                      "text-xs font-medium",
                      stat.trendType === "positive" && "text-green-600",
                      stat.trendType === "negative" && "text-red-500",
                      stat.trendType === "info" && "text-indigo-600"
                    )}
                  >
                    {stat.trend}
                  </p>
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
          <LineChart />
        </Card>

        <Card className="md:w-[30%]">
          <PieChartComponent />
        </Card>
      </div>
      <Card className="w-full">
        <BarChartComponent />
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
