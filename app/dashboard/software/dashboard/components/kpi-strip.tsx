"use client";

import { format, parse } from "date-fns";
import { ArrowUpRight, Briefcase, Building2, DollarSign, PackageCheck, ReceiptText, RotateCcw, ShoppingBag, Users } from "lucide-react";
import { Area, Bar, CartesianGrid, ComposedChart, XAxis, YAxis } from "recharts";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const revenueBucketRanges = ["01-05", "06-10", "11-15", "16-20", "21-25", "26-31"] as const;

const revenueBucketValues = [
  [4820, 5150, 5060, 5520, 5990, 6880],
  [5140, 5360, 5520, 5860, 6120, 6720],
  [4920, 4680, 5150, 5360, 5720, 6150],
  [5480, 5920, 5660, 6180, 6340, 6660],
  [5840, 6220, 6480, 6110, 6680, 7230],
  [6280, 6740, 6960, 7120, 6780, 7240],
  [6820, 7240, 7680, 7410, 7920, 7810],
  [6040, 6420, 6150, 6860, 7080, 7090],
  [5860, 6120, 6340, 6080, 6620, 6900],
  [6520, 6840, 7060, 7420, 7160, 8280],
  [6980, 7320, 7640, 7160, 8040, 8620],
  [6900, 7400, 8100, 8600, 8200, 9360],
] as const;

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

function getRollingRevenueBuckets() {
  const currentMonth = new Date();
  currentMonth.setDate(1);

  return revenueBucketValues.map((values, index) => {
    const monthDate = new Date(currentMonth);
    monthDate.setMonth(currentMonth.getMonth() - (revenueBucketValues.length - 1 - index));

    return {
      month: `${monthFormatter.format(monthDate)} ${String(monthDate.getFullYear()).slice(-2)}`,
      values,
    };
  });
}

const revenueOverviewData = getRollingRevenueBuckets().flatMap(({ month, values }) =>
  values.map((revenue, index) => ({
    period: `${month} ${revenueBucketRanges[index]}`,
    profit: Math.round(revenue * (index % 3 === 0 ? 0.24 : index % 3 === 1 ? 0.28 : 0.26)),
    revenue,
  })),
);

const revenueOverviewConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--foreground)",
  },
  profit: {
    label: "Profit",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig;

// function formatMonthTick(value: string) {
//   const parts = value.split(" ");
//   const range = parts.at(-1);
//   const month = parts.slice(0, -1).join(" ");

//   return range === "11-15" ? month : "";
// }

function formatTooltipLabel(value: string) {
  const parts = value.split(" ");
  const range = parts.at(-1);
  const month = parse(parts.slice(0, -1).join(" "), "MMM yy", new Date());
  const [start, end] = String(range).split("-");
  const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const startDate = new Date(month.getFullYear(), month.getMonth(), Number(start));
  const endDate = new Date(month.getFullYear(), month.getMonth(), Math.min(Number(end), lastDayOfMonth));

  return `${format(month, "MMM")} ${format(startDate, "do")} - ${format(endDate, "do")}, ${format(month, "yyyy")}`;
}

function formatCurrencyTooltipValue(value: unknown) {
  return typeof value === "number"
    ? `₹${value.toLocaleString()}`
    : String(value ?? "");
}

export function KpiStrip() {

  // const [stats, setStats] = useState<any>(null);
 const [stats, setStats] = useState<any>(null);
 const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const [chartData, setChartData] = useState([]);
  

// const completeChartData = months.map((month) => {
//   const found = stats?.chartData?.find(
//     (item: any) => item.month === month
//   );

//   return {
//     month,
//     sales: found?.sales || 0,
//   };
// });



useEffect(() => {
  const loadStats = async () => {
    try {
      const res = await fetch("/api/software-client");
      const data = await res.json();

      if (data.success) {
        console.log("data",data.clients);
        setClients(data.clients);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  loadStats();
}, []);



const totalOrders = clients?.length || 0;
console.log(totalOrders);

const basicCount =
  clients?.filter(
    (item: any) =>
      item.plan?.toLowerCase() === "basic"
  ).length || 0;

const businessCount =
  clients?.filter(
    (item: any) =>
      item.plan?.toLowerCase() === "business"
  ).length || 0;

const enterpriseCount =
  clients?.filter(
    (item: any) =>
      item.plan?.toLowerCase() === "enterprise"
  ).length || 0;

// Last week growth function
const getGrowth = (plan?: string) => {
  if (!stats) return 0;

  const now = new Date();

  const currentWeek = stats.filter(
    (item: any) => {
      const created = new Date(
        item.createdAt
      );

      const isCurrent =
        created >=
        new Date(
          now.getTime() -
            7 * 24 * 60 * 60 * 1000
        );

      return plan
        ? isCurrent &&
            item.plan?.toLowerCase() ===
              plan.toLowerCase()
        : isCurrent;
    }
  ).length;

  const previousWeek = stats.filter(
    (item: any) => {
      const created = new Date(
        item.createdAt
      );

      const start =
        now.getTime() -
        14 * 24 * 60 * 60 * 1000;

      const end =
        now.getTime() -
        7 * 24 * 60 * 60 * 1000;

      const isPrevious =
        created >= new Date(start) &&
        created < new Date(end);

      return plan
        ? isPrevious &&
            item.plan?.toLowerCase() ===
              plan.toLowerCase()
        : isPrevious;
    }
  ).length;

  if (previousWeek === 0)
    return currentWeek > 0 ? 100 : 0;

  return (
    (
      (currentWeek - previousWeek) /
      previousWeek
    ) *
    100
  ).toFixed(1);
};

const totalGrowth = getGrowth();
const basicGrowth = getGrowth("Basic");
const businessGrowth =
  getGrowth("Business");
const enterpriseGrowth =
  getGrowth("Enterprise");

const chartData = React.useMemo(() => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month, index) => {
    const monthClients =
      clients?.filter((client) => {
        const date = new Date(client.createdAt);

        return date.getMonth() === index;
      }) || [];

    return {
      month,

      basic: monthClients.filter(
        (c) =>
          c.plan?.toLowerCase() === "basic"
      ).length,

      business: monthClients.filter(
        (c) =>
          c.plan?.toLowerCase() === "business"
      ).length,

      enterprise: monthClients.filter(
        (c) =>
          c.plan?.toLowerCase() === "enterprise"
      ).length,
    };
  });
}, [clients]);


//   const totalOrders = clients.length;

// const basicCount = clients.filter(
//   (item) => item.plan === "Basic"
// ).length;

// const businessCount = clients.filter(
//   (item) => item.plan === "Business"
// ).length;

// const enterpriseCount = clients.filter(
//   (item) => item.plan === "Enterprise"
// ).length;
  return (
    <div className="h-full overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 xl:col-span-12">
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-12">
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 xl:col-span-5 xl:border-r">

  {/* Total Orders */}
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-normal">
        Total Orders
      </CardTitle>

      <CardDescription className="text-3xl text-foreground">
        {totalOrders}
      </CardDescription>

      <CardAction>
        <ShoppingBag className="size-4" />
      </CardAction>
    </CardHeader>

    <CardContent>
      <div className="text-sm">
        <span className="text-green-600">
          +{totalGrowth}%
        </span>
        <span className="text-muted-foreground">
          {" "}vs last week
        </span>
      </div>
    </CardContent>
  </Card>

  {/* Basic */}
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-normal">
        Basic Plan
      </CardTitle>

      <CardDescription className="text-3xl text-foreground">
        {basicCount}
      </CardDescription>

      <CardAction>
        <Users className="size-4" />
      </CardAction>
    </CardHeader>

    <CardContent>
      <div className="text-sm">
        <span className="text-green-600">
          +{basicGrowth}%
        </span>
        <span className="text-muted-foreground">
          {" "}vs last week
        </span>
      </div>
    </CardContent>
  </Card>

  {/* Business */}
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-normal">
        Business Plan
      </CardTitle>

      <CardDescription className="text-3xl text-foreground">
        {businessCount}
      </CardDescription>

      <CardAction>
        <Briefcase className="size-4" />
      </CardAction>
    </CardHeader>

    <CardContent>
      <div className="text-sm">
        <span className="text-green-600">
          +{businessGrowth}%
        </span>
        <span className="text-muted-foreground">
          {" "}vs last week
        </span>
      </div>
    </CardContent>
  </Card>

  {/* Enterprise */}
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-normal">
        Enterprise Plan
      </CardTitle>

      <CardDescription className="text-3xl text-foreground">
        {enterpriseCount}
      </CardDescription>

      <CardAction>
        <Building2 className="size-4" />
      </CardAction>
    </CardHeader>

    <CardContent>
      <div className="text-sm">
        <span className="text-green-600">
          +{enterpriseGrowth}%
        </span>
        <span className="text-muted-foreground">
          {" "}vs last week
        </span>
      </div>
    </CardContent>
  </Card>



            {/* <Card className="h-full rounded-none border-0 border-border border-b ring-0 md:border-r md:border-b-0">
              <CardHeader>
                <CardTitle className="font-normal text-sm">Return Requests</CardTitle>
                <CardDescription className="text-3xl text-foreground tabular-nums leading-none tracking-tight">
                  18
                </CardDescription>
                <CardAction className="grid size-6 place-items-center rounded-sm bg-muted">
                  <RotateCcw className="size-3 text-foreground" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <span className="text-destructive">+0.6%</span>
                  <span className="text-muted-foreground"> vs last month</span>
                </div>
              </CardContent>
            </Card> */}

            {/* <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle className="font-normal text-sm">Stock Accuracy</CardTitle>
                <CardDescription className="text-3xl text-foreground tabular-nums leading-none tracking-tight">
                  97%
                </CardDescription>
                <CardAction className="grid size-6 place-items-center rounded-sm bg-muted">
                  <PackageCheck className="size-3 text-foreground" />
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <span className="text-green-700 dark:text-green-300">+2.4 pts</span>
                  <span className="text-muted-foreground"> vs last audit</span>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <Card className="h-full rounded-none border-0 ring-0 xl:col-span-7">
            <CardHeader>
              <CardTitle className="font-normal"> Plan Graph</CardTitle>
              <CardAction>
                <ArrowUpRight className="size-4" />
              </CardAction>
            </CardHeader>

            <CardContent>
              {!clients?.length? (
  <div className="h-[300px] flex items-center justify-center">
    No sales data found
  </div>
) : (
  

              <ChartContainer config={revenueOverviewConfig} className="h-74 w-full">
               <ComposedChart data={chartData}>
                  <defs>
                    <filter id="sales-line-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feFlood floodColor="var(--color-revenue)" floodOpacity="0.35" />
                      <feComposite in2="blur" operator="in" />
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid yAxisId="profit" vertical={false} />
                <XAxis
  dataKey="month"
  axisLine={false}
  tickLine={false}
  tickMargin={10}
  interval={0} // Show all labels
  minTickGap={0}
  tick={{ fontSize: 12 }}
/>
                  <YAxis yAxisId="revenue" hide />
                  <YAxis yAxisId="profit" hide domain={[0, 6000]} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        className="w-40"
                       labelFormatter={(value) => `Month: ${value}`}
                        formatter={(value, name, item) => (
                          <>
                            <div
                              className="size-2.5 shrink-0 rounded-[2px]"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />
                            <div className="flex flex-1 items-center justify-between leading-none">
                              <span className="text-muted-foreground">{String(name ?? "")}</span>
                              <span className="font-medium font-mono text-foreground tabular-nums">
                                {formatCurrencyTooltipValue(value)}
                              </span>
                            </div>
                          </>
                        )}
                      />
                    }
                    cursor={{
                      stroke: "var(--border)",
                      strokeDasharray: "4 4",
                    }}
                  />
                  {/* <Bar
                    yAxisId="profit"
                    barSize={4}
                    dataKey="profit"
                    fill="var(--color-profit)"
                    name="Profit"
                    opacity={0.18}
                    radius={[6, 6, 0, 0]}
                  /> */}
      <Area
  dataKey="basic"
  name="Basic"
  stroke="#06b6d4"
  fill="none"
  strokeWidth={2}
/>

<Area
  dataKey="business"
  name="Business"
  stroke="#22c55e"
  fill="none"
  strokeWidth={2}
/>

<Area
  dataKey="enterprise"
  name="Enterprise"
  stroke="#f97316"
  fill="none"
  strokeWidth={2}
/>
                </ComposedChart>
              </ChartContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}