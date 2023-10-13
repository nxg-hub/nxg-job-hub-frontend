import s from "./index.module.scss";
import img from "../../../static/images/John.png";
import React, { useEffect, useState } from "react";
const AlertTabItem = ({ item, ...props }) => {
  const weekDays = {
    0: ["sunday", "sun"],
    1: ["monday", "mon"],
    2: ["tuesday", "tue"],
    3: ["wednesday", "wed"],
    4: ["thursday", "thurs"],
    5: ["friday", "fri"],
    6: ["saturday", "sat"],
  };

  const [time, setTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {

    const date = new Date(item.timestamp/1000);
    const CurrentTime = (Date.now() / 1000) | 0;
    const NotificationDate = date.getTime();
    const timeDifference = CurrentTime - NotificationDate;
    setTimeElapsed(timeDifference);
    if (timeElapsed < 60) {
      setTime("now");
    } else if (timeElapsed >= 172800) {
      //if it is up to 24 hours

      setTime(
        `${weekDays[date.getDay()][0]} ${date.getHours()}:${date.getMinutes()} `
      );
    } else if (timeElapsed >= 86400) {
      //if it is up to 24 hours

      setTime(`Yesterday at ${date.getHours()}:${date.getMinutes()} `);
    } else if (timeElapsed >= 21000) {
      //if it is up to 6 hours
      //I should make this more accurate
      setTime(`Today at ${date.getHours()}:${date.getMinutes()} `);
    } else if (timeElapsed >= 3600) {
      //if it is up to 1 our but less than 6 hours
      setTime(
        timeElapsed / 3600 >= 2
          ? `${(timeElapsed / 3600) | 0} hours ago`
          : `an hour ago`
      );
    } else if (timeElapsed >= 120) {
      setTime(`${(timeElapsed / 60) | 0} mins ago`);
    }
  }, [item.timestamp, timeElapsed]);

  // Today 12:00pm ||
  // 3  mins ago  || an hour ago || 5 hours ago ||
  // Yesterday 16:00pm

  return (
    <div {...props} className={s.AlertTabItem}>
      <img src={img} alt="PROFILEPICTURE" />
      <div>
        <span>
          <h3 className={s.name}>{item.from}</h3>
          <p className={s.message}>{item.message}</p>
        </span>
        <small className={s.timestamp}>{time}</small>
      </div>
    </div>
  );
};

export default AlertTabItem;
