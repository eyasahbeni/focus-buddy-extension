// background.js - FocusBuddy Service Worker

chrome.action.onClicked.addListener((tab) => {
  // Create a persistent floating popup window that won't close when clicking away
  chrome.windows.create({
    url: "dist/index.html",
    type: "popup",
    width: 380,
    height: 580,
    focused: true
  });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("FocusBuddy (ADHD Workflow Companion) installed successfully.");
});
