const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const fs = require('fs');

module.exports.uploadImage = (req, res) => {
    const bodyObj = JSON.parse(JSON.stringify(req.body));
    let response;
    console.log(bodyObj.username);
    console.log(bodyObj.battleId);
    (async () => {
        if (bodyObj.hasOwnProperty('battleId') &&
            bodyObj.hasOwnProperty('username')) {
            response = await mysql.mysqlQuery(
                "INSERT INTO battle_submission VALUES(?, ?, ?, ?, ?)"
                , [0, req.file.path, 0, bodyObj.username, bodyObj.battleId])
        }
        let statusCode = mysqlHelpers.httpStatusWithSqlResponse(response);
        if (statusCode !== 200) {
            fs.unlink(req.file.path, err => {
                console.log(err)
            });
        }
        res.status(statusCode).send(response);
    })()
}

module.exports.deleteFile = async function asyncCall(path) {
    fs.unlink(path, err => {
        console.log(err)
    });
    console.log('File deleted!');
};