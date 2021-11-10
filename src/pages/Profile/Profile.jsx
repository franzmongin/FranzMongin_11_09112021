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
import DailyScoreGraphic from "../../components/DailyScoreGraphic/DailyScoreGraphic";
import caloryCountLogo from "./calory-logo.svg";
import carbohydrateCountLogo from "./carbohydrate-logo.svg";
import lipidCountLogo from "./lipid-logo.svg";
import proteinCountLogo from "./protein-logo.svg";
import {
  fetchActivityData,
  fetchAverageSessionsData,
  fetchPerformanceData,
  fetchUserData,
} from "../../utils/fetchers";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [dailyData, setdailyData] = useState();
  const [averageSessionsData, setaverageSessionsData] = useState();
  const [performanceData, setperformanceData] = useState();
  const [todayScore, settodayScore] = useState();
  const [userName, setUserName] = useState();
  const [stats, setStats] = useState({
    calorieCount: "",
    proteinCount: "",
    carbohydrateCount: "",
    lipidCount: "",
  });

  useEffect(() => {
    /**
     * Fetch data from api and set states
     */
    const fetchData = async () => {
      //fetch user data and stats and set states
      const userData = await fetchUserData(id);
      setUser(userData.data);
      if (userData.data.score) {
        settodayScore(userData.data.score * 100);
      } else if (userData.data.todayScore) {
        settodayScore(userData.data.todayScore * 100);
      }
      setUserName(userData.data.userInfos.firstName);
      setStats(userData.data.keyData);

      //fetch activity data
      const activityData = await fetchActivityData(id);
      setdailyData(activityData.data.sessions);

      //fetch average sessions data and set states
      const averageSessionsData = await fetchAverageSessionsData(id);
      setaverageSessionsData(averageSessionsData.data.sessions);

      //fetch performance data and set states
      const performanceData = await fetchPerformanceData(id);
      const perfData = performanceData.data.data;
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

      setperformanceData(
        perfData.sort((a, b) => {
          return a.kind < b.kind ? 1 : -1;
        })
      );
    };
    fetchData();
  }, [id]);

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
          <h1>
            Bonjour <span className="first-name">{userName}</span>
          </h1>
          <h2>Félicitations! Vous avez explosé vos objectifs hier 👏</h2>
          <div className="stats-and-graphics">
            <section className="graphics">
              <DailyGraphic data={dailyData} />
              <AverageSessionsGraphic data={averageSessionsData} />
              <PerformanceGraphic data={performanceData} />
              <DailyScoreGraphic todayScore={todayScore} />
            </section>
            <section className="stats-container">
              <div className="stat stats-calory">
                <img src={caloryCountLogo} alt="calory logo" />
                <div className="stat-count-and-label">
                  <span className="stat-count">{stats.calorieCount}kCal</span>
                  <span className="stat-label">Calories</span>
                </div>
              </div>
              <div className="stat stats-protein">
                <img src={proteinCountLogo} alt="protein logo" />
                <div className="stat-count-and-label">
                  <span className="stat-count"> {stats.proteinCount}g</span>
                  <span className="stat-label">Proteines</span>
                </div>
              </div>
              <div className="stat stats-carbohydrate">
                <img src={carbohydrateCountLogo} alt="carbohydrate logo" />
                <div className="stat-count-and-label">
                  <span className="stat-count">{stats.carbohydrateCount}g</span>
                  <span className="stat-label">Glucides</span>
                </div>
              </div>
              <div className="stat stats-lipid">
                <img src={lipidCountLogo} alt="lipid logo" />
                <div className="stat-count-and-label">
                  <span className="stat-count">{stats.lipidCount}g</span>
                  <span className="stat-label">Lipides</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
