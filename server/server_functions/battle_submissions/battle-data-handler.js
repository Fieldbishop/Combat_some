const mysql = require('../../server_modules/mysql-connection');
const mysqlHelpers = require('../../server_modules/mysql-helpers');
const url = require('url');
const multer = require('../../server_modules/multer-storage')

module.exports.getImage = (req, res) =>{
  const path = (multer.path+ "\\").replace(/\\/g,"\\\\");
  const regexPath = new RegExp('^'+path, 'g');
  if(req.query.path.match(regexPath)){
    res.sendFile(req.query.path);
  }
}
module.exports.getSubmissionData = (req, res)=>{
  let arg = url.parse(req.url, true).query;
  const query = "SELECT id, imageFilepath FROM battle_submission WHERE battleId = ?";

  (async () => {
    const mysqlResponse = await mysql.mysqlQuery(query,arg[Object.keys(arg)[0]] , req.method);
    const status = mysqlHelpers.httpStatusWithSqlResponse(mysqlResponse);
    res.status(status).send(mysqlResponse);
  })();
}