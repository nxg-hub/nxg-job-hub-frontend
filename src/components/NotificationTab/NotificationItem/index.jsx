import s from "./index.module.scss";
import useTimestamp from "../../../utils/hooks/useTimestamp";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ item, ...props }) => {
  const time = useTimestamp(item.dateTime);
  const navigate = useNavigate();
  return (
    <div {...props} className={s.AlertTabItem}>
      {/* <img src={img} alt="PROFILEPICTURE" /> */}
      <div>
        <span>
          {/* <h3 className={s.name}>{item.from}</h3> */}
          <p className={s.message}>{item.message}</p>
        </span>
        <div className={s.Options}>
          <CiMenuKebab />
          <small className={s.timestamp}>{time}</small>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
