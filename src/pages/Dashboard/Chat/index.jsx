import s from "./index.module.scss";
import chat_data from "../../../utils/data/chats";
import TextBubble from "../../../components/TextBubble";
import AlertTab from "../../../components/AlertTab";
import notification_data from "../../../utils/data/notifications";
import { useNavigate } from "react-router-dom";
import profilepic from "../../../static/images/Peter.png";
import { ReactComponent as VideoCall } from "../../../static/icons/video_call.svg";
import { ReactComponent as AudioCall } from "../../../static/icons/audio_call.svg";
import { ReactComponent as Send } from "../../../static/icons/carbon_send.svg";
import { CiMenuKebab } from "react-icons/ci";
import {
  PiCameraLight,
  PiCameraSlashThin,
  PiSmileyLight,
  PiPaperclipLight,
  PiMicrophoneLight,
  PiMicrophoneSlashLight,
} from "react-icons/pi";
import { useEffect, useRef, useState } from "react";
import addEmoji from "../../../utils/functions/addEmoji";
import { openMedia, closeMedia } from "../../../utils/functions/controlMedia";
class Message {
  constructor(from, message, media, media_type) {
    this.from = "";
    this.message = message;
    this.media = media;
    this.media_type = media_type;
    this.timestamp = Date.now();
  }
}

const Chat = () => {
  const chatscreen = useRef();
  const textfield = useRef();
  const Cam = useRef();
  const Mic = useRef();
  const canvas = useRef();
  const photo = useRef();
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
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    chatscreen.current.lastElementChild.scrollIntoView();
  }, [newChats]);
  const handleTyping = (e) => {
    const { value } = e.target;
    if (e.keyCode === 9) {
      SendMessage();
    } else {
      SetMessage(value);
    }
  };
  const DeleteCurrentMedia = () => {
    // close and Delete all current media
    closeCam();
    closeMic();
    photo.current.style.display = "none";
    photo.current.src = "";
    setImage(null);
    setVideo(null);
    setAudio(null);
  };
  const SendMessage = () => {
    if (message.trim() !== "" || videoFile || audioFile || image) {
      const MessageToSend = new Message(
        "",
        message.trim() && message,
        video || audio || image
      );
      // determine the media type
      if (video) {
        MessageToSend.media_type = "video";
      } else if (audio) {
        MessageToSend.media_type = "audio";
      } else if (image) {
        MessageToSend.media_type = "image";
      } else {
        MessageToSend.media_type = undefined;
      }
      // reset all states
      SetChats([...newChats, MessageToSend]);
      SetMessage("");
      DeleteCurrentMedia();
    }
    textfield.current.focus();
  };

  const attachFile = () => {};
  const openCam = async () => {
    DeleteCurrentMedia();
    const { stream } = await openMedia("video", Cam.current);
    setVideo(stream);
  };

  const openMic = async () => {
    DeleteCurrentMedia();
    const { stream } = await openMedia("audio", Mic.current);
    setAudio(stream);
  };
  const closeCam = (e) => {
  
    try {
      closeMedia("Video", Cam.current, video);
    } catch (err) {
      return null
    }
    setVideo(null);
  };
  const closeMic = () => {
    try {
      closeMedia("Audio", Mic.current, audio);  
    } catch (err) {
      return null
    }
    setAudio(null);
  };
  const capture = () => {
    //  use the canvas element to draw an image of the current stream displayed in the webcam
    canvas.width = Cam.current.width;
    canvas.height = Cam.current.height;
    canvas.current
      .getContext("2d")
      .drawImage(
        Cam.current,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );
    photo.current.src = canvas.current.toDataURL();
    photo.current.style.display = "block";
    photo.current.style.width = "50%";
    photo.current.style.height = "50%";
    photo.current.style.marginBottom = "0px";
    setImage(photo.current.src);
    closeCam();
  };

  return (
    <div className={s.ChatPage}>
      <AlertTab
        className={s.messages}
        items={notification_data}
        controls={Back}
      />

      <div className={s.ChatScreen}>
        <div className={s.ChatHeader}>
          <div>
            {" "}
            <img src={profilepic} alt="" />
            <h2>{chat_name}</h2>
          </div>
          <div>
            <VideoCall  title="Video call" />
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
              media_type={chat.media_type}
              media={chat.media}
              timestamp={chat.timestamp}
            />
          ))}
        </div>
        <img ref={photo} src="" alt=" " />
        <div className={s.SendMessage}>
          <div className={s.MessageBoxWrapper}>
            <PiSmileyLight onClick={() => addEmoji(SetMessage)} title="Emoji" />
            <textarea
              tabIndex={0}
              autoFocus={true}
              ref={textfield}
              className={s.MessageBox}
              placeholder="Type message"
              value={message}
              onChange={handleTyping}
              onKeyDown={handleTyping}
            />
            <span className={s.features}>
              <PiPaperclipLight onClick={attachFile} title="Document" />
              {video ? (
                <PiCameraSlashThin onClick={closeCam} title="recording..." />
              ) : (
                <PiCameraLight onClick={openCam} title="Camera" />
              )}
              {audio ? (
                <PiMicrophoneSlashLight
                  title="recording..."
                  onClick={closeMic}
                />
              ) : (
                <PiMicrophoneLight onClick={openMic} title="Microphone" />
              )}
            </span>
          </div>
          <Send
            title="Click or TAB to send"
            className={s.Send}
            onClick={SendMessage}
          />
        </div>
      </div>

      <div className={s.webcamWrapper}>
        <video autoPlay muted ref={Cam} className={s.webcam}></video>
        <canvas ref={canvas} className={s.canvas}></canvas>
        <div className={s.CamFeatures}>
          <small onClick={capture} > Capture Image</small>
          <small>Record video</small>
          <small>switch cam
          </small>
        </div>
      </div>

      <div className={s.voicenoteWrapper}>
        <audio
          controlsList={["nodownload", "nofullscreen", "noremoteplayback"]}
          autoPlay
          ref={Mic}
          className={s.voicenote}
        ></audio>{" "}
      </div>
    </div>
  );
};

export default Chat;
