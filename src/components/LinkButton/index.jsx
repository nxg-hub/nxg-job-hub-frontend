import "./index.scss";
import { Link } from "react-router-dom";

const ButtonRegular = ({ path, linkText, ...props }) => {
  return (
    <Link to={path} {...props}>
      {linkText}
    </Link>
  );
};

export default ButtonRegular;
