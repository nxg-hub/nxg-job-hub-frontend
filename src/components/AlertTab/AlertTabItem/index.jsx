import s from "./index.module.scss";

const AlertTabItem = ({ item, ...props }) => {
  return (
    <div className={s.AlertTabItem}>
      <img src={item.image} alt="" />
      <div>
        <h3 className={s.name}>{item.name}</h3>
        <p className={s.message}>{item.message}</p>
        <small className={s.timestamp}>{item.timestamp}</small>
      </div>
    </div>
  );
};

export default AlertTabItem;
