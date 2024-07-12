class Message {
  constructor( message, media, media_type) {
    this.from = "";
    this.message = message;
    this.media = media;
    this.media_type = media_type;
    this.timestamp = Date.now();
  }
}
export default Message