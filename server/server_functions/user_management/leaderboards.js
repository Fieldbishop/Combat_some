const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');

module.exports.getLeaderboardsByWins =  (req, res) => {
  if (req.body) {
    let query = "SELECT userName FROM user ORDER BY wins DESC LIMITS 0, 100";
    (async () => {
      let leaderboard = await mysql.mysqlQuery(query, null, "get");
      res.status(200).send(leaderboard);
    })();
  } else {
    res.status(403).end();
  }
}

module.exports.getLeaderboards = (req, res) => {
  let query;

  if(Object.keys(req.query).length !== 0) {
    query = "SELECT * FROM battle WHERE id = ?";
  } else {
    query = "SELECT * FROM battle";
  }

  (async () => {
    const mysqlResponse = await mysql.mysqlQuery(query, req.query.id, 'get');
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    return res.status(status).send(mysqlResponse);
  })();
}