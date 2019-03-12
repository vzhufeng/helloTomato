var port;

try {
  port = chrome.runtime.connect();
} catch (e) {}

var btnStart = document.getElementById("start");
var btnStop = document.getElementById("stop");
var leftTime = document.getElementById("leftTime");
var todo = document.getElementById("todo");
var tomato = document.getElementById("tomato");
var clear = document.getElementById("clear");
var workTime = document.getElementById("workTime");
var minutes = document.getElementById("minutes");

btnStart.addEventListener("click", function() {
  var time = minutes.value;
  time = +time.replace(/[^\d]/g, "");
  // 判断是否是工作时间
  var work = !workTime.checked;
  port.postMessage({ alarm: true, time: time > 60 ? 60 : time, work });
});

btnStop.addEventListener("click", function() {
  port.postMessage({ alarm: false });
});

todo.addEventListener("click", function() {
  chrome.tabs.create({
    url: "chrome-extension://" + chrome.runtime.id + "/example.html"
  });
});

clear.addEventListener("click", function() {
  localStorage.setItem("tomato", 0);
  tomato.innerHTML = 0;
});

setInterval(function() {
  var time = localStorage.getItem("minutes");
  var num = localStorage.getItem("tomato");
  var min = Math.floor(time / 60);
  var sec = time % 60;

  leftTime.innerHTML = min + ":" + sec;
  tomato.innerHTML = num;
}, 500);
