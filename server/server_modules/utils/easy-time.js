let time = { second: 0, minute: 0, hour: 0, day: 0};
time.second = 1;
time.minute = time.second * 60;
time.hour = time.minute * 60;
time.day = time.hour * 24;

function getSeconds(seconds = 0, minutes = 0, hours = 0, days = 0) {
  return time.second * seconds + time.minute * minutes + time.hour * hours + time.day * days;
}

module.exports.getSeconds = getSeconds;