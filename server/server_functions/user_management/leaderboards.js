const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const {endBattle, startNewBattle, deleteSubmissionImages} = require("../battle_submissions/battleCoordinator");

/**
 * Returns user with most wins
 */
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

/**
 * returns all from battle database if id isnt specified, else it returns one battle that is
 */
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

/**
 * returns all of the cups that are active at the moment
 */
module.exports.getOpenCups = (req, res) => {
    let query;
    if (Object.keys(req.query).length !== 0) {
        query = "SELECT * FROM battle WHERE id = ? AND retired IS NULL";
    } else {
        query = "SELECT * FROM battle WHERE retired IS NULL";
    }
    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, req.query.id, 'get');
        const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        return res.status(status).send(mysqlResponse);
    })();
}

/**
 * Checks for battles that have ended before current time and havent been flagged.
 * calls the methods that handle all end of cup actions
 */
function getEndedLeaderboards() {
    let now = new Date().getTime();
    let type;
    let query = "SELECT * FROM battle WHERE endDate= (SELECT MIN(endDate) FROM battle WHERE retired IS NULL)";
    (async () => {
        let mysqlResponse1 = await mysql.mysqlQuery(query, null, 'End date');
        if (mysqlResponse1.length > 0) {
            const then = new Date(mysqlResponse1[0].endDate).getTime();
            let id = mysqlResponse1[0].id;
            if (now >= then) {
                query = "SELECT userName FROM battle_submission WHERE rating = (SELECT MAX(rating) from battle_submission WHERE battleId = ?)"
                let mysqlResponse2 = await mysql.mysqlQuery(query, id, 'Winner');
                if (mysqlResponse2.length > 0) {
                    query = "UPDATE user set wins = wins+1 WHERE userName = ?";
                    for (let i = 0; i < mysqlResponse2.length; i++) {
                        await mysql.mysqlQuery(query, mysqlResponse2[i].userName, "Wins");
                    }
                }
                if (mysqlResponse1.length > 0) {
                    for (let i = 0; i < mysqlResponse1.length; i++) {
                        id = mysqlResponse1[i].id;
                        type = mysqlResponse1[i].cupType;
                        deleteSubmissionImages(id);
                        endBattle(id);
                        startNewBattle(type);
                    }
                }
            }
        }
    })();
}

module.exports.getEndedLeaderboards = getEndedLeaderboards;