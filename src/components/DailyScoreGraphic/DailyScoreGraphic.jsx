import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";

function DailyScoreGraphic({ todayScore }) {
  const graphData = [
    {
      score: todayScore,
    },
    {
      score: 100 - todayScore,
    },
  ];
  return (
    <div className="daily-score-graphic">
      <span className="graphic-label">Score</span>
      <div className="graphic-description">
        <span className="percentage">{todayScore}%</span>
        <span className="description">de votre objectif</span>
      </div>
      <PieChart width={230} height={230}>
        <Pie
          data={graphData}
          innerRadius={82}
          outerRadius={94}
          fill="#ff0101"
          dataKey="score"
          startAngle={90}
          endAngle={460}
          stroke="none"
          cornerRadius={40}
        >
          {graphData.map((entry, index) => {
            if (entry.score !== todayScore) {
              return <Cell key={`cell-${index}`} fill="#FBFBFB" />;
            } else {
              return <Cell key={`cell-${index}`} fill="#ff0101" />;
            }
          })}
        </Pie>
        <Pie
          data={[{ score: 100 }]}
          outerRadius={82}
          fill="white"
          dataKey="score"
        ></Pie>
      </PieChart>
    </div>
  );
}
DailyScoreGraphic.propTypes = {
  todayScore: PropTypes.number,
};

export default DailyScoreGraphic;
