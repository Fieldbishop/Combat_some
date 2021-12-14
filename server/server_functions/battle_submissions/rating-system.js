const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const jwt = require('jsonwebtoken');

module.exports.updateRating = (req, res) => {
    const battleSubmissionId = req.body.id;
    const vote = req.body.vote;
    (async () => {
        let responseObj = await updateRating(vote, battleSubmissionId, req.method);
        res.status(responseObj.status).send(responseObj.response);
    })();

}
module.exports.vote = (req, res) => {
    const username = jwt.verify(req.body.token, "secret").username;
    const battleSubmissionId = req.body.id;
    const vote = req.body.vote;
    const battleId = req.body.battleId;
    let query = "SELECT * FROM user_vote WHERE (userName = ? AND battleSubmissionId = ?)";
    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, [username, battleSubmissionId], req.method);
        let status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        let args;
        if (status === 200 && mysqlResponse[0]) {
            query = "UPDATE user_vote set vote = ? WHERE (userName = ? AND id = ?)";
            args = [vote, username, battleSubmissionId];
        } else {
            query = "INSERT INTO user_vote VALUES(?,?,?,?,?)";
            args = [null, username, battleSubmissionId, battleId, vote];
        }
        const secondResponse = await mysql.mysqlQuery(query, args, req.method);
        status = mysqlHelpers.httpStatusWithSqlResponse(secondResponse);
        if (status === 200) {
            let responseObj = await updateRating(vote, battleSubmissionId, req.method);
            res.status(responseObj.status).send(responseObj.response);
        } else {
            res.status(status).send(secondResponse);
        }
    })();
}

async function updateRating(vote, battleSubmissionId, httpVerb = undefined) {
    const query = "UPDATE battle_submission set rating = rating+? WHERE id = ?";
    const mysqlResponse = await mysql.mysqlQuery(query, [vote, battleSubmissionId], httpVerb);
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    return {
        response: mysqlResponse,
        status: status,
    };
}

module.exports.getRating = (req, res) => {
    let sqlArguments;
    let query;
    const username = jwt.verify(req.body.token, "secret").username;

    if (req.body.hasOwnProperty('battleId')) {
        query = "SELECT rating FROM battle_submission WHERE (userName = ?, battleId = ?)";
        sqlArguments = [username, req.body.battleId]
    } else if (req.body.hasOwnProperty('battleSubmissionId')) {
        query = "SELECT rating FROM battle_submission WHERE (id = ?, userName = ?)";
        sqlArguments = [req.body.battleSubmissionId, username]

    } else {
        return res.status(400).send({
            error: "Bad request, incorrect id property property is missing, " +
                "body should have "
        });
    }
    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, sqlArguments, req.method);
        const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        res.status(status).send(mysqlResponse);
    })();
}