// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import "./BarGraph.css"

const data = [
  { name: 'Oncology', appointments: 250, color: '#D04122' },
  { name: 'Cardiology', appointments: 167, color: '#FDBD74' },
  { name: 'Internal Medicine', appointments: 118, color: '#8E88D2' },
  { name: 'Gastroenterology', appointments: 74, color: '#8AC1B1' },
  { name: 'Orthopaedics', appointments: 448, color: '#D04122' },
];

const DepartmentAppointmentsChart = () => (

  <div className="WeeklyappontSec">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart layout="vertical" data={data} barCategoryGap="30%">
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={100} />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Bar dataKey="appointments" barSize={15} radius={[0, 10, 10, 0]}>
          <LabelList dataKey="appointments" position="right" style={{ fill: '#302F2E', opacity: "70%" , fontSize:"15px" , fontWeight: 'bold' }} />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DepartmentAppointmentsChart;
