const mysql = require("mysql");
const util = require("util");

let con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3305,
    user: "root",
    password: "rootadming0g0600Yr$",
    database: "some_combat"
});

// node native promisify
const query = util.promisify(con.query).bind(con); // is bind needed?

con.connect(function (err) {
    if (err) {
        console.log("failed to connect with error message :");
        throw err;
    }
    console.log("Connected to MySQL");
})

async function mysqlQuery(sql, arg, httpVerb) {
    try {
        if (arg === undefined || arg === null) {
            return await query(sql);
        } else{
            return await query(sql, [...arg]);
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

module.exports.connection = con;
module.exports.query = query;
module.exports.mysqlQuery = mysqlQuery;