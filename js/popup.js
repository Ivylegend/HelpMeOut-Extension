// document.addEventListener("DOMContentLoaded", () => {
  // GET THE SELECTORS OF THE BUTTONS
  const startVid = document.querySelector("button#start-vid");
  const stopVid = document.querySelector("button#stop-vid");
  const popup = document.querySelector("#popup");
  // const closePopup = document.querySelector("#close");

  //   ADDING EVENT LISTENERS

  startVid.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "request_recording" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, "error on line 14");
          }
        }
      );
    });
  });

  // closePopup.addEventListener("click", () => {
  //   popup.style.display = "none";
  // });

  stopVid.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "stopVideo" },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, "error on line 27");
          }
        }
      );
    });
    popup.style.display = "none";
  });
// });
