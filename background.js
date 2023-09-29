// chrome

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId },
        files: ["/content.js"],
      })
      .then(() => {
        console.log("weve injeccted the content script");
      })
      .catch((err) => console.log(err, "error in background"));
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{})
