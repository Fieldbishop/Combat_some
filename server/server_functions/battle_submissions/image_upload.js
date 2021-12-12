const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const fs = require('fs');

module.exports.uploadImage = (req, res) =>{
  const bodyObj = JSON.parse(JSON.stringify(req.body));
  let response;
  //console.log(bodyObj);
  //console.log(req.file);
  (async () => {
    if (bodyObj.hasOwnProperty('battleId') &&
        bodyObj.hasOwnProperty('username')) {
      response = await mysql.mysqlQuery(
          "INSERT INTO battle_submission VALUES(?, ?, ?, ?, ?)"
          ,[0, req.file.path, 0, bodyObj.username, bodyObj.battleId])
    }
    //console.log(response);
    let statusCode = mysqlHelpers.httpStatusWithSqlResponse(response);
    if (statusCode !== 200) {
      fs.unlink(req.file.path, err => {console.log(err)});
    }
    res.status(statusCode).send(response);
  })()
}