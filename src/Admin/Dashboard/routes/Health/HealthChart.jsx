import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer} from 'recharts';

const HealthChart = () => {
    const data = [
        {
          name: '0H',
          pv: 50,
        },
        {
          name: '1H',
          pv: 200,
        },
        {
          name: '24H',
          pv: 100,
        },
        {
          name: '1W',
          pv: 300,
        },
        {
          name: '1M',
          pv: 50,
        },
        {
          name: '3M',
          pv: 400,
        },
        {
          name: '6M',
          pv: 200,
        },
        {
          name: '1Y',
          pv: 500,
        },
    ];
    
  return (
    <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={450}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 20,
                left: 10,
                bottom: 5,
            }}
            >
            <XAxis dataKey="none"  tickLine={false} padding={{ left: 20, right: 30 }} stroke="#215E7D" strokeWidth={2}/>
            <YAxis tickLine={false} stroke="#215E7D" strokeWidth={2} color='#000' fontSize={14} fontWeight={400} unit="K"/>
            <Line type="monotone" dataKey="pv" stroke="#000" strokeWidth={4} dot={false}  />
            </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HealthChart