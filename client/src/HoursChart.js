import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const HoursChart = () => {
  const [range, setRange] = useState(7);

  const allData = [
    { day: "Day 1", hours: 8 },
    { day: "Day 2", hours: 7 },
    { day: "Day 3", hours: 9 },
    { day: "Day 4", hours: 6 },
    { day: "Day 5", hours: 8 },
    { day: "Day 6", hours: 5 },
    { day: "Day 7", hours: 8 },
    { day: "Day 8", hours: 7 },
    { day: "Day 9", hours: 6 },
    { day: "Day 10", hours: 8 },
    { day: "Day 11", hours: 9 },
    { day: "Day 12", hours: 7 },
    { day: "Day 13", hours: 8 },
    { day: "Day 14", hours: 6 }
  ];

  const chartData = allData.slice(0, range);

  return (
    <div className="hoursChart">
      <div className="chartHeader">
        <h3>Total Hours</h3>

        <select value={range} onChange={(e) => setRange(Number(e.target.value))}>
          <option value={7}>7 days</option>
          <option value={14}>14 days</option>
          <option value={30}>30 days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HoursChart;