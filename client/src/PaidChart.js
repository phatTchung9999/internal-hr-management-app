import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PaidChart = ({ data = [] }) => {
  const [range, setRange] = useState(7);

  const chartData = data.slice(-range).map(item => ({
    ...item,
    day: new Date(`${item.date}T00:00:00`).toLocaleDateString(
      undefined,
      { month: 'short', day: 'numeric' }
    )
  }));

  return (
    <div className="paidChart">
      <div className="chartHeader">
        <h3>Department Payroll Overview</h3>

        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value) => `$${Number(value).toFixed(2)}`}
            contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 8 }}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Bar dataKey="payroll" name="Payroll" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaidChart;
