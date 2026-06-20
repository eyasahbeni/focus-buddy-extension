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

// Listen for scheduled task alarms
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name.startsWith("task|")) {
    const taskName = alarm.name.split("|")[1];
    chrome.notifications.create(alarm.name, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("public/icon.png"),
      title: "Focus Buddy: Scheduled Task",
      message: `It's time to focus on: ${taskName}`,
      priority: 2,
      requireInteraction: true
    });
  }
});
