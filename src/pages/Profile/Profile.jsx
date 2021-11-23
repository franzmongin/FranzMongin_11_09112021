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
import { perfDataModel } from "../../models/perfDataModel";
import { averageSessionsDataModel } from "../../models/averageSessionsDataModel";
import { activityDataModel } from "../../models/activityDataModel";

function Profile() {
  const { id } = useParams();
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
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /**
     * Fetch data from api and set states
     */
    const fetchData = async () => {
      try {
        setIsLoading(true);

        //fetch user data and stats and set states
        let userData = await fetchUserData(id);
        userData = userData.data;
        settodayScore(userData.todayScore * 100);
        setUserName(userData.userInfos.firstName);
        setStats(userData.keyData);

        //fetch activity data
        let activityData = await fetchActivityData(id);
        activityData = activityData.data;
        const formattedActivityData = new activityDataModel(activityData);
        setdailyData(formattedActivityData.sessions);

        //fetch average sessions data and set states
        let averageSessionsData = await fetchAverageSessionsData(id);
        averageSessionsData = averageSessionsData.data;
        const formattedAverageSessionsData = new averageSessionsDataModel(
          averageSessionsData
        );
        setaverageSessionsData(formattedAverageSessionsData.sessions);

        //fetch performance data format and sort it and set state
        let performanceData = await fetchPerformanceData(id);
        performanceData = performanceData.data;
        const formattedPerformanceData = new perfDataModel(performanceData);

        setperformanceData(
          formattedPerformanceData.data.sort((a, b) => {
            return a.kind < b.kind ? 1 : -1;
          })
        );
      } catch (error) {
        setApiError(true);
        console.log(error);
      }
      setIsLoading(false);
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
        {apiError === false && isLoading === false && (
          <div className="main-content">
            <h1 className="greeting-heading">
              Bonjour <span className="first-name">{userName}</span>
            </h1>
            <span className="greetings">
              Félicitations! Vous avez explosé vos objectifs hier 👏
            </span>
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
                    <span className="stat-count">
                      {stats.carbohydrateCount}g
                    </span>
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
        )}
        {apiError === true && isLoading === false && (
          <div className="error">
            <span>
              Nous avons malheureusement un problème de communication avec le
              serveur...
            </span>
          </div>
        )}
      </main>
    </>
  );
}

export default Profile;
