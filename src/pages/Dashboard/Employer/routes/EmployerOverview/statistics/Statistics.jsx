import React from 'react';
import './statistics.scss';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, BarChart, Bar } from 'recharts';
import { CustomLegend, CustomLegend1 } from './CustomLegend';

export default function Statistics() {
  const hiringData = [
    {
      name: '2021',
      pm: 125,
      do: 35,
      pd:182,
      wd:75,
      amt:150
    },
    {
      name: '2022',
      pm: 75,
      do: 51,
      pd:140,
      wd:125,
      amt:250
    },
    {
      name: '2023',
      pm: 130,
      do: 74,
      pd:135,
      wd:151,
      amt:300
    },
  ];
  const salaryData = [
    {
      name: '2023',
      pm:  4000,
      do: 2900,
      pd:2200,
      wd:2800,
    },
    {
      name: '2022',
      pm: 1800,
      do: 2200,
      pd:1700,
      wd:900,
    },
    {
      name: '2021',
      pm:600,
      do: 2200,
      pd:2000,
      wd:600,
    },
  ];
  // const yAxisTicks = [0, 500, 1000, 2000, 3000, 4000];
  const formatYAxisTick = (tick) => `$${tick}`;

  return (
    <div className='stats-main'>
        <div className="hiring-stats">
            <h3>Hiring Statistics</h3>
            <div className="statistics-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hiringData}margin={{top:20, right:10, bottom:0, left:10}}>
                  <XAxis dataKey="name" stroke='#000' tickLine={false} tick={{dx:3}} />
                  <YAxis  tickLine={false}/>
                  <Line type="monotone" name='Project Management' dataKey="pm" dot={ false } stroke='rgba(37, 150, 190, 0.1)' />
                  <Line type="monotone" name='DevOps' dataKey="do" dot={ false } stroke='rgba(37, 150, 190, 0.4)' />
                  <Line type="monotone" name='Product Design' dataKey="pd" dot={ false } stroke='rgba(37, 150, 190, 1)' />
                  <Line type="monotone" name='Web Development' dataKey="wd" dot={ false } stroke='rgba(35, 56, 98, 1)' />
                  <Legend content={<CustomLegend />} verticalAlign="top" height={25}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
        </div>
        <div className="salary-stats">
            <h3>Salary Statistics</h3>
            <div className="statistics-container">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryData}margin={{top:30, right:25, bottom:0, left:10}} barGap={0}>
                  <XAxis dataKey="name" stroke='#000' tickLine={false} tick={{dx:3}}/>
                  <YAxis orientation='right' tickFormatter={formatYAxisTick} tick={[0, 500, 1000, 2000, 3000, 4000]}/>
                  <Bar type="monotone" name='Project Management' dataKey="pm"  fill='rgba(37, 150, 190, 0.1)' />
                  <Bar type="monotone" name='DevOps' dataKey="do"  fill='rgba(37, 150, 190, 0.4)' />
                  <Bar type="monotone" name='Product Design' dataKey="pd"  fill='rgba(37, 150, 190, 1)' />
                  <Bar type="monotone" name='Web Development' dataKey="wd" fill='rgba(35, 56, 98, 1)' />
                  <Legend content={<CustomLegend1 />} verticalAlign="top" height={25}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>
    </div>
  )
}
