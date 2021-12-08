const mysql = require("mysql");
const util = require("util");

let con = mysql.createConnection({
    host: "127.0.0.1",
    port: 8081,
    user: "root",
    password: "password",
    database: "some_combat"
});

// node native promisify
const query = util.promisify(con.query).bind(con); // is bind needed?

con.connect(function(err) {
    if(err) {
        console.log("failed to connect with error message :");
        throw err;
    }
    console.log("Connected to MySQL");
})
async function mysqlQuery(sql, arg, httpVerb) {
    try {
        if(arg === undefined || arg === null){
            return await query(sql);
        }
        return await query(sql, [...arg]);
    } catch (err){
        if(httpVerb){
            if(httpVerb.toLowerCase() === "post"){
                console.log("Post wasn't successful..")
            } else if(httpVerb.toLowerCase() === "get"){
                console.log("Failed to get..")
            }
        } else{
            console.log("Database error!" + err);
        }
    }
}

module.exports.connection = con;
module.exports.query = query;
module.exports.mysqlQuery = mysqlQuery;