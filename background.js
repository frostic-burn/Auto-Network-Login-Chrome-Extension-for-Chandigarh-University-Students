// Create an alarm to check network connectivity every minute
chrome.alarms.create("checkNetwork", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(() => {
  fetch('http://172.16.2.1:1000/', { mode: "no-cors" }) //  Prevents CORS issues
    .then(response => {
      chrome.tabs.query({ url: "http://172.16.2.1:1000/*" }, (tabs) => {
        if (tabs.length === 0) {
          chrome.tabs.create({ 
            url: 'http://172.16.2.1:1000/', 
            active: false 
          });
        }
      });
    })
    .catch(error => console.error('Error checking connection:', error));
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'loginSuccess') {
    chrome.tabs.query({ url: "http://172.16.2.1:1000/*" }, (tabs) => {
      tabs.forEach(tab => chrome.tabs.remove(tab.id));
    });

    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon48.png",
      title: "Login Successful",
      message: "You are now connected to the network."
    });

  } else if (message.action === 'loginFailed') {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon48.png",
      title: "Login Failed",
      message: "Error: " + message.reason
    });

  } else if (message.action === 'closeTab') {
    chrome.tabs.query({ url: "http://172.16.2.1:1000/keepalive*" }, (tabs) => {
      tabs.forEach(tab => chrome.tabs.remove(tab.id));
    });
  }
});
