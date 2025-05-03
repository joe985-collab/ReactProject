import React from 'react'
import "./chart.css"
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
export default function Chart({title,data,dataKey,grid}) {
  return (
    <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={3/1}>
            <LineChart data={data}>
                <XAxis dataKey="country" stroke="#5550bd"/>
                <YAxis/>
                <Line type="monotone" dataKey={dataKey[0]} stroke="#5550bd"/>
                <Line type="monotone" dataKey={dataKey[1]} stroke="#019267"/>
                <Line type="monotone" dataKey={dataKey[2]} stroke="#9ADCFF"/>
                <Tooltip/>
                {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}


