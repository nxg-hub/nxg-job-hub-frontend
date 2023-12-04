import s from "./index.module.scss";
import { IoIosClose } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
const Notice = ({ message, type, ...props }) => {
  const noticeTypes = {
    warning: <IoIosWarning className={s.Warning} />,
    success: <IoIosInformationCircle className={s.Success} />,
    danger: <MdDangerous className={s.Danger} />,
  };
  return (
    <div className={`${s.Notice} ${s[type]}`} {...props}>
      {" "}
      <span>
        {noticeTypes[type]} {message}
      </span>{" "}
    </div>
  );
};

export default Notice;
