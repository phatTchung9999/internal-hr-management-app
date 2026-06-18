import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

const HoursChart = ({ data = [] }) => {
  const [range, setRange] = useState(7);

  const chartData = data.slice(-range).map(item => ({
    ...item,
    day: new Date(`${item.date}T00:00:00`).toLocaleDateString(
      undefined,
      { month: 'short', day: 'numeric' }
    )
  }));

  return (
    <div className="hoursChart">
      <div className="chartHeader">
        <h3>Department Hours</h3>

        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ border: '1px solid #e2e8f0', borderRadius: 8 }}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Legend iconType="circle" />
          <Bar dataKey="workedHours" name="Worked Hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          <Bar dataKey="effectiveHours" name="Effective Hours" fill="#14b8a6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoursChart;
