import React from "react";
import {
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

function PerformanceGraphic({ data }) {
  console.log(data);
  return (
    <div className="performance-graphic">
      <RadarChart outerRadius={90} width={730} height={250} data={data}>
        <PolarGrid radialLines={false} />
        <PolarAngleAxis dataKey="kindLabel" />
        <Radar
          //   name="Mike"
          dataKey="value"
          //   stroke="#FF0101"
          fill="#FF0000"
          fillOpacity={0.6}
          legendType="square"
        />
        <Legend />
      </RadarChart>
    </div>
  );
}

export default PerformanceGraphic;
