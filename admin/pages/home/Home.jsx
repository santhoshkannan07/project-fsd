import React, { useState } from 'react'
import './home.css'
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo'
import Chart from '../../components/chart/Chart'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { useMemo } from 'react'
import { useEffect } from 'react'
import axios from "axios"

const Home = () => {
  const MONTHS = useMemo(()=> [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]
  )
  const [userStats, setUserStats] = useState([]);

  useEffect(()=>{
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWEzNzQ4ZjZlOTFjYzZiODEwNzc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTc1OTkxNiwiZXhwIjoxNzA2MTkxOTE2fQ.XIwK-jpdvbVY3vtpvvGPsqtnRcLGX1EAnII-1xPl1FU"
          }
        });
        const statsList = res.data.sort(function (a, b){
          return a._id - b._id;
        });
        statsList.map(item => setUserStats(prev => [...prev, { name: MONTHS[item._id - 1], "New User": item.total }]))
      } catch (err) {
        console.error(err);
      }
    };    
    getStats();
  },[MONTHS]);

  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
        <div className="homeWidgets">
          <WidgetSm/>
          <WidgetLg/>
        </div>
    </div>
  )
}

export default Home