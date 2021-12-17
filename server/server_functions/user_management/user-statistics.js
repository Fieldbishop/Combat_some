const jwt = require('jsonwebtoken');
const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');


function userWins(req, res) {
    const username = getDecoded(req, res).username;
    console.log(username);
    const query = "SELECT userName, wins, participations FROM user WHERE userName = ?";
    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, username, "post");
        const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        console.log({mysqlResponse});
        res.status(status).send(mysqlResponse);
    })()
}

function updateUserSubmissions(req, res) {
    let username = getDecoded(req, res).username;

    const query = "UPDATE user set participations = participations+1 WHERE userName = ?";

    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, username, 'patch');
        const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        return res.status(status).send({
            "username": username
        })
    })();
}

module.exports.userWins = userWins;
module.exports.updateUserSubmissions = updateUserSubmissions;

function getDecoded(req, res) {
    return jwt.verify(req.body.token, "secret", (err, decoded) => {
        if (err) {
            return res.status(403).send(err);
        } else {
            return decoded;
        }
    });
}