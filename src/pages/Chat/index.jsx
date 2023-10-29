import s from "./index.module.scss";
import chat_data from "../../utils/data/chats";
import TextBubble from "../../components/TextBubble";
import AlertTab from "../../components/AlertTab";
import notification_data from "../../utils/data/notifications";
import { useNavigate } from "react-router-dom";
import profilepic from "../../static/images/Peter.png";
import { ReactComponent as VideoCall } from "../../static/icons/video_call.svg";
import { ReactComponent as AudioCall } from "../../static/icons/audio_call.svg";
import { CiMenuKebab } from "react-icons/ci";
import { PiMicrophoneDuotone, PiCameraLight, PiSmileyLight, PiPaperclipLight } from "react-icons/pi";
import { useState } from "react";

const Chat = () => {
  const { chat_name, chats } = chat_data;
  const redirect = useNavigate();
  const Back = (e) => {
    if (e.target === e.currentTarget) {
      console.log("redirected");
      return redirect(-1);
    }
  };
  const [message, SetMessage] = useState("");
  const handleTyping = (e) => {
    const { value } = e.target;
    SetMessage(value)
  };
  return (
    <div className={s.ChatPage}>
      <div className={s.Messages}>
        <AlertTab
          className={s.chats}
          items={notification_data}
          controls={Back}
        />
      </div>
      <div className={s.ChatScreen}>
        <div className={s.ChatHeader}>
          <div>
            {" "}
            <img src={profilepic} alt="" />
            <h2>{chat_name}</h2>
          </div>
          <div>
            <VideoCall title="Video call" />
            <AudioCall title="Audio call" />
            <CiMenuKebab title="More" />
          </div>
        </div>
        <div className={s.Chats}>
          {chats.map((chat, id) => (
            <TextBubble
              key={id}
              type={chat.from ? "received" : "sent"}
              content={chat.message}
              timestamp={chat.timestamp}
            />
          ))}
        </div>
        <div className={s.SendMessage}>
          <div className={s.MessageBoxWrapper}>
            <PiSmileyLight title="Emoji" />
            <textarea
              className={s.MessageBox}
              type="text"
              placeholder="Type message"
              value={message}
              onChange={handleTyping}
              rows={1}
              rowspan={30}
            />
            <span className={s.features}>
              <PiPaperclipLight title="Document" />
              <PiCameraLight title="Camera" />
              <PiMicrophoneDuotone title="Microphone" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
