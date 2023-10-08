import "./index.scss";
import { Link } from "react-router-dom";

const ButtonRegular = ({ path, linkText, ...props }) => {
  return (
    <Link data-name="ButtonRegular" to={path} {...props}>
      {linkText}
    </Link>
  );
};

export default ButtonRegular;
