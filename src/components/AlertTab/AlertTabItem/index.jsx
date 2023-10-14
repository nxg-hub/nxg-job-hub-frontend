import s from "./index.module.scss";
import img from "../../../static/images/John.png";
import useTimestamp from "../../../utils/hooks/useTimestamp";
const AlertTabItem = ({ item, ...props }) => {
  const time = useTimestamp(item);
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
