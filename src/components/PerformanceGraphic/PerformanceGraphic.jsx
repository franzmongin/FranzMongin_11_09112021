import React from "react";
import { Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

function PerformanceGraphic({ data }) {
  console.log(data);
  return (
    <div className="performance-graphic">
      <RadarChart
        outerRadius={90}
        width={258}
        height={258}
        data={data}
        // outerRadius="100"
      >
        <PolarGrid radialLines={false} />
        <PolarAngleAxis
          dataKey="kindLabel"
          tick={{
            fill: "white",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: "24",
            letterSpacing: "0",
          }}
          dy={2}
        />
        <Radar dataKey="value" fill="#FF0000" fillOpacity={0.6} />
      </RadarChart>
    </div>
  );
}

export default PerformanceGraphic;
