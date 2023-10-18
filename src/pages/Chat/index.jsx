import s from "./index.module.scss";
import chat_data from "../../utils/data/chats";
import TextBubble from "../../components/TextBubble";
const Chat = () => {
  const { chat_name, chats } = chat_data;
  console.log("now", Date.now());
  return (
    <div className={s.ChatPage}>
      <div></div>
      <div className={s.ChatScreen}>
        <div className={s.ChatHeader}>
          <h2>{chat_name}</h2>
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
      </div>
    </div>
  );
};

export default Chat;
