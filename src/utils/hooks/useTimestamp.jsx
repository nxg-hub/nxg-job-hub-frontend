import { useEffect, useMemo, useState } from "react";

const useTimestamp = (timestamp) => {
  const [time, setTime] = useState(0);
  const weekDays = useMemo(
    () => ({
      0: ["Sunday", "Sun"],
      1: ["Monday", "Mon"],
      2: ["Tuesday", "Tue"],
      3: ["Wednesday", "Wed"],
      4: ["Thursday", "Thurs"],
      5: ["Friday", "Fri"],
      6: ["Saturday", "Sat"],
    }),
    []
  );
  useEffect(() => {
    const date = new Date(timestamp);
    const CurrentTime = Date.now(); //current milli seconds
    const NotificationTime = date.getTime(); //millisec for message
    const timeDifference = ((CurrentTime - NotificationTime) / 1000) | 0; //in seconds

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
      setTime(`Today at ${date.getHours()}:${date.getMinutes()} `);
    } else if (timeDifference >= 3600) {
      //if it is up to 1 hour but less than 6 hours
      setTime(
        timeDifference / 3600 >= 2
          ? `${timeDifference / 3600} hours ago`
          : `an hour ago`
      );
    } else if (timeDifference >= 120) {
      setTime(`${(timeDifference / 60) | 0} mins ago`);
    }
  }, [timestamp, weekDays]);
  return time;
};

export default useTimestamp;
