// background.js - FocusBuddy Service Worker

// Configure the extension to open the side panel when clicking the toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting side panel behavior:", error));

chrome.runtime.onInstalled.addListener(() => {
  console.log("FocusBuddy (ADHD Workflow Companion) installed successfully.");
});
