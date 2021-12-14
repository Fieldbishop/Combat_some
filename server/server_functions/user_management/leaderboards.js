const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const {endBattle, startNewBattle} = require("../battle_submissions/battleCoordinator");

module.exports.getLeaderboardsByWins = (req, res) => {
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

    if (Object.keys(req.query).length !== 0) {
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

function getEndedLeaderboards() {
    const now = new Date().getTime();
    let query = "SELECT * FROM battle WHERE endDate = (SELECT MIN(endDate) FROM battle)";
    (async () => {
        let mysqlResponse = await mysql.mysqlQuery(query, null, 'End date');
        const then = new Date(mysqlResponse[0].endDate).getTime();
        const id = mysqlResponse[0].id;
        if (now >= then) {
            query = "SELECT userName FROM battle_submission WHERE rating = (SELECT MAX(rating) from battle_submission WHERE battleId = ?)"
            mysqlResponse = await mysql.mysqlQuery(query, id, 'Winner');

            if (mysqlResponse.length > 0) {
                query = "UPDATE user set wins = wins+1 WHERE userName = ?";
                for (let i = 0; i < mysqlResponse.length; i++) {
                    await mysql.mysqlQuery(query, mysqlResponse[i].userName, "Wins");
                }
            }

            endBattle(id);
            startNewBattle()
            /*query = ""
            await mysql.mysqlQuery("DELETE FROM user_vote WHERE battleId = ?", id, "User vote delete")
            await mysql.mysqlQuery("DELETE FROM battle_submission WHERE battleId = ?", id, "Sub delete")
            await mysql.mysqlQuery("DELETE FROM battle WHERE id = ?", id, "Delete");*/
        }
    })();
}

module.exports.getEndedLeaderboards = getEndedLeaderboards;