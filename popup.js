var port;

try {
  port = chrome.runtime.connect();
} catch (e) {}

var btnStart = document.getElementById("start");
var btnStop = document.getElementById("stop");
var leftTime = document.getElementById("leftTime");
var todo = document.getElementById("todo");

btnStart.addEventListener("click", function() {
  var minute = document.getElementById("minutes").value;
  minute = +minute.replace(/[^\d]/g, "");
  port.postMessage({ alarm: true, time: minute > 60 ? 60 : minute });
});

btnStop.addEventListener("click", function() {
  port.postMessage({ alarm: false });
});

todo.addEventListener("click", function() {
  chrome.tabs.create({
    url: "chrome-extension://" + chrome.runtime.id + "/example.html"
  });
});

setInterval(function() {
  var time = localStorage.getItem("minutes");
  var min = Math.floor(time / 60);
  var sec = time % 60;

  leftTime.innerHTML = min + ":" + sec;
}, 500);
