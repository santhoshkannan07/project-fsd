import React, { useEffect, useState } from 'react'
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([])

  useEffect(()=>{
    const getNewUsers = async ()=>{
      try{
      const res = await axios.get("/users?new=true",{
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWEzNzQ4ZjZlOTFjYzZiODEwNzc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTc1OTkxNiwiZXhwIjoxNzA2MTkxOTE2fQ.XIwK-jpdvbVY3vtpvvGPsqtnRcLGX1EAnII-1xPl1FU"
        },
      });
      setNewUsers(res.data)
     }catch(err){
      console.log(err)
     }
    };
    getNewUsers();
  },[]);
    return (
        <div className="widgetSm">
          <span className="widgetSmTitle">New Join Members</span>
          <ul className="widgetSmList">
            {newUsers.map(user=>(
            <li className="widgetSmListItem">
              <img
                src={user.profilePic || "profile.jpg"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
              </div>
              <button className="widgetSmButton">
                <VisibilityIcon className="widgetSmIcon" />
                Display
              </button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default WidgetSm