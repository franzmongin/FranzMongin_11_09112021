import React, { useState, ReactElement } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ReferenceArea,
} from "recharts";

function AverageSessionsGraphic({ data }) {
  const [stepPosition, setstepPosition] = useState(0);

  //   const tickItemFormatter = (tickitem) => {
  //     switch (tickitem) {
  //       case 1:
  //         console.log("coucou");
  //         return "L";
  //         break;
  //       case 2:
  //         return "M";
  //         break;
  //       case 3:
  //         return "M";
  //         break;
  //       case 4:
  //         return "J";
  //         break;
  //       case 5:
  //         return "V";
  //         break;
  //       case 6:
  //         return "S";
  //         break;
  //       case 7:
  //         return "D";
  //         break;

  //       default:
  //         break;
  //     }
  //   };

  /**
   *
   * @param {Event} e
   */
  const mouseMoveHandler = (e) => {
    let mousePosition = e.chartX;
    let mousePositionRight = 258 - mousePosition;
    let tickStep = 43;
    if (mousePositionRight > 21 && mousePositionRight < 65) {
      setstepPosition(tickStep);
    }
    if (mousePositionRight > 64 && mousePositionRight < 108) {
      setstepPosition(tickStep * 2);
    }
    if (mousePositionRight > 107 && mousePositionRight < 151) {
      setstepPosition(tickStep * 3);
    }
    if (mousePositionRight > 150 && mousePositionRight < 194) {
      setstepPosition(tickStep * 4);
    }
    if (mousePositionRight > 193 && mousePositionRight < 237) {
      setstepPosition(tickStep * 5);
    }
    if (mousePositionRight > 236) {
      setstepPosition(tickStep * 6);
    }
  };

  /**
   *
   * @param {{
   *  active: boolean
   *  payload: Array
   * }} param0
   * @returns {(string|ReactElement)}
   */
  const CustomTooltip = ({ active, payload }) => {
    console.log(active, payload);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{` ${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div className="average-sessions-graphic">
      <div
        className="overlay"
        style={{ width: stepPosition, position: "absolute", top: 0, right: 0 }}
      ></div>
      <div className="legends">
        <span>L</span>
        <span>M</span>
        <span>M</span>
        <span>J</span>
        <span>V</span>
        <span>S</span>
        <span>D</span>
      </div>
      <div className="graphic-title">Durée moyenne des sessions</div>
      <LineChart
        width={258}
        height={150}
        data={data}
        margin={{ left: 0, top: 30, bottom: 30 }}
        onMouseMove={(e) => mouseMoveHandler(e)}
        onMouseLeave={() => setstepPosition(0)}
      >
        <XAxis
          dataKey="day"
          tickFormatter={(tickitem) => {
            switch (tickitem) {
              case 1:
                return "L";
                break;
              case 2:
                return "M";
                break;
              case 3:
                return "M";
                break;
              case 4:
                return "J";
                break;
              case 5:
                return "V";
                break;
              case 6:
                return "S";
                break;
              case 7:
                return "D";
                break;

              default:
                break;
            }
          }}
          hide={true}
          axisLine={false}
          tickLine={false}
        />
        <YAxis hide={true} />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Line
          type="natural"
          dataKey="sessionLength"
          stroke="#8884d8"
          dot={false}
          stroke="white"
          strokeWidth={2}
        />
        <ReferenceArea
          x1={150}
          x2={180}
          y1={200}
          y2={300}
          stroke="blue"
          strokeOpacity={0.3}
        />
      </LineChart>
    </div>
  );
}

export default AverageSessionsGraphic;
