/**
 * Whitelisted addresses
 * @type {string[]}
 */
const whiteList = ['http://127.0.0.1:8081', 'http://127.0.0.1:8080'
    , 'http://localhost:8080', 'http://192.168.0.100:8080', 'http://127.0.0.1:8082'];

/**
 * Cors asynchronous configuration
 * @param req - is for the request
 * @param callback - is for the return object
 * @returns {*} - returns an object with info inside wether cors is enabled or not
 */
let corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whiteList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true};                       //enable cors for this request
    } else {
        corsOptions = {origin: false};                      //disable cors for this request
    }
    return callback(null, corsOptions);
}

/**
 * Exported for application wide use
 * @type {function(*, *): *}
 */
module.exports = corsOptionsDelegate;