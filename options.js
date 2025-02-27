document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['username', 'password'], function(data) {
    if (data.username) {
      document.getElementById('username').value = data.username;
    }
    if (data.password) {
      document.getElementById('password').value = data.password;
    }
  });
});

// Save User Credentials
document.getElementById("save").addEventListener("click", function () {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  chrome.storage.sync.set({ username, password }, () => {
    if (chrome.runtime.lastError) {
      alert("Failed to save credentials: " + chrome.runtime.lastError.message);
    } else {
      alert("Credentials saved successfully!");
    }
  });
});

// ✅ Clear User Credentials
document.getElementById("clear").addEventListener("click", function () {
  chrome.storage.sync.remove(['username', 'password'], () => {
    if (chrome.runtime.lastError) {
      alert("Failed to clear credentials: " + chrome.runtime.lastError.message);
    } else {
      document.getElementById('username').value = "";
      document.getElementById('password').value = "";
      alert("Credentials cleared successfully!");
    }
  });
});
