import s from "./index.module.scss";

const AlertTabItem = ({ item, ...props }) => {
  return (
    <div className={s.AlertTabItem}>
      <img src={item.image} alt="image" />
      <div>
        <span >
          <h3 className={s.name}>{item.from}</h3>
          <p className={s.message}>{item.message}</p>
        </span>
        <small className={s.timestamp}>{item.timestamp}</small>
      </div>
    </div>
  );
};

export default AlertTabItem;
