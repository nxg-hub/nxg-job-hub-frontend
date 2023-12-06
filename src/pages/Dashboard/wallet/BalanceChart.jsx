import React from 'react';
import './wallet.scss';
import { LineChart, Line, XAxis, ReferenceLine, Label, ResponsiveContainer, } from 'recharts';

export default function BalanceChart() {
    const data = [
        {
          name: '0H',
          pv: 600,
        },
        {
          name: '1H',
          pv: 800,
        },
        {
          name: '24H',
          pv: 1150,
        },
        {
          name: '1W',
          pv: 1100,
        },
        {
          name: '1M',
          pv: 2000,
        },
        {
          name: '3M',
          pv: 1000,
        },
        {
          name: '6M',
          pv: 4000,
        },
        {
          name: '1Y',
          pv: 1490,
        },
      ];


  return (
    <div style={{background:'rgba(37, 150, 190, 1)', borderRadius:'15px', width:'100%', maxWidth:"440px", height:"221px"}}>
        <h3 style={{color:"#ffffff", fontSize:"24px", fontWeight:"600", fontFamily:"Manrope", margin:"0 0 0 1rem", padding:"1rem 0 0 0"}} >Available Balance $4270</h3>
        <ResponsiveContainer width="100%" height="80%">
            <LineChart width={420} height={150} margin={{top:10, left: 0, right:0, bottom: 5}} data={data}>
                <XAxis dataKey="name" stroke='#fff' axisLine={false} tickLine={false} tick={{dy: -10, dx: -12}}/>
                <Line type="monotone" dataKey="pv" stroke="#fff" dot={false}/>
                <ReferenceLine x="6M" stroke='none' >
                <Label
                    offset={0}
                    position="top"
                    value="$6000"
                    viewBox={{
                        height: 50,
                        width: 50,
                        x: 50,
                        y: 20
                    }}
                    fill='#000'
                    fontSize={13.66}
                />
                </ReferenceLine>
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}
