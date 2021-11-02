import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TopBar from "../../components/TopBar";
import sidebarlogo1 from "./sidebar-icon1.svg";
import sidebarlogo2 from "./sidebar-icon2.svg";
import sidebarlogo3 from "./sidebar-icon3.svg";
import sidebarlogo4 from "./sidebar-icon4.svg";
import copyrightlogo from "./copyrightlogo.svg";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

function Profile() {
  const { id } = useParams();
  const [userId, setuserId] = useState(id);
  const [dailyData, setdailyData] = useState();
  const CustomTooltip = ({ active, payload, label }) => {
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
  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/activity`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data.sessions);
        setdailyData(data.data.sessions);
      });
  }, []);
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
  return (
    <>
      <TopBar />
      <main className="profile-page">
        <div className="sidebar">
          <div className="activities-logos">
            <img src={sidebarlogo1} alt="" width="64px" />
            <img src={sidebarlogo2} alt="" width="64px" />
            <img src={sidebarlogo3} alt="" width="64px" />
            <img src={sidebarlogo4} alt="" width="64px" />
          </div>

          <img src={copyrightlogo} alt="" className="copyright-logo" />
        </div>
        <div className="main-content">
          <h1>Bonjour Thomas</h1>
          <h2>Félicitations! Vous avez explosé vos objectifs hier 👏</h2>
          <section className="graphics">
            <div className="daily-graphic">
              <div className="daily-graphic-heading">
                <h3>Activité quotidienne</h3>
                <div className="daily-graphic-heading-legends">
                  <div className="mass-legend">
                    <div className=""></div>
                    <span>Poids (kg)</span>
                  </div>
                  <div className="calory-legend">
                    <div className=""></div>
                    <span>Calories brûlées (kCal)</span>
                  </div>
                </div>
              </div>
              <div className="daily-graphic-container">
                <BarChart
                  width={763}
                  height={320}
                  data={dailyData}
                  // barGap="8"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="day"
                    padding={{ left: 10, right: 10 }}
                    scale="point"
                    tickLine={false}
                    tickFormatter={dateTickFormatter}
                  />
                  <YAxis
                    orientation="right"
                    axisLine={false}
                    dx={10}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    barSize={7}
                    dataKey="kilogram"
                    fill="#020203"
                    radius={[5, 5, 0, 0]}
                  />
                  <Legend verticalAlign="top" horizAdvX="right" />
                  <Bar
                    barSize={7}
                    dataKey="calories"
                    fill="#ff0101"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </div>
            </div>
          </section>
          <section className="stats"></section>
        </div>
      </main>
    </>
  );
}

export default Profile;
