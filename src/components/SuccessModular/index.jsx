import s from "./index.module.scss";
import { ReactComponent as Confetti } from "../../static/icons/ConfettiBall.svg";
import ButtonRegular from "../LinkButton";

/**
 *
 * @description  { description: short description for modal, action: modal action object } 
 * @param {{
 * title: string
 * description: String,
 * action: {
 *  path: string, 
 *  text: string
 * }
 * }}  { description: short description for modal,
 *  action: modal action object
 {
 path: link detination,
 text: link text
 }} 
 * @return {HTMLDivElement} 
 */

const SuccessModular = ({ title, description, action }) => {
  return (
    <div className={s.SuccessModular}>
      <h3>{title}</h3>
      <Confetti />
      <p> {description} </p>
      {action ? (
        <ButtonRegular path={action.path} linkText={action.text} />
      ) : null}
    </div>
  );
};

export default SuccessModular;
