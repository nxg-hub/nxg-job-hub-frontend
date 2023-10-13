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
    const date = new Date(item.timestamp);
    const CurrentTime = Date.now(); //current milli seconds
    const NotificationTime = date.getTime(); //millisec for message
    const timeDifference = ((CurrentTime - NotificationTime) / 1000) | 0; //in seconds
    console.log(timeDifference);
    setTimeElapsed(timeDifference);

    if (timeDifference < 120) {
      setTime("now");
    } else if (timeDifference >= 172800) {
      //if it is up to 48 hours

      setTime(
        `${weekDays[date.getDay()][0]} ${date.getHours()}:${date.getMinutes()} `
      );
    } else if (timeDifference >= 86400) {
      //if it is up to 24 hours
      setTime(`Yesterday at ${date.getHours()}:${date.getMinutes()} `);
    } else if (timeDifference >= 21000) {
      //if it is up to 6 hours
      //I should make this more accurate
      setTime(`Today at ${date.getHours()}:${date.getMinutes()} `);
    } else if (timeDifference >= 3600) {
      //if it is up to 1 our but less than 6 hours
      setTime(
        timeDifference / 3600 >= 2
          ? `${timeDifference / 3600} hours ago`
          : `an hour ago`
      );
    } else if (timeDifference >= 120) {
      setTime(`${(timeDifference / 60) | 0} mins ago`);
    }
  }, [item.timestamp]);

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
