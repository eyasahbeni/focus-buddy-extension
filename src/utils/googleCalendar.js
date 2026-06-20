export async function syncTaskToCalendar(taskTitle, focusMinutes) {
  return new Promise((resolve, reject) => {
    // Check if chrome.identity is available (it only exists when running as a real extension)
    if (!chrome || !chrome.identity) {
      console.warn("Chrome Identity API not available. Skipping Google Calendar sync.");
      return resolve(false);
    }

    // This will prompt the user to log in and grant calendar access on the first run
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      if (chrome.runtime.lastError) {
        console.error("Auth error:", chrome.runtime.lastError.message);
        return reject(chrome.runtime.lastError);
      }

      if (!token) {
        return reject(new Error("Failed to retrieve Google Auth token."));
      }

      // Calculate start and end times for the calendar event
      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - focusMinutes * 60000);

      const event = {
        summary: `Focus Buddy: ${taskTitle}`,
        description: `Completed a deep focus session for ${focusMinutes} minutes using Focus Buddy.`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      };

      // POST to Google Calendar API
      fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error("Google Calendar API Error:", data.error);
          return reject(data.error);
        }
        console.log('Event successfully created:', data.htmlLink);
        resolve(data);
      })
      .catch(error => {
        console.error('Error creating calendar event:', error);
        reject(error);
      });
    });
  });
}
