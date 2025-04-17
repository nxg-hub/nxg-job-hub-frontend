"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", active: 12, inactive: 8 },
  { month: "Feb", active: 6, inactive: 10 },
  { month: "Mar", active: 10, inactive: 5 },
  { month: "Apr", active: 15, inactive: 3 },
  { month: "May", active: 8, inactive: 9 },
  { month: "Jun", active: 12, inactive: 7 },
  { month: "Jul", active: 7, inactive: 11 },
  { month: "Aug", active: 13, inactive: 6 },
  { month: "Sep", active: 14, inactive: 4 },
]

export function TimeMetrics() {
  return (
    <div className="h-[300px] w-full">
      <div className="mb-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
          <span>Active (hrs)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-gray-300"></div>
          <span>Inactive (hrs)</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="active" fill="#8b5cf6" />
          <Bar dataKey="inactive" fill="#e5e7eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
