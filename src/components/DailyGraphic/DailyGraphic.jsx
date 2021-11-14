import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import PropTypes from "prop-types";

function DailyGraphic({ data: dailyData }) {
  /** Custom tick formatter
   *
   * @param {string|number} tickitem
   * @returns {(string|number)}
   */
  const dateTickFormatter = (tickitem) => {
    if (
      typeof tickitem === "string" &&
      tickitem.includes("0") &&
      tickitem.toString() !== "0"
    ) {
      return tickitem.split("-")[2].split("0")[1];
    }
    return tickitem;
  };
  /**
   * Custom tooltip for Daily Graphic
   *
   * @param {{
   *  active: boolean
   *  payload: Array
   * }} param0
   *
   * @returns {(string|ReactElement)}
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{` ${payload[0].value} kg`}</p>
          <p>{` ${payload[1].value} Kcal`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="daily-graphic">
      <h3 className="daily-graphic-heading">Activité quotidienne</h3>
      <div className="daily-graphic-container">
        <BarChart width={763} height={320} data={dailyData} barGap="8">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            padding={{ left: 10, right: 10 }}
            // scale="point"
            tickLine={false}
            tickFormatter={dateTickFormatter}
            dy={15}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            dx={15}
            tickLine={false}
            dataKey="kilogram"
            tickCount={3}
            yAxisId="right"
          />
          <YAxis
            orientation="left"
            dataKey="calories"
            tickCount={3}
            yAxisId="left"
            hide={true}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            barSize={7}
            dataKey="kilogram"
            fill="#020203"
            radius={[5, 5, 0, 0]}
            yAxisId="right"
          />
          <Legend
            verticalAlign="top"
            align="right"
            dx={20}
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
              paddingBottom: "50px",
            }}
            formatter={(value, entry, index) => {
              if (value === "kilogram") {
                return (
                  <span className="daily-graphic-legend-span">Poids (kg)</span>
                );
              } else {
                return (
                  <span className="daily-graphic-legend-span">
                    Calories brûlées (kCal)
                  </span>
                );
              }
            }}
          />
          <Bar
            barSize={7}
            dataKey="calories"
            fill="#ff0101"
            radius={[5, 5, 0, 0]}
            yAxisId="left"
          />
        </BarChart>
      </div>
    </div>
  );
}
DailyGraphic.propTypes = {
  data: PropTypes.array,
};

export default DailyGraphic;
