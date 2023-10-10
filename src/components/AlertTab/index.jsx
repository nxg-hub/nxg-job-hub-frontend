import AlertTabItem from "./AlertTabItem";
import s from "./index.module.scss";

const AlertTab = ({items, ...props}) => {
  return (
    <div className={s.AlertTabWrapper}>
          <div className={s.AlertTab}>
        {
          items.map((item, id) => <AlertTabItem item={item} key={id}  />)
      }
      
    </div>
</div>
  );
};

export default AlertTab;
