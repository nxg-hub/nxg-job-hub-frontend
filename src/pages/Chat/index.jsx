import s from "./index.module.scss";
import chat_data from "../../utils/data/chats";
import TextBubble from "../../components/TextBubble";
import AlertTab from "../../components/AlertTab";
import notification_data from "../../utils/data/notifications";
import { useNavigate } from "react-router-dom";
import profilepic from "../../static/images/Peter.png";
import { ReactComponent as VideoCall } from "../../static/icons/video_call.svg";
import { ReactComponent as AudioCall } from "../../static/icons/audio_call.svg";
import { ReactComponent as Send } from "../../static/icons/carbon_send.svg";
import { CiMenuKebab } from "react-icons/ci";
import {
  PiCameraLight,
  PiSmileyLight,
  PiPaperclipLight,
  PiMicrophoneLight,
} from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const chatscreen = useRef();
  useEffect(() => {
    chatscreen.current.lastElementChild.scrollIntoView();
  });
  class Message {
    constructor(from, message, media) {
      this.from = "";
      this.message = message;
      this.media = media;
      this.timestamp = Date.now();
    }
  }
  const { chat_name, chats } = chat_data;
  const redirect = useNavigate();
  const Back = (e) => {
    if (e.target === e.currentTarget) {
      console.log("redirected");
      return redirect(-1);
    }
  };
  const [message, SetMessage] = useState("");
  const [newChats, SetChats] = useState([...chats]);

  const handleTyping = (e) => {
    const { value } = e.target;
    e.keyCode === 9 ? SendMessage() : SetMessage(value);
  };
  const SendMessage = () => {
    if (message !== "" || message.trim() !== "") {
      SetChats([...newChats, new Message("", message, "")]);
      SetMessage("");
    }
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
        <div className={s.Chats} ref={chatscreen}>
          {newChats.map((chat, id) => (
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
              onKeyDown={handleTyping}
              rows={1}
              rowSpan={30}
            />
            <span className={s.features}>
              <PiPaperclipLight title="Document" />
              <PiCameraLight title="Camera" />
              <PiMicrophoneLight title="Microphone" />
            </span>
          </div>
          <Send title="Click or TAB to send" className={s.Send} onClick={SendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
