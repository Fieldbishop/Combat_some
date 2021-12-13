/**
 * Initialises a time object
 * @type {{hour: number, day: number, second: number, minute: number}}
 */
let time = { second: 0, minute: 0, hour: 0, day: 0};
time.second = 1;
time.minute = time.second * 60;
time.hour = time.minute * 60;
time.day = time.hour * 24;

/**
 * formats a time into seconds for ease of use
 * @param seconds - is for input
 * @param minutes - is for input
 * @param hours - is for input
 * @param days - is for input
 * @returns {number} - returns seconds
 */
function getSeconds(seconds = 0, minutes = 0, hours = 0, days = 0) {
  return time.second * seconds + time.minute * minutes + time.hour * hours + time.day * days;
}

/**
 * Exported for application wide use
 * @type {function(*=, *=, *=, *=)}
 */
module.exports.getSeconds = getSeconds;