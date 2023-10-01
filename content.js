console.log("been injected");

var recorder = null;
function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  recorder.onstop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState === "Live") {
        track.stop();
      }
    });
  };

  recorder.ondataavailable = function (event) {
    let recordedBlob = event.data;
    console.log(recordedBlob);

    var formdata = new FormData();
    formdata.append("video", recordedBlob);

    let url = URL.createObjectURL(recordedBlob);
    console.log(url);

    // STUFFS I JUST ADDED
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    /////////////////////////////
    // SENDING BLOB
    /////////////////////////
    const sendBlob = async () => {
      try {
        const dataFetch = await fetch(
          "https://help-me-out-extension.onrender.com/uploads",
          requestOptions
        );

        const detail = await dataFetch.json();

        console.log(detail);

        console.log(detail.videoUrl + " returned...");
      } catch (error) {
        console.log("error", error);
      }
      // window.location.assign(
      //   "https://help-me-out.netlify.app/file/video_id",
      //   "_blank"
      // );
    };

    sendBlob();

    // LINK /////////////////////////////////
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = `${url}.mp4`;
    a.target = "_blank";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "request_recording") {
    console.log("requesting recording");

    sendResponse(`seen ${message.action}`);

    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: {
          width: 9999999999,
          height: 9999999999,
        },
      })
      .then((stream) => {
        onAccessApproved(stream);
      });
  }

  if (message.action === "stopVideo") {
    console.log("stopping video");
    sendResponse(`seen ${message.action}`);
    if (!recorder) return console.log("no recorder");

    recorder.stop();
  }
});
