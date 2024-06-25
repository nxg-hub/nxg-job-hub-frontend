import useTimestamp from "../../utils/hooks/useTimestamp";
import s from "./index.module.scss";

const TextBubble = ({
  type,
  content,
  timestamp,
  sender,
  media,
  media_type,
  ...props
}) => {
  const time = useTimestamp(timestamp);
  return type && type === "sent" ? (
    <div {...props} className={`${s.TextBubbleWrapper} ${s.SentMessage}`}>
      {/* {sender} */}
      <div className={s.TextBubble}>
        {media_type === "video" && <video src={media}></video>}
        {media_type === "audio" && <audio src={media}></audio>}
        {media_type === "image" && <img alt={""} src={media}></img>}

        {content}
      </div>
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
