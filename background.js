function show() {
  new Notification("time out");
}

chrome.browserAction.onClicked.addListener(show);

var timerId = 0;
var minutes = 0;
localStorage.setItem("minutes", 0);

chrome.runtime.onConnect.addListener(function(popupPort) {
  var port = popupPort;
  port.onDisconnect.addListener(function() {
    port = null;
  });
  port.onMessage.addListener(function(msg) {
    if (msg.alarm) {
      minutes = msg.time * 60;
      timerId = setTimeout(function walk() {
        if (minutes > 0) {
          minutes--;
          timerId = setTimeout(walk, 1000);
        } else {
          minutes = 0;
          clearTimeout(timerId);
          show();
        }
        localStorage.setItem("minutes", minutes);
      }, 1000);
    } else {
      minutes = 0;
      localStorage.setItem("minutes", minutes);
      clearTimeout(timerId);
    }
  });
});
