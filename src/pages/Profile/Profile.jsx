import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TopBar from "../../components/TopBar/TopBar";
import sidebarlogo1 from "./sidebar-icon1.svg";
import sidebarlogo2 from "./sidebar-icon2.svg";
import sidebarlogo3 from "./sidebar-icon3.svg";
import sidebarlogo4 from "./sidebar-icon4.svg";
import copyrightlogo from "./copyrightlogo.svg";
import DailyGraphic from "../../components/DailyGraphic/DailyGraphic";
import AverageSessionsGraphic from "../../components/AverageSessionsGraphic/AverageSessionsGraphic";
import PerformanceGraphic from "../../components/PerformanceGraphic/PerformanceGraphic";

function Profile() {
  const { id } = useParams();
  const [userId, setuserId] = useState(id);
  const [dailyData, setdailyData] = useState();
  const [averageSessionsData, setaverageSessionsData] = useState();
  const [performanceData, setperformanceData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}/activity`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setdailyData(data.data.sessions);
      });
    fetch(`http://localhost:3000/user/${id}/average-sessions`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setaverageSessionsData(data.data.sessions);
      });
    fetch(`http://localhost:3000/user/${id}/performance`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let perfData = data.data.data;
        let kindData = data.data.kind;
        perfData.forEach((element) => {
          if (element.kind === 1) {
            element.kindLabel = "cardio";
          } else if (element.kind === 2) {
            element.kindLabel = "énergie";
          } else if (element.kind === 3) {
            element.kindLabel = "endurance";
          } else if (element.kind === 4) {
            element.kindLabel = "force";
          } else if (element.kind === 5) {
            element.kindLabel = "vitesse";
          } else if (element.kind === 6) {
            element.kindLabel = "intensité";
          }
        });
        setperformanceData(perfData);
      });
  }, []);

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
            <DailyGraphic data={dailyData} />
            <AverageSessionsGraphic data={averageSessionsData} />
            <PerformanceGraphic data={performanceData} />
          </section>
          <section className="stats"></section>
        </div>
      </main>
    </>
  );
}

export default Profile;
