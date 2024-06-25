import { EmojiButton } from "@joeattardi/emoji-button";
const emojiStyles = {
  theme: "auto",
  position: {
    bottom: "60px",
    left: "40%",
  },
  autoHide: false,
  emojiSize: "25px",
  emojisPerRow: 6,
  rows: 4,
  showPreview: false,
  showSearch: false,
};
const addEmoji = (addToMessage) => {
  const picker = new EmojiButton(emojiStyles);
  picker.togglePicker();
  picker.on("emoji", (selection) => {
    const emoji = selection.emoji;
    addToMessage(message => message + emoji);
  });
};

export default addEmoji;
