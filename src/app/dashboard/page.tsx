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
  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <Title>Monthly Sales</Title>
            <BarChart
              className="mt-6"
              data={salesData}
              index="month"
              categories={["sales"]}
              colors={["blue"]}
              yAxisWidth={48}
            />
          </Card>

          <Card>
            <Title>Product Sales Distribution</Title>
            <DonutChart
              className="mt-6"
              data={productData}
              category="sales"
              index="name"
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
          </Card>
        </div>

        <Card className="mb-8">
          <Title>Revenue Comparison</Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={revenueData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Online Sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="In-Store Sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <Title>Recent Transactions</Title>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TRX-
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(Math.random() * 1000).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          index % 2 === 0
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {index % 2 === 0 ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
