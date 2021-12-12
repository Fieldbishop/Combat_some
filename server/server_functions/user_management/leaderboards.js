const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');

function getLeaderboardByWins (req, res) {
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

function getAllLeaderboards (req, res) {
  const query = "SELECT * FROM battle";
  (async () => {
    const mysqlResponse = await mysql.mysqlQuery(query, null, 'get');
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    return res.status(status).send(mysqlResponse);
  })();
}

module.exports.getAllLeaderboards = getAllLeaderboards;
module.exports.getLeaderboardsByWins = getLeaderboardByWins;