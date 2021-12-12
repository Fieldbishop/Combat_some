const jwt = require('jsonwebtoken');
const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');



function userWins(req, res) {
  const username = jwt.verify(req.body.token, "secret").username;
  console.log(username);
  const query = "SELECT userName, wins, participations FROM user WHERE userName = ?";
  (async () => {
    const mysqlResponse = await mysql.mysqlQuery(query, username, "post");
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    console.log({mysqlResponse});
    res.status(status).send(mysqlResponse);
  })()
}

module.exports.userWins = userWins;