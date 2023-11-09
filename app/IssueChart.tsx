'use client'
import { Card } from '@radix-ui/themes'
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
interface Props {
    open: number,
    closed: number,
    in_progress: number
}
const IssueChart = ({open, closed, in_progress}: Props) => {
    const data = [
        {name: 'Open', uv: open},
        {name: 'Closed', uv: closed},
        {name: 'In Progress', uv: in_progress}    
    ];
  return (
    <Card>
        
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>

        
    </Card>
  )
}

export default IssueChart