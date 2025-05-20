import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis }from "recharts"

export function Overview() {
  const data = [
    {
      name: "Jan",
      Applications: 40,
      Interviews: 24,
      Hired: 5,
    },
    {
      name: "Feb",
      Applications: 30,
      Interviews: 13,
      Hired: 3,
    },
    {
      name: "Mar",
      Applications: 20,
      Interviews: 8,
      Hired: 2,
    },
    {
      name: "Apr",
      Applications: 27,
      Interviews: 15,
      Hired: 4,
    },
    {
      name: "May",
      Applications: 18,
      Interviews: 10,
      Hired: 2,
    },
    {
      name: "Jun",
      Applications: 23,
      Interviews: 12,
      Hired: 3,
    },
    {
      name: "Jul",
      Applications: 34,
      Interviews: 18,
      Hired: 4,
    },
    {
      name: "Aug",
      Applications: 45,
      Interviews: 25,
      Hired: 6,
    },
    {
      name: "Sep",
      Applications: 65,
      Interviews: 35,
      Hired: 8,
    },
    {
      name: "Oct",
      Applications: 52,
      Interviews: 28,
      Hired: 7,
    },
    {
      name: "Nov",
      Applications: 38,
      Interviews: 20,
      Hired: 5,
    },
    {
      name: "Dec",
      Applications: 43,
      Interviews: 22,
      Hired: 6,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Applications" fill="#4f46e5" />
        <Bar dataKey="Interviews" fill="#10b981" />
        <Bar dataKey="Hired" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  )
}
