function login() {
  const usernameField = document.querySelector('input[name="username"]');
  const passwordField = document.querySelector('input[name="password"]');
  const connectButton = document.querySelector('input[type="submit"]');

  if (usernameField && passwordField && connectButton) {
    chrome.storage.sync.get(['username', 'password'], (data) => {
      if (!data.username || !data.password) {
        chrome.runtime.sendMessage({ action: 'loginFailed', reason: 'No credentials found' });
        return;
      }

      usernameField.value = data.username;
      passwordField.value = data.password;

      setTimeout(() => {
        connectButton.click();
      }, 1000); //  Small delay to prevent race conditions
    });
  }
}

// Detect keepalive page and close tab
if (document.title.includes("Firewall Authentication Keepalive Window")) {
  chrome.runtime.sendMessage({ action: 'closeTab' });
}

// Ensure login runs as soon as page loads
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  login();
} else {
  window.addEventListener('DOMContentLoaded', login);
}
