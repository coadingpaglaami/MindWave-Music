export interface DashboardKpis {
  total_users: number;
  new_users_today: number;
  premium_subscribers: number;
  sessions_today: number;
}

export interface DashboardCharts {
  revenue_monthly: RevenueMonthlyItem[];
  dau_weekly: DauWeeklyItem[];
}

export interface DashboardDistribution {
  free_users_percent: number;
  premium_users_percent: number;
}

export interface MostPlayedMeditation {
  title: string;
  count: number;
}

export interface HighestStreak {
  name: string;
  value: number;
}

export interface PopularAffirmation {
  text: string;
  count: number;
}

export interface DashboardInsights {
  most_played_meditation: MostPlayedMeditation;
  highest_streak: HighestStreak;
  popular_affirmation: PopularAffirmation;
}

export interface DashboardData {
  kpis: DashboardKpis;
  charts: DashboardCharts;
  distribution: DashboardDistribution;
  insights: DashboardInsights;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface RevenueMonthlyItem {
  month: string;
  revenue: number;
}

export interface DauWeeklyItem {
  day: string;
  active_users: number;
}