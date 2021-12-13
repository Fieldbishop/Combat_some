const mysql = require("mysql");
const util = require("util");

/**
 * Connection configurations for mysql database
 * @type {Connection}
 */
let con = mysql.createConnection({
    host: "localhost",
    port: 3305,
    user: "root",
    password: "rootadming0g0600Yr$",
    database: "some_combat",
    queryFormat: ""
});

// node native promisify
/**
 * mysql query object
 * @type {any}
 */
const query = util.promisify(con.query).bind(con); // is bind needed?

/**
 * initializes the sql connection connection
 */
con.connect(function (err) {
    if (err) {
        console.log("failed to connect with error message :");
        throw err;
    }
    console.log("Connected to MySQL");
})

/**
 * Handles all the sql queries
 * @param sql - is for the sql query string
 * @param arg - is for sql query arguments
 * @param httpVerb - keyword for the type of express method used
 * @returns {Promise<*|*>} - a dataset returned from query or an error message
 */
async function mysqlQuery(sql, arg, httpVerb) {
    try {
        if (arg === undefined || arg === null) {
            return await query(sql);
        } else {
            if (arg.isArray) {
                return await query(sql, [...arg]);
            } else {
                return await query(sql, arg);
            }
        }
    } catch (err) {
        if (httpVerb) {
            console.log(httpVerb.toLowerCase() + " wasn't successful. Error : " + err)
        } else {
            console.log("Database Error : " + err);
        }
        return err;
    }
}

/**
 * Exported for application wide use
 * @type {Connection}
 */
module.exports.connection = con;

/**
 * Exported for application wide use
 * @type {*}
 */
module.exports.query = query;

/**
 * Exported for application wide use
 * @type {(function(*=, *=, *=): Promise<*>)|*}
 */
module.exports.mysqlQuery = mysqlQuery;