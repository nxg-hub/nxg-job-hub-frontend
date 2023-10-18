import useTimestamp from "../../utils/hooks/useTimestamp";
import s from "./index.module.scss";

const TextBubble = ({ type, content, timestamp, sender, ...props }) => {

  console.log(timestamp)
  const time = useTimestamp(timestamp)
  return type && type === "sent" ? (
    <div {...props} className={`${s.TextBubbleWrapper} ${s.SentMessage}`}>
      {sender}
      <div className={s.TextBubble}>{content}</div>
      <small>{time}</small>
    </div>
  ) : (
    <div className={`${s.TextBubbleWrapper} ${s.ReceivedMessage}`}>
      <div className={s.TextBubble}>{content}</div>
      <small>{time}</small>
    </div>
  );
};

export default TextBubble;
