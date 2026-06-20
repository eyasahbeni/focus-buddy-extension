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
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith("task|")) {
    const taskName = alarm.name.split("|")[1];
    chrome.notifications.create(alarm.name, {
      type: "basic",
      iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzdkMmFlOCIvPjwvc3ZnPg==",
      title: "Focus Buddy: Scheduled Task",
      message: `It's time to focus on: ${taskName}`,
      priority: 2,
      requireInteraction: true
    });
  }
});
