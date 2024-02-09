import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const HealthChart = () => {
    const data = [
        {
          name: '0',
          pv: 600,
        },
        {
          name: '10K',
          pv: 800,
        },
        {
          name: '50K',
          pv: 1150,
        },
        {
          name: '100K',
          pv: 1100,
        },
        {
          name: '200K',
          pv: 2000,
        },
        {
          name: '300K',
          pv: 1000,
        },
        {
          name: '400K',
          pv: 3500,
        },
        {
          name: '500K',
          pv: 1490,
        },
    ];

  return (
    <>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <XAxis dataKey="none"  tickLine={false}/>
            <YAxis tickLine={false} />
            <Line type="monotone" dataKey="pv" stroke="#000"  />
            </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default HealthChart