import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PaidChart = () => {
  const [range, setRange] = useState(7);

  const allData = [
    { day: "Day 1", paid: 850 },
    { day: "Day 2", paid: 760 },
    { day: "Day 3", paid: 920 },
    { day: "Day 4", paid: 680 },
    { day: "Day 5", paid: 810 },
    { day: "Day 6", paid: 530 },
    { day: "Day 7", paid: 880 },
    { day: "Day 8", paid: 790 },
    { day: "Day 9", paid: 650 },
    { day: "Day 10", paid: 840 },
    { day: "Day 11", paid: 940 },
    { day: "Day 12", paid: 720 },
    { day: "Day 13", paid: 860 },
    { day: "Day 14", paid: 690 },
    { day: "Day 15", paid: 750 },
    { day: "Day 16", paid: 810 },
    { day: "Day 17", paid: 900 },
    { day: "Day 18", paid: 620 },
    { day: "Day 19", paid: 770 },
    { day: "Day 20", paid: 830 },
    { day: "Day 21", paid: 870 },
    { day: "Day 22", paid: 710 },
    { day: "Day 23", paid: 790 },
    { day: "Day 24", paid: 880 },
    { day: "Day 25", paid: 930 },
    { day: "Day 26", paid: 690 },
    { day: "Day 27", paid: 760 },
    { day: "Day 28", paid: 820 },
    { day: "Day 29", paid: 850 },
    { day: "Day 30", paid: 910 },
  ];

  const chartData = allData.slice(0, range);

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
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value}`} />
          <Bar dataKey="paid" name="Payroll" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaidChart;