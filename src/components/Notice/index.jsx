import s from "./index.module.scss";
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { FcInfo } from "react-icons/fc";
import { MdDangerous } from "react-icons/md";
const Notice = ({ message, type, ...props }) => {
  const noticeTypes = {
    warning: <IoIosWarning className={s.Warning} />,
    success: <IoIosInformationCircle className={s.Success} />,
    danger: <MdDangerous className={s.Danger} />,
    info: <FcInfo className={s.Info} />,
  };
  return (
    <div className={`${s.Notice} ${s[type]}`} {...props}>
      <span>
        {noticeTypes[type]} {message}
      </span>{" "}
    </div>
  );
};

export default Notice;
