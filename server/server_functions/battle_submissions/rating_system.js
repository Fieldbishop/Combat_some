const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const jwt = require('jsonwebtoken');

function updateRating(req, res) {

    const username = jwt.verify(req.body.token, "secret").username;

    const id = req.body.id;
    const vote = req.body.vote;
    let query;

    query = "UPDATE battle_submission set rating = rating+? WHERE id = ?";

    (async () => {
        const mysqlResponse = await mysql.mysqlQuery(query, [vote, id], 'post');
        const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
        return res.status(status).send({
            "id" : id,
            "username" : username,
            "vote": vote
        });
    })();

}

module.exports.updateRating = updateRating;