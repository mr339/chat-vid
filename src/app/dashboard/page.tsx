"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, Title, BarChart, DonutChart } from "@tremor/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
];

const productData = [
  { name: "Product A", sales: 400 },
  { name: "Product B", sales: 300 },
  { name: "Product C", sales: 200 },
  { name: "Product D", sales: 100 },
];

const revenueData = [
  {
    date: "2023-01-01",
    "Online Sales": 4000,
    "In-Store Sales": 2400,
  },
  {
    date: "2023-02-01",
    "Online Sales": 3000,
    "In-Store Sales": 1398,
  },
  {
    date: "2023-03-01",
    "Online Sales": 2000,
    "In-Store Sales": 9800,
  },
  {
    date: "2023-04-01",
    "Online Sales": 2780,
    "In-Store Sales": 3908,
  },
  {
    date: "2023-05-01",
    "Online Sales": 1890,
    "In-Store Sales": 4800,
  },
  {
    date: "2023-06-01",
    "Online Sales": 2390,
    "In-Store Sales": 3800,
  },
];

export default function Dashboard() {
  const t = useTranslations("Dashboard");
  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  const chartColors = isDarkMode
    ? ["#60a5fa", "#818cf8", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"]
    : ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {t("title")}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Title className="text-gray-900 dark:text-white text-xl mb-4">
                {t("monthlySales")}
              </Title>
              <BarChart
                className="mt-6 h-72"
                data={salesData}
                index="month"
                categories={["sales"]}
                colors={[chartColors[0]]}
                yAxisWidth={48}
                showAnimation={true}
                showLegend={false}
                valueFormatter={(number) =>
                  `$${Intl.NumberFormat("us").format(number).toString()}`
                }
              />
            </Card>

            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Title className="text-gray-900 dark:text-white text-xl mb-4">
                {t("productSalesDistribution")}
              </Title>
              <DonutChart
                className="mt-6 h-72"
                data={productData}
                category="sales"
                index="name"
                colors={chartColors}
                valueFormatter={(number) =>
                  `$${Intl.NumberFormat("us").format(number).toString()}`
                }
              />
            </Card>
          </div>

          <Card className="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Title className="text-gray-900 dark:text-white text-xl mb-4">
              {t("revenueComparison")}
            </Title>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={revenueData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="date"
                  stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                    borderRadius: "8px",
                    border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Online Sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="In-Store Sales"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Title className="text-gray-900 dark:text-white text-xl mb-4">
              {t("recentTransactions")}
            </Title>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {["date", "transactionId", "amount", "status"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {t(header)}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[...Array(5)].map((_, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        TRX-
                        {Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        ${(Math.random() * 1000).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            index % 2 === 0
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          }`}
                        >
                          {index % 2 === 0 ? t("completed") : t("pending")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
