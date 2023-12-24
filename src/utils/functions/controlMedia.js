/**
 *
 *
 * @param {string} type Type of stream  video | audio
 * @param {HTMLMediaElement} output The destination for the media stream
 * @returns {Promise<{result : String,stream:MediaStream}>} the stream and status
 */

export const openMedia = async (type, output) => {
  let result;

  const mediaDevices = navigator.mediaDevices;

  let a = await mediaDevices
    .getUserMedia({
      audio: true,
      video: type === "video" && true,
    })
    .then((stream) => {
      output.srcObject = stream;
      output.parentElement.style = `
        transform: translate(-50%,-50%) scale(-1,1);
        z-index:1;
      `;
      // output.parentElement.style.zIndex = 1;
      return { result, stream };
    })
    .catch((err) => {
      return result;
    });

  return a;
};

/**
 *
 *
 * @param {String} type The type of stream
 * @param {HTMLMediaElement} output
 * @param {MediaStream} stream
 */
export const closeMedia = (type, output, stream) => {
  var track =
    type === "Audio" ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];
  let a = stream.removeTrack(track);
  track.stop();
  output.srcObject = null
  output.parentElement.style = `
        transform: translate(-50%,-50%) scale(0,0);
        z-index:-1;
      `;
  console.log(a);
  // output.parentElement.style.zIndex = 1;
  // MyMedia.emit("startedMedia", "opened successfully");
  // return {result, stream}
};
